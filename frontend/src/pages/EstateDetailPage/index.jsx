import EstateMetaCard from "components/EstateMetaCard";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getInformation } from "services/estate";
import { message as AntMessage } from "antd";
import VerificationCard from "components/VerificationCard";
import CertificateCard from "components/CertificateCard";
import EstateTransactionCard from "components/EstateTransactionCard";
import { MetamaskContext } from "context/MetamaskProvider";

const EstateDetailPage = () => {
  const { estate_id } = useParams();
  const [estateDetail, setEstateDetail] = useState({});
  const [balance, setBalance] = useState(0);
  const { currentAccount, getSecurityTokenBatch } = useContext(MetamaskContext);

  const fetchDetail = async () => {
    const data = {
      estate_id: estate_id,
    };
    await getInformation(data, async (err, res) => {
      if (err) {
        AntMessage.error("Cannot load estate information");
        return;
      }

      setEstateDetail(res.data.estate);
    });

    const balances = await getSecurityTokenBatch([estate_id]);
    if (balances.length > 0) {
      setBalance(balances[0]);
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
