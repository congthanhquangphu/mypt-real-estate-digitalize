import React, { useEffect } from "react";
import TokenCard from "../../components/TokenCard";
import { useState } from "react";

const HomePage = () => {
  const [tokenIcon, setTokenIcon] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [totalSupply, setTotalSupply] = useState();

  return (
    <>
      <div>
        Home page
      </div>
    </>
  );
};

export default HomePage;
