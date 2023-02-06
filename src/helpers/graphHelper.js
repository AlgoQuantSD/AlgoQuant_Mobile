import React from "react";

// Update graphdata and change the selected timeframe
export function handleTimeframeChange(
  timeframe,
  setGraphData,
  setSelectedTimeframe
) {
  setSelectedTimeframe(timeframe);
  switch (timeframe) {
    case 1:
      setGraphData(mockData1);
      break;
    case 2:
      setGraphData(mockData2);
      break;
    case 3:
      setGraphData(mockData3);
      break;
    case 4:
      setGraphData(mockData4);
      break;
  }
}
// Filler data until we connect to the backend
export const mockData1 = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];
const mockData2 = [
  { x: 2, y: 6 },
  { x: 3, y: 2 },
  { x: 4, y: 9 },
  { x: 6, y: 2 },
  { x: 8, y: 1 },
];

const mockData3 = [
  { x: 0, y: 6 },
  { x: 5, y: 10 },
  { x: 6, y: 7 },
  { x: 7, y: 9 },
  { x: 8, y: 12 },
];

const mockData4 = [
  { x: 0, y: 6 },
  { x: 5, y: 1 },
  { x: 6, y: 7 },
  { x: 7, y: 4 },
  { x: 8, y: 10 },
];
