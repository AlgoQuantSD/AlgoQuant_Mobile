// This context is used to have :global" Algoquant object from
// the Alqoquant_SDK that contains all the axios api request.
// Reducing passing props and prop dependencies.
import React from "react";

const AlgoquantApiContext = React.createContext();
export default AlgoquantApiContext;
