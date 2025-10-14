import React, { useEffect } from "react";

const CoinTicker = () => {
  useEffect(() => {
    // Dynamically add the CoinGecko script only once
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script if component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        backgroundColor: "#111", // background for dark mode
        padding: "6px 0",
      }}
    >
      <gecko-coin-price-marquee-widget
        locale="en"
        dark-mode="true"
        outlined="true"
        coin-ids="bitcoin,ethereum,tether,plasma,binancecoin,aster-2,sui,chainopera-ai"
        initial-currency="usd"
      ></gecko-coin-price-marquee-widget>
    </div>
  );
};

export default CoinTicker;
