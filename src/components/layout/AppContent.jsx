import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Flex, Layout, List, Statistic, Tag, Typography } from "antd";
import { capitalize } from "../../utils";

const contentStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  padding: "1rem",
};

export default function AppContent() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Content style={contentStyle}>
      <Flex gap="middle" wrap justify="space-evenly">
        {assets.map((asset) => (
          <Card
            key={asset.id}
            style={{
              marginBottom: "1rem",
              width: 320,
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#001529",
                  }}
                >
                  {capitalize(asset.id)}
                </span>
              }
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span style={{ marginRight: 20 }}>{item.title} </span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Flex>
    </Layout.Content>
  );
}
