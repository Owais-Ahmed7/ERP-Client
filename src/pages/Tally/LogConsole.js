import React, { useRef, useEffect } from "react";
import { Button, Label } from "reactstrap";
import PropTypes from "prop-types";

const getLogColor = (type) => {
  switch (type) {
    case "success":
      return "#4ade80";
    case "error":
      return "#f87171";
    case "warning":
      return "#fbbf24";
    case "divider":
      return "#475569";
    default:
      return "#e2e8f0";
  }
};

const LogConsole = ({ logs, sending, onClear }) => {
  const logContainerRef = useRef(null);

  // Auto-scroll on new logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <Label className="form-label fw-semibold mb-0">
          <i className="bx bx-terminal me-1"></i>
          Live Logs
        </Label>
        {logs.length > 0 && (
          <Button
            color="link"
            size="sm"
            className="text-muted p-0"
            onClick={onClear}
            disabled={sending}
          >
            Clear
          </Button>
        )}
      </div>
      <div
        ref={logContainerRef}
        style={{
          backgroundColor: "#0f172a",
          borderRadius: "8px",
          padding: "16px",
          minHeight: "300px",
          maxHeight: "500px",
          overflowY: "auto",
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: "13px",
          lineHeight: "1.7",
          border: "1px solid #1e293b",
        }}
      >
        {logs.length === 0 ? (
          <div
            style={{ color: "#475569" }}
            className="d-flex align-items-center justify-content-center h-100"
          >
            <div
              className="text-center"
              style={{
                minHeight: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <i className="bx bx-terminal" style={{ fontSize: "48px" }}></i>
              <p className="mt-2 mb-0">
                Logs will appear here when you start a sync
              </p>
            </div>
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index}>
              {log.type === "divider" ? (
                <div
                  style={{
                    borderTop: "1px solid #334155",
                    margin: "8px 0",
                  }}
                />
              ) : (
                <div style={{ color: getLogColor(log.type) }}>
                  <span style={{ color: "#64748b" }}>[{log.timestamp}]</span>{" "}
                  {log.message}
                </div>
              )}
            </div>
          ))
        )}
        {sending && (
          <div
            style={{ color: "#64748b" }}
            className="d-flex align-items-center gap-2 mt-1"
          >
            <span
              className="spinner-grow spinner-grow-sm"
              style={{ width: "8px", height: "8px" }}
            ></span>
            Waiting for updates...
          </div>
        )}
      </div>
    </div>
  );
};

LogConsole.propTypes = {
  logs: PropTypes.array.isRequired,
  sending: PropTypes.bool,
  onClear: PropTypes.func,
};

export default LogConsole;
