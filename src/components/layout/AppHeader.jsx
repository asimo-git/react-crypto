import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../context/crypto-context";
import AddAssetForm from "../AddAssetForm";
import CoinInfoModal from "../CoinInfoModal";
const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#4096ff",
};

export default function AppHeader() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { crypto } = useContext(CryptoContext);

  useEffect(() => {
    const toggleSelectOnPressKey = (event) => {
      if (event.key === "/") {
        setIsSelectOpen((prev) => !prev);
      }
    };
    document.addEventListener("keypress", toggleSelectOnPressKey);

    return () =>
      document.removeEventListener("keypress", toggleSelectOnPressKey);
  }, []);

  function handleSelect(value) {
    setSelectedCoin(crypto.find((coin) => coin.id === value));
    setIsModalOpen(true);
  }
  return (
    <Header style={headerStyle}>
      {" "}
      <Select
        open={isSelectOpen}
        style={{ width: 250 }}
        value="press / to open"
        onSelect={handleSelect}
        onClick={() => setIsSelectOpen((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add asset
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={selectedCoin} />
      </Modal>
      <Drawer onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen}>
        <AddAssetForm />
      </Drawer>
    </Header>
  );
}
