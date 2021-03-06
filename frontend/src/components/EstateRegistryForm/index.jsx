import React, { useContext, useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { notification, Button, Input, InputNumber, Upload, Form } from "antd";
import { useForm } from "antd/lib/form/Form";

import MetamaskButton from "components/MetamaskButton";
import utils from "utils/utils";
import estate from "services/estate";
import { MetamaskContext } from "context/MetmaskContext";

const { TextArea } = Input;

const EstateRegistryForm = (props) => {
  const className = props.className || "";
  const { currentAccount } = useContext(MetamaskContext);

  const [form] = useForm();
  const [canSubmit, setCanSubmit] = useState(false);
  const [certificatePath, setCertificatePath] = useState("");

  const updateCanSubmit = () => {
    const data = form.getFieldsValue();
    data["registerAddress"] = currentAccount;
    data["certificatePath"] = certificatePath;

    if (utils.existEmpty(data)) {
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
        notification["success"]({
          message: "Upload certificate",
          description: `${name} file uploaded successfully.`,
        });
      } else if (status === "error") {
        setCertificatePath("");
        notification["error"]({
          message: "Upload certificate",
          description: `${name} file upload failed.`,
        });
      }
    },
  };

  const onFinish = async (data) => {
    data["registerAddress"] = currentAccount;
    data["certificatePath"] = certificatePath;

    try {
      await estate.registry(data);

      notification["success"]({
        message: "Registry estate",
        description: `Registry successful.`,
      });
      form.resetFields();
      window.location.reload();
    } catch (err) {
      console.error(err);
      notification["error"]({
        message: "Registry estate",
        description: `Registry failed.`,
      });
    }
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
            <Form.Item name="totalSupply">
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
            <h3>
              Profit <br />
              (Annual percentage yield)
            </h3>
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
            <h3>
              Land area (m<sup>2</sup>)
            </h3>
            <h3>
              Construction area (m<sup>2</sup>)
            </h3>
            <Form.Item name="landArea">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                size="large"
                placeholder="50"
              />
            </Form.Item>
            <Form.Item name="constructionArea">
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
