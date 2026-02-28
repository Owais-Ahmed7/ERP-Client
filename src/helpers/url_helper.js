//4010/api/v1/
//REGISTER
export const POST_USER_REGISTER = "/auth/user";
export const POST_USER_PROFILE_PICTURE = "/auth/user/profile-picture";
export const POST_USER_DETAIL_INFORMATION = "/auth/user/detail-information";
export const GET_USERS = "/auth/user";
export const GET_DOCTOR_USERS = "/auth/user/center-doctor";
export const GET_DELETED_USERS = "/auth/user/deleted";
export const SUSPEND_USER = "/auth/user/suspend";
export const DELETE_USER = "/auth/user";
export const EDIT_USER = "/auth/user";
export const EDIT_USER_PASSWORD = "/auth/user";
export const POST_USER_SESSION_PRICING = "/auth/user/session-pricing";
export const PUT_USER_SESSION_PRICING = "/auth/user/session-pricing";
export const UPDATE_USER_ACTIVE_INACTIVE = "/auth/user/mark-active-inactive";
//LOGIN
export const POST_USER_LOGIN = "/auth/login";
export const SEARCH_USER = "/auth/search";

//LOGOUT
export const POST_USER_LOGOUT = "/auth/logout";

//DASHBOARD
export const GET_DASHBOARD_ANALYTICS = "/dashboard";

//LOG
export const GET_USER_LOGS = "/log/user";

//CENTER
export const POST_CENTER = "/center";
export const GET_CENTERS = "/center";
export const GET_DELETED_CENTERS = "/center/deleted";
export const GET_ALL_CENTERS = "/center/all";
export const GET_CENTER_BEDS_ANALYTICS = "/center/beds";
export const EDIT_CENTER = "/center";
export const DELETE_CENTER_LOGO = "/center";
export const RESTORE_CENTER = "/center/restore";
export const DELETE_CENTER = "/center";
export const DELETE_CENTER_PERMANENTLY = "/center/delete-permanently";

//BOOKING
export const GET_APPOINTMENTS = "/booking";
export const GET_PATIENT_APPOINTMENTS = "/booking/patient/appointment";
export const GET_PATIENT_APPOINTMENT_DATA = "/booking/patient/appointment/data";
export const GET_PATIENT_PREVIOUS_DOCTOR =
  "/booking/patient/appointment/doctor";
export const POST_APPOINTMENT = "/booking";
export const EDIT_APPOINTMENT = "/booking";
export const DELETE_APPOINTMENT = "/booking";
export const RESTORE_APPOINTMENT = "/booking/restore";
export const DELETE_APPOINTMENT_PERMANENTLY = "/booking/delete-permanently";
export const CANCEL_APPOINTMENT = "/booking";

//LEAD
export const POST_LEAD = "/lead";
export const GET_DELETED_LEADS = "/lead/deleted";
export const POST_RESTORE_LEAD = "/lead/restore";
export const EDIT_LEAD = "/lead";
export const GET_LEADS = "/lead";
export const GET_SEARCH_LEADS = "/lead/search";
export const POST_MERGE_LEAD = "/lead/merge";
export const POST_UNMERGE_LEAD = "/lead/unmerge";
export const DELETE_LEAD = "/lead";
export const DELETE_LEAD_PERMANENTLY = "/lead/delete-permanently";

//REFERRAL
export const POST_REFERRAL = "/referral";
export const GET_REFERRALS = "/referral";
export const GET_DELETED_REFERRALS = "/referral/deleted";
export const EDIT_REFERRAL = "/referral";
export const DELETE_REFERRAL = "/referral";
export const POST_RESTORE_REFERRAL = "/referral/restore";
export const GET_PENDING_REFERRALS = "/referral/pending";
export const APPROVE_REFERRAL = "/referral/approve";
export const REJECT_REFERRAL = "/referral/reject";

//PATIENT
export const GET_PATIENTS = "/patient";
export const GET_PATIENT_BY_ID = "/patient/patient-id";
export const GET_ALL_PATIENTS = "/patient/all";
export const GET_MORE_PATIENTS = "/patient/more";
export const GET_PATIENTS_REFERRAL = "/patient/patient-referral";
export const GET_PATIENT_COUNTED_DOCUMENTS = "/patient/count-documents";
export const GET_DELETED_PATIENTS = "/patient/deleted";
export const POST_PATIENT = "/patient";
export const CREATE_PATIENT_ID = "/patient/create-id";
export const POST_LEAD_PATIENT = "/patient/lead";
export const SEARCH_PATIENTS = "/patient/search";
export const SEARCH_PATIENTS_PHONE_NUMBER = "/patient/search/phone-number";
export const ADMIT_PATIENT = "/patient/admit";
export const EDIT_ADMISSION = "/patient/admit/update";
export const DISCHARGE_PATIENT = "/patient/discharge";
export const UNDISCHARGE_PATIENT = "/patient/un-discharge";
export const SWITCH_PATIENT_CENTER = "/patient/center";
export const EDIT_PATIENT = "/patient";
export const DELETE_PATIENT_AADHAAR_CARD = "/patient";
export const POST_RESTORE_PATIENT = "/patient/restore";
export const DELETE_PATIENT = "/patient";
export const DELETE_PATIENT_PERMANENTLY = "/patient/delete-permanently";
export const UPDATE_ADMISSION_ASSIGNMENT =
  "/patient/update-admission-assignment";
export const ASSIGN_NURSE_TO_PATIENT = "/patient/assign-nurse";
export const UNASSIGN_NURSE_TO_PATIENT = "/patient/unassign-nurse";

export const GET_ICD_CODES = "/patient/get/icd";

//TIMELINE
export const GET_PATIENT_TIMELINE = "/timeline/patient";
export const GET_USER_TIMELINE = "/timeline/user";
export const GET_INTERN_TIMELINE = "timeline/intern";

//CHART
export const GET_CHARTS_ADDMISSIONS = "/chart/addmission";
export const GET_CHARTS = "/chart";
export const GET_LATEST_CHARTS = "/chart/latest";
export const GET_GENERAL_CHARTS = "/chart/general";
export const GET_DELETED_CHARTS = "/chart/deleted";
export const POST_PRESCRIPTION = "/chart/prescription";
export const EDIT_PRESCRIPTION = "/chart/prescription";
export const POST_GENERAL_PRESCRIPTION = "/chart/prescription/general";
export const EDIT_GENERAL_PRESCRIPTION = "/chart/prescription/general";
export const POST_VITAL_SIGN = "/chart/vital-sign";
export const EDIT_VITAL_SIGN = "/chart/vital-sign";
export const POST_GENERAL_VITAL_SIGN = "/chart/vital-sign/general";
export const EDIT_GENERAL_VITAL_SIGN = "/chart/vital-sign/general";
export const POST_LAB_REPORT = "/chart/lab-report";
export const EDIT_LAB_REPORT = "/chart/lab-report";
export const POST_GENERAL_LAB_REPORT = "/chart/lab-report/general";
export const EDIT_GENERAL_LAB_REPORT = "/chart/lab-report/general";
export const DELETE_LAB_REPORT_FILE = "/chart/lab-report";
export const POST_CLINICAL_NOTE = "/chart/clinical-note";
export const EDIT_CLINICAL_NOTE = "/chart/clinical-note";
export const POST_COUNSELLING_NOTE = "/chart/counselling-note";
export const POST_GENERAL_COUNSELLING_NOTE = "/chart/counselling-note/general";
export const EDIT_COUNSELLING_NOTE = "/chart/counselling-note";
export const GET_COUNSELLING_NOTE = "/chart/counselling-note";
export const DELETE_COUNSELLING_NOTE_FILE = "/chart/counselling-note";
export const POST_GENERAL_CLINICAL_NOTE = "/chart/clinical-note/general";
export const EDIT_GENERAL_CLINICAL_NOTE = "/chart/clinical-note/general";
export const DELETE_CLINICAL_NOTE_FILE = "/chart/clinical-note";
export const POST_RELATIVE_VISIT = "/chart/relative-visit";
export const EDIT_RELATIVE_VISIT = "/chart/relative-visit";
export const POST_GENERAL_RELATIVE_VISIT = "/chart/relative-visit/general";
export const EDIT_GENERAL_RELATIVE_VISIT = "/chart/relative-visit/general";
export const POST_DISCHARGE_SUMMARY = "/chart/discharge-summary";
export const EDIT_DISCHARGE_SUMMARY = "/chart/discharge-summary";
export const POST_DETAIL_ADMISSION = "/chart/detail-admission";
export const EDIT_DETAIL_ADMISSION = "/chart/detail-admission";
export const POST_GENERAL_DETAIL_ADMISSION = "/chart/detail-admission/general";
export const EDIT_GENERAL_DETAIL_ADMISSION = "/chart/detail-admission/general";
export const DELETE_DETAIL_ADMISSION_FILE = "/chart/detail-admission";
export const POST_MENTAL_EXAMINATION = "/chart/mental-examination";
export const POST_GENERAL_MENTAL_EXAMINATION =
  "/chart/mental-examination/general";
export const EDIT_MENTAL_EXAMINATION = "/chart/mental-examination";
export const LAST_MENTAL_EXAMINATION = "/chart/mental-examination";
export const DELETE_CHART = "/chart";
export const POST_RESTORE_CHART = "/chart/restore";
export const DELETE_CHART_PERMANENTLY = "/chart/delete-permanently";
//OPD
export const GET_OPD_PRESCRIPTION = "/chart/opd/prescription";

//BILL
export const GET_BILLS_ADDMISSIONS = "/bill/addmission";
export const GET_BILLS = "/bill";
export const GET_DRAFT_BILLS = "/bill/draft";
export const DELETE_DRAFT_BILL = "/bill/draft";
export const GET_DELETED_BILLS = "/bill/deleted";
export const POST_INVOICE = "/bill/invoice";
export const POST_DEPOSIT = "/bill/deposit";
export const EDIT_DEPOSIT = "/bill/deposit";
export const CONVERT_DEPOSIT_TO_ADVANCE = "/bill/deposit/convert-to-advance";
export const POST_DRAFT_INVOICE = "/bill/draft/invoice";
export const EDIT_DRAFT_INVOICE = "/bill/draft/invoice";
export const POST_DRAFT_TO_INVOICE = "/bill/draft/draft-to-invoiceBill";
export const POST_ADVANCE_PAYMENT = "/bill/advance-payment";
export const EDIT_INVOICE = "/bill/invoice";
export const EDIT_ADVANCE_PAYMENT = "/bill/advance-payment";
export const DELETE_BILL = "/bill";
export const POST_RESTORE_BILL = "/bill/restore";
export const DELETE_BILL_PERMANENTLY = "/bill/delete-permanently";

//MEDICINE
export const GET_MEDICINES = "/medicine";
export const GET_DELETED_MEDICINES = "/medicine/deleted";
export const POST_MEDICINE = "/medicine";
export const POST_CSV_MEDICINE = "/medicine/csv";
export const EDIT_MEDICINE = "/medicine";
export const DELETE_MEDICINE = "/medicine";
export const POST_RESTORE_MEDICINE = "/medicine/restore";
export const DELETE_MEDICINE_PERMANENTLY = "/medicine/delete-permanently";
export const VALIDATE_DUPLICATE_MEDICINE = "/medicine/validate";

//BILL SETTING
//invoice
export const POST_BILL_ITEM = "/bill-setting";
export const GET_DELETED_BILL_ITEMS = "/bill-setting/deleted";
export const GET_BILL_ITEMS = "/bill-setting";
export const GET_ALL_BILL_ITEMS = "/bill-setting/all";
export const EDIT_BILL_ITEM = "/bill-setting";
export const GET_PROCEDURES_BY_ID = "/bill-setting/procedures";
export const DETELE_CENTER_IN_PROCEDURE =
  "/bill-setting/procedures/delete/center";
export const ADD_CENTERS_IN_PROCEDURE = "/bill-setting/procedures/add/center";
export const GET_CATEGORIES_OF_PROCEDURE =
  "/bill-setting/procedures/get/catgeories";
export const EDIT_CENTER_COSTS = "/bill-setting/procedures/edit/center-cost";
export const DELETE_BILL_ITEM = "/bill-setting";
//advance payment
export const POST_PAYMENT_ACCOUNT = "/bill-setting/payment-account";
export const GET_PAYMENT_ACCOUNTS = "/bill-setting/payment-account";
export const DELETE_PAYMENT_ACCOUNT = "/bill-setting/payment-account";

//DOCTOR WORKING SCHEDULE
export const GET_ALL_DOCTOR_SCHEDULE = "/setting/doctor-schedule/all";
export const GET_DOCTOR_AVAILABLE_SLOTS = "/setting/available-slots";
export const GET_DOCTOR_SCHEDULE = "/setting/doctor-schedule";
export const POST_DOCTOR_SCHEDULE = "/setting/doctor-schedule";
export const EDIT_DOCTOR_SCHEDULE = "/setting/doctor-schedule";
export const GET_DOCTOR_SCHEDULE_NEW = "/setting/doctor-schedule/new";

//CALENDER
export const GET_CALENDER_DURATION = "/setting/calender";
export const POST_CALENDER_DURATION = "/setting/calender";
export const EDIT_CALENDER_DURATION = "/setting/calender";

//THERAPY
export const GET_THERAPIES = "/therapy";
export const POST_THERAPY = "/therapy";
export const EDIT_THERAPY = "/therapy";
export const DELETE_THERAPY = "/therapy";

//SYMPTOM
export const GET_SYMPTOMS = "/symptom";
export const POST_SYMPTOM = "/symptom";
export const EDIT_SYMPTOM = "/symptom";
export const DELETE_SYMPTOM = "/symptom";

//CONDITION
export const GET_CONDITIONS = "/condition";
export const POST_CONDITION = "/condition";
export const EDIT_CONDITION = "/condition";
export const DELETE_CONDITION = "/condition";

//REPORT
export const GET_REPORT = "/report";
export const GET_DB_LOGS = "/report/db-logs";
export const GET_FINANCE_ANALYTICS = "/report/finance";
export const GET_FINANCE_ANALYTICS_CSV = "/report/finance-csv";
export const GET_PATIENT_ANALYTICS = "/report/patient";
export const GET_DOCTOR_ANALYTICS = "/report/doctor";
export const GET_DOCTOR_ANALYTICS_WP = "/report/doctor-csv";
export const GET_PATIENT_ANALYTICS_WP = "/report/patient-csv";
export const GET_LEAD_ANALYTICS = "/report/lead";
export const GET_OPD_ANALYTICS = "/report/opd";
export const GET_BOOKING_ANALYTICS = "/report/booking";
export const GET_ADMISSION_FORMS = "/report/admission-forms";
export const GET_ADMISSION_FORMS_CSV = "/report/admission-forms-csv";

//NOTIFICATION
export const GET_BILL_NOTIFICATION = "notification/bill";

//INTERN
export const POST_INTERN_FORM = "intern/";
export const GET_INTERN_DATA = "intern/";
export const GET_INTERN_ID = "intern/create-internid";
export const GET_INTERN_BY_ID = (id) => `intern/${id}`;
export const ADD_INTERN_RECEIPT = "intern/receipt";
export const GET_INTERN_RECEIPT = (internId) =>
  `intern/receipt?intern=${internId}`;
export const UPDATE_INTERN_FORM = (id) => `intern/${id}`;
export const DELETE_INTERN = "intern/";
export const DELETE_INTERN_BILL = "intern/receipt";
export const UPDATE_INTERN_RECEIPT = "intern/receipt";

//CLINICAL TEST
export const GET_CIWA_TEST = "/clinical-test/ciwa-test";
export const POST_CIWA_TEST = "/clinical-test/ciwa-test";
export const POST_SSRS_TEST = "/clinical-test/ssrs-test";
export const POST_MPQ_TEST = "/clinical-test/mpq-test";
export const POST_MMSE_TEST = "/clinical-test/mmse-test";
export const POST_YMRS_TEST = "/clinical-test/ymrs-test";
export const POST_YBOCS_TEST = "/clinical-test/ybocs-test";
export const POST_ACDS_TEST = "/clinical-test/acds-test";
export const POST_HAMA_TEST = "/clinical-test/hama-test";
export const POST_HAMD_TEST = "/clinical-test/hamd-test";
export const POST_PANSS_TEST = "/clinical-test/panss-test";
export const FETCH_CLINICAL_TEST = "/clinical-test";

// OFFER
export const ADD_OFFER = "/offer/addoffer";
export const GET_OFFER_LIST = "/offer/get-offer-list";
export const UPDATE_OFFER = "/offer/update";

//TAX
export const ADD_TAX = "/tax/addtax";
export const GET_TAX_LIST = "/tax/get-tax-list";
export const UPDATE_TAX = "/tax/update";

//HUBSPOT
export const GET_HUBSPOT_CONTACTS = "/hubspot/getContacts";

//Roles
export const ROLES = "/role";

// nurse
export const GET_NURSE_ASSIGNED_PATIENTS = "/nurse/patients";
export const GET_CLININCAL_TEST_SUMMARY_BY_NURSE =
  "/nurse/clinical-test-summary";
export const GET_PATIENT_OVERVIEW_BY_NURSE = "/nurse/patient-overview";
export const GET_PATIENT_DETAILS_BY_NURSE = "/nurse/patient";
export const GET_PATIENT_PRESCRIPTION_BY_NURSE = "/nurse/prescription";
export const GET_NURSES_BY_PATIENT_CENTER = "/nurse/list";
export const GET_PENDING_ACTIVE_MEDICINES = "/nurse/due-medicine";
export const GET_COMPLETED_ACTIVE_MEDICINES = "/nurse/completed-medicine";
export const MARK_MEDICINE_AS_GIVEN = "/nurse/medicine/mark";
export const GET_NEXT_DAY_MEDICINEBOXFILLING_MEDICINES =
  "/nurse/next-day-medicines";
export const GET_ACTIVITIES_BY_STATUS = "/nurse/activities";

// alerts
export const GET_ALERTS_BY_PATIENT = "/alerts/nurse";
export const MARK_ALERT_AS_READ = "/alerts/read";

// notes
export const NOTES = "/notes";

// round notes
export const ROUND_NOTES = "/round-notes";
export const ROUND_NOTES_STAFF = "/round-notes/staff";

// emergency
export const ASSIGN_TYPE_TO_PATIENT = "/emergency/assign";
export const GET_EMERGENCY_PATIENTS = "/emergency";

// cash managemenet
export const ADD_BANK_DEPOSIT = "/cash/bank-deposit";
export const ADD_SPENDING = "/cash/spending";
export const ADD_BASE_BALANCE = "/cash/base-balance";
export const ADD_INFLOW = "/cash/inflow";
export const GET_LATEST_BANK_DEPOSITS = "/cash/bank-deposit/list";
export const GET_LATEST_SPENDING = "/cash/spending/list";
export const GET_LASTEST_INFLOWS = "/cash/inflow/list";
export const GET_BASE_BALANCE_BY_CENTER = "/cash/base-balance";
export const GET_DETAILED_CASH_REPORT = "/cash/report/detailed";
export const GET_SUMMARY_CASH_REPORT = "/cash/report/summary";

// central payment
export const CENTRAL_PAYMENT = "/central-payment";
export const CENTRAL_PAYMENT_ACTION = "/central-payment/action";
export const GET_DETAILED_CENTRAL_PAYMENT_REPORT =
  "/central-payment/report/detailed";
export const GET_SUMMARY_CENTRAL_PAYMENT_REPORT =
  "/central-payment/report/summary";
export const EXPORT_DETAILED_CENTRAL_PAYMENT_REPORT =
  "/central-payment/report/detailed/export";
export const GET_ALL_ENETS = "/central-payment/eNets";
export const REGENERATE_ENETS = "/central-payment/eNets/regenerate";
export const PROCESS_PAYMENTS = "/central-payment/process";
export const UPLOAD_TRANSACTION_PROOF = "/central-payment/transaction-proof";

//New Microservice APIS
export const CSRF = "/csrf-token";
export const MICRO_SIGN_IN = "/userauths/signin";
export const MICRO_SIGN_UP = "/userauths/signup";
export const MICRO_FORGOTT = "/userauths/forgott-password";
export const MICRO_LOGOUT = "/userauths/logout";
export const CHANGE_PASSWORD = "/userauths/forgott-password";
export const USER = "/user";
export const GET_USER_BY_EMAIL = "/user/email";
export const MOVE_TO_BIN = "/user/move-recyclebin";
export const ACTIVATE_DEACTIVATE_USER = "/user/deactive";
export const CHANGE_USER_PASSWORD = "/user/change-password";
export const EDIT_SELF = "/user/edit-self";
export const USER_ACTIVITY = "/activity";
export const GET_USER_ROLES = "/user/roles";

// INCIDENT
export const GET_INCIDENTS = "/incident";
export const GET_INCIDENT_BY_ID = "/incident";
export const POST_INCIDENT = "/incident";
export const UPDATE_INCIDENT = "/incident";
export const DELETE_INCIDENT = "/incident";
export const INVESTIGATE_INCIDENT = "/incident";
export const APPROVE_INCIDENT = "/incident";
export const CLOSE_INCIDENT = "/incident";
export const UPDATE_INCIDENT_STATUS = "/incident";

// PHARMACY FAILED MEDICINES DOWNLOAD
export const DOWNLOAD_FAILED_MEDICINES = "/pharmacy/failed/download";
// PHARMACY GET FAILED MEDICINES BATCHES LIST
export const GET_FAILED_MEDICINES_BATCHES = "/pharmacy/failed/list";
// PHARMACY DELETE FAILED MEDICINES
export const DELETE_FAILED_MEDICINES = "/pharmacy/failed/delete";

// PHARMACY MEDICINE APPROVAl
export const MEDICINE_APPROVALS = "/pharmacy/approvals";
export const GET_PENDING_PATIENT_APPROVALS =
  "/pharmacy/approvals/pending-patients";
export const GET_DETAILED_PRESCRIPTION =
  "/pharmacy/approvals/detailed-prescription";

// PHARMACY AUDIT
export const DOWNLOAD_AUDIT_TEMPLATE = "/pharmacy/audit/template";
export const AUDITS = "/pharmacy/audit";
export const UPLOAD_AUDIT_REPORT = "/pharmacy/audit/upload-chunk";
export const GET_AUDIT_REPORT = "/pharmacy/audit/report";
export const UPDATE_AUDIT_STATUS = "/pharmacy/audit/status";
export const DOWNLOAD_AUDIT_FAILED_MEDICINES = "/pharmacy/audit/failed";

// MI REPORTING
export const GET_MI_HUBSPOT_CONTACTS = "/mi-reporting/hubspot-contacts";
export const GET_CENTER_LEADS_MOM = "/mi-reporting/center-leads-mom";
export const GET_CENTER_LEADS_MTD = "/mi-reporting/center-leads-mtd";
export const GET_OWNER_LEADS_MOM = "/mi-reporting/owner-leads-mom";
export const GET_OWNER_LEADS_MTD = "/mi-reporting/owner-leads-mtd";
export const GET_CITY_QUALITY_BREAKDOWN = "/mi-reporting/city-quality";
export const GET_OWNER_QUALITY_BREAKDOWN = "/mi-reporting/owner-quality";
export const GET_CITY_VISIT_DATE = "/mi-reporting/city-visit-date";
export const GET_OWNER_VISIT_DATE = "/mi-reporting/owner-visit-date";
export const GET_CITY_VISITED_DATE = "/mi-reporting/city-visited-date";
export const GET_OWNER_VISITED_DATE = "/mi-reporting/owner-visited-date";
export const GET_CITY_LEAD_STATUS = "/mi-reporting/city-lead-status";
export const GET_OWNER_LEAD_STATUS = "/mi-reporting/owner-lead-status";

// HR
export const GET_EMPLOYEE_ID = "/hr/employee-id";
export const EMPLOYEE = "/hr/employee";
export const EMPLOYEE_EMAILS = "/hr/employee/emails";

export const NEW_JOINING_ACTION = "/hr/employee/new-joining";

export const IT = "/hr/it";
export const IT_NEW_JOINING_ACTION = "/hr/it/joining";
export const IT_EXIT_ACTION = "/hr/it/exit";
export const IT_TRANSFER_ACTION = "/hr/it/transfer";

export const EXIT_EMPLOYEE = "/hr/exit";
export const EXIT_EMPLOYEE_EXIT_ACTION = "/hr/exit/exit-action";
export const EXIT_EMPLOYEE_FNF_ACTION = "/hr/exit/fnf-action";

export const SEARCH_EXIT_EMPLOYEE = "/hr/exit/search";

export const SALARY_ADVANCE = "/hr/advance-salary";
export const SALARY_ADVANCE_ACTION = "/hr/advance-salary/action";

export const TRANSFER_EMPLOYEE = "/hr/transfer-employee";
export const TRANSFER_EMPLOYEE_CURRENT_LOCATION_ACTION =
  "/hr/transfer-employee/current/action";
export const TRANSFER_EMPLOYEE_TRANSFER_LOCATION_ACTION =
  "/hr/transfer-employee/transfer/action";

export const DESIGNATION = "/hr/designation";

export const HIRING = "/hr/hiring";
export const HIRING_ACTION = "/hr/hiring/action";
export const GET_ALL_EMPLOYEE = "/hr/hiring/get/employees";
export const GET_MANAGEMENT_HIRING_REQUESTS =
  "/hr/hiring/management/hiring/requests";
export const UPDATE_HIRING_REQUEST = "/hr/hiring/management/update/request";

export const TPM = "/hr/tpm";
export const TPM_ACTION = "/hr/tpm/action";

// HRMS
export const GET_BALANCE_LEAVES = "/hrms/get/my/balance/leaves";
export const ATTENDANCE = "/hrms/attendance";
export const ATTENDANCE_IMPORTS = "/hrms/attendance/imports";
export const ATTENDANCE_TEMPLATE = "/hrms/attendance/template";
export const UPLOAD_ATTENDANCE = "/hrms/attendance/upload";

export const ATTENDANCE_METRICS = "/hrms/attendance/metrics";
export const EXPORT_ATTENDANCE_METRICS = "/hrms/attendance/metrics/export";
export const TODAY_MY_ATTENDANCE_STATUS = "/hrms/attendance/status/today";
export const ATTENDANCE_SUMMARY = "/hrms/attendance/summary";
export const ATTENDANCE_LOGS = "/hrms/attendance/detailed";
export const EMPLOYEE_CHECK_IN = "/hrms/attendance/check-in";
export const EMPLOYEE_CHECK_OUT = "/hrms/attendance/check-out";

export const EMPLOYEE_REPORTING = "/hrms/employee-reporting";

export const APPLY_LEAVE = "/hrms/leaves/request";
export const GET_MY_MANAGER = "/hrms/get/my/reporting/manager";
export const GET_LEAVES_REQUESTS = "/hrms/get/leaves/requests";
export const ACTION_ON_LEAVE = "/hrms/leaves";
export const GET_MY_LEAVES = "/hrms/get/my/leaves";
export const RETRIEVE_ACTION = "/hrms/leaves";
export const ADD_POLICIES = "/hrms/employee/policy";
export const GET_POLICIES = "/hrms/employee/get/policies";
export const ADMIN_GET_ALL_LEAVES = "/hrms/admin/get/leaves/info";

export const REQUEST_REGULARIZATION = "/hrms/request/regularization";
export const GET_MY_REGULARIZATION = "/hrms/get/my/regularizations";
export const GET_REGULARIZATION_REQUESTS = "/hrms/get/regularizations/requests";
export const UPDATE_REGULARIZATION = "/hrms/regularize";
export const GET_DEPARTMENTS = "/hr/get/departments";
export const CREATE_DEPARTMENTS = "/hr/create/departments";

// upload file
export const UPLOAD_FILE = "/upload";

// TALLY
export const POST_TALLY_SEND = "/tally/send";
export const GET_TALLY_LOGS = "/tally/logs";
