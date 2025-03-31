import { Layout } from "antd";
const { Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
  padding: "1rem",
};

export default function AppContent() {
  return <Content style={contentStyle}>content</Content>;
}
