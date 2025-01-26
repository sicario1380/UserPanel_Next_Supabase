const config = {
  appName: "UserPanel",
  appDescription: "Help Users with Panels.",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://userpanel.com",
};

export default config;
