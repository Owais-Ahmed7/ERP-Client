import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalHeader, ModalBody, Progress } from "reactstrap";
import { Button } from "../Components/Button";
import * as XLSX from "xlsx";
import axios from "axios";
import { toast } from "react-toastify";
import Typeloader from "./Loader";

const dbFields = [
  "code",
  "medicineName",
  "unitType",
  "Strength",
  "stock",
  "costprice",
  "value",
  "mrp",
  "purchasePrice",
  "SalesPrice",
  "company",
  "manufacturer",
  "RackNum",
  "Expiry",
  "Batch",
  "Status",
];

const isNumericField = (field) =>
  [
    "stock",
    "costprice",
    "value",
    "mrp",
    "purchasePrice",
    "SalesPrice",
  ].includes(field);

const BulkImportModal = ({ isOpen, user, toggle, onImport }) => {
  const [uploadedData, setUploadedData] = useState([]);
  const [headerRowIndex, setHeaderRowIndex] = useState(0);

  const emptyMapping = () =>
    dbFields.reduce((acc, f) => {
      acc[f] = "";
      return acc;
    }, {});

  const [columnMapping, setColumnMapping] = useState(emptyMapping());

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0..100
  const [uploadedCount, setUploadedCount] = useState(0); // inserted items count
  const [totalCount, setTotalCount] = useState(0); // total items to process
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [failedChunks, setFailedChunks] = useState([]);
  const [uploadDone, setUploadDone] = useState(false);
  const [skippedCountTotal, setSkippedCountTotal] = useState(0);

  // MULTI centers: store as array of centerId strings
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [centerDropdownOpen, setCenterDropdownOpen] = useState(false);

  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const dbRefs = useRef({});
  const fileRefs = useRef({});
  const endpoint = "/pharmacy/bulk-insert";

  // refs (mutable, keep accurate across async callbacks)
  const uploadedRef = useRef(0); // inserted items
  const skippedRef = useRef(0); // skipped items
  const totalItemsRef = useRef(0); // total items
  const chunksTotalRef = useRef(0); // number of chunks

  useEffect(() => {
    if (isOpen) {
      setSelectedCenters([]);
    } else {
      setUploadedData([]);
      setColumnMapping(emptyMapping());
      setHeaderRowIndex(0);
      setUploadProgress(0);
      setUploadedCount(0);
      setTotalCount(0);
      setCurrentChunkIndex(0);
      setTotalChunks(0);
      setFailedChunks([]);
      setUploadDone(false);
      setSkippedCountTotal(0);
      setSelectedCenters([]);
      setCenterDropdownOpen(false);
      uploadedRef.current = 0;
      skippedRef.current = 0;
      totalItemsRef.current = 0;
      chunksTotalRef.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user]);

  // close center dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setCenterDropdownOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      setUploadedData(json);
      setHeaderRowIndex(0);
      setColumnMapping(emptyMapping());
      setUploadDone(false);
      setUploadProgress(0);
      setUploadedCount(0);
      setFailedChunks([]);
      setSkippedCountTotal(0);
      uploadedRef.current = 0;
      skippedRef.current = 0;
      totalItemsRef.current = 0;
      chunksTotalRef.current = 0;
    };
    reader.readAsArrayBuffer(file);
  };

  const buildMappedObjects = () => {
    const rows = uploadedData.slice(headerRowIndex + 1);
    const mapped = rows.map((row) => {
      const obj = {};
      Object.entries(columnMapping).forEach(([field, colIndexStr]) => {
        if (colIndexStr !== "" && colIndexStr !== undefined) {
          const idx = Number(colIndexStr);
          const rawVal = row?.[idx];
          if (
            rawVal === undefined ||
            rawVal === null ||
            String(rawVal).trim() === ""
          ) {
            return;
          }
          if (isNumericField(field)) {
            const n = Number(String(rawVal).replace(/[^0-9.-]/g, ""));
            obj[field] = Number.isFinite(n) ? n : 0;
          } else {
            obj[field] = String(rawVal).trim();
          }
        }
      });

      // attach centers: for each selected center assign the row's stock value (if any)
      if (Array.isArray(selectedCenters) && selectedCenters.length > 0) {
        const stockVal =
          typeof obj.stock === "number" ? obj.stock : Number(obj.stock || 0);
        obj.centers = selectedCenters.map((centerId) => ({
          centerId,
          stock: Number.isFinite(stockVal) ? stockVal : 0,
        }));
      }

      obj.deleted = false;

      return obj;
    });

    // Keep rows with at least one non-meta field mapped
    const filtered = mapped.filter((o) => {
      const keys = Object.keys(o).filter(
        (k) => k !== "deleted" && k !== "centers"
      );
      return keys.length > 0;
    });

    return filtered;
  };

  /**
   * Send a chunk with retries.
   * onUploadProgress converts byte progress into estimated items processed in this chunk,
   * combines with already-processed items and updates UI progress (clamped 0..100).
   */
  const sendChunkWithRetry = async (chunkData, chunkIndex, maxAttempts = 3) => {
    let attempt = 0;
    while (attempt < maxAttempts) {
      attempt++;
      try {
        const resp = await axios.post(endpoint, chunkData, {
          headers: { "Content-Type": "application/json" },
          timeout: 0,
          onUploadProgress: (progressEvent) => {
            // progressEvent may be undefined depending on the environment.
            if (!progressEvent || !progressEvent.total) return;

            // estimate item-based progress:
            // alreadyProcessed = uploadedRef + skippedRef (items)
            const alreadyProcessed = uploadedRef.current + skippedRef.current;

            const chunkItems = chunkData.length || 1;
            const byteRatio = Math.min(
              1,
              Math.max(0, progressEvent.loaded / progressEvent.total)
            ); // 0..1

            // estimated items processed in current chunk based on bytes
            const estimatedCurrentChunkItems = chunkItems * byteRatio;

            const totalItems = Math.max(1, totalItemsRef.current);

            const estimatedProcessedTotal =
              alreadyProcessed + estimatedCurrentChunkItems;

            let pct = Math.round((estimatedProcessedTotal / totalItems) * 100);

            // clamp
            pct = Math.max(0, Math.min(100, pct));

            // only update when it moves forward
            setUploadProgress((prev) => Math.max(prev, pct));
          },
        });

        const data = resp.data || {};
        const inserted = Number(data.insertedCount ?? data.count ?? 0);
        const skipped =
          Number(
            data.skippedCount ?? Math.max(0, chunkData.length - inserted)
          ) || 0;
        return { success: true, inserted, skipped };
      } catch (err) {
        toast.warn(`Chunk ${chunkIndex} attempt ${attempt} failed`);
        if (attempt >= maxAttempts) {
          return { success: false, error: err };
        }
        
        // eslint-disable-next-line no-loop-func
        await new Promise((r) => setTimeout(r, 600 * attempt));
      }
    }
    return { success: false, error: new Error("Unknown error") };
  };

  const handleImport = async ({ chunkSize = 100 } = {}) => {
    const mappedData = buildMappedObjects();
    const totalItemsLocal = mappedData.length;
    if (!totalItemsLocal) {
      toast.info("No data to import (no rows or no mapped fields).");
      return;
    }

    // reset refs and UI
    uploadedRef.current = 0;
    skippedRef.current = 0;
    totalItemsRef.current = totalItemsLocal;
    setUploading(true);
    setUploadProgress(0);
    setUploadedCount(0);
    setTotalCount(totalItemsLocal);
    setFailedChunks([]);
    setUploadDone(false);
    setSkippedCountTotal(0);

    // create chunks
    const chunks = [];
    for (let i = 0; i < totalItemsLocal; i += chunkSize) {
      chunks.push(mappedData.slice(i, i + chunkSize));
    }
    const chunksTotal = chunks.length;
    setTotalChunks(chunksTotal);
    chunksTotalRef.current = chunksTotal;

    const beforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);

    try {
      for (let i = 0; i < chunksTotal; i++) {
        setCurrentChunkIndex(i);
        const chunk = chunks[i];

        // send chunk (onUploadProgress will estimate within-chunk progress)
        const result = await sendChunkWithRetry(chunk, i, 3);

        if (!result.success) {
          setFailedChunks((prev) => [
            ...prev,
            {
              index: i,
              data: chunk,
              error: result.error?.message || "unknown",
            },
          ]);
          toast.error(`Chunk ${i} failed after retries.`);
        } else {
          const inserted = result.inserted ?? 0;
          const skipped =
            result.skipped ?? Math.max(0, chunk.length - inserted);

          // update refs (synchronous) and then update visible state
          uploadedRef.current += inserted;
          skippedRef.current += skipped;

          setUploadedCount(uploadedRef.current);
          setSkippedCountTotal(skippedRef.current);

          // compute percent based on processed items (guaranteed <= totalItemsLocal)
          const processed = uploadedRef.current + skippedRef.current;
          let pct = Math.round(
            (processed / Math.max(1, totalItemsLocal)) * 100
          );
          pct = Math.max(0, Math.min(100, pct));
          setUploadProgress(pct);

          if (inserted < chunk.length) {
            // toast.info(
            //   `Chunk ${i}: inserted ${inserted}/${chunk.length}, skipped ${skipped}`
            // );
          }
        }

        // tiny delay to allow UI updates
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 50));
      }

      // final clamp and UI updates
      setUploadProgress(100);
      setUploadDone(failedChunks.length === 0);

      const finalInserted = uploadedRef.current;
      const finalSkipped = skippedRef.current;
      if (failedChunks.length === 0) {
        toast.success(
          `Import finished: inserted ${finalInserted}, skipped ${finalSkipped}`
        );
      } else {
        toast.warn(
          `Import finished with ${failedChunks.length} failed chunk(s). Inserted: ${finalInserted}, skipped: ${finalSkipped}`
        );
      }
    } catch (err) {
      toast.error("Upload failed unexpectedly");
      console.error(err);
    } finally {
      setUploading(false);
      window.removeEventListener("beforeunload", beforeUnload);
    }
  };

  const retryFailed = async () => {
    if (!failedChunks.length) return;
    setUploading(true);

    const beforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);

    try {
      const remaining = [];
      for (let i = 0; i < failedChunks.length; i++) {
        const item = failedChunks[i];
        const result = await sendChunkWithRetry(item.data, item.index, 3);
        if (!result.success) {
          remaining.push({
            ...item,
            error: result.error?.message || "unknown",
          });
        } else {
          const inserted = result.inserted ?? 0;
          const skipped =
            result.skipped ?? Math.max(0, item.data.length - inserted);

          uploadedRef.current += inserted;
          skippedRef.current += skipped;
          setUploadedCount(uploadedRef.current);
          setSkippedCountTotal(skippedRef.current);

          const processed = uploadedRef.current + skippedRef.current;
          let pct = Math.round((processed / Math.max(1, totalCount)) * 100);
          pct = Math.max(0, Math.min(100, pct));
          setUploadProgress(pct);
        }
      }
      setFailedChunks(remaining);
      if (remaining.length === 0) {
        setUploadDone(true);
        setUploadProgress(100);
        toast.success("All failed chunks retried successfully");
      } else {
        toast.warn(`${remaining.length} chunk(s) still failing`);
      }
    } finally {
      setUploading(false);
      window.removeEventListener("beforeunload", beforeUnload);
    }
  };

  // Draw mapping lines (unchanged)
  const drawLines = () => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    svg.innerHTML = `
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#0d6efd" />
        </marker>
      </defs>
    `;

    const parentRect = container.getBoundingClientRect();

    Object.entries(columnMapping).forEach(([field, colIndexStr]) => {
      if (colIndexStr === "" || colIndexStr === undefined) return;
      const colIndex = Number(colIndexStr);

      const dbEl = dbRefs.current[field];
      const fileEl = fileRefs.current[colIndex];
      if (!dbEl || !fileEl) return;

      const dbRect = dbEl.getBoundingClientRect();
      const fileRect = fileEl.getBoundingClientRect();

      const startX = dbRect.right - parentRect.left;
      const startY = dbRect.top + dbRect.height / 2 - parentRect.top;
      const endX = fileRect.left - parentRect.left;
      const endY = fileRect.top + fileRect.height / 2 - parentRect.top;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", startX);
      line.setAttribute("y1", startY);
      line.setAttribute("x2", endX);
      line.setAttribute("y2", endY);
      line.setAttribute("stroke", "#0d6efd");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("marker-end", "url(#arrowhead)");
      svg.appendChild(line);
    });
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => drawLines());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnMapping, uploadedData, headerRowIndex]);

  useEffect(() => {
    const handler = () => drawLines();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fileColumns = uploadedData[headerRowIndex] || [];
  const dataPreview = uploadedData.slice(
    headerRowIndex + 1,
    headerRowIndex + 11
  );

  const onMapChange = (field, value) => {
    setColumnMapping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // helper: available centers = all - selected
  const allCenters = user?.userCenters || [];
  const availableCenters = allCenters.filter(
    (c) => !selectedCenters.includes(String(c?._id))
  );

  const handleAddCenter = (centerId) => {
    if (uploading) return;
    setSelectedCenters((prev) => [...prev, String(centerId)]);
    setCenterDropdownOpen(true); // keep open for multi-select UX
  };

  const handleRemoveCenter = (centerId) => {
    if (uploading) return;
    setSelectedCenters((prev) => prev.filter((id) => id !== String(centerId)));
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => !uploading && toggle()}
      size="xl"
      backdrop="static"
    >
      <ModalHeader toggle={() => !uploading && toggle()}>
        Bulk Import Medicines
      </ModalHeader>
      <ModalBody>
        {/* Custom Multi-select Centers */}
        <div className="mb-3" ref={containerRef}>
          <label
            htmlFor="centersMultiCustom"
            style={{
              marginBottom: "8px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#4a5568",
              display: "block",
            }}
          >
            Select Centers (click to open)
          </label>

          <div
            id="centersMultiCustom"
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "8px 10px",
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              backgroundColor: uploading ? "#f8f9fa" : "white",
              cursor: uploading ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              if (!uploading) setCenterDropdownOpen((s) => !s);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!uploading) setCenterDropdownOpen((s) => !s);
              }
            }}
          >
            {selectedCenters.length === 0 && (
              <div style={{ color: "#6c757d" }}>No centers selected</div>
            )}
            {selectedCenters.map((id) => {
              const c = allCenters.find((x) => String(x?._id) === String(id));
              return (
                <div
                  key={id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    backgroundColor: "#e9f2ff",
                    border: "1px solid #d0e6ff",
                    borderRadius: 999,
                    fontSize: 13,
                  }}
                >
                  <span>{c?.title ?? id}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCenter(id);
                    }}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      padding: 0,
                      margin: 0,
                      lineHeight: 1,
                      fontWeight: 700,
                    }}
                    aria-label={`Remove ${c?.title ?? id}`}
                    disabled={uploading}
                  >
                    ×
                  </button>
                </div>
              );
            })}

            <div style={{ marginLeft: "auto", paddingLeft: 8 }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: centerDropdownOpen ? "rotate(180deg)" : "none",
                }}
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="#495057"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {centerDropdownOpen && !uploading && (
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                marginTop: 8,
                maxHeight: 220,
                overflow: "auto",
                background: "white",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                zIndex: 9999,
                position: "relative",
              }}
            >
              {availableCenters.length === 0 ? (
                <div style={{ padding: 12, color: "#6c757d" }}>
                  No more centers
                </div>
              ) : (
                availableCenters.map((c) => (
                  <div
                    key={c?._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddCenter(c?._id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCenter(c?._id);
                      }
                    }}
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f1f3f5",
                      cursor: "pointer",
                    }}
                  >
                    {c?.title}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* File selector */}
        <div className="mb-3">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="form-control"
            disabled={uploading}
          />
        </div>

        {/* Header row selector */}
        {uploadedData.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Select Header Row</label>
            <select
              className="form-select"
              value={headerRowIndex}
              onChange={(e) => {
                setHeaderRowIndex(Number(e.target.value));
                setColumnMapping(emptyMapping());
              }}
              disabled={uploading}
            >
              {uploadedData.map((row, idx) => (
                <option key={idx} value={idx}>
                  Row {idx + 1}: {row.join(" | ")}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mapping inputs */}
        {fileColumns.length > 0 && (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          >
            {dbFields.map((field) => {
              const usedIndices = Object.values(columnMapping).filter(
                (v) => v !== "" && v !== undefined
              );
              return (
                <div
                  key={field}
                  className="d-flex align-items-center mb-2"
                  style={{ gap: 12 }}
                >
                  <div style={{ width: "40%", fontWeight: 600 }}>{field}</div>
                  <div style={{ width: "60%" }}>
                    <select
                      className="form-select"
                      value={columnMapping[field] ?? ""}
                      onChange={(e) => onMapChange(field, e.target.value)}
                      disabled={uploading}
                    >
                      <option value="">-- Not Mapped --</option>
                      {fileColumns.map((col, idx) => {
                        const idxStr = String(idx);
                        const isUsed = usedIndices.includes(idxStr);
                        const allowed =
                          !isUsed || columnMapping[field] === idxStr;
                        if (!allowed) return null;
                        const label =
                          String(col).trim() === ""
                            ? `Column ${idx + 1} (empty)`
                            : String(col);
                        return (
                          <option key={idx} value={idxStr}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mapping summary */}
        {Object.values(columnMapping).some(
          (v) => v !== "" && v !== undefined
        ) && (
          <div
            ref={containerRef}
            style={{ position: "relative", padding: 12, marginBottom: 12 }}
          >
            <h5 style={{ marginBottom: 12 }}>Mapping Summary</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {dbFields.map((field) => (
                  <div
                    key={field}
                    ref={(el) => (dbRefs.current[field] = el)}
                    style={{
                      padding: "8px 12px",
                      minWidth: 140,
                      textAlign: "center",
                      backgroundColor: "#0d6efd",
                      color: "#fff",
                      borderRadius: 6,
                      fontWeight: 600,
                    }}
                  >
                    {field}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {fileColumns.map((col, idx) => (
                  <div
                    key={idx}
                    ref={(el) => (fileRefs.current[idx] = el)}
                    style={{
                      padding: "8px 12px",
                      minWidth: 140,
                      textAlign: "center",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      borderRadius: 6,
                      fontWeight: 600,
                    }}
                  >
                    {String(col).trim() === ""
                      ? `Column ${idx + 1} (empty)`
                      : String(col)}
                  </div>
                ))}
              </div>
            </div>

            <svg
              ref={svgRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        {/* Data preview */}
        {dataPreview.length > 0 && (
          <div className="mt-3">
            <h5>Data Preview (Top {dataPreview.length} rows)</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead className="table-light">
                  <tr>
                    {fileColumns.map((col, idx) => (
                      <th key={idx}>
                        {String(col).trim() === "" ? `Column ${idx + 1}` : col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataPreview.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {fileColumns.map((_, cIdx) => (
                        <td key={cIdx}>{row[cIdx]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Progress overlay */}
        {uploading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(5px)",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                maxWidth: "500px",
                width: "90%",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div className="alert alert-warning text-center fw-bold">
                ⚠️ Upload in progress — please DO NOT refresh or close this
                page.
              </div>
              <div className="mb-2 text-center small text-muted">
                {uploadedCount} / {totalCount} items uploaded • Chunk{" "}
                {currentChunkIndex + 1} / {totalChunks}
              </div>
              <div className="mb-2 small text-muted">
                Skipped (duplicates): {skippedCountTotal}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Typeloader />
                <Progress
                  value={uploadProgress}
                  animated
                  style={{ width: "100%" }}
                >
                  {uploadProgress}%
                </Progress>
              </div>
            </div>
          </div>
        )}

        {!uploading && uploadDone && (
          <div className="alert alert-success text-center fw-bold">
            ✅ Upload completed
          </div>
        )}

        {!uploading && failedChunks.length > 0 && (
          <div className="alert alert-danger">
            <div>
              <strong>{failedChunks.length}</strong> chunk(s) failed.
            </div>
            <div style={{ marginTop: 8 }}>
              {failedChunks.map((f) => (
                <div key={f.index}>
                  {/* Chunk {f.index}: {f.data.length} items — error: {f.error} */}
                  Some chunks are Faild
                </div>
              ))}
            </div>
            <div className="mt-2 d-flex gap-2">
              <Button onClick={retryFailed}>Retry Failed</Button>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end mt-3" style={{ gap: 8 }}>
          <Button
            variant="outline"
            onClick={() => {
              if (!uploading) {
                setUploadedData([]);
                setColumnMapping(emptyMapping());
                setHeaderRowIndex(0);
                setUploadDone(false);
                toggle();
              }
            }}
            disabled={uploading}
          >
            Close
          </Button>

          <Button
            onClick={() => handleImport({ chunkSize: 100 })}
            disabled={
              uploading ||
              !Object.values(columnMapping).some(
                (v) => v !== "" && v !== undefined
              )
            }
          >
            {uploading ? "Uploading..." : "Import Data"}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BulkImportModal;
