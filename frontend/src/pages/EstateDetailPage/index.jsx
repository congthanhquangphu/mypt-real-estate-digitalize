import EstateDetailCard from "components/EstateDetailCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInformation } from "services/estate";
import { message as AntMessage } from "antd";
import VerificationCard from "components/VerificationCard";

const EstateDetailPage = () => {
  const { estate_id } = useParams();
  const [estateDetail, setEstateDetail] = useState({});

  const fetchDetail = () => {
    const data = {
      estate_id: estate_id,
    };
    getInformation(data, (err, res) => {
      if (err) {
        AntMessage.error("Cannot load estate information");
        return;
      }

      setEstateDetail(res.data.estate);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-x-2 w-full">
        <EstateDetailCard {...estateDetail} className="w-9/12" />
        <VerificationCard className="w-3/12" {...estateDetail} />
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default EstateDetailPage;
