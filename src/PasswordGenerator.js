import React, { useState } from "react";
import "./style.css";

const PasswordGenerator = () => {
  const [length, setLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  function generatePassword() {
    const lower = includeLowercase;
    const upper = includeUppercase;
    const number = includeNumbers;
    const symbol = includeSymbols;

    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    setPassword(generatedPassword.slice(0, length));
  }

  function copyToClipboard() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <span id="result">{password}</span>
        <button className="btn" onClick={copyToClipboard}>
          <i className="far fa-clipboard"></i>
        </button>
      </div>

      <div className="settings">
        <div className="setting">
          <label>Password Length</label>
          <input
            type="number"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="setting">
          <label>Include uppercase letters</label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label>Include lowercase letters</label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label>Include numbers</label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label>Include symbols</label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>
      </div>

      <button className="btn btn-large" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
