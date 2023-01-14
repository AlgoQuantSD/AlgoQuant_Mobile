import React from "react";
import ProfileHeader from "../../components/single_use_components/ProfileHeader";
import { render } from "@testing-library/react-native";

jest.mock("@aws-amplify/ui-react-native", () => ({
  useAuthenticator: jest.fn(() => ({
    user: {
      attributes: {
        given_name: "John",
        family_name: "Doe",
      },
    },
  })),
}));

describe("ProfileHeader", () => {
  it("Should render", () => {
    const tree = render(<ProfileHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders the user's initials", () => {
    const { getByTestId } = render(<ProfileHeader />);
    const userInitialsText = getByTestId("user-initials-text");
    expect(userInitialsText.props.children).toEqual("JD");
  });
  it("renders the user's name", () => {
    const { getByTestId } = render(<ProfileHeader />);
    const nameText = getByTestId("full-name-text");
    expect(nameText.props.children).toEqual(["John", " ", "Doe"]);
  });
  it("renders the pencil icon", () => {
    const { getByTestId } = render(<ProfileHeader />);
    const pencilIcon = getByTestId("pencil-icon");
    expect(pencilIcon).toBeTruthy();
  });
});
