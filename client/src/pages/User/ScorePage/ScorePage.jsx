import React, { useEffect, useState } from "react";
import "./ScorePage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/Context";

function ScorePage() {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [incorrectImages, setIncorrectImages] = useState([]);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    const correctValue = parseInt(localStorage.getItem("correctValue") || 0);
    const incorrectValue = parseInt(
      localStorage.getItem("incorrectValue") || 0
    );
    const incorrectImages =
      JSON.parse(localStorage.getItem("incorrectImages")) || [];

    setCorrect(correctValue);
    setIncorrect(incorrectValue);
    setTotal(correctValue + incorrectValue);
    setIncorrectImages(incorrectImages);
  }, []);

  useEffect(() => {
    if (!scoreSaved) {
      const fetchScore = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/user/saveScore`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                correctValue: correct,
                totalImage: total,
              }),
              credentials:'include'
            }
          );

          const data = await response.json();

          if (response.ok) {
            setScoreSaved(true);
          } else {
            console.error("Error saving score:", data.msg);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      fetchScore();
    }
  }, [username, correct, total, scoreSaved]);

  const handleRetest = () => {
    localStorage.removeItem("correctValue");
    localStorage.removeItem("incorrectValue");
    localStorage.removeItem("incorrectImages");
    navigate("/mainTest");
  };

  const handleHome = () => {
    localStorage.removeItem("correctValue");
    localStorage.removeItem("incorrectValue");
    localStorage.removeItem("incorrectImages");
    navigate("/");
  };

  return (
    <>
      <div className="outer-container">
        <div className="test-stats">
          <div className="single-stats">
            <p className="correct">{correct}</p>
            <span>Correct</span>
          </div>
          <div className="single-stats">
            <p className="incorrect">{incorrect}</p>
            <span>Incorrect</span>
          </div>
          <div className="single-stats">
            <p className="total">{total}</p>
            <span>Total</span>
          </div>
        </div>
      </div>
      <div className="incorrect-images-container">
        {incorrectImages.length > 0 ? (
          <>
            <h3>You have incorrectly answered these images</h3>
          </>
        ) : (
          <>
            <h3>You have answered all images correctly</h3>
          </>
        )}
        <div className="images-wrapper">
          {incorrectImages.length > 0 ? (
            incorrectImages.map((image, index) => {
              const [correctAnswer, ...imageNameParts] = image.split("-");
              const imageName = imageNameParts.join("-");
              return (
                <div key={index} className="incorrect-image">
                  <img
                    src={`/uploads/${image}`}
                    alt={`Incorrect ${index + 1}`}
                  />
                  <p>Correct Answer: {correctAnswer}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="navigate-buttons">
        <button onClick={handleRetest}>Give Test Again</button>
        <button onClick={handleHome}>Go to Home</button>
      </div>
    </>
  );
}

export default ScorePage;
