import React, { useContext, useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  message as AntMessage,
  Button,
  Input,
  InputNumber,
  Upload,
  Form,
} from "antd";
import MetamaskButton from "components/MetamaskButton";
import { useForm } from "antd/lib/form/Form";
import { existEmpty } from "utils/utils";
import * as estate from "services/estate";
import { MetamaskContext } from "context/MetamaskProvider";
const { TextArea } = Input;

const EstateRegistryForm = ({ className }) => {
  const { currentAccount } = useContext(MetamaskContext);
  const [form] = useForm();
  const [canSubmit, setCanSubmit] = useState(false);
  const [certificatePath, setCertificatePath] = useState("");

  const updateCanSubmit = () => {
    const data = form.getFieldsValue();
    data["register_address"] = currentAccount;
    data["certificate_path"] = certificatePath;

    if (existEmpty(data)) {
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);
  };

  useEffect(() => {
    updateCanSubmit();
  }, [currentAccount, certificatePath]);

  const uploadProps = {
    name: "certificate",
    maxCount: 1,
    action: "http://localhost:8080/estate/uploadCertificate",
    accept: "application/pdf",

    onChange(info) {
      const { status, response, name } = info.file;
      if (status === "done") {
        setCertificatePath(response.certificatePath);
        AntMessage.success(`${name} file uploaded successfully.`);
      } else if (status === "error") {
        setCertificatePath("");
        AntMessage.error(`${name} file upload failed.`);
      }
    },
  };

  const onFinish = (data) => {
    data["register_address"] = currentAccount;
    data["certificate_path"] = certificatePath;

    estate.registry(data, (err, res) => {
      if (err) {
        AntMessage.error("Registry failed");
        console.error(err);
        return;
      }
      AntMessage.success("Registry successful");
      form.resetFields();
      window.location.reload();
    });
  };

  return (
    <div className={`p-5 bg-white w-full rounded-xl ${className}`}>
      <h1>Registry form</h1>
      <hr className="m-2" />
      <Form onFinish={onFinish} onFieldsChange={updateCanSubmit} form={form}>
        <div className="m-2">
          <div className="grid grid-cols-2 gap-x-2">
            <h3>Title</h3>
            <h3>Number of tokens</h3>
            <Form.Item name="title">
              <Input size="large" placeholder="Real estate title" />
            </Form.Item>
            <Form.Item name="total_supply">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                size="large"
                placeholder="1000"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <h3>Location</h3>
            <h3>Profit (APY)</h3>
            <Form.Item name="location">
              <Input size="large" placeholder="City" />
            </Form.Item>
            <Form.Item name="profit">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                size="large"
                placeholder="10"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <h3>Land area (m<sup>2</sup>)</h3>
            <h3>Construction area (m<sup>2</sup>)</h3>
            <Form.Item name="land_area">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                size="large"
                placeholder="50"
              />
            </Form.Item>
            <Form.Item name="construction_area">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                size="large"
                placeholder="40"
              />
            </Form.Item>
          </div>
          <h3>Short description</h3>
          <Form.Item name="description">
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </div>
        <div className="m-2">
          <h3>Certificate of land use rights</h3>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select PDF file</Button>
          </Upload>
        </div>
        <MetamaskButton className="m-2 w-full" />
        <Form.Item>
          <Button
            htmlType="submit"
            shape="round"
            type="primary"
            className="w-full m-2"
            size="large"
            disabled={!canSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EstateRegistryForm;
