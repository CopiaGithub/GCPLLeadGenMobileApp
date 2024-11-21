let envConfig = {
  apiUrl: "",
  debug: "",
};

export default ({ config }) => {
  if (process.env.APP_ENV === "production") {
    envConfig.apiUrl = "https://gcplexhibition.copiacs.com/";
    envConfig.debug = "0";
  } else {
    envConfig.apiUrl = "https://gcplexhibition.copiacs.com/";
    envConfig.debug = "1";
  }
  const appConfig = {
    ...config,
    version: process.env.VERSION,
    expo: {
      extra: {
        eas: {
          projectId: "9f671b24-b7fc-4ece-a108-30e6a03d73c1",
        },
      },
      android: {
        package: "com.gcpl.catLeadGen",
      },
    },
  };
  return appConfig;
};
