import React from "react";
import { render } from "@testing-library/react-native";
import TotalBalance from "../../components/single_use_components/TotalBalance";
import { mockUser } from "../../constants/MockUser";

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
      }).format(mockUser.data.totalBalance)
    );
  });
  it("renders the reset icon", () => {
    const { getByTestId } = render(<TotalBalance />);
    const resetIcon = getByTestId("reset-icon");
    expect(resetIcon).toBeTruthy();
  });
});
