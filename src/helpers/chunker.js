import React from "react";

// Chunks down arrays into a desired dimension
// Use case: You have an array of data that has 20 items but you want to display it in columns
// where each column has 5 items
export function chunker(data, chunkSize) {
  // while the data is undefined or null (like when the data is still being fetched) just return an empty array,
  // this is to prevent this function from accessing nonexisiting data and causing an error
  if (data === undefined || data === null) {
    return [];
  }
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
