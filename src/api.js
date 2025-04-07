import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCripto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}

export function fetchAssetsFromLocalStorage() {
  const data = localStorage.getItem("cryptoAssets");

  if (!data) return [];

  try {
    const parsedData = JSON.parse(data);

    return parsedData.map((asset) => ({
      ...asset,
      date: new Date(asset.date),
    }));
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return [];
  }
}
