import React, { useState, useEffect, useRef } from "react";
import "./MainTest.css";
import testImage from "../../../assets/admin.png";
import { useAuth } from "../../../hook/Context";
import { useNavigate } from "react-router-dom";

function MainTest() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const { fetchImages, getOptionValue, optionValue, fetchImage } = useAuth();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (value) => {
    setInputValue((prevValue) => prevValue + value);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    getOptionValue();
  }, []);

  useEffect(() => {
    console.log("Value is " + optionValue);
    localStorage.setItem("count", optionValue);
  }, [optionValue]);

  useEffect(() => {
    if (inputValue === "") {
      inputRef.current.focus();
    }
  }, [inputValue]);

  const handleImageFetch = async () => {
    var updateNumber = parseInt(localStorage.getItem("correctValue")) || 0;
    var incorrectNumber = parseInt(localStorage.getItem("incorrectValue")) || 0;
    try {
      const totalFetchNumber = parseInt(localStorage.getItem("count"));
      if (totalFetchNumber >= 1) {
        await fetchImages();
        var updatedNumber = totalFetchNumber - 1;
        localStorage.setItem("count", updatedNumber);

        const enteredInput = inputValue;
        setInputValue("");
        const imageName = fetchImage;
        const [correctNumber, ...realName] = imageName.split("-");
        if (correctNumber === enteredInput) {
          updateNumber += 1;
          localStorage.setItem("correctValue", updateNumber);
        } else {
          incorrectNumber += 1;
          localStorage.setItem("incorrectValue", incorrectNumber);
          // Store incorrect image name
          const incorrectImages = JSON.parse(localStorage.getItem("incorrectImages")) || [];
          incorrectImages.push(imageName);
          localStorage.setItem("incorrectImages", JSON.stringify(incorrectImages));
        }
      } else {
        navigate("/scorePage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleImageFetch();
    }
  };

  return (
    <>
      <section className="test-area">
        <div className="test-container">
          <div className="test-image">
            <figure className="test-random-image">
              <img src={`/uploads/${fetchImage}`} alt={fetchImage} />
            </figure>
          </div>
          <div className="test-buttons">
            <div className="test-input">
              <input
                type="text"
                value={inputValue}
                ref={inputRef}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Select / Enter Number"
                autoFocus
              />
            </div>
            <div className="button-grid">
              <div className="button-row">
                <button onClick={() => handleButtonClick("1")}>1</button>
                <button onClick={() => handleButtonClick("2")}>2</button>
                <button onClick={() => handleButtonClick("3")}>3</button>
              </div>
              <div className="button-row">
                <button onClick={() => handleButtonClick("4")}>4</button>
                <button onClick={() => handleButtonClick("5")}>5</button>
                <button onClick={() => handleButtonClick("6")}>6</button>
              </div>
              <div className="button-row">
                <button onClick={() => handleButtonClick("7")}>7</button>
                <button onClick={() => handleButtonClick("8")}>8</button>
                <button onClick={() => handleButtonClick("9")}>9</button>
              </div>
              <div className="button-row">
                <div className="spacer"></div>
                <button
                  className="zero-button"
                  onClick={() => handleButtonClick("0")}
                >
                  0
                </button>
                <button onClick={handleImageFetch} className="arrow-button">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainTest;