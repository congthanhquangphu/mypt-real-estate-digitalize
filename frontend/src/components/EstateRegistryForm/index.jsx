import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Input, message, Upload } from "antd";
import MetamaskButton from "components/MetamaskButton";
const { Dragger } = Upload;
const { TextArea } = Input;

const EstateRegistryForm = () => {
  const props = {
    name: "file",
    multiple: true,
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
    <div className="p-5 bg-white w-full rounded-xl">
      <h1>Registry form</h1>
      <hr className="m-2" />
      <div className="m-2">
        <div>
          <h3>Title</h3>
          <Input size="large" placeholder="Real estate title" />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <h3>Location</h3>
            <Input size="large" placeholder="City" />
          </div>
          <div>
            <h3>Profit (APY)</h3>
            <Input size="large" placeholder="10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <h3>Land area (sqft)</h3>
            <Input size="large" placeholder="50" />
          </div>
          <div>
            <h3>Construction area (sqft)</h3>
            <Input size="large" placeholder="40" />
          </div>
        </div>
      </div>
      <div className="m-2">
        <h3>Short description</h3>
        <TextArea rows={4} placeholder="Description" maxLength={6} />
      </div>
      <div className="m-2">
        <h3>Upload your Land use rights to verify</h3>
        <Dragger {...props}>
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
      <Button shape="round" type="primary" className="w-full m-2" size="large">
        Submit
      </Button>
    </div>
  );
};

export default EstateRegistryForm;
