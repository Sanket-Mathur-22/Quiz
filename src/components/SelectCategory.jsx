import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectCategory = () => {
  const [list, setList] = useState({});
  const [keys, setKeys] = useState([]);
  const [score, setScore] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate("");

  const getList = async () => {
    const response = await fetch("https://api.essaychecker.ai/quiz/packs/");
    const data = await response.json();

    // console.log(Object.keys(data.data));
    setKeys(Object.keys(data.data));
    setList(data);
  };

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };

  const handleClick = () => {
    if (category) {
      localStorage.setItem("score", 0);
      navigate(`/play/${category}`);
    } else {
      alert("Please select an option to continue.");
    }
  };

  const handleReset = () => {
    localStorage.setItem("score", 0)
    setScore(0);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div id="main">
        <div id="category-div">
          <div>
            <h1>Quiz App</h1>
          </div>
          <div id="option-div">
            {list.data ? (
              <>
                {localStorage.getItem("score") != 0 ? (
                  <h3>Your Score : {localStorage.getItem("score")}</h3>
                ) : (
                  ""
                )}
                <select
                  id="dropdown"
                  value={category}
                  onChange={handleSelectChange}
                >
                  <option value="">Select an option</option>
                  {keys.map((type, index) => {
                    const pack = list.data[type];

                    return (
                      <option key={index} value={type}>
                        {pack.desc}
                      </option>
                    );
                  })}
                </select>

                <button id="play-btn" onClick={handleClick}>
                  Start Quiz
                </button>
                <button id="reset-btn" onClick={handleReset}>
                  Reset Score
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectCategory;
