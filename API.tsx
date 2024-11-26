import Constants from "expo-constants";

const apiUrl = "https://gcplexhibition.copiacs.com/";

const API = {
  REGISTER: {
    REGISTER_USER: `${apiUrl}user-master`,
  },
  ORGANIZATION: {
    DROPDOWN: `${apiUrl}organization-master`,
  },
  LOGIN: {
    WITH_PASSWORD: `${apiUrl}user-master/login`,
    GENERATE_OTP: `${apiUrl}user-master/send-otp`,
    VALIDATE: `${apiUrl}user-master/validate-otp`,
  },
  PASSWORD: {
    UPDATE: `${apiUrl}user-master`,
  },
  CAMPAIGN: {
    DATA: `${apiUrl}campaign-master`,
    TYPE: `${apiUrl}campaign-type-master`,
  },
  GET_STATES: `${apiUrl}state-master`,
  GET_DISTRICTS: `${apiUrl}district-master`,
  COMPANY_TYPE_MASTER: `${apiUrl}company-type-master`,
  INDUSTRY_TYPE_MASTER: `${apiUrl}industry-type-master`,
};

export default API;
