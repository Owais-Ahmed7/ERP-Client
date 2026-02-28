import { APIClient, AuthAPIClient } from "./api_helper";
import * as url from "./url_helper";
import qs from "qs";

const api = new APIClient();
const userService = new AuthAPIClient();
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

export const postUser = (data) =>
  api.create(url.POST_USER_REGISTER, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postUserProfilePicture = (data) =>
  api.create(url.POST_USER_PROFILE_PICTURE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postUserDetailInformation = (data) =>
  api.create(url.POST_USER_DETAIL_INFORMATION, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postUserSessionPricing = (data) =>
  api.create(url.POST_USER_SESSION_PRICING, data);
export const putUserSessionPricing = (id, data) =>
  api.put(`${url.PUT_USER_SESSION_PRICING}/${id}`, data);

export const getUsers = (data) => api.get(url.GET_USERS, data);

export const getDoctorUsers = (data) => api.get(url.GET_DOCTOR_USERS, data);

export const editUser = (data) =>
  api.put(url.EDIT_USER, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const markUserActiveInactive = (data) =>
  api.update(url.UPDATE_USER_ACTIVE_INACTIVE, data);

export const getCiwaTest = (data) =>
  api.get(`${url.GET_CIWA_TEST}?patientId=${data}`);
export const postCiwatest = (data) =>
  api.create(url.POST_CIWA_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postSsrstest = (data) =>
  api.create(url.POST_SSRS_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postMPQtest = (data) =>
  api.create(url.POST_MPQ_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postMMSEtest = (data) =>
  api.create(url.POST_MMSE_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postYmrsTest = (data) => {
  api.create(url.POST_YMRS_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postYBOCSTest = (data) =>
  api.create(url.POST_YBOCS_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postACDSTest = (data) =>
  api.create(url.POST_ACDS_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postHAMATest = (data) =>
  api.create(url.POST_HAMA_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postHAMDTest = (data) =>
  api.create(url.POST_HAMD_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const postPANSSTest = (data) =>
  api.create(url.POST_PANSS_TEST, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getClinicalTest = (data) =>
  api.get(`${url.FETCH_CLINICAL_TEST}?patientId=${data.patientId}`);
export const postLogin = (data) => api.create(url.POST_USER_LOGIN, data);
export const postJwtLogin = (data) => api.create(url.POST_USER_LOGIN, data);
export const postLogout = () => api.get(url.POST_USER_LOGOUT);
export const getUserLogs = (data) => api.get(url.GET_USER_LOGS, data);
export const getDashboardAnalytics = (data) =>
  api.get(`${url.GET_DASHBOARD_ANALYTICS}/${data}`);
export const postCenter = (data) =>
  api.create(url.POST_CENTER, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getCenters = ({ centerIds, search } = {}) =>
  api.get(url.GET_CENTERS, {
    params: {
      centerIds,
      search,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

export const getAllCenters = () => api.get(url.GET_ALL_CENTERS);
export const getCenterBedsAnalytics = (centerAccess) =>
  api.get(url.GET_CENTER_BEDS_ANALYTICS, { centerAccess });
export const getDoctorsScheduleNew = (userId) =>
  api.get(`${url.GET_DOCTOR_SCHEDULE_NEW}?userId=${userId}`);
export const createDoctorsScheduleNew = (data) =>
  api.create(`${url.GET_DOCTOR_SCHEDULE_NEW}`, data);

export const editCenter = (data) =>
  api.put(url.EDIT_CENTER, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteCenterLogo = (data) =>
  api.update(url.DELETE_CENTER_LOGO, data);
export const deleteCenter = (data) =>
  api.delete(`${url.DELETE_CENTER}/${data}`);
export const deleteCenterPermanently = (data) =>
  api.delete(`${url.DELETE_CENTER_PERMANENTLY}/${data}`);

// Lead Methodes
export const getLeads = () => api.get(url.GET_LEADS);
export const postLead = (data) => api.create(url.POST_LEAD, data);
export const editLead = (data) => api.put(url.EDIT_LEAD, data);
export const postMergeLead = (data) => api.update(url.POST_MERGE_LEAD, data);
export const postUnMergeLead = (data) =>
  api.update(url.POST_UNMERGE_LEAD, data);
export const postSearchLead = (query) => api.get(url.GET_SEARCH_LEADS, query);
export const deleteLead = (param) => api.delete(`${url.DELETE_LEAD}/${param}`);
export const deleteLeadPermanently = (param) =>
  api.delete(`${url.DELETE_LEAD_PERMANENTLY}/${param}`);
export const postRestoreLead = (data) =>
  api.update(url.POST_RESTORE_LEAD, data);

// Referral Methods
export const getReferrals = ({ page = 1, limit = 10 } = {}) =>
  api.get(url.GET_REFERRALS, { params: { page, limit } });
export const postReferral = (data) => api.create(url.POST_REFERRAL, data);
export const editReferral = (data) => api.put(url.EDIT_REFERRAL, data);
export const deleteReferral = (param) =>
  api.delete(`${url.DELETE_REFERRAL}/${param}`);
export const postRestoreReferral = (data) =>
  api.update(url.POST_RESTORE_REFERRAL, data);
export const getDeletedReferrals = (data) =>
  api.get(url.GET_DELETED_REFERRALS, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getPendingReferrals = ({ page = 1, limit = 10 } = {}) =>
  api.get(url.GET_PENDING_REFERRALS, { params: { page, limit } });
export const approveReferral = (data) => api.update(url.APPROVE_REFERRAL, data);
export const rejectReferral = (data) => api.update(url.REJECT_REFERRAL, data);

// Medicine Method
// export const getMedicines = () => api.get(url.GET_MEDICINES);
export const getMedicines = ({ page = 1, limit = 10, search = "" } = {}) => {
  return api.get(url.GET_MEDICINES, {
    params: { page, limit, search },
  });
};
export const postMedicine = (data) => api.create(url.POST_MEDICINE, data);
export const postCSVMedicine = (data) =>
  api.create(url.POST_CSV_MEDICINE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postRestoreCenter = (data) => api.update(url.RESTORE_CENTER, data);
export const editMedicine = (data) => api.put(url.EDIT_MEDICINE, data);
export const deleteMedicine = (data) =>
  api.delete(`${url.DELETE_MEDICINE}/${data}`);
export const deleteMedicinePermanently = (param) =>
  api.delete(`${url.DELETE_MEDICINE_PERMANENTLY}/${param}`);
export const postRestoreMedicine = (data) =>
  api.update(url.POST_RESTORE_MEDICINE, data);
export const validateDuplicateMedicine = ({ name, strength, id }) => {
  return api.get(
    `${url.VALIDATE_DUPLICATE_MEDICINE}?name=${encodeURIComponent(
      name,
    )}&strength=${encodeURIComponent(strength)}&id=${id}`,
  );
};

// Billing Setting Method
//invoice
export const getAllBillItems = ({
  centerIds,
  page = 1,
  limit = 10,
  search = "",
}) =>
  api.get(url.GET_ALL_BILL_ITEMS, {
    params: {
      centerIds,
      page,
      limit,
      search,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

export const getBillItems = ({
  centerIds,
  page = 1,
  limit = 2000,
  search = "",
}) =>
  api.get(url.GET_BILL_ITEMS, {
    params: {
      centerIds,
      page,
      limit,
      search,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const postBillItem = (data) => api.create(url.POST_BILL_ITEM, data);
// export const postRestoreBillItem = (data) => api.update(url., data);
export const editBillItem = (data) => api.put(url.EDIT_BILL_ITEM, data);

// get procedures by id
export const getProceduresByid = (proId) =>
  api.get(`${url.GET_PROCEDURES_BY_ID}/${proId}`);

export const deleteCenterInProcedure = ({ payload }) => {
  return api.delete(`${url.DETELE_CENTER_IN_PROCEDURE}`, {
    data: payload,
  });
};

export const addCentersToProcedure = (payload) =>
  api.create(url.ADD_CENTERS_IN_PROCEDURE, payload);

export const getCategoriesOfProcedures = () =>
  api.get(url.GET_CATEGORIES_OF_PROCEDURE);

export const editCenterCosts = (payload) =>
  api.update(url.EDIT_CENTER_COSTS, payload);

export const deleteBillItem = (data) =>
  api.delete(`${url.DELETE_BILL_ITEM}/${data}`);
//advance payment
export const getPaymentAccounts = (data, page, limit, search = "") =>
  api.get(url.GET_PAYMENT_ACCOUNTS, {
    params: {
      centerIds: data,
      page,
      limit,
      search,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const postPaymentAccount = (data) =>
  api.create(url.POST_PAYMENT_ACCOUNT, data);
// export const postRestoreBillItem = (data) => api.update(url., data);
export const deletePaymentAccount = (data) =>
  api.delete(`${url.DELETE_PAYMENT_ACCOUNT}/${data}`);

// Patient Method
export const getPatients = (data) =>
  api.get(url.GET_PATIENTS, {
    params: {
      centerIds: data?.centerAccess,
      type: data?.type,
      skip: data?.skip,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getAllPatients = (data) => api.get(url.GET_ALL_PATIENTS);
export const getPatientById = (data) =>
  api.get(`${url.GET_PATIENT_BY_ID}/${data}`);
export const getMorePatients = (data) =>
  api.get(url.GET_MORE_PATIENTS, {
    params: {
      centerIds: data?.centerAccess,
      type: data?.type,
      skip: data?.skip,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getPatientReferral = (data) =>
  api.get(url.GET_PATIENTS_REFERRAL, data);
export const getPatientCountedDocuments = (data) =>
  api.get(url.GET_PATIENT_COUNTED_DOCUMENTS, { id: data });
export const getPatientId = () => api.get(url.CREATE_PATIENT_ID);
export const getSearchPatients = (query) =>
  api.get(url.SEARCH_PATIENTS, {
    params: {
      centerIds: query?.centerAccess,
      name: query.name,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getSearchPatientPhoneNumber = (query) =>
  api.get(url.SEARCH_PATIENTS_PHONE_NUMBER, {
    params: {
      centerIds: query?.centerAccess,
      phoneNumber: query.phoneNumber,
      uid: query.uid,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const postPatient = (data) =>
  api.create(url.POST_PATIENT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postRestorePatient = (data) =>
  api.update(url.POST_RESTORE_PATIENT, data);

export const postLeadPatient = (data) =>
  api.create(url.POST_LEAD_PATIENT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateAdmissionAssignment = (data) =>
  api.put(url.UPDATE_ADMISSION_ASSIGNMENT, data);

export const updatePatientAdmission = (data) =>
  api.update(url.EDIT_ADMISSION, data);
export const postAdmitPatient = (data) => api.update(url.ADMIT_PATIENT, data);
export const postPatientCenterSwitch = (data) =>
  api.update(url.SWITCH_PATIENT_CENTER, data);

export const postDischargePatient = (data) =>
  api.update(url.DISCHARGE_PATIENT, data);
export const postUndischargePatient = (data) =>
  api.update(url.UNDISCHARGE_PATIENT, data);
export const editPatient = (data) =>
  api.put(url.EDIT_PATIENT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePatientAadhaarCard = (data) =>
  api.update(url.DELETE_PATIENT_AADHAAR_CARD, data);
export const removePatient = (data) =>
  api.delete(`${url.DELETE_PATIENT}/${data}`);
export const deletePatientPermanently = (data) =>
  api.delete(`${url.DELETE_PATIENT_PERMANENTLY}/${data}`);
export const assignNurseToPatient = (data) => {
  return api.update(`${url.ASSIGN_NURSE_TO_PATIENT}`, data);
};
export const unAssignNurseToPatient = (patientId) => {
  return api.update(`${url.UNASSIGN_NURSE_TO_PATIENT}?patientId=${patientId}`);
};

//Timeline
export const getPatientTimeline = (data) =>
  api.get(url.GET_PATIENT_TIMELINE, data);
export const getUserTimeline = (data) => api.get(url.GET_USER_TIMELINE, data);

// Chart Method
export const getChartsAddmissions = (data) =>
  api.get(url.GET_CHARTS_ADDMISSIONS, {
    params: {
      addmissions: [...data],
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getCharts = (data) =>
  api.get(url.GET_CHARTS, { addmission: data });
export const getLatestCharts = ({ patient, limit }) =>
  api.get(`${url.GET_LATEST_CHARTS}?patient=${patient}&limit=${limit}`);
export const getGeneralCharts = (data) => api.get(url.GET_GENERAL_CHARTS, data);
export const postPrescription = (data) =>
  api.create(url.POST_PRESCRIPTION, data);
export const editPrescription = (data) => api.put(url.EDIT_PRESCRIPTION, data);
export const postGeneralPrescription = (data) =>
  api.create(url.POST_GENERAL_PRESCRIPTION, data);
export const editGeneralPrescription = (data) =>
  api.put(url.EDIT_GENERAL_PRESCRIPTION, data);
export const postVitalSign = (data) => api.create(url.POST_VITAL_SIGN, data);
export const editVitalSign = (data) => api.put(url.EDIT_VITAL_SIGN, data);
export const postGeneralVitalSign = (data) =>
  api.create(url.POST_GENERAL_VITAL_SIGN, data);
export const editGeneralVitalSign = (data) =>
  api.put(url.EDIT_GENERAL_VITAL_SIGN, data);
export const postClinicalNote = (data) =>
  api.create(url.POST_CLINICAL_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editClinicalNote = (data) =>
  api.put(url.EDIT_CLINICAL_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postCounsellingNote = (data) =>
  api.create(url.POST_COUNSELLING_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postGeneralCounsellingNote = (data) =>
  api.create(url.POST_GENERAL_COUNSELLING_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editCounsellingNote = (data) =>
  api.put(url.EDIT_COUNSELLING_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteCounsellingNoteFile = (data) =>
  api.update(url.DELETE_COUNSELLING_NOTE_FILE, data);
export const getCounsellingNote = (data) =>
  api.get(url.GET_COUNSELLING_NOTE, data);
export const postGeneralClinicalNote = (data) =>
  api.create(url.POST_GENERAL_CLINICAL_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editGeneralClinicalNote = (data) =>
  api.put(url.EDIT_GENERAL_CLINICAL_NOTE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteClinicalNoteFile = (data) =>
  api.update(url.DELETE_CLINICAL_NOTE_FILE, data);
export const postLabReport = (data) =>
  api.create(url.POST_LAB_REPORT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editLabReport = (data) =>
  api.put(url.EDIT_LAB_REPORT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteLabReportFile = (data) =>
  api.update(url.DELETE_LAB_REPORT_FILE, data);
export const postGeneralLabReport = (data) =>
  api.create(url.POST_GENERAL_LAB_REPORT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editGeneralLabReport = (data) =>
  api.put(url.EDIT_GENERAL_LAB_REPORT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postRealtiveVisit = (data) =>
  api.create(url.POST_RELATIVE_VISIT, data);
export const editRealtiveVisit = (data) =>
  api.put(url.EDIT_RELATIVE_VISIT, data);
export const postGeneralRealtiveVisit = (data) =>
  api.create(url.POST_GENERAL_RELATIVE_VISIT, data);
export const editGeneralRealtiveVisit = (data) =>
  api.put(url.EDIT_GENERAL_RELATIVE_VISIT, data);
export const postDischargeSummary = (data) =>
  api.create(url.POST_DISCHARGE_SUMMARY, data);
export const editDischargeSummary = (data) =>
  api.put(url.EDIT_DISCHARGE_SUMMARY, data);
export const postDetailAdmission = (data) =>
  api.create(url.POST_DETAIL_ADMISSION, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editDetailAdmission = (data) =>
  api.put(url.EDIT_DETAIL_ADMISSION, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const postGeneralDetailAdmission = (data) =>
  api.create(url.POST_GENERAL_DETAIL_ADMISSION, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const editGeneralDetailAdmission = (data) =>
  api.put(url.EDIT_GENERAL_DETAIL_ADMISSION, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteDetailAdmissionFile = (data) =>
  api.update(url.DELETE_DETAIL_ADMISSION_FILE, data);

export const postMentalExamination = (data) => {
  return api.create(url.POST_MENTAL_EXAMINATION, data);
};
export const postGeneralMentalExamintion = (data) => {
  return api.create(url.POST_GENERAL_MENTAL_EXAMINATION, data);
};

export const editMentalExamination = (data) => {
  return api.put(url.EDIT_MENTAL_EXAMINATION, data);
};

export const getLastMentalExamination = (params = {}) => {
  return api.get(url.LAST_MENTAL_EXAMINATION, params);
};

export const deleteChart = (data) => api.delete(`${url.DELETE_CHART}/${data}`);
export const deleteChartPermanently = (param) =>
  api.delete(`${url.DELETE_CHART_PERMANENTLY}/${param}`);
export const postRestoreChart = (data) =>
  api.update(url.POST_RESTORE_CHART, data);
//OPD
export const getOPDPrescription = (data) =>
  api.get(url.GET_OPD_PRESCRIPTION, data);

// Bill Method
export const getBillsAddmissions = (data) =>
  api.get(url.GET_BILLS_ADDMISSIONS, {
    params: {
      addmissions: [...data],
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getBills = (data) => api.get(url.GET_BILLS, { addmission: data });
export const getDraftBills = (data) => api.get(url.GET_DRAFT_BILLS, data);
export const postInvoice = (data) => api.create(url.POST_INVOICE, data);
export const postDeposit = (data) => api.create(url.POST_DEPOSIT, data);
export const editDeposit = (data) => api.put(url.EDIT_DEPOSIT, data);
export const convertDepositToAdvance = (data) =>
  api.put(url.CONVERT_DEPOSIT_TO_ADVANCE, data);
export const postDraftInvoice = (data) =>
  api.create(url.POST_DRAFT_INVOICE, data);
export const postDraftToInvoice = (data) =>
  api.create(url.POST_DRAFT_TO_INVOICE, data);
export const editDraftInvoice = (data) => api.put(url.EDIT_DRAFT_INVOICE, data);
export const editInvoice = (data) => api.put(url.EDIT_INVOICE, data);
export const postAdvancePayment = (data) =>
  api.create(url.POST_ADVANCE_PAYMENT, data);
export const editAdvancePayment = (data) =>
  api.put(url.EDIT_ADVANCE_PAYMENT, data);
export const deleteDraftBill = (data) =>
  api.delete(`${url.DELETE_DRAFT_BILL}/${data}`);
export const deleteBill = (data) => api.delete(`${url.DELETE_BILL}/${data}`);
export const deleteBillPermanently = (param) =>
  api.delete(`${url.DELETE_BILL_PERMANENTLY}/${param}`);
export const postRestoreBill = (data) =>
  api.update(url.POST_RESTORE_BILL, data);

//recyclebin
export const getDeletedCenters = (data) =>
  api.get(url.GET_DELETED_CENTERS, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getDeletedPatients = (data) =>
  api.get(url.GET_DELETED_PATIENTS, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getDeletedCharts = (data) =>
  api.get(url.GET_DELETED_CHARTS, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getDeletedBills = (data) =>
  api.get(url.GET_DELETED_BILLS, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getDeletedLeads = (data) =>
  api.get(url.GET_DELETED_LEADS, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

export const getDeletedMedicines = (data) =>
  api.get(url.GET_DELETED_MEDICINES, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

//Booking
export const getAppointments = (data) =>
  api.get(url.GET_APPOINTMENTS, {
    params: {
      centerIds: data?.centerAccess,
      start: data?.start,
      end: data?.end,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

export const getPatientAppointments = (data) =>
  api.get(url.GET_PATIENT_APPOINTMENTS, data);
export const getPatientAppointmentData = (data) =>
  api.get(url.GET_PATIENT_APPOINTMENT_DATA, data);
export const getPatientPreviousDoctor = (data) =>
  api.get(url.GET_PATIENT_PREVIOUS_DOCTOR, data);
export const postAppointment = (data) => api.create(url.POST_APPOINTMENT, data);
export const editAppointment = (data) => api.put(url.EDIT_APPOINTMENT, data);
export const postCancelAppointment = (data) =>
  api.update(url.CANCEL_APPOINTMENT, data);
export const deleteAppointment = (data) =>
  api.delete(`${url.DELETE_APPOINTMENT}/${data}`);
export const deleteAppointmentPermanently = (param) =>
  api.delete(`${url.DELETE_APPOINTMENT_PERMANENTLY}/${param}`);
export const postRestoreAppointment = (data) =>
  api.update(url.RESTORE_APPOINTMENT, data);
//Setting
//Doctor schedule
export const getAllDoctorSchedule = (data) =>
  api.get(url.GET_ALL_DOCTOR_SCHEDULE, data);
export const getDoctorSchedule = (data) =>
  api.get(url.GET_DOCTOR_AVAILABLE_SLOTS, data);
export const postDoctorSchedule = (data) =>
  api.create(url.POST_DOCTOR_SCHEDULE, data);
export const postDoctorScheduleNew = (data) =>
  api.create(url.GET_DOCTOR_SCHEDULE_NEW, data);
export const editDoctorSchedule = (data) =>
  api.put(url.EDIT_DOCTOR_SCHEDULE, data);

//Calender
export const postCalenderDuration = (data) =>
  api.create(url.POST_CALENDER_DURATION, data);
export const getCalenderDuration = (data) =>
  api.get(url.GET_CALENDER_DURATION, data);
export const editCalenderDuration = (data) =>
  api.put(url.EDIT_CALENDER_DURATION, data);

//Therapy
export const getTherapies = (data) => api.get(url.GET_THERAPIES, data);
export const postTherapy = (data) => api.create(url.POST_THERAPY, data);
export const editTherapy = (data) => api.put(url.EDIT_THERAPY, data);
export const deleteTherapy = (data) =>
  api.delete(`${url.DELETE_THERAPY}/${data}`);

//Condition
export const getConditions = (data) => api.get(url.GET_CONDITIONS, data);
export const postCondition = (data) => api.create(url.POST_CONDITION, data);
export const editCondition = (data) => api.put(url.EDIT_CONDITION, data);
export const deleteCondition = (data) =>
  api.delete(`${url.DELETE_CONDITION}/${data}`);

//Symptom
export const getSymptoms = (data) => api.get(url.GET_SYMPTOMS, data);
export const postSymptom = (data) => api.create(url.POST_SYMPTOM, data);
export const editSymptom = (data) => api.put(url.EDIT_SYMPTOM, data);
export const deleteSymptom = (data) =>
  api.delete(`${url.DELETE_SYMPTOM}/${data}`);

//Report
export const getReport = (data) =>
  api.get(url.GET_REPORT, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getDBLogs = (data) =>
  api.get(url.GET_DB_LOGS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getFinanceAnalytics = (data) =>
  api.get(url.GET_FINANCE_ANALYTICS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const exportFinanceAnalyticsCSV = (data) =>
  api.get(url.GET_FINANCE_ANALYTICS_CSV, {
    params: data,
    responseType: "blob",
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getPatientAnalytics = (data) =>
  api.get(url.GET_PATIENT_ANALYTICS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getLeadAnalytics = (data) =>
  api.get(url.GET_LEAD_ANALYTICS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getOPDAnalytics = (data) =>
  api.get(url.GET_OPD_ANALYTICS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getBookingAnalytics = (data) =>
  api.get(url.GET_BOOKING_ANALYTICS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const getAdmissionForms = (data) =>
  api.get(url.GET_ADMISSION_FORMS, {
    params: data,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
export const exportAdmissionFormsCSV = (data) =>
  api.get(url.GET_ADMISSION_FORMS_CSV, {
    params: data,
    responseType: "blob",
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

export const getDoctorAnalytics = (params = {}) => {
  return api.create(url.GET_DOCTOR_ANALYTICS, params, {
    headers: { "Content-Type": "application/json" },
  });
};
export const getDoctorAnalyticsWP = (params = {}) => {
  return api.create(url.GET_DOCTOR_ANALYTICS_WP, params, {
    headers: { "Content-Type": "application/json" },
  });
};

//Notification
export const getBillNotification = (data) =>
  api.get(url.GET_BILL_NOTIFICATION, {
    params: {
      centerIds: data,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

//Intern
export const addInternForm = (data) =>
  api.create(url.POST_INTERN_FORM, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const fetchAllInterns = (params = {}) => {
  return api.get(url.GET_INTERN_DATA, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat", skipNulls: true }),
  });
};

export const getInternId = () => api.get(url.GET_INTERN_ID);

export const getInternById = (id) => api.get(url.GET_INTERN_BY_ID(id));

export const addInternReceipt = (data) =>
  api.create(url.ADD_INTERN_RECEIPT, data, {
    headers: { "Content-Type": "application/json" },
  });

export const getInternReceipt = (internId) => {
  return api.get(url.GET_INTERN_RECEIPT(internId));
};

export const updateInternForm = (id, data) => {
  return api.put(url.UPDATE_INTERN_FORM(id), data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeIntern = (id) => api.delete(`${url.DELETE_INTERN}/${id}`);
export const permenentremoveIntern = (id) =>
  api.delete(`${url.DELETE_INTERN}permenent-delete/${id}`);
export const removeInternBill = (id) =>
  api.delete(`${url.DELETE_INTERN_BILL}/${id}`);

export const updateInternReceipt = (data) => {
  return api.put(url.UPDATE_INTERN_RECEIPT, data);
};

export const add_offer_helper = (data) =>
  api.create(url.ADD_OFFER, data, {
    headers: { "Content-Type": "application/json" },
  });

export const getOfferList = ({ page = 1, limit = 10, search = "" } = {}) => {
  return api.get(url.GET_OFFER_LIST, { page, limit, search });
};

export const updateOffer = (data) => {
  return api.put(url.UPDATE_OFFER, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const add_tax_helper = (data) =>
  api.create(url.ADD_TAX, data, {
    headers: { "Content-Type": "application/json" },
  });

export const getTaxList = ({ page = 1, limit = 10, search = "" } = {}) => {
  return api.get(url.GET_TAX_LIST, { page, limit, search });
};

export const updateTax = (data) => {
  return api.put(url.UPDATE_TAX, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getHubspotContacts = ({
  page = 1,
  limit = 10,
  search = "",
  visitDate,
  status,
  centers,
} = {}) => {
  return api.get(url.GET_HUBSPOT_CONTACTS, {
    params: { page, limit, search, visitDate, status, centers },
  });
};

export const getNurseAssignedPatients = (params = {}) => {
  return api.create(url.GET_NURSE_ASSIGNED_PATIENTS, params, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getPatientOverview = (patientId) => {
  return api.get(`${url.GET_PATIENT_OVERVIEW_BY_NURSE}?patientId=${patientId}`);
};
export const getPatientDetails = (patientId) => {
  return api.get(`${url.GET_PATIENT_DETAILS_BY_NURSE}?patientId=${patientId}`);
};

export const getPatientPrescription = (patientId) => {
  return api.get(
    `${url.GET_PATIENT_PRESCRIPTION_BY_NURSE}?patientId=${patientId}`,
  );
};

export const getClinicalTestSummary = (patientId) => {
  return api.get(
    `${url.GET_CLININCAL_TEST_SUMMARY_BY_NURSE}?patientId=${patientId}`,
  );
};

export const getNursesListByPatientCenter = ({ patientId, search } = {}) => {
  return api.get(
    `${url.GET_NURSES_BY_PATIENT_CENTER}?patientId=${patientId}&search=${search}`,
  );
};

export const getAlertsByPatient = (patientId) => {
  return api.get(`${url.GET_ALERTS_BY_PATIENT}?patientId=${patientId}`);
};

export const markAlertAsRead = ({ alertType, patientId }) => {
  return api.update(
    `${url.MARK_ALERT_AS_READ}?alertType=${alertType}&patientId=${patientId}`,
  );
};

export const getNotesByPatient = (patientId) => {
  return api.get(`${url.NOTES}?patientId=${patientId}`);
};

export const createNote = (data) => {
  return api.create(url.NOTES, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getRoundNotesList = (params = {}) => {
  return api.get(url.ROUND_NOTES, {
    params,
    paramsSerializer: (parameters) =>
      qs.stringify(parameters, {
        arrayFormat: "repeat",
        skipNulls: true,
      }),
  });
};

export const postRoundNote = (data) => {
  return api.create(url.ROUND_NOTES, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const putRoundNote = (id, data) => {
  return api.put(`${url.ROUND_NOTES}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteRoundNote = (id) => {
  return api.delete(`${url.ROUND_NOTES}/${id}`);
};

export const getRoundNoteStaff = ({
  search = "",
  centerAccess = "[]",
} = {}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("centerAccess", centerAccess);
  return api.get(`${url.ROUND_NOTES_STAFF}?${params.toString()}`);
};

export const getPendingActiveMedicines = (patientId) => {
  return api.get(`${url.GET_PENDING_ACTIVE_MEDICINES}?patientId=${patientId}`);
};

export const getCompletedActiveMedicines = ({ patientId, status }) => {
  return api.get(
    `${url.GET_ACTIVITIES_BY_STATUS}?patientId=${patientId}&status=${status}`,
  );
};

export const getActivitiesByStatus = ({ patientId, status }) => {
  return api.get(
    `${url.GET_ACTIVITIES_BY_STATUS}?patientId=${patientId}&status=${status}`,
  );
};

export const markTomorrowMedicines = (data) => {
  return api.create(url.MARK_MEDICINE_AS_GIVEN, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getNextDayMedicineBoxFillingMedicines = (patientId) => {
  return api.get(
    `${url.GET_NEXT_DAY_MEDICINEBOXFILLING_MEDICINES}?patientId=${patientId}`,
  );
};

// emergency
export const assignPatientType = ({ patientId, patientType }) => {
  return api.update(
    `${url.ASSIGN_TYPE_TO_PATIENT}?patientId=${patientId}&patientType=${patientType}`,
  );
};

export const getAllEmergencyPatients = (params = {}) => {
  return api.create(url.GET_EMERGENCY_PATIENTS, params, {
    headers: { "Content-Type": "application/json" },
  });
};

// cash management
export const postBankDeposit = (data) => {
  return api.create(url.ADD_BANK_DEPOSIT, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getLatestBankDesposits = (params = {}) => {
  return api.create(url.GET_LATEST_BANK_DEPOSITS, params, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
  });
};

export const getLatestSpendings = (params = {}) => {
  return api.create(url.GET_LATEST_SPENDING, params, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
  });
};

export const postSpending = (data) => {
  return api.create(url.ADD_SPENDING, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getBaseBalanceByCenter = (centerId) => {
  return api.get(`${url.GET_BASE_BALANCE_BY_CENTER}/${centerId}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const postBaseBalance = (data) => {
  return api.create(url.ADD_BASE_BALANCE, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postInflow = (data) => {
  return api.create(url.ADD_INFLOW, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getLatestInflows = (params = {}) => {
  return api.get(url.GET_LASTEST_INFLOWS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getDetailedCashReport = (params = {}) => {
  return api.create(url.GET_DETAILED_CASH_REPORT, params, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
    responseType: params.exportExcel ? "blob" : "json",
  });
};

export const getSummaryCashReport = (params = {}) => {
  return api.create(url.GET_SUMMARY_CASH_REPORT, params, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
  });
};

// central payment
export const getCentralPayments = (params = {}) => {
  return api.get(url.CENTRAL_PAYMENT, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const getSummaryCentralReport = (params = {}) => {
  return api.get(url.GET_SUMMARY_CENTRAL_PAYMENT_REPORT, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const getDetailedCentralReport = (params = {}) => {
  return api.get(url.GET_DETAILED_CENTRAL_PAYMENT_REPORT, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const exportDetailedCentralReportXLSX = (params = {}) => {
  return api.get(url.EXPORT_DETAILED_CENTRAL_PAYMENT_REPORT, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    responseType: "blob",
  });
};

export const postCentralPayment = (data) => {
  return api.create(url.CENTRAL_PAYMENT, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editCentralPayment = (id, data) => {
  return api.update(`${url.CENTRAL_PAYMENT}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const centralPaymentAction = (data) => {
  return api.update(url.CENTRAL_PAYMENT_ACTION, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "application/json",
    },
  });
};

export const getCentralPaymentById = (paymentId) => {
  return api.get(`${url.CENTRAL_PAYMENT}/${paymentId}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getAllENets = (params = {}) => {
  return api.get(`${url.GET_ALL_ENETS}`, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const updateCentralPaymentProcessStatus = (params = {}) => {
  return api.update(url.PROCESS_PAYMENTS, params, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const regenerateENets = (params = {}) => {
  return api.update(url.REGENERATE_ENETS, params, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const uploadTransactionProof = (id, data) => {
  return api.update(`${url.UPLOAD_TRANSACTION_PROOF}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

//  User Microservices
export const PostLoginService = (data) =>
  userService.post(url.MICRO_SIGN_IN, data);
export const GetCsrf = () => userService.get(url.CSRF);
// Roles
export const getAllRoles = ({ page = 1, limit = 10, token }) => {
  return userService.get(url.ROLES, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postLogoutService = (token) => {
  return userService.post(
    url.MICRO_LOGOUT,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getAllRoleslist = ({ token, search = "" }) => {
  return userService.get(`${url.ROLES}/role-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
    },
  });
};

export const editRole = ({ id, name, permissions, token }) => {
  return userService.put(
    `${url.ROLES}/${id}`,
    {
      name,
      permissions,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-No-Cookie-Token": "true",
      },
    },
  );
};

export const addRole = ({ name, permissions, token }) => {
  return userService.post(
    url.ROLES,
    {
      name,
      permissions,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-No-Cookie-Token": "true",
      },
    },
  );
};

export const deleteRole = ({ id, token }) => {
  return userService.delete(`${url.ROLES}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Users
export const getAllUsers = ({
  page = 1,
  limit = 10,
  search = "",
  role = "",
  token,
  centerAccess,
  sortBy,
}) => {
  return userService.get(url.USER, {
    params: { page, limit, search, role, centerAccess, sortBy },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const firstchange = ({ oldPassword, newPassword, token }) => {
  return userService.post(
    url.MICRO_FORGOTT,
    {
      oldPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-No-Cookie-Token": "true",
      },
    },
  );
};

export const addUser = (data, token) => {
  return userService.post(url.MICRO_SIGN_UP, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editUserDetails = (data, id, token) => {
  return userService.put(`${url.USER}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUser = (id, token) => {
  return userService.put(
    `${url.MOVE_TO_BIN}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const suspendUser = (id, token) => {
  return userService.patch(
    `${url.ACTIVATE_DEACTIVATE_USER}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const editUserPassword = (id, newPassword, token) => {
  return userService.post(
    `${url.CHANGE_USER_PASSWORD}/${id}`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getUserActivityById = ({ id, page = 1, limit = 12, token }) => {
  return userService.get(
    `${url.USER_ACTIVITY}/?userid=${id}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const editSelf = (data, token) => {
  return userService.put(url.EDIT_SELF, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRoles = (token) => {
  return userService.get(url.GET_USER_ROLES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByEmail = (token, email) => {
  return userService.get(`${url.GET_USER_BY_EMAIL}?email=${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// INCIDENT
export const getIncidents = (data) => api.get(url.GET_INCIDENTS, data);
export const getIncidentById = (id) =>
  api.get(`${url.GET_INCIDENT_BY_ID}/${id}`);
export const postIncident = (data) =>
  api.create(url.POST_INCIDENT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateIncident = (id, data) =>
  api.update(`${url.UPDATE_INCIDENT}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteIncident = (id) =>
  api.delete(`${url.DELETE_INCIDENT}/${id}`);
export const investigateIncident = (id, data) =>
  api.create(`${url.INVESTIGATE_INCIDENT}/${id}/investigate`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const approveIncident = (id, data) =>
  api.create(`${url.APPROVE_INCIDENT}/${id}/approve`, data);
export const closeIncident = (id, data) =>
  api.create(`${url.CLOSE_INCIDENT}/${id}/close`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateIncidentStatus = (id, data) =>
  api.update(`${url.UPDATE_INCIDENT_STATUS}/${id}/status`, data, {
    headers: { "Content-Type": "application/json" },
  });

export const downloadFailedMedicines = ({ batchId, centers } = {}) => {
  return api.get(`${url.DOWNLOAD_FAILED_MEDICINES}`, {
    params: {
      batchId,
      centers,
    },
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
    responseType: "blob",
  });
};

export const getFailedMedicinesBatches = (params = {}) => {
  return api.get(url.GET_FAILED_MEDICINES_BATCHES, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const deleteFailedMedicinesByBatch = (params = {}) => {
  return api.delete(url.DELETE_FAILED_MEDICINES, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getMedineApprovalsByStatus = (params = {}) => {
  return api.get(url.MEDICINE_APPROVALS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const updateMedicineApprovalStatus = (data) => {
  if (data.id) {
    return api.update(`${url.MEDICINE_APPROVALS}/${data.id}`, data, {
      headers: {
        "X-No-Cookie-Token": "true",
      },
    });
  }
};

export const getPendingPatientApprovals = (params = {}) => {
  return api.get(url.GET_PENDING_PATIENT_APPROVALS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getDetailedPrescription = (prescriptionId) => {
  return api.get(`${url.GET_DETAILED_PRESCRIPTION}/${prescriptionId}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const downloadAuditTemplate = (params) => {
  return api.get(`${url.DOWNLOAD_AUDIT_TEMPLATE}`, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
    responseType: "blob",
  });
};

export const getAuditsByStatus = (params) => {
  return api.get(url.AUDITS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const uploadAuditChunk = (data) => {
  return api.create(url.UPLOAD_AUDIT_REPORT, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const updateAuditStatus = (params = {}) => {
  return api.update(url.UPDATE_AUDIT_STATUS, params, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getAuditDetails = (params) => {
  return api.get(url.GET_AUDIT_REPORT, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const deleteAuditById = (id) => {
  return api.delete(`${url.AUDITS}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const downloadAuditFailedMedicines = (id) => {
  return api.get(`${url.DOWNLOAD_AUDIT_FAILED_MEDICINES}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
    responseType: "blob",
  });
};

// MI REPORTING
export const getMIHubSpotContacts = (params = {}) => {
  return api.get(url.GET_MI_HUBSPOT_CONTACTS, {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getCenterLeadsMoM = (params = {}) => {
  return api.get(url.GET_CENTER_LEADS_MOM, {
    params,
  });
};

export const getCenterLeadsMTD = (params = {}) => {
  return api.get(url.GET_CENTER_LEADS_MTD, {
    params,
  });
};

export const getOwnerLeadsMoM = (params = {}) => {
  return api.get(url.GET_OWNER_LEADS_MOM, {
    params,
  });
};

export const getOwnerLeadsMTD = (params = {}) => {
  return api.get(url.GET_OWNER_LEADS_MTD, {
    params,
  });
};

export const getCityQualityBreakdown = (params = {}) => {
  return api.get(url.GET_CITY_QUALITY_BREAKDOWN, {
    params,
  });
};

export const getOwnerQualityBreakdown = (params = {}) => {
  return api.get(url.GET_OWNER_QUALITY_BREAKDOWN, {
    params,
  });
};

export const getCityVisitDate = (params = {}) => {
  return api.get(url.GET_CITY_VISIT_DATE, {
    params,
  });
};

export const getOwnerVisitDate = (params = {}) => {
  return api.get(url.GET_OWNER_VISIT_DATE, {
    params,
  });
};

export const getCityVisitedDate = (params = {}) => {
  return api.get(url.GET_CITY_VISITED_DATE, {
    params,
  });
};

export const getOwnerVisitedDate = (params = {}) => {
  return api.get(url.GET_OWNER_VISITED_DATE, {
    params,
  });
};

export const getCityLeadStatus = (params) => {
  return api.get(url.GET_CITY_LEAD_STATUS, { params });
};

export const getOwnerLeadStatus = (params) => {
  return api.get(url.GET_OWNER_LEAD_STATUS, { params });
};

// HR
export const getEmployeeId = () => {
  return api.get(url.GET_EMPLOYEE_ID, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const postEmployee = (data) => {
  return api.create(url.EMPLOYEE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editEmployee = (id, data) => {
  return api.update(`${url.EMPLOYEE}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getEmployees = (params = {}) => {
  return api.get(url.EMPLOYEE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const deleteEmployee = (id) => {
  return api.delete(`${url.EMPLOYEE}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const updateNewJoiningStatus = (id, data) => {
  return api.update(`${url.NEW_JOINING_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getExitEmployees = (params = {}) => {
  return api.get(url.EXIT_EMPLOYEE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const postExitEmployee = (data) => {
  return api.create(url.EXIT_EMPLOYEE, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editExitEmployee = (id, data) => {
  return api.update(`${url.EXIT_EMPLOYEE}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const deleteExitEmployee = (id) => {
  return api.delete(`${url.EXIT_EMPLOYEE}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const exitEmployeeExitAction = (id, data) => {
  return api.update(`${url.EXIT_EMPLOYEE_EXIT_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const exitEmployeeFNFAction = (id, data) => {
  return api.update(`${url.EXIT_EMPLOYEE_FNF_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const searchExitEmployee = (params = {}) => {
  return api.get(url.SEARCH_EXIT_EMPLOYEE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getITApprovals = (params = {}) => {
  return api.get(url.IT, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const updateNewJoiningITStatus = (id, data) => {
  return api.update(`${url.IT_NEW_JOINING_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const updateExitITStatus = (id, data) => {
  return api.update(`${url.IT_EXIT_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const updatetransferITStatus = (id, data) => {
  return api.update(`${url.IT_TRANSFER_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getEmployeeEmails = (id) => {
  return api.get(`${url.EMPLOYEE_EMAILS}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getAdvanceSalaries = (params = {}) => {
  return api.get(url.SALARY_ADVANCE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const deleteAdvanceSalary = (id) => {
  return api.delete(`${url.SALARY_ADVANCE}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const postAdvanceSalary = (data) => {
  return api.create(url.SALARY_ADVANCE, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editAdvanceSalary = (id, data) => {
  return api.update(`${url.SALARY_ADVANCE}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const advanceSalaryAction = (id, data) => {
  return api.update(`${url.SALARY_ADVANCE_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getEmployeeTransfers = (params = {}) => {
  return api.get(url.TRANSFER_EMPLOYEE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const postEmployeeTransfer = (data) => {
  return api.create(url.TRANSFER_EMPLOYEE, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editEmployeeTransfer = (id, data) => {
  return api.update(`${url.TRANSFER_EMPLOYEE}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const deleteEmployeeTransfer = (id) => {
  return api.delete(`${url.TRANSFER_EMPLOYEE}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const employeeTransferCurrentLocationAction = (id, data) => {
  return api.update(
    `${url.TRANSFER_EMPLOYEE_CURRENT_LOCATION_ACTION}/${id}`,
    data,
    {
      headers: {
        "X-No-Cookie-Token": "true",
      },
    },
  );
};

export const employeeTransferTransferLocationAction = (id, data) => {
  return api.update(
    `${url.TRANSFER_EMPLOYEE_TRANSFER_LOCATION_ACTION}/${id}`,
    data,
    {
      headers: {
        "X-No-Cookie-Token": "true",
      },
    },
  );
};

export const postDesignation = (data) => {
  return api.create(url.DESIGNATION, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getDesignations = (params = {}) => {
  return api.get(url.DESIGNATION, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const postHiring = (data) => {
  return api.create(url.HIRING, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editHiring = (id, data) => {
  return api.update(`${url.HIRING}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const deleteHiring = (id) => {
  return api.delete(`${url.HIRING}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const hiringAction = (id, data) => {
  return api.update(`${url.HIRING_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getHirings = (params = {}) => {
  return api.get(url.HIRING, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const postTPM = (data) => {
  return api.create(url.TPM, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editTPM = (id, data) => {
  return api.update(`${url.TPM}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const TPMAction = (id, data) => {
  return api.update(`${url.TPM_ACTION}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getTPMs = (params = {}) => {
  return api.get(url.TPM, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const deleteTPM = (id) => {
  return api.delete(`${url.TPM}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

// HRMS
export const getAttendance = (params = {}) => {
  return api.get(url.ATTENDANCE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getAttendanceImportHistory = (params = {}) => {
  return api.get(url.ATTENDANCE_IMPORTS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const getAttendanceImportById = (id) => {
  return api.get(`${url.ATTENDANCE_IMPORTS}/${id}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const uploadAttendance = (data) => {
  return api.create(url.UPLOAD_ATTENDANCE, data, {
    headers: {
      "X-No-Cookie-Token": "true",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAttendanceImport = (params = {}) => {
  return api.delete(url.ATTENDANCE, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const downloadAttendanceTemplate = () => {
  return api.get(url.ATTENDANCE_TEMPLATE, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
    responseType: "blob",
  });
};

export const getAttendanceMetrics = (params = {}) => {
  return api.get(url.ATTENDANCE_METRICS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};

export const exportAttendanceMetrics = (params = {}) => {
  return api.get(url.EXPORT_ATTENDANCE_METRICS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
    responseType: "blob",
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
};
// HRMS/LEAVES
export const postLeaveRequest = (data) => {
  return api.create(url.APPLY_LEAVE, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getMyManager = () => {
  return api.get(url.GET_MY_MANAGER, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getLeavesRequest = (managerId) => {
  return api.get(`${url.GET_LEAVES_REQUESTS}/${managerId}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const actionOnLeaves = (id, data) => {
  return api.update(`${url.ACTION_ON_LEAVE}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getMyLeavesHistory = () => {
  return api.get(url.GET_MY_LEAVES, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};
export const getBalance = () => {
  return api.get(url.GET_BALANCE_LEAVES, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const retrieveActionOnLeave = (action, docId, data) => {
  return api.update(`${url.RETRIEVE_ACTION}/${action}/${docId}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const gettodayMyAttendanceStatus = (params = {}) => {
  return api.get(url.TODAY_MY_ATTENDANCE_STATUS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getAttendanceSummary = (params = {}) => {
  return api.get(url.ATTENDANCE_SUMMARY, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getAttendanceLogs = (params = {}) => {
  return api.get(url.ATTENDANCE_LOGS, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const postEmployeeCheckIn = (data) => {
  return api.create(url.EMPLOYEE_CHECK_IN, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const updateEmployeeCheckOut = (data) => {
  return api.update(url.EMPLOYEE_CHECK_OUT, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

// HRMS- Employee Reporting
export const postEmployeeReporting = (data) => {
  return api.create(url.EMPLOYEE_REPORTING, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

// Policies
export const addPolicies = (data) => {
  return api.create(`${url.ADD_POLICIES}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getPolicies = () => {
  return api.get(`${url.GET_POLICIES}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const editEmployeeReporting = (id, data) => {
  return api.update(`${url.EMPLOYEE_REPORTING}/${id}`, data, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const adminGetAllLeavesInfo = () => {
  return api.get(`${url.ADMIN_GET_ALL_LEAVES}`, {
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

export const getEmployeeReportings = (params = {}) => {
  return api.get(url.EMPLOYEE_REPORTING, {
    params,
    headers: {
      "X-No-Cookie-Token": "true",
    },
  });
};

// TALLY
export const sendToTally = (data) => api.create(url.POST_TALLY_SEND, data);
export const getTallyLogs = (params) => api.get(url.GET_TALLY_LOGS, { params });
