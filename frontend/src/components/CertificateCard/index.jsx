import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";

const CertificateCard = (props) => {
  const className = props.className || "";
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className={`${className} bg-white rounded-xl w-full h-full p-4`}>
      <h1>Certificate</h1>
      <hr />
      <Document>
        <Page pageNumber={pageNumber}/>
      </Document>
    </div>
  );
};

export default CertificateCard;
