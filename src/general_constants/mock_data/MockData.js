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
    indicators: ["RSI", "OBV", "MACD"],
    stocks: ["AMD", "AMZN", "APPL", "GOOGL", "NVDA"],
    profitStop: "20%",
    lossStop: "30%",
    imageId: 0,
    id: "INVESTOR_0",
  },
  {
    name: "Heinous Investor",
    indicators: ["RSI", "OBV", "MACD"],
    stocks: ["AMD", "AMZN", "APPL", "GOOGL", "NVDA"],
    profitStop: "50%",
    lossStop: "90%",
    imageId: 1,
    id: "INVESTOR_1",
  },
  {
    name: "Your Mom",
    indicators: ["RSI", "OBV", "MACD"],
    stocks: ["AMD", "AMZN", "APPL", "GOOGL", "NVDA"],
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

export const MOCK_GRAPH_DATA = [
  { x: 1679491800.0, y: 101493.87306709144 },
  { x: 1679492700.0, y: 101493.23984478119 },
  { x: 1679493600.0, y: 101483.48855273219 },
  { x: 1679494500.0, y: 101498.31372262193 },
  { x: 1679495400.0, y: 101499.70831565073 },
  { x: 1679496300.0, y: 101499.04281745196 },
  { x: 1679497200.0, y: 101504.06476222299 },
  { x: 1679498100.0, y: 101509.78380496634 },
  { x: 1679499000.0, y: 101511.36532736449 },
  { x: 1679499900.0, y: 101512.83130545054 },
  { x: 1679500800.0, y: 101500.61106520578 },
  { x: 1679501700.0, y: 101496.94794988922 },
  { x: 1679502600.0, y: 101496.32333709854 },
  { x: 1679503500.0, y: 101502.20754885898 },
  { x: 1679504400.0, y: 101500.14562758131 },
  { x: 1679505300.0, y: 101503.44522376398 },
  { x: 1679506200.0, y: 101504.64038215164 },
  { x: 1679507100.0, y: 101503.10051841018 },
  { x: 1679508000.0, y: 101508.27469963112 },
  { x: 1679508900.0, y: 101517.73571910094 },
  { x: 1679509800.0, y: 101515.54166323646 },
  { x: 1679510700.0, y: 104000.11303380287 },
  { x: 1679511600.0, y: 104007.81562732054 },
  { x: 1679512500.0, y: 99999.9156900677 },
  { x: 1679513400.0, y: 99999.90339515725 },
  { x: 1679514300.0, y: 99999.95024085298 },
  { x: 1679515200.0, y: 99999.9497000552 },
  { x: 1679516100.0, y: 99999.96877572937 },
];

export const MOCK_Y_VALS = [1, 3, 6, 9, 12];

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

// Filler table data until we connect to backend
export const backtestData = [
  {
    status: "running",
    backtestName: "Sample backtest",
    initialInvestment: "$2400",
    finalBalance: "$3800",
    startDate: "3/13/2019",
    endDate: "3/10/2023",
    user_id: "fe224998-50a0-4515-8899-431868d5936a",
    backtest_id: "1678206077938",
    avg_loss: 0,
    avg_return: 0,
    avg_win: 20,
    investor_id: "1678201950089",
    max_drawdown: 0,
    net_returns: 0,
    num_trades: 0,
    portfolio_max_value: 100000,
    portfolio_min_value: 100000,
    portfolio_volatility: 0,
    sharpe_ratio: 0,
    start_time: 1675804854,
    end_time: 1678203277,
    portfolio_value_history: [
      100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
      100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
      100000, 100000,
    ],
    value_timestamps: [
      1675832400, 1675918800, 1676005200, 1676264400, 1676350800, 1676437200,
      1676523600, 1676610000, 1676955600, 1677042000, 1677128400, 1677214800,
      1677474000, 1677560400, 1677646800, 1677733200, 1677819600, 1678078800,
      1678165200, 1678165200,
    ],
  },
  {
    status: "completed",
    backtestName: "Sample backtest2g",
    initialInvestment: "$3200",
    finalBalance: "$6000",
    startDate: "5/16/2020",
    endDate: "3/10/2023",
    user_id: "fe224998-50a0-4515-8899-431868d5936a",
    backtest_id: "1678206077938",
    avg_loss: 0,
    avg_return: 0,
    avg_win: 20,
    investor_id: "1678201950089",
    max_drawdown: 0,
    net_returns: 0,
    num_trades: 0,
    portfolio_max_value: 100000,
    portfolio_min_value: 100000,
    portfolio_volatility: 0,
    sharpe_ratio: 0,
    start_time: 1675804854,
    end_time: 1678203277,
    portfolio_value_history: [
      100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
      100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
      100000, 100000,
    ],
    value_timestamps: [
      1675832400, 1675918800, 1676005200, 1676264400, 1676350800, 1676437200,
      1676523600, 1676610000, 1676955600, 1677042000, 1677128400, 1677214800,
      1677474000, 1677560400, 1677646800, 1677733200, 1677819600, 1678078800,
      1678165200, 1678165200,
    ],
  },
  {
    status: "completed",
    backtestName: "Random",
    initialInvestment: "$3200",
    finalBalance: "$6000",
    startDate: "5/16/2020",
    endDate: "3/10/2023",
    user_id: "fe224998-50a0-4515-8899-431868d5936a",
    backtest_id: "1678206077938",
    avg_loss: 0,
    avg_return: 0,
    avg_win: 20,
    investor_id: "1678201950089",
    max_drawdown: 0,
    net_returns: 0,
    num_trades: 0,
    portfolio_max_value: 100000,
    portfolio_min_value: 100000,
    portfolio_volatility: 0,
    sharpe_ratio: 0,
    start_time: 1675804854,
    end_time: 1678203277,
    portfolio_value_history: [
      100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
      100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
      100000, 100000,
    ],
    value_timestamps: [
      1675832400, 1675918800, 1676005200, 1676264400, 1676350800, 1676437200,
      1676523600, 1676610000, 1676955600, 1677042000, 1677128400, 1677214800,
      1677474000, 1677560400, 1677646800, 1677733200, 1677819600, 1678078800,
      1678165200, 1678165200,
    ],
  },
];
