import React from "react";
import ReactDOM from "react-dom/client";

import Component from "./Component";

import "./index.css";

console.log("Extension");

const delay = (ms = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

function getContainer() {
  if (false) {
    return document.body;
  }

  return document.getElementById("basiclayout") as HTMLElement;
}

async function render(attempt = 0) {
  console.log("Rendering...");
  const container = getContainer();

  if (attempt > 20) {
    throw new Error("Maximum attempt");
  }

  if (!container) {
    console.log("No container, waiting and retrying...");
    await delay(250);
    await render(attempt + 1);
    return;
  }

  const root = document.createElement("div") as HTMLDivElement;

  root.id = "crx-root";

  container.prepend(root);

  container.id = `${container.id} with-stats`;

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
}

render()
  .then(() => console.log("Rendered!"))
  .catch(console.error);
