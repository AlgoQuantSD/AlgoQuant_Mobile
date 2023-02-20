import React from "react";

// Chunks down arrays into a desired dimension
// Use case: You have an array of data that has 20 items but you want to display it in columns
// where each column has 5 items
export function chunker(data, chunkSize) {
  const chunks = data.reduce((acc, cur, i) => {
    const idx = Math.floor(i / chunkSize);
    if (!acc[idx]) {
      acc[idx] = [];
    }
    acc[idx].push(cur);
    return acc;
  }, []);
  return chunks;
}
