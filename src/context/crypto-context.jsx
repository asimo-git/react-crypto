import { createContext, useEffect, useState } from "react";
import { fakeFetchAssets, fakeFetchCripto } from "../api";
import { getPercentDifference } from "../utils";

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCripto();
      const assets = await fakeFetchAssets();

      setCrypto(result);
      setAssets(
        assets.map((asset) => {
          const coin = result.find((currency) => currency.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: getPercentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      );
      setLoading(false);
    }

    preload();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
}
