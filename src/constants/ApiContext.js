import { AlgoQuant } from "algoquant/lib/AlgoQuant";
import React from "react";

const algoqant = new AlgoQuant();
const AlgoquantApiContext = React.createContext(algoqant);
export default AlgoquantApiContext;
