import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const Home = () => {
  const khaltiData = {
    return_url: "http://localhost:3000/success",
    website_url: "http://localhost:3000",
    amount: 1000,
    purchase_order_id: "order-id-123",
    purchase_order_name: "Milan Poudel",
  };

  const data = {
    amt: 1000, // Amount to be paid in NPR
    pdc: "ESW", // Payment Data Channel (eSewa Wallet)
    scd: "http://localhost:3000/success", // Success Callback URL
    fcd: "http://localhost:3000/success", // Failure Callback URL
    pid: "unique-payment-id", // Unique Payment ID (Transaction ID, for example)
    su: "unique-success-id", // Unique ID for Success Callback (optional)
    fu: "unique-failure-id", // Unique ID for Failure Callback (optional)
  };

  const handleKhaltiWithClient = async () => {
    axios
      .post("https://a.khalti.com/api/v2/epayment/initiate/", khaltiData, {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}}`,
        },
      })
      .then((response) => {
        // Handle the response from Khalti, and redirect users to the payment URL
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        alert("Error initiating payment:", error);
      });
  };

  const handleKhaltiWithServer = async () => {
    axios
      .post("/api/payment/khalti/initiate", khaltiData)
      .then((response) => {
        // Handle the response from Khalti, and redirect users to the payment URL
        console.log("the response data is", response?.data);
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        alert("Error initiating payment with khalti", error);
      });
  };

  const handleEsewaWithClient = async () => {
    axios
      .post("https://uat.esewa.com.np/epay/main", khaltiData)
      .then((response) => {
        // Handle the response from Khalti, and redirect users to the payment URL
        window.location.href = response.data.url;
      })
      .catch((error) => {
        alert("Error initiating payment with esewa", error);
      });
  };

  const handleEsewaWithServer = async () => {
    axios
      .post("/api/payment/esewa/initiate", khaltiData)
      .then((response) => {
        // Handle the response from Khalti, and redirect users to the payment URL
        console.log("the response data is", response?.data);
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        alert("Error initiating payment:", error);
      });
  };

  return (
    <div>
      <p>Welcome to e-payment</p>
      <button onClick={handleKhaltiWithClient}>
        Pay via Khalti with client
      </button>
      <button
        onClick={handleKhaltiWithServer}
        style={{
          marginRight: "50px",
        }}
      >
        Pay via Khalti with server
      </button>

      <button onClick={handleEsewaWithClient}>Pay via Esewa with client</button>
      <button onClick={handleEsewaWithServer}>Pay via Esewa with server</button>
    </div>
  );
};

export default Home;
