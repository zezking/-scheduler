import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

    await waitForElement(() => getByText("Leopold Silvers"));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    // const { getByText } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });
});
