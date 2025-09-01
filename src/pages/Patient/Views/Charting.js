import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionBody,
  AccordionItem,
  Alert,
  Button,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addClinicalNote,
  addGeneralClinicalNote,
  admitDischargePatient,
  fetchCharts,
  fetchGeneralCharts,
  togglePatientForm,
  togglePrint,
  updateClinicalNote,
} from "../../../store/actions";

import Placeholder from "./Components/Placeholder";
import ChartDate from "../Modals/ChartDate";
import ChartForm from "../ChartForm";
import Charts from "../Charts";

import RenderWhen from "../../../Components/Common/RenderWhen";
import AddmissionCard from "./Components/AddmissionCard";
import {
  ADMIT_PATIENT,
  IPD,
  GENERAL,
  OPD,
  CLINIC_TEST,
  NOTES,
} from "../../../Components/constants/patient";
import OPDView from "./OPD";
import CheckPermission from "../../../Components/HOC/CheckPermission";
import GeneralCard from "./Components/GeneralCard";
import General from "./General";
import IPDComponent from "./IPD";
import ClinicalTest from "./ClinicalTest";
import Notes from "../../Nurse/Views/Notes";

const Charting = ({
  patient,
  addmissionsCharts,
  charts,
  loading,
  generalLoading,
  pageAccess,
  view,
}) => {
  const dispatch = useDispatch();

  const isClinincalTab = useSelector(
    (state) => state.ClinicalTest.isClinincalTab
  );
  const [tab, setTab] = useState(isClinincalTab ? CLINIC_TEST : IPD);
  const [dateModal, setDateModal] = useState(false);
  const [testModal, setTestModal] = useState(false);
  const [chartType, setChartType] = useState("");
  // const [toggleGeneral, setToggleGeneral] = useState("0");
  const toggleModal = () => setDateModal(!dateModal);

  const toggleTestModal = () => {
    setTestModal(!testModal);
    setChartType("");
  };

  const handleAdmitPatient = () => {
    // if (!patient.isAdmit && !patient.isDischarge) {
    //   dispatch(togglePatientForm({ data: patient, isOpen: true }));
    // } else
    dispatch(admitDischargePatient({ data: null, isOpen: ADMIT_PATIENT }));
  };

  const [addmissionId, setAddmissionId] = useState();

  const [open, setOpen] = useState(addmissionsCharts?.length > 0 ? "0" : null);
  const toggleAccordian = (id) => {
    // setToggleGeneral("0");
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    if (
      addmissionsCharts.length &&
      !addmissionsCharts.find((ch) => ch._id === addmissionId)
    ) {
      setOpen("0");
      setAddmissionId(addmissionsCharts[0]?._id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, patient, addmissionsCharts]);

  useEffect(() => {
    if (tab === GENERAL)
      dispatch(fetchGeneralCharts({ patient: patient._id, type: GENERAL }));
    if (tab === OPD)
      dispatch(fetchGeneralCharts({ patient: patient._id, type: OPD }));
    if (tab === CLINIC_TEST)
      dispatch(fetchGeneralCharts({ patient: patient._id, type: CLINIC_TEST }));
  }, [dispatch, tab, patient]);

  //fetch addmission Charts
  useEffect(() => {
    if (addmissionId && patient?.addmissions?.includes(addmissionId)) {
      dispatch(fetchCharts(addmissionId));
    }
  }, [dispatch, patient, addmissionId]);

  //fixes accordian open close issue when switch patients
  // useEffect(() => {
  //   setOpen("");
  //   setAddmissionId("");
  // }, [patient]);

  /* ----------------------------- DOWNLOAD DATA IN JSON ------------------------------ */
  // function downloadJson(data, filename) {
  //   // Convert the array of objects to a JSON string
  //   const jsonString = JSON.stringify(data, null, 2);
  //   // Create a Blob containing the JSON data
  //   const blob = new Blob([jsonString], { type: "application/json" });
  //   // Create a download link
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = URL.createObjectURL(blob);
  //   downloadLink.download = filename || "data.json";
  //   // Append the link to the document body
  //   document.body.appendChild(downloadLink);
  //   // Trigger the click event to start the download
  //   downloadLink.click();
  //   // Remove the link from the document body
  //   document.body.removeChild(downloadLink);
  // }

  // useEffect(() => {
  //   if (addmissionsCharts && addmissionsCharts[0]?.charts?.length > 0) {
  //     downloadJson(addmissionsCharts[0]?.charts, "chennai.new.charts.json");
  //   }
  // }, [addmissionsCharts]);
  /* ----------------------------- DOWNLOAD DATA IN JSON ------------------------------ */

  const onSubmitClinicalForm = (
    values,
    files,
    editChartData,
    editClinicalNote
  ) => {
    const {
      author,
      patient,
      center,
      centerAddress,
      addmission,
      chart,
      type,
      date,
      complaints,
      observations,
      diagnosis,
      notes,
    } = values;
    const formData = new FormData();
    formData.append("author", author);
    formData.append("patient", patient);
    formData.append("center", center);
    formData.append("centerAddress", centerAddress);
    formData.append("addmission", addmission);
    formData.append("chart", chart);
    formData.append("type", type);
    formData.append("date", date);
    formData.append("complaints", complaints);
    formData.append("observations", observations);
    formData.append("diagnosis", diagnosis);
    formData.append("notes", notes);
    files.forEach((file) => formData.append("file", file.file));

    if (editClinicalNote) {
      formData.append("id", editChartData._id);
      formData.append("chartId", editClinicalNote._id);
      dispatch(updateClinicalNote(formData));
    } else if (chartType === "GENERAL") {
      dispatch(addGeneralClinicalNote(values));
    } else {
      dispatch(addClinicalNote(formData));
    }
  };

  const ipdComponent = useMemo(() => {
    return (
      tab === IPD && (
        <IPDComponent
          addmissionsCharts={addmissionsCharts}
          open={open}
          patient={patient}
          loading={loading}
          toggleModal={toggleModal}
          setChartType={setChartType}
          toggleAccordian={toggleAccordian}
          setAddmissionId={setAddmissionId}
        />
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addmissionsCharts, tab, loading, open, patient]);
  const clinicalTestComponent = useMemo(() => {
    return (
      tab === CLINIC_TEST && (
        <ClinicalTest
          addmissionsCharts={addmissionsCharts}
          open={open}
          patient={patient}
          loading={loading}
          toggleModal={toggleModal}
          setChartType={setChartType}
          toggleAccordian={toggleAccordian}
          setAddmissionId={setAddmissionId}
          // chartType = {chartType}
        />
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addmissionsCharts, tab, loading, open, patient]);

  const generalComponent = useMemo(() => {
    return (
      <General
        generalLoading={generalLoading}
        toggleModal={toggleModal}
        charts={charts}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts, generalLoading]);

  return (
    <div className="mt-3">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="nav nav-tabs border-0 gap-">
          {pageAccess
            ?.find((pg) => pg.name === "Patient")
            ?.subAccess?.find((s) => s.name === "OPD") && (
              <li className="nav-item">
                <button
                  onClick={() => setTab(OPD)}
                  className={`nav-link rounded-0 ${tab === OPD
                    ? "border-0 border-2 border-top border-primary"
                    : "active"
                }`}
                aria-current="page"
              >
                OPD
              </button>
            </li>
          )}

          <li className="nav-item rounded-0">
            <button
              onClick={() => setTab(IPD)}
              className={`nav-link rounded-0 ${
                tab === IPD
                  ? "border-0 border-2 border-top border-primary"
                  : "active"
              }`}
            >
              IPD
            </button>
          </li>
          <li className="nav-item rounded-0">
            <button
              onClick={() => setTab(CLINIC_TEST)}
              className={`nav-link rounded-0 ${
                tab === CLINIC_TEST
                  ? "border-0 border-2 border-top border-primary"
                  : "active"
              }`}
            >
              Clinical Test
            </button>
          </li>
          <li className="nav-item rounded-0">
            <button
              onClick={() => setTab(GENERAL)}
              className={`nav-link rounded-0 ${
                tab === GENERAL
                  ? "border-0 border-2 border-top border-primary"
                  : "active"
              }`}
            >
              History
            </button>
          </li>
          <li className="nav-item rounded-0">
            <button
              onClick={() => setTab(NOTES)}
              className={`nav-link rounded-0 ${
                tab === NOTES
                  ? "border-0 border-2 border-top border-primary"
                  : "active"
              }`}
            >
              Notes
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-2">
        <CheckPermission permission={"create"} subAccess={"Charting"}>
          <RenderWhen isTrue={tab === OPD}>
            <Button
              onClick={() => {
                toggleModal();
                setChartType("GENERAL");
              }}
              size="sm"
            >
              Create new Chart
            </Button>
          </RenderWhen>
          <RenderWhen isTrue={!patient?.isAdmit && tab === IPD}>
            <Button className="ms-2" onClick={handleAdmitPatient} size="sm">
              Admit Patient
            </Button>
            <Alert
              className="mt-3 justify-content-center py-1 d-flex align-items-center"
              color="warning"
            >
              <i className="ri-alert-line label-icon fs-5 me-3"></i>
              Please admit patient in order to create charts!
            </Alert>
          </RenderWhen>
        </CheckPermission>
      </div>

      {/* 
      {tab === IPD ? (
        ipdComponent
      ) :  */}
      {tab === NOTES ? (
        <Notes />
      ) : tab === GENERAL ? (
        generalComponent
      ) : tab === OPD ? (
        <OPDView charts={charts} toggleModal={toggleModal} />
      ) : tab === CLINIC_TEST ? (
        clinicalTestComponent
      ) : (
        ""
      )}
      {ipdComponent}

      <ChartDate type={chartType} isOpen={dateModal} toggle={toggleModal} />
      <ChartForm type={chartType} onSubmitClinicalForm={onSubmitClinicalForm} />
    </div>
  );
};

Charting.propTypes = {
  patient: PropTypes.object,
  addmissionsCharts: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  patient: state.Patient.patient,
  addmissionsCharts: state.Chart.data,
  loading: state.Chart.chartLoading,
  generalLoading: state.Chart.generalChartLoading,
  charts: state.Chart.charts,
});

export default connect(mapStateToProps)(Charting);
