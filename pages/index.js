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

  const handleKhaltiWithClient = () => {
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

  const handleKhaltiWithServer = () => {
    axios
      .post("/khalti/initiate", khaltiData)
      .then((response) => {
        // Handle the response from Khalti, and redirect users to the payment URL
        console.log("the response data is", response?.data);
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        alert("Error initiating payment with khalti", error);
      });
  };

  const handleEsewaWithClient = () => {
    const path = "https://uat.esewa.com.np/epay/main";
    const params = {
      amt: 7,
      psc: 1,
      pdc: 1,
      txAmt: 1,
      tAmt: 10,
      pid: "prod-147-15912345-7",
      scd: "EPAYTEST",
      su: "http://localhost:3000/success",
      fu: "http://localhost:3000/failure",
    };

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  //   const path = "https://uat.esewa.com.np/epay/main";
  //   const params = {
  //     amt: 100,
  //     psc: 0,
  //     pdc: 0,
  //     txAmt: 0,
  //     tAmt: 100,
  //     pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
  //     scd: "EPAYTEST",
  //     su: "http://merchant.com.np/page/esewa_payment_success",
  //     fu: "http://merchant.com.np/page/esewa_payment_failed",
  //   };

  //   try {
  //     await axios.post(path, params);
  //     // Handle success, such as showing a success message or redirecting the user.
  //     console.log("Payment request sent successfully.");
  //   } catch (error) {
  //     // Handle error, such as showing an error message or logging the error.
  //     console.error("Payment request failed:", error);
  //   }
  // };

  return (
    <div>
      <p>Welcome to e-payment</p>
      <button
        onClick={handleKhaltiWithClient}
        style={{
          display: "none",
        }}
      >
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
    </div>
  );
};

export default Home;
