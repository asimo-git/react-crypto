import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Layout, List, Spin, Statistic } from "antd";
import { useEffect, useState } from "react";
import { fakeFetchAssets, fakeFetchCripto } from "../../api";
import { getPercentDifference } from "../../utils";
const { Sider } = Layout;

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
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
            totalProfit: (
              asset.amount * coin.price -
              asset.amount * asset.price
            ).toFixed(2),
            ...asset,
          };
        })
      );
      setLoading(false);
    }

    preload();
  }, []);

  if (loading) return <Spin fullscreen />;

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={asset.id}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "Total Profit", value: asset.totalProfit },
              { title: "Asset Amount", value: asset.amount },
              { title: "Difference", value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </List.Item>
            )}
          />
        </Card>
      ))}

      {/* <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card> */}
    </Sider>
  );
}
