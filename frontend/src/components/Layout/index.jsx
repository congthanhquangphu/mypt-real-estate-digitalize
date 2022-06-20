import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";

const Layout = ({ children }) => {
  return (
    <div className="overflow-x-scroll h-screen">
      <Header className="min-h-[5%]" />
      <div className="gradient-bg min-h-[95%] p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
