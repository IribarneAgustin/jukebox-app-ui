import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const Payment = () => {
  const [preferenceId, setPreferenceId] = useState();

  initMercadoPago("TEST-c2a8b2c6-e634-44b6-b5af-7b150e92222f");

  const createPreference = async () => {
    const trackInfoDTO = {
      "trackUri": "spotify:track:3AJwUDP919kvQ9QcozQPxg",
      "trackName": "Coldplay",
      "artistName": "Yellow"
    };
    
    try {
      const response = await fetch("/api/payment/generatePaymentId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackInfoDTO),
      })
      if(response.ok){
      return response.text();}
      else {
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h3>Track request</h3>
          <p>100 $</p>
          <button onClick={handleBuy}>Buy</button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  );
};

export default Payment;
