import { Layout, Typography } from "antd";
import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";

const siderStyle = {
  padding: "1rem",
  backgroundColor: "#001529",
};

export default function AppSider() {
  const { assets, cryptoPriceMap } = useContext(CryptoContext);

  return (
    <Layout.Sider width="320px" style={siderStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
    </Layout.Sider>
  );
}
