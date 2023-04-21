import DemoBacktestingImage0 from "../../../../../../assets/demo_images/backtesting/0.png";
import DemoBacktestingImage1 from "../../../../../../assets/demo_images/backtesting/1.png";
import DemoBacktestingImage2 from "../../../../../../assets/demo_images/backtesting/2.png";
import DemoBacktestingImage3 from "../../../../../../assets/demo_images/backtesting/3.png";
import DemoBacktestingImage4 from "../../../../../../assets/demo_images/backtesting/4.png";
import DemoInvestorImage0 from "../../../../../../assets/demo_images/investor/0.png";
import DemoInvestorImage1 from "../../../../../../assets/demo_images/investor/1.png";
import DemoInvestorImage2 from "../../../../../../assets/demo_images/investor/2.png";
import DemoInvestorImage3 from "../../../../../../assets/demo_images/investor/3.png";
import DemoInvestorImage4 from "../../../../../../assets/demo_images/investor/4.png";
import DemoInvestorImage5 from "../../../../../../assets/demo_images/investor/5.png";
import DemoInvestorImage6 from "../../../../../../assets/demo_images/investor/6.png";
import DemoJobsImage0 from "../../../../../../assets/demo_images/jobs/0.png";
import DemoJobsImage1 from "../../../../../../assets/demo_images/jobs/1.png";
import DemoJobsImage2 from "../../../../../../assets/demo_images/jobs/2.png";
import DemoJobsImage3 from "../../../../../../assets/demo_images/jobs/3.png";
import DemoJobsImage4 from "../../../../../../assets/demo_images/jobs/4.png";
import DemoPaperTradingImage0 from "../../../../../../assets/demo_images/paper_trading/0.png";
import DemoPaperTradingImage1 from "../../../../../../assets/demo_images/paper_trading/1.png";
import DemoPaperTradingImage2 from "../../../../../../assets/demo_images/paper_trading/2.png";

// List of images to display in the demo carousel
export const DEMO_IMAGES_INVESTOR = [
  {
    image: DemoInvestorImage0,
    caption:
      "Begin by pressing the Create Investor button in the bottom right corner of the screen.",
    id: 0,
  },
  {
    image: DemoInvestorImage1,
    caption: "Name your investor and select an investor type.",
    id: 1,
  },
  {
    image: DemoInvestorImage2,
    caption: "Select indicators and a trade frequency.",
    id: 2,
  },
  {
    image: DemoInvestorImage3,
    caption: "Learn more about indicators by pressing the tooltips.",
    id: 3,
  },
  {
    image: DemoInvestorImage4,
    caption:
      "Profit and loss stop dictates the threshold that must be met in order to cash out.",
    id: 4,
  },
  {
    image: DemoInvestorImage5,
    caption: "Select stocks for your investor to consider.",
    id: 5,
  },
  {
    image: DemoInvestorImage6,
    caption:
      "Make sure everything looks good before finalizing the creation process.",
    id: 6,
  },
];

export const DEMO_IMAGES_BACKTESTING = [
  {
    image: DemoBacktestingImage0,
    caption: "Begin by opening the investor from the Home Screen.",
    id: 0,
  },
  {
    image: DemoBacktestingImage1,
    caption: "Press the flask icon to begin the Backtest creation process.",
    id: 1,
  },
  {
    image: DemoBacktestingImage2,
    caption:
      "Select a time period and initial investment for the backtest then create the Backtest.",
    id: 2,
  },
  {
    image: DemoBacktestingImage3,
    caption: "Navigate to the Backtesting screen to see all of your Backtests.",
    id: 3,
  },
  {
    image: DemoBacktestingImage4,
    caption: "View the results!",
    id: 4,
  },
];

export const DEMO_IMAGES_JOBS = [
  {
    image: DemoJobsImage0,
    caption: "Begin by opening the Start Job modal.",
    id: 0,
  },
  {
    image: DemoJobsImage1,
    caption: "Provide a name and initial investment.",
    id: 1,
  },
  {
    image: DemoJobsImage2,
    caption: "View your new job via the Jobs tab.",
    id: 2,
  },
  {
    image: DemoJobsImage3,
    caption: "View details about your new job.",
    id: 3,
  },
  {
    image: DemoJobsImage4,
    caption: "Example of an existing job that has made trades",
    id: 4,
  },
];

export const DEMO_IMAGES_PAPER_TRADING = [
  {
    image: DemoPaperTradingImage0,
    caption: "By default you will be using the AlgoQuant Simulated Brokerage.",
    id: 0,
  },
  {
    image: DemoPaperTradingImage1,
    caption:
      "Connecting to Alpaca will give you a more realistic paper trading experience.",
    id: 1,
  },
  {
    image: DemoPaperTradingImage2,
    caption:
      "Users that are connected to Alpaca will see Alpaca Verified Buying Power instead of Simulated Buying Power.",
    id: 2,
  },
];
