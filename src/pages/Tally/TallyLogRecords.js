import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import {
  Row,
  Col,
  Button,
  Input,
  Label,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { format } from "date-fns";
import { getTallyLogs } from "../../helpers/backend_helper";

const TallyLogRecords = ({ centerOptions, initialCenters }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
    centerId:
      initialCenters && initialCenters.length > 0 ? initialCenters[0] : "all",
    search: "",
    status: "all",
  });

  const [selectedXml, setSelectedXml] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLogs = useCallback(
    async (page, size) => {
      setLoading(true);
      try {
        const params = {
          page: page,
          limit: size,
          startDate: filters.startDate.toISOString(),
          endDate: filters.endDate.toISOString(),
          centerId: filters.centerId,
          status: filters.status,
          search: filters.search,
        };
        const response = await getTallyLogs(params);
        if (response.success) {
          setLogs(response.data);
          setTotalRows(response.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch tally logs:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    fetchLogs(currentPage, perPage);
  }, [fetchLogs, currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setSelectedXml(null);
  };

  const viewXml = (xml) => {
    setSelectedXml(xml);
    setIsModalOpen(true);
  };

  const columns = [
    {
      name: "Date & Time",
      selector: (row) => row.createdAt,
      sortable: false,
      width: "180px",
      cell: (row) => (
        <div className="py-2">
          <div className="font-size-13">
            {format(new Date(row.createdAt), "dd MMM yyyy")}
          </div>
          <small className="text-muted">
            {format(new Date(row.createdAt), "hh:mm a")}
          </small>
        </div>
      ),
    },
    {
      name: "Center",
      selector: (row) => row.center?.title || "N/A",
      sortable: false,
      wrap: true,
    },
    {
      name: "Invoice ID",
      selector: (row) => row.invoiceNo,
      sortable: false,
      style: { fontWeight: "500" },
    },
    {
      name: "Patient UID",
      selector: (row) => row.patientId || "N/A",
      sortable: false,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: false,
      cell: (row) => `₹${row.amount?.toLocaleString()}`,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: false,
      width: "120px",
      cell: (row) => (
        <Badge
          color={
            row.status === "created"
              ? "success"
              : row.status === "updated"
                ? "info"
                : "danger"
          }
          className="font-size-11"
        >
          {row.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      name: "Actions",
      button: true,
      width: "140px",
      cell: (row) => (
        <Button
          color="soft-primary"
          size="sm"
          onClick={() => viewXml(row.generatedXml)}
        >
          <i className="bx bx-code-alt me-1"></i>
          View XML
        </Button>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "600",
        backgroundColor: "#f8f9fa",
        color: "#495057",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
      },
    },
  };

  return (
    <div className="mt-4">
      <Row className="mb-3 align-items-end g-2">
        <Col md={6}>
          <Label className="form-label fw-semibold">Date Range</Label>
          <Flatpickr
            className="form-control"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
              defaultDate: [filters.startDate, filters.endDate],
            }}
            onChange={([start, end]) => {
              if (start && end) {
                setFilters((prev) => ({
                  ...prev,
                  startDate: start,
                  endDate: end,
                }));
                setCurrentPage(1);
              }
            }}
          />
        </Col>
        <Col md={4}>
          <Label className="form-label fw-semibold">Center</Label>
          <Input
            type="select"
            value={filters.centerId}
            onChange={(e) => handleFilterChange("centerId", e.target.value)}
          >
            <option value="all">All Centers</option>
            {centerOptions?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </Input>
        </Col>
        <Col md={2} className="text-end">
          <Button
            color="light"
            onClick={() => fetchLogs(currentPage, perPage)}
            disabled={loading}
            className="w-100"
          >
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <i className="bx bx-refresh me-1"></i>
            )}
            Refresh
          </Button>
        </Col>
      </Row>

      <div className="border">
        <DataTable
          columns={columns}
          data={logs}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[10, 15, 20, 30, 50]}
          progressPending={loading}
          progressComponent={
            <div className="py-4">
              <Spinner color="primary" />
            </div>
          }
          noDataComponent={
            <div className="py-4 text-muted">No records found</div>
          }
          highlightOnHover
          customStyles={customStyles}
        />
      </div>

      {/* XML Modal */}
      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg" scrollable>
        <ModalHeader toggle={toggleModal}>Generated Tally XML</ModalHeader>
        <ModalBody className="bg-dark text-light p-0">
          <pre
            className="m-0 p-3 font-size-12"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {selectedXml}
          </pre>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TallyLogRecords;
