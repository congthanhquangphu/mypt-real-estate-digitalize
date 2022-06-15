import EstateRegistryForm from "components/EstateRegistryForm";
import PendingEstateCard from "components/PendingEstateCard";
import YourPropertyCard from "components/PendingEstateCard";
import React from "react";

const PropertyRegistryPage = () => {
  return (
    <div className="flex flex-row gap-x-2 min-h-[80%] justify-center w-full">
      <EstateRegistryForm className="w-1/2 h-fit" />
      <PendingEstateCard className="w-1/2 min-h-full" />
    </div>
  );
};

export default PropertyRegistryPage;
