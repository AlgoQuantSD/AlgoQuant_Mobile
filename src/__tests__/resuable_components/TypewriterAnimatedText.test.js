import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import TypewriterAnimatedText from "../../components/reusable_components/TypewriterAnimatedText";

describe("TypewriterAnimatedText", () => {
  it("should render", () => {
    const tree = render(<TypewriterAnimatedText />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should type out the text over time", async () => {
    const text = "Hello World";
    const { getByText } = render(<TypewriterAnimatedText text={text} />);

    expect(getByText("")).toBeTruthy();

    await waitFor(() => {
      expect(getByText("H")).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText("He")).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText("Hello World")).toBeTruthy();
    });
  });
});
