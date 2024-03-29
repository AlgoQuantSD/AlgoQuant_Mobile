import React from "react";
import { render } from "@testing-library/react-native";
import TotalBalance from "../../components/single_use_components/TotalBalance";
import { MOCK_USER } from "../../constants/MockData";

describe("TotalBalance", () => {
  it("Should render", () => {
    const tree = render(<TotalBalance />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders the user's balance", () => {
    const { getByTestId } = render(<TotalBalance />);
    const balanceText = getByTestId("total-balance");
    expect(balanceText).toHaveTextContent(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(MOCK_USER.data.totalBalance)
    );
  });
  it("renders the reset icon", () => {
    const { getByTestId } = render(<TotalBalance />);
    const resetIcon = getByTestId("reset-icon");
    expect(resetIcon).toBeTruthy();
  });
});
