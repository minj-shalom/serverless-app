import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const lightSchemeIcon = document.querySelector("link#light-scheme-icon");
const darkSchemeIcon = document.querySelector("link#dark-scheme-icon");

function onUpdate() {
  if (matcher.matches) {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
  } else {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }
}

const matcher = window.matchMedia("(prefers-color-scheme: dark)");
matcher.addListener(onUpdate);
onUpdate();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
