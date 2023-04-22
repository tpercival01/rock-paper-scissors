import "./styles.css";
import { useState, useEffect } from "react";
import rulesBG from "./images/image-rules.svg";
import closeIcon from "./images/icon-close.svg";
import paper from "./images/icon-paper.svg";
import rock from "./images/icon-rock.svg";
import scissors from "./images/icon-scissors.svg";

const get_score = localStorage.getItem("score")
  ? localStorage.getItem("score")
  : 0;

const App = () => {
  const [rules, setRules] = useState(false);
  const [userDecision, setUserDecision] = useState();
  const [houseDecision, setHouseDecision] = useState();
  const [winner, setWinner] = useState();
  const [score, setScore] = useState(get_score);

  const handleRules = () => {
    setRules((prevState) => !prevState);
  };

  const handleDecision = (e) => {
    setUserDecision(e.target.title);
    let house = "";
    const decisions = ["paper", "rock", "scissors"];
    const rand = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    house = decisions[rand];
    setTimeout(() => {
      setHouseDecision(decisions[rand]);
    }, 1000);

    setTimeout(() => {
      switch (e.target.title) {
        case "paper":
          console.log(e.target.title, house);
          if (house === "rock") {
            setWinner("user");
            setScore((prevState) => (prevState += 1));
            localStorage.setItem("score", parseInt(score) + 1);
          } else if (house === "scissors") {
            setWinner("house");
            if (score > 0) {
              setScore((prevState) => (prevState -= 1));
              localStorage.setItem("score", parseInt(score) - 1);
            }
          } else {
            setWinner("tie");
          }
          break;

        case "scissors":
          if (house === "rock") {
            setWinner("house");
            if (score > 0) {
              setScore((prevState) => (prevState -= 1));
              localStorage.setItem("score", parseInt(score) - 1);
            }
          } else if (house === "paper") {
            setWinner("user");
            setScore((prevState) => (prevState += 1));
            localStorage.setItem("score", parseInt(score) + 1);
          } else {
            setWinner("tie");
          }
          break;

        case "rock":
          if (house === "paper") {
            setWinner("house");
            if (score > 0) {
              setScore((prevState) => (prevState -= 1));
              localStorage.setItem("score", parseInt(score) - 1);
            }
          } else if (house === "scissors") {
            setWinner("user");
            setScore((prevState) => (prevState += 1));
            localStorage.setItem("score", parseInt(score) + 1);
          } else {
            setWinner("tie");
          }
          break;

        default:
          break;
      }
    }, 1500);
  };

  useEffect(() => {}, [score]);

  const handleReset = () => {
    setWinner("");
    setHouseDecision("");
    setUserDecision("");
  };

  return (
    <div className="App">
      {rules && (
        <div id="rules-model-container">
          <div id="rules-model">
            <div>
              <p>RULES</p>
              <span
                onClick={handleRules}
                style={{ backgroundImage: `url(${closeIcon})` }}
              ></span>
            </div>
            <div style={{ backgroundImage: `url(${rulesBG})` }}></div>
          </div>
        </div>
      )}
      <div id="score-container">
        <div>
          <p>ROCK</p>
          <p>PAPER</p>
          <p>SCISSORS</p>
        </div>
        <div>
          <p>SCORE</p>
          <p id="score-object">{score}</p>
        </div>
      </div>
      {!userDecision && (
        <div id="decision-container">
          <div id="paper" title="paper" onClick={handleDecision}>
            <div
              title="paper"
              style={{ backgroundImage: `url(${paper})` }}
            ></div>
          </div>
          <div id="scissors" title="scissors" onClick={handleDecision}>
            <div
              title="scissors"
              style={{ backgroundImage: `url(${scissors})` }}
            ></div>
          </div>
          <div id="rock" title="rock" onClick={handleDecision}>
            <div title="rock" style={{ backgroundImage: `url(${rock})` }}></div>
          </div>
        </div>
      )}
      {userDecision && (
        <div id="game-container">
          <div id="user-decision-container">
            <p>YOU PICKED</p>
            <div className="user-decision" id={`${userDecision}Chosen`}>
              {userDecision === "paper" && (
                <div style={{ backgroundImage: `url(${paper})` }}></div>
              )}
              {userDecision === "scissors" && (
                <div style={{ backgroundImage: `url(${scissors})` }}></div>
              )}
              {userDecision === "rock" && (
                <div style={{ backgroundImage: `url(${rock})` }}></div>
              )}
            </div>
          </div>
          {winner === "user" && (
            <div id="win-title">
              <p>YOU WIN</p>
              <span onClick={handleReset}>PLAY AGAIN</span>
            </div>
          )}
          {winner === "house" && (
            <div id="lose-title">
              <p>YOU LOSE</p>
              <span onClick={handleReset}>PLAY AGAIN</span>
            </div>
          )}

          {winner === "tie" && (
            <div id="tie-title">
              <p>YOU TIED</p>
              <span onClick={handleReset}>PLAY AGAIN</span>
            </div>
          )}
          <div id="house-decision-container">
            <p>THE HOUSE PICKED</p>
            <div className="house-decision" id={`${houseDecision}Chosen`}>
              {houseDecision === "paper" && (
                <div style={{ backgroundImage: `url(${paper})` }}></div>
              )}
              {houseDecision === "scissors" && (
                <div style={{ backgroundImage: `url(${scissors})` }}></div>
              )}
              {houseDecision === "rock" && (
                <div style={{ backgroundImage: `url(${rock})` }}></div>
              )}
            </div>
          </div>
        </div>
      )}
      <div id="rules-container" onClick={() => setRules(handleRules)}>
        Rules
      </div>
    </div>
  );
};

export default App;
