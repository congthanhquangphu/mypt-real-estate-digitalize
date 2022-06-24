import React from "react";
import AccountCard from "components/AccountCard";
import UserTransactionCard from "components/UserTransactionCard";
import BuyUtilityTokenCard from "components/BuyUtilityTokenCard";
import { UtitlityTokenProvider } from "context/UtilityTokenContext";
import { CrowdSaleProvider } from "context/CrowdSaleContext";

const UserPage = () => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-3/12">
          <UtitlityTokenProvider>
            <AccountCard className="m-2" />
            <CrowdSaleProvider>
              <BuyUtilityTokenCard className="m-2" />
            </CrowdSaleProvider>
          </UtitlityTokenProvider>
        </div>
        <UserTransactionCard className="m-2 w-9/12" />
      </div>
    </div>
  );
};

export default UserPage;
