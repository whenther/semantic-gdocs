import React from "react";
import { render, screen } from "@testing-library/react";

import { App } from "./App";

test("renders site", () => {
  render(<App />);
  const title = screen.getByText(/Google Docs HTML Cleaner/i);
  expect(title).toBeInTheDocument();
});
