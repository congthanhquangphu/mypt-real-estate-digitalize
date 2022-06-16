import EstateRegistryForm from "components/EstateRegistryForm";
import PendingEstateCard from "components/PendingEstateCard";
import React from "react";

const PropertyRegistryPage = () => {
  return (
    <div className="flex flex-row gap-x-2 min-h-[80%] justify-center w-full">
      <EstateRegistryForm className="w-4/12 h-fit" />
      <PendingEstateCard className="w-8/12 min-h-full" />
    </div>
  );
};

export default PropertyRegistryPage;
