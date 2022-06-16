import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Input, message, Upload, Form } from "antd";
import MetamaskButton from "components/MetamaskButton";
import { useForm } from "antd/lib/form/Form";
const { Dragger } = Upload;
const { TextArea } = Input;

const EstateRegistryForm = ({className}) => {
  const onFinish = (data) => {
    console.log(data);
  };

  const draggerProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={`p-5 bg-white w-full rounded-xl ${className}`}>
      <h1>Registry form</h1>
      <hr className="m-2" />
      <Form onFinish={onFinish}>
        <div className="m-2">
          <h3>Title</h3>
          <Form.Item name="title">
            <Input size="large" placeholder="Real estate title" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <h3>Location</h3>
              <Form.Item name="location">
                <Input size="large" placeholder="City" />
              </Form.Item>
            </div>
            <div>
              <h3>Profit (APY)</h3>
              <Form.Item name="profit">
                <Input size="large" placeholder="10" />
              </Form.Item>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <h3>Land area (sqft)</h3>
              <Form.Item name="land_area">
                <Input size="large" placeholder="50" />
              </Form.Item>
            </div>
            <div>
              <h3>Construction area (sqft)</h3>
              <Form.Item name="construction_area">
                <Input size="large" placeholder="40" />
              </Form.Item>
            </div>
          </div>
          <h3>Short description</h3>
          <Form.Item name="description">
            <TextArea rows={4} placeholder="Description" maxLength={6} />
          </Form.Item>
        </div>
        <div className="m-2">
          <h3>Upload your Land use rights to verify</h3>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </div>
        <MetamaskButton className="m-2 w-full" />
        <Form.Item>
          <Button
            htmlType="submit"
            shape="round"
            type="primary"
            className="w-full m-2"
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EstateRegistryForm;
