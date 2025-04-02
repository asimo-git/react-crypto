import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useContext, useRef, useState } from "react";
import { CryptoContext } from "../context/crypto-context";
import CoinLine from "./CoinLine";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} in not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset);
    setSubmitted(true);
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        value="press / to open"
        onSelect={(value) => setCoin(crypto.find((coin) => coin.id === value))}
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
    );
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  return (
    <>
      <CoinLine coin={coin} />
      <Divider />

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        initialValues={{ price: +coin.price.toFixed(2) }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="Enter coin amount"
            style={{ width: "100%" }}
            onChange={handleAmountChange}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Date & time" name="date">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
