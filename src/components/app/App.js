import React, { useState, useEffect } from "react";
import "./App.scss";

import SelectCurrency from "../selectCurrency/SelectCurrency";

let proxyUrl = "https://cors-anywhere.herokuapp.com/";

function App() {
  const [amount, setAmount] = useState();
  const [currencies, setCurrencies] = useState();
  const [currency, setCurrency] = useState();
  const [converted, setConverted] = useState();

  useEffect(() => {
    fetch(
      proxyUrl +
        "https://cors-anywhere.herokuapp.com/https://currencyapi.net/api/v1/currencies?key=96eb982bfa3b24f0d312a544afd422c241e6"
    )
      .then(response => response.json())
      .then(response => setCurrencies(response.currencies))
      .catch(err => console.log(err));
  }, []);

  function handleAmountChange(e) {
    if (!isNaN(e.target.value) && e.target.value >= 0)
      setAmount(e.target.value);
    else setAmount("");
  }

  function handleCurrencyChange(value) {
    setCurrency(value);
  }

  function handleConvertClick(e) {
    e.preventDefault();
    if (amount && currency)
      try {
        fetch(
          proxyUrl +
            `https://currencyapi.net/api/v1/rates?key=96eb982bfa3b24f0d312a544afd422c241e6&base=USD&limit=${currency}`
        )
          .then(response => response.json())
          .then(response => {
            setConverted(
              (amount * response.rates[currency]).toFixed(3) + ` ${currency}`
            );
          })
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    else setConverted("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Currency (USD) convertion</p>
      </header>
      <main className="App-main">
        <form>
          <input
            type="text"
            defaultValue={amount}
            onChange={handleAmountChange}
          />
          <SelectCurrency
            currencies={currencies}
            active={currency}
            handleChange={handleCurrencyChange}
          />
          <button onClick={handleConvertClick}>Convert</button>
        </form>
        <p>{converted}</p>
      </main>
      <p>
        If dealing with CORS problem, please, install
        <a
          href="https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc"
          rel="noopener noreferrer"
          target="_blank"
        >
          Moesif Orign & CORS Changer
        </a>
        plugin for Chrome. Don't forget to turn if off after debuging!
      </p>
    </div>
  );
}

export default App;
