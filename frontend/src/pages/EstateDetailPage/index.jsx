import EstateMetaCard from "components/EstateMetaCard";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import estate from "services/estate";
import { message as AntMessage } from "antd";
import VerificationCard from "components/VerificationCard";
import CertificateCard from "components/CertificateCard";
import EstateTransactionCard from "components/EstateTransactionCard";
import { MetamaskContext } from "context/MetmaskContext";
import {
  SecurityTokenContext,
  SecurityTokenProvider,
} from "context/SecurityTokenContext";

const EstateDetailPage = () => {
  const { estateId } = useParams();
  const [estateDetail, setEstateDetail] = useState({});
  const [balance, setBalance] = useState(0);

  const { currentAccount } = useContext(MetamaskContext);
  const { getSecurityTokenBatch } = useContext(SecurityTokenContext);

  const fetchDetail = async () => {
    if (!estateId || currentAccount === "") {
      return;
    }
    try {
      const result = await estate.getInformation({ estateId });
      setEstateDetail(result.data.estate);

      const balances = await getSecurityTokenBatch([estateId]);
      if (balances.length > 0) {
        setBalance(balances[0]);
      }
    } catch (err) {
      console.error(err);
      AntMessage.error("Cannot load estate information");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [currentAccount]);

  return (
    <>
      <div className="flex flex-row gap-x-2 w-full m-2">
        <EstateMetaCard
          className="w-9/12"
          {...estateDetail}
          balance={balance}
        />
        <VerificationCard className="w-3/12" {...estateDetail} />
      </div>
      <div className="flex flex-row min-h-full h-full gap-x-2 w-full m-2">
        <CertificateCard className="min-h-[600px] w-9/12" {...estateDetail} />
        <EstateTransactionCard
          className="min-h-[600px] w-3/12"
          {...estateDetail}
        />
      </div>
    </>
  );
};

export default EstateDetailPage;
