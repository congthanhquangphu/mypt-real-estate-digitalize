import TokenCard from "components/TokenCard";
import TokenSellCard from "components/TokenSellCard";
import React from "react";

const TokenPage = () => {
  return (
    <div className="flex flex-row gap-x-2 min-h-screen justify-center w-full">
      {/* <TokenSellCard className="w-1/2 h-fit" /> */}
      <TokenCard className="w-1/2 min-h-full" />
    </div>
  );
};

export default TokenPage;
