import { createContext, useEffect, useState } from "react";
import { fetchCripto, fetchAssetsFromLocalStorage } from "../api";
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
  const [cryptoPriceMap, setCryptoPriceMap] = useState({});

  const makeAsset = (asset, crypto) => {
    const coin = crypto.find((currency) => currency.id === asset.id);
    return {
      grow: asset.price < coin.price,
      growPercent: getPercentDifference(asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      name: coin.name,
      ...asset,
    };
  };

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCripto();
      const assets = fetchAssetsFromLocalStorage();
      setCrypto(result);
      setAssets(assets.map((asset) => makeAsset(asset, result)));
      setCryptoPriceMap(
        result.reduce((sum, coin) => {
          sum[coin.id] = coin.price;
          return sum;
        }, {})
      );
      setLoading(false);
    }

    preload();
  }, []);

  const addAsset = (asset) => {
    const newAssets = [...assets, makeAsset(asset, crypto)];
    setAssets(newAssets);
    localStorage.setItem("cryptoAssets", JSON.stringify(newAssets));
  };

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets, addAsset, cryptoPriceMap }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
