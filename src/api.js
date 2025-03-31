import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchCripto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1000);
  });
}

export function fakeFetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1000);
  });
}
