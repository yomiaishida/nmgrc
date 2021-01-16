import React, { useState } from "react";

export const Game = () => {
  const [guessVal, setGuessVal] = useState(0);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  let [guessesLeft, setGuessesLeft] = useState(3);
  const [inputVal, setInputVal] = useState("Submit");
  const [disableInput, setDisableInput] = useState(false);
  const [msgColor, setMsgColor] = useState("");

  let min = 1,
    max = 10,
    styles = {
      color: msgColor,
    };

  const onChange = (e) => {
    setShowMsg(false);
    setGuessVal(e.target.value);
  };

  // Get winner number
  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onClick = (e) => {
    if (e.target.value === "Play Again") {
      setShowMsg(false);
      setMessage("");
      return window.location.reload();
    }
    let guess = parseInt(guessVal);
    let winningNum = getRandomNum(min, max);

    if (isNaN(guess) || guess < min || guess > max) {
      setShowMsg(true);
      setMsgColor("red");
      setMessage(`Please enter a number between ${min} and ${max}`);
    } else {
      // Check if won
      if (guess === winningNum) {
        setInputVal("Play Again");
        // Game over - won
        setMsgColor("green");
        setDisableInput(true);
        setShowMsg(true);
        setMessage(`${winningNum} is Correct, YOU'VE WON!`);
      } else {
        // Wrong number
        setGuessesLeft(guessesLeft - 1);

        if (guessesLeft === 0) {
          setDisableInput(true);
          setInputVal("Play Again");

          // Game over - lost
          setMsgColor("red");
          setShowMsg(true);
          setMessage(
            `Game over, you lost. The correct number was ${winningNum}`
          );
        } else {
          // Game continues - answer wrong

          // Clear input
          setGuessVal(0);
          // Tell user its the wrong number
          setMsgColor("red");
          setShowMsg(true);
          setMessage(
            `${guess} is not correct, ${guessesLeft} guess/guesses left`,
            "red"
          );
        }
      }
    }
  };

  return (
    <>
      <p>
        Guess a number between <span className="min-num">{min}</span> and
        <span className="max-num">{max}</span>
      </p>
      <div>
        <input
          type="number"
          value={guessVal}
          disabled={disableInput}
          onChange={onChange}
          placeholder="Enter your guess..."
        />
        <input type="submit" onClick={onClick} value={inputVal} />
      </div>
      <p className="message" style={styles}>
        {showMsg ? message : ""}
      </p>
    </>
  );
};
