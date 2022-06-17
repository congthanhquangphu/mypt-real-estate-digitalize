import EstateRegistryForm from "components/EstateRegistryForm";
import UploadedEstateCard from "components/UploadedEstateCard";
import React, { useState, useEffect } from "react";

const EstateRegistryPage = () => {

  return (
    <div className="flex flex-row gap-x-2 min-h-[80%] justify-center w-full">
      <EstateRegistryForm className="w-4/12 h-fit" />
      <UploadedEstateCard className="w-8/12 min-h-full" />
    </div>
  );
};

export default EstateRegistryPage;
