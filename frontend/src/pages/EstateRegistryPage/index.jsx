import EstateRegistryForm from "components/EstateRegistryForm";
import YourPropertyCard from "components/YourPropertyCard";
import React from "react";

const PropertyRegistryPage = () => {
  return (
    <div className="flex flex-row gap-x-2 min-h-screen justify-center w-full">
      <EstateRegistryForm className="w-1/2 h-fit" />
      <YourPropertyCard className="w-1/2 min-h-full" />
    </div>
  );
};

export default PropertyRegistryPage;
