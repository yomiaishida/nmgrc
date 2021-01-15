import React, { useState } from "react";

export const Game = () => {
  const [guessVal, setGuessVal] = useState(0);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  let [guessesLeft, setGuessesLeft] = useState(3);

  let min = 1,
    max = 10;

  // setWinNum(winningNum);

  const onChange = (e) => {
    setShowMsg(false);
    setGuessVal(e.target.value);
  };

  // Get winner number
  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onClick = () => {
    
    let guess = parseInt(guessVal);
    let winningNum = getRandomNum(min, max);
    console.log(typeof guessVal);
    console.log(winningNum);
    // if (guessVal == winningNum) {
    //   console.log("correct");
    // } else {
    //   guessesLeft -= 1;
    //   console.log(guessesLeft);
    //   console.log("wrong");
    // }
    if (isNaN(guess) || guess < min || guess > max) {
      setShowMsg(true);
      setMessage(`Please enter a number between ${min} and ${max}`);
    } else {
      // Check if won
      if (guess === winningNum) {
        // Game over - won
        setShowMsg(true);
        setMessage(`${winningNum} is Correct, YOU'VE WON!`);
      } else {
        // Wrong number
        setGuessesLeft(guessesLeft - 1);

        if (guessesLeft === 0) {
          // Game over - lost
          setShowMsg(true);
          setMessage(
            `Game over, you lost. The correct number was ${winningNum}`
          );
        } else {
          // Game continues - answer wrong

          // change border color

          // Clear input
          setGuessVal(0);
          setShowMsg(true);
          // Tell user its the wrong number
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
        Guess a number between <span className="min-num"></span> and
        <span className="max-num"></span>
      </p>
      <input
        type="number"
        value={guessVal}
        onChange={onChange}
        placeholder="Enter your guess..."
      />
      <input type="submit" onClick={onClick} value="Submit" />
      <p className="message">{showMsg ? message : ""}</p>
    </>
  );
};