import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import CustomButton from "../../components/reusable_components/CustomButton";

it("Should render", () => {
  const tree = render(<CustomButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should have label", () => {
  const label = "Test Button";
  const action = jest.fn();
  render(<CustomButton label={label} action={action} />);
  screen.getByText(label);
});

it("Should execute function on press one time", () => {
  const label = "Test Button";
  const action = jest.fn();
  render(<CustomButton label={label} action={action} />);
  fireEvent.press(screen.getByText(label));
  expect(action).toHaveBeenCalledTimes(1);
});
