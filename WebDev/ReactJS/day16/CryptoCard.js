import React from "react";

function CryptoCard({coin}) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div
      style={{
        width: "320px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#fff",
        padding: "20px",
        transition: "transform 0.3s ease",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={coin.image}
            alt={coin.name}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{coin.name}</h2>
            <p style={{ fontSize: "12px", color: "gray", textTransform: "uppercase" }}>
              {coin.symbol}
            </p>
          </div>
        </div>

        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            padding: "4px 8px",
            borderRadius: "8px",
            background: isPositive ? "#dcfce7" : "#fee2e2",
            color: isPositive ? "#16a34a" : "#dc2626",
          }}
        >
          {isPositive ? "↑" : "↓"} {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>

      {/* Price Section */}
      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontSize: "13px", color: "gray" }}>Current Price</p>
        <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>
          ₹ {coin.current_price.toLocaleString()}
        </h3>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          fontSize: "13px",
        }}
      >
        <div style={{ background: "#f9fafb", padding: "10px", borderRadius: "10px" }}>
          <p style={{ color: "gray" }}>Market Cap</p>
          <p style={{ fontWeight: "600" }}>₹ {(coin.market_cap / 1e9).toFixed(2)}B</p>
        </div>
        <div style={{ background: "#f9fafb", padding: "10px", borderRadius: "10px" }}>
          <p style={{ color: "gray" }}>24h Volume</p>
          <p style={{ fontWeight: "600" }}>₹ {(coin.total_volume / 1e9).toFixed(2)}B</p>
        </div>
        <div style={{ background: "#f9fafb", padding: "10px", borderRadius: "10px" }}>
          <p style={{ color: "gray" }}>24h High</p>
          <p style={{ fontWeight: "600" }}>₹ {coin.high_24h.toLocaleString()}</p>
        </div>
        <div style={{ background: "#f9fafb", padding: "10px", borderRadius: "10px" }}>
          <p style={{ color: "gray" }}>24h Low</p>
          <p style={{ fontWeight: "600" }}>₹ {coin.low_24h.toLocaleString()}</p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "gray",
        }}
      >
        <p>ATH: ₹ {coin.ath.toLocaleString()}</p>
        <p>ATL: ₹ {coin.atl.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CryptoCard;
