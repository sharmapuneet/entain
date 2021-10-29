import { render, screen, fireEvent } from "@testing-library/react";
import Content from "./Content";
import { mockData } from "../../__mock__/data";
import { RaceContext } from "../../context/RaceContext";

test('renders learn react link', () => {
  const { getByTestId } = render(<RaceContext.Provider value={mockData}><Content /></RaceContext.Provider>);

  // Testing meeting name on the page.
  const meetingName = screen.getByText(/Angle Park/i);
  expect(meetingName).toBeInTheDocument();

  // Testing the select list for categories. 
  fireEvent.change(getByTestId("select"), { target: { value: "9daef0d7-bf3c-4f50-921d-8e818c60fe61" } });
  expect(screen.getByText(/Greyhound Racing/i)).toBeInTheDocument();

  fireEvent.change(getByTestId("select"), { target: { value: "" } });
  expect(screen.getByText(/All Categories/i)).toBeInTheDocument();
});
