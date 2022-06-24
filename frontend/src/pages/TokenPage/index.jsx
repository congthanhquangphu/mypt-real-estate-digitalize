import TokenCard from "components/TokenCard";
import { SecurityTokenProvider } from "context/SecurityTokenContext";
import React from "react";

const TokenPage = () => {
  return (
    <div className="flex flex-row gap-x-2 min-h-screen justify-center w-full">
      <SecurityTokenProvider>
        <TokenCard className="w-1/2 min-h-full" />
      </SecurityTokenProvider>
    </div>
  );
};

export default TokenPage;
