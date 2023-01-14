import React from "react";
import { render, screen } from "@testing-library/react-native";
import ProfileListOptions from "../../components/single_use_components/ProfileListOptions";

describe("ProfileListOptions", () => {
  it("Should render", () => {
    const tree = render(<ProfileListOptions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders the correct list options", () => {
    render(<ProfileListOptions />);
    const listOptions = [
      "View trade history",
      "Connect to Alpaca",
      "Reset password",
      "Update email",
      "Delete account",
      "Sign out",
    ];
    listOptions.forEach((option) => {
      screen.getByText(option);
    });
  });
});
