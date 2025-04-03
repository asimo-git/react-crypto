import { Layout, Spin, Flex } from "antd";
import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) return <Spin fullscreen />;

  return (
    <Layout>
      <AppHeader />
      <Layout
        style={{ backgroundColor: "#001529", minHeight: "calc(100vh - 60px)" }}
      >
        <Flex wrap justify="center" style={{ width: "100%" }}>
          <AppSider />
          <AppContent style={{ flex: 1 }} />
        </Flex>
      </Layout>
    </Layout>
  );
}
