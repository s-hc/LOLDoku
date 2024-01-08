import "@testing-library/jest-dom";
import React from "react";

global.React = React; // this also works for other globally available libraries
global.import = {
    meta: {
      env: { // other environment variables go here
        VITE_BACKEND_URL: 'http://localhost:3000',
      }
    }
  };
  