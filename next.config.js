const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  // When using Development Server
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "smitbhamwala",
        mongodb_password: "MEqYb1MaspYQjbg3",
        mongodb_clustername: "mytestcluster",
        mongodb_database: "nextFoodies",
        meals_fetch_pathname: "http://localhost:3000",
        api_key: "TheSecretKey",
      },
    };
  }

  // When using Production Server
  return {
    env: {
      mongodb_username: "smitbhamwala",
      mongodb_password: "MEqYb1MaspYQjbg3",
      mongodb_clustername: "mytestcluster",
      mongodb_database: "nextFoodies",
      meals_fetch_pathname: "https://nextfoodies.vercel.app",
      api_key: "TheSecretKey",
    },
  };
};
