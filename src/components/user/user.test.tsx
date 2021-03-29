import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import { User } from "./user";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("render", async () => {
  const menu = User.querySelector("#menu");
});
