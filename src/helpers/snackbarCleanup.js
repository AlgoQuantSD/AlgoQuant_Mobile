import React from "react";

export function snackbarCleanUp(setIsVisible, setMessage) {
  setIsVisible(false);
  setMessage(null);
}
