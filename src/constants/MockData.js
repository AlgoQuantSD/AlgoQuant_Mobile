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
    id: 0,
  },
  {
    name: "Job2",
    investor: { name: "Heinous Investor", imageId: 1 },
    balance: 252.23,
    percentChange: 5.2,
    id: 1,
  },
  {
    name: "Job3",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 2,
  },
  {
    name: "Job4",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 3,
  },
  {
    name: "Job5",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 4,
  },
  {
    name: "Job6",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 5,
  },
  {
    name: "Job7",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 6,
  },
  {
    name: "Job8",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 7,
  },
  {
    name: "Job9",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 8,
  },
  {
    name: "Job10",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 9,
  },
  {
    name: "Job11",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 10,
  },
  {
    name: "Job12",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 11,
  },
];

export const MOCK_HISTORY = [
  {
    name: "Job3",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 90.21,
    percentChange: -3.1,
    id: 0,
  },
  {
    name: "Job2",
    investor: { name: "Heinous Investor", imageId: 1 },
    balance: 252.23,
    percentChange: 5.2,
    id: 1,
  },
  {
    name: "Job1",
    investor: { name: "Warren Buffet", imageId: 0 },
    balance: 191.41,
    percentChange: 4.1,
    id: 2,
  },
];
