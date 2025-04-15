export async function fetchCripto() {
  try {
    const data = await fetch("/api/coins", {
      headers: {
        accept: "application/json",
        "X-API-KEY": "TsxGJIesuKiplGo02kDrWB7PKGuXj0el2oVC6bXolEU=",
      },
    });
    const cryptoData = await data.json();
    return cryptoData;
  } catch (error) {
    console.error("Error fetching data from openapiv1.coinstats.app", error);
    return { result: "error" };
  }
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
