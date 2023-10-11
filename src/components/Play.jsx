import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyData from "../dummyData.json"

const Play = () => {
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionArray, setQuestionArray] = useState([]);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate("");

  const getData = async (pack) => {
    // const response = await fetch(
    //   `https://api.essaychecker.ai/quiz/packs/?id=${pack}`
    // );

    // const data = await response.json();

    setQuestions(dummyData);
    setQuestionArray(Object.keys(dummyData.data));
    setTotalScore(Object.keys(dummyData.data).length);
    localStorage.setItem("score", 0);

    // console.log(data);
    // console.log(Object.keys(data.data));
  };

  const handleQuit = () => {
    localStorage.setItem("score", 0);
    navigate("/");
  };

  const countScore = (item) => {

    if (item == questions.data[questionArray[currentQuestion]].ans) {

      setScore((prevScore) => {
        return prevScore + 1;
      });
    }

    handleNext();
  };

  const handleNext = () => {
    console.log(totalScore, currentQuestion + 1);

    if (totalScore == currentQuestion + 1) {
      localStorage.setItem("score", score);
      navigate("/");
    }

    setCurrentQuestion((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    //Extracting URL
    const currentURL = new URL(window.location.href);
    const pathname = currentURL.pathname;
    const partsArray = pathname.split("/");
    const lastPart = partsArray.pop();

    getData(lastPart);
  }, []);

  return (
    <>
      <div id="main">
        <div id="category-div">
          <div id="score-div">
            {questions.data ? (
              <h4>
                Q.{currentQuestion + 1}{" "}
                {questions.data[questionArray[currentQuestion]].q} :{" "}
                {questions.data[questionArray[currentQuestion]].word}
              </h4>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div id="answer-div">
            {questions.data ? (
              <>

                  <p onClick={() => countScore("a")}>
                    {
                      questions.data[questionArray[currentQuestion]].options.a
                        .word
                    }
                  </p>

                  <p onClick={() => countScore("b")}>
                    {
                      questions.data[questionArray[currentQuestion]].options.b
                        .word
                    }
                  </p>



                  <p onClick={() => countScore("c")}>
                    {
                      questions.data[questionArray[currentQuestion]].options.c
                        .word
                    }
                  </p>
                  <p onClick={() => countScore("d")}>
                    {
                      questions.data[questionArray[currentQuestion]].options.d
                        .word
                    }
                  </p>


              </>
            ) : (
              <p>Loading...</p>
            )}

            
          </div>
          <div id="traverse-div">

              {/* <button
                  style={{ backgroundColor: "#cc336b", color: "white" }}
                  onClick={handleQuit}
                >
                  Quit
                </button> */}

              <button
                style={{ backgroundColor: "#46B8B9", color: "white" }}
                onClick={handleNext}
              >
                Continue
              </button>

            </div>
        </div>
      </div>
    </>
  );
};

export default Play;
