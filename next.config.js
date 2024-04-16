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
    },
  };
};
