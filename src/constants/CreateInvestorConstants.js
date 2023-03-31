export const INDICATOR_LIST = [
  {
    name: "Moving Average Convergence/Divergence",
    abbreviation: "MACD",
    description:
      "MACD (Moving Average Convergence Divergence) is a technical analysis indicator that uses two exponential moving averages to identify the direction and momentum of an asset, with the crossing of the MACD line and signal line generating buy and sell signals.",
    id: "INDICATOR_MACD",
  },
  {
    name: "Relative Strength Index",
    abbreviation: "RSI",
    description:
      "RSI (Relative Strength Index) is a technical analysis indicator that measures the strength and momentum of an asset, typically ranging from 0 to 100. Traders use RSI to identify potential buying or selling opportunities based on overbought and oversold readings, calculated from average gains and losses over a specified time period.",
    id: "INDICATOR_RSI",
  },
  {
    name: "Accumulation Distribution Line",
    abbreviation: "ADL",
    description:
      "ADL (Accumulation/Distribution Line) is a technical analysis indicator that uses volume and price data to measure the buying and selling pressure of an asset. It is used to confirm price trends and predict potential reversals.",
    id: "INDICATOR_ADL",
  },
  {
    name: "On-Balance Volume",
    abbreviation: "OBV",
    description:
      "OBV (On-Balance Volume) is a technical analysis indicator that uses volume data to measure buying and selling pressure of an asset. It compares the total volume of buying and selling over a specified time period to determine the strength of a trend or potential reversal.",
    id: "INDICATOR_OBV",
  },
  {
    name: "Bollinger Bands",
    abbreviation: "BB",
    description:
      "BB (Bollinger Bands) is a technical analysis tool that uses a set of three bands, typically based on a moving average and standard deviation, to indicate the volatility and potential trading range of an asset. The bands expand or contract based on the level of volatility, with price movements outside the bands indicating potential trend reversal points.",
    id: "INDICATOR_BB",
  },
  {
    name: "Stochastic Oscillator",
    abbreviation: "SO",
    description:
      "SO (Stochastic Oscillator) is a momentum indicator that compares an asset's closing price to its price range over a specified time period, typically 14 days. It measures the level of buying and selling pressure and indicates potential trend reversal points.",
    id: "INDICATOR_SO",
  },
];

export const PERIOD_LIST = [
  {
    value: "30_min",
    name: "High Frequency Day Trader",
    description:
      "The High Frequency Day Trader analyzes the market every 30 minutes, always on the hunt to buy and sell for small profits.",
    imageId: 0,
    id: "PERIOD_30_MIN",
  },
  {
    value: "1_hr",
    name: "Low Frequency Day Trader",
    description:
      "The Low Frequency Day Trader analyzes the market once an hour, similar to the High Frequency Day Trader but not quite as intensive.",
    imageId: 1,
    id: "PERIOD_1_HR",
  },
  {
    value: "4_hr",
    name: "High Frequency Swing Trader",
    description:
      "The High Frequency Swing Trader analyzes the market once every 4 hours, a bit more patient than the day traders. ",
    imageId: 2,
    id: "PERIOD_4_HR",
  },
  {
    value: "1_day",
    name: "Low Frequency Swing Trader",
    description:
      "The Low Frequency Swing Trader analyzes the market once a day, this approach can be viewed as the happy medium of all the traders.",
    imageId: 3,
    id: "PERIOD_1_DAY",
  },
  {
    value: "1_wk",
    name: "High Frequency Long Trader",
    description:
      "The High Frequency Long Trader analyzes the market once a week, an experienced gentleman who believes in a slow and steady approach to investing",
    imageId: 4,
    id: "PERIOD_1_WK",
  },
  {
    value: "1_mo",
    name: "Low Frequency Long Trader",
    description:
      "The Low Frequency Long Trader analyzes the market once a month, some would say this trader is a lazy old man but that is not the case.",
    imageId: 5,
    id: "PERIOD_1_MO",
  },
];
