"use client";

import React from "react";
import Image from "next/image";
import Div from "../../components/Div";
import Text from "../../components/Text";

const MemoDashboard: React.FC = () => {
  return (
    <Div id="items" className="items">
      <React.Fragment>
        <Div id="widget-courses" className="widget">
          <Image
            src="/dashboards/pexels-tirachard-kumtanom-733856.jpg"
            alt="My Courses"
            width={289}
            height={296}
          />
          <Text>My Courses</Text>
        </Div>
        <Div id="widget-wallet" className="widget">
          <Image
            src="/dashboards/SingleCashPocket-ClassicWallet-StuffedwithCardsandCash.jpg"
            alt="Wallet"
            width={815}
            height={297}
          />
          <Text>My wallet</Text>
        </Div>
        <Div id="widget-certificates" className="widget">
          <Image
            src="/dashboards/certif.jpg"
            alt="My Certificates"
            width={442}
            height={316}
          />
          <Text>Certificates</Text>
        </Div>
        <Div id="widget-statistics" className="widget">
          <Image
            src="/dashboards/stat.svg"
            alt="Statistics"
            width={680}
            height={372}
          />
        </Div>
      </React.Fragment>
    </Div>
  );
};

export default MemoDashboard;
