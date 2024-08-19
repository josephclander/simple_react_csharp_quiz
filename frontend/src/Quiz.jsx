import { useState } from "react";

const Quiz = () => {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5154/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });

    const data = await response.json();
    setResult(data.message);
    setAnswers({ q1: "", q2: "", q3: "" }); // Resetting radio buttons
  };

  return (
    <div>
      <h1>Quiz</h1>
      <div>
        <p>1. What is the sum of 4 + 5?</p>
        <label>
          <input
            type="radio"
            name="q1"
            value="A"
            onChange={handleChange}
            checked={answers.q1 === "A"}
          />{" "}
          45
        </label>
        <label>
          <input
            type="radio"
            name="q1"
            value="B"
            onChange={handleChange}
            checked={answers.q1 === "B"}
          />{" "}
          20
        </label>
        <label>
          <input
            type="radio"
            name="q1"
            value="C"
            onChange={handleChange}
            checked={answers.q1 === "C"}
          />{" "}
          9
        </label>
      </div>

      <div>
        <p>2. What is the longest side of a right-angled triangle called?</p>
        <label>
          <input
            type="radio"
            name="q2"
            value="A"
            onChange={handleChange}
            checked={answers.q2 === "A"}
          />{" "}
          Hypotenuse
        </label>
        <label>
          <input
            type="radio"
            name="q2"
            value="B"
            onChange={handleChange}
            checked={answers.q2 === "B"}
          />{" "}
          Adjacent
        </label>
        <label>
          <input
            type="radio"
            name="q2"
            value="C"
            onChange={handleChange}
            checked={answers.q2 === "C"}
          />{" "}
          Opposite
        </label>
      </div>

      <div>
        <p>3. What is 3 to the power of 2?</p>
        <label>
          <input
            type="radio"
            name="q3"
            value="A"
            onChange={handleChange}
            checked={answers.q3 === "A"}
          />{" "}
          9
        </label>
        <label>
          <input
            type="radio"
            name="q3"
            value="B"
            onChange={handleChange}
            checked={answers.q3 === "B"}
          />{" "}
          6
        </label>
        <label>
          <input
            type="radio"
            name="q3"
            value="C"
            onChange={handleChange}
            checked={answers.q3 === "C"}
          />{" "}
          5
        </label>
      </div>

      <button onClick={handleSubmit}>Submit Answers</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default Quiz;
