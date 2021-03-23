import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";
import waitForElement from "@testing-library/react";
afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
