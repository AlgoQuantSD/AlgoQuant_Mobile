// The MOCK_USER will serve as our hardcoded user until we can interface with the API
export const MOCK_USER = {
  data: {
    totalBalance: 153012.23,
  },
  alpaca: {
    isConnected: true,
  },
};

// Filler data until we can get real data through API
export const MOCK_INVESTORS = [
  {
    name: "Warren Buffet",
    indicators: [
      {
        name: "RSI",
        id: "INDICATOR_RSI",
      },
      {
        name: "OBV",
        id: "INDICATOR_OBV",
      },
      {
        name: "MACD",
        id: "INDICATOR_MACD",
      },
    ],
    stocks: [
      {
        name: "AMD",
        id: "STOCK_AMD",
      },
      {
        name: "AMZN",
        id: "STOCK_AMZN",
      },
      {
        name: "APPL",
        id: "STOCK_APPL",
      },
      {
        name: "GOOGL",
        id: "STOCK_GOOGL",
      },
      {
        name: "NVDA",
        id: "STOCK_NVDA",
      },
    ],
    profitStop: "20%",
    lossStop: "30%",
    imageId: 0,
    id: "INVESTOR_0",
  },
  {
    name: "Heinous Investor",
    indicators: [
      {
        name: "RSI",
        id: "INDICATOR_RSI",
      },
      {
        name: "OBV",
        id: "INDICATOR_OBV",
      },
      {
        name: "MACD",
        id: "INDICATOR_MACD",
      },
    ],
    stocks: [
      {
        name: "AMD",
        id: "STOCK_AMD",
      },
      {
        name: "AMZN",
        id: "STOCK_AMZN",
      },
      {
        name: "APPL",
        id: "STOCK_APPL",
      },
      {
        name: "GOOGL",
        id: "STOCK_GOOGL",
      },
      {
        name: "NVDA",
        id: "STOCK_NVDA",
      },
    ],
    profitStop: "50%",
    lossStop: "90%",
    imageId: 1,
    id: "INVESTOR_1",
  },
  {
    name: "Your Mom",
    indicators: [
      {
        name: "RSI",
        id: "INDICATOR_RSI",
      },
      {
        name: "OBV",
        id: "INDICATOR_OBV",
      },
      {
        name: "MACD",
        id: "INDICATOR_MACD",
      },
    ],
    stocks: [
      {
        name: "AMD",
        id: "STOCK_AMD",
      },
      {
        name: "AMZN",
        id: "STOCK_AMZN",
      },
      {
        name: "APPL",
        id: "STOCK_APPL",
      },
      {
        name: "GOOGL",
        id: "STOCK_GOOGL",
      },
      {
        name: "NVDA",
        id: "STOCK_NVDA",
      },
    ],
    profitStop: "20%",
    lossStop: "30%",
    imageId: 1,
    id: "INVESTOR_2",
  },
];
export const MOCK_JOBS = [
  {
    name: "Job1",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 191.41,
    percentChange: 4.1,
    isActive: true,
    id: 0,
  },
  {
    name: "Job2",
    investor: { name: "Heinous Investor", imageId: 1 },
    balance: 252.23,
    percentChange: 5.2,
    isActive: true,
    id: 1,
  },
  {
    name: "Job3",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 2,
  },
  {
    name: "Job4",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 3,
  },
  {
    name: "Job5",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 4,
  },
  {
    name: "Job6",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 5,
  },
  {
    name: "Job7",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 6,
  },
  {
    name: "Job8",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 7,
  },
  {
    name: "Job9",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 8,
  },
  {
    name: "Job10",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 9,
  },
  {
    name: "Job11",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 10,
  },
  {
    name: "Job12",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: true,
    id: 11,
  },
];

export const MOCK_HISTORY = [
  {
    name: "Job3",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    isActive: false,
    startDate: "02/01/2023",
    endDate: "02/05/2023",
    id: 0,
  },
  {
    name: "Job2",
    investor: { name: "Heinous Investor", imageId: 1 },
    balance: 252.23,
    percentChange: 5.2,
    isActive: false,
    startDate: "12/21/2022",
    endDate: "02/09/2023",
    id: 1,
  },
  {
    name: "Job1",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 191.41,
    percentChange: 4.1,
    isActive: false,
    startDate: "01/13/2023",
    endDate: "02/08/2023",
    id: 2,
  },
];

export const mockGraphData1 = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];
export const mockGraphData2 = [
  { x: 2, y: 6 },
  { x: 3, y: 2 },
  { x: 4, y: 9 },
  { x: 6, y: 2 },
  { x: 8, y: 1 },
];

export const mockGraphData3 = [
  { x: 0, y: 6 },
  { x: 5, y: 10 },
  { x: 6, y: 7 },
  { x: 7, y: 9 },
  { x: 8, y: 12 },
];

export const mockGraphData4 = [
  { x: 0, y: 6 },
  { x: 5, y: 1 },
  { x: 6, y: 7 },
  { x: 7, y: 4 },
  { x: 8, y: 10 },
];

export const mockGraphHeaderData = {
  recentPrice: 152.01,
  open: 150.64,
  high: 153.19,
  low: 150.64,
  yearlyHigh: 176.15,
  yearlyLow: 124.17,
  priceDifferenceRaw: 1.47,
  priceDifferencePercent: 0.8,
};
