import React from "react";
import { MOCK_USER } from "../constants/MockUser";

const formattingOptions = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
};

// Format the total balance into a string using the options we set
const dollarString = new Intl.NumberFormat("en-US", formattingOptions);
export const formattedBalance = dollarString.format(
  MOCK_USER.data.totalBalance
);
