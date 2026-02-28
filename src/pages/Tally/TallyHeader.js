import React from "react";
import { Row, Col, Button, Spinner, Input, Label, FormGroup } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import PropTypes from "prop-types";
import CenterDropdown from "../Report/Components/Doctor/components/CenterDropDown";

const VOUCHER_TYPES = [
  { id: "INVOICE", label: "Invoice", enabled: true },
  { id: "ADVANCE_PAYMENT", label: "Advance Payment", enabled: false },
  { id: "CENTRAL_PAYMENT", label: "Central Payment", enabled: true },
  { id: "CASH_PAYMENT", label: "Cash Payment", enabled: false },
];

const TallyHeader = ({
  selectedDate,
  setSelectedDate,
  centerOptions,
  selectedCentersIds,
  setSelectedCentersIds,
  selectedTypes,
  onTypeToggle,
  sending,
  onSend,
}) => {
  return (
    <Row className="mb-4 align-items-end">
      {/* Date Picker */}
      <Col md={3}>
        <Label className="form-label fw-semibold">Select Date</Label>
        <div
          className="border border-dark d-flex align-items-center bg-light"
          style={{ borderRadius: "4px" }}
        >
          <Flatpickr
            value={selectedDate}
            onChange={([date]) => setSelectedDate(date)}
            options={{
              dateFormat: "d M, Y",
              disableMobile: true,
            }}
            className="form-control shadow-none bg-light border-0"
            disabled={sending}
          />
        </div>
      </Col>

      {/* Center Dropdown */}
      <Col md={3}>
        <Label className="form-label fw-semibold">Select Centers</Label>
        <CenterDropdown
          options={centerOptions}
          value={selectedCentersIds}
          onChange={setSelectedCentersIds}
        />
      </Col>

      {/* Voucher Types */}
      <Col md={4}>
        <Label className="form-label fw-semibold">Voucher Types</Label>
        <div className="d-flex flex-wrap gap-3">
          {VOUCHER_TYPES.map((type) => (
            <FormGroup check key={type.id} className="mb-0">
              <Input
                type="checkbox"
                id={`type-${type.id}`}
                checked={selectedTypes.includes(type.id)}
                onChange={() => onTypeToggle(type.id)}
                disabled={sending || !type.enabled}
              />
              <Label
                check
                htmlFor={`type-${type.id}`}
                className={!type.enabled ? "text-muted" : ""}
              >
                {type.label}
                {!type.enabled && (
                  <small className="text-muted ms-1">(soon)</small>
                )}
              </Label>
            </FormGroup>
          ))}
        </div>
      </Col>

      {/* Send Button */}
      <Col md={2} className="text-end">
        <Button
          color="primary"
          size="lg"
          onClick={onSend}
          disabled={
            sending ||
            selectedCentersIds.length === 0 ||
            selectedTypes.length === 0
          }
          className="w-100"
        >
          {sending ? (
            <>
              <Spinner size="sm" className="me-2" />
              Sending...
            </>
          ) : (
            <>
              <i className="bx bx-send me-2"></i>
              Send to Tally
            </>
          )}
        </Button>
      </Col>
    </Row>
  );
};

TallyHeader.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  setSelectedDate: PropTypes.func,
  centerOptions: PropTypes.array,
  selectedCentersIds: PropTypes.array,
  setSelectedCentersIds: PropTypes.func,
  selectedTypes: PropTypes.array,
  onTypeToggle: PropTypes.func,
  sending: PropTypes.bool,
  onSend: PropTypes.func,
};

export default TallyHeader;
