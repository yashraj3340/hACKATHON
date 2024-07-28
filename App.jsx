import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runModel = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/run-model");
      setResults(response.data);
    } catch (err) {
      setError("Error running model: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1> Resource Allocation Model </h1>{" "}
      <button onClick={runModel} disabled={loading}>
        {" "}
        {loading ? "Running..." : "Run Model"}{" "}
      </button>{" "}
      {error && <p className="error"> {error} </p>}{" "}
      {results && (
        <div>
          <h2> Results: </h2> <h3> Model Evaluation: </h3>{" "}
          <p> MSE: {results.model_evaluation.mse} </p>{" "}
          <p> R2: {results.model_evaluation.r2} </p>{" "}
          <h3> Feature Importance: </h3>{" "}
          <ul>
            {" "}
            {results.feature_importance.map((feature, index) => (
              <li key={index}>
                {" "}
                {feature.feature}: {feature.importance}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
          <h3> Department Data(First 10 entries): </h3>{" "}
          <table>
            <thead>
              <tr>
                <th> Department </th> <th> Expenditure </th> <th> Utility </th>{" "}
                <th> Risk </th> <th> Priority </th>{" "}
                <th> Optimal Allocation </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {results.department_data.slice(0, 10).map((dept, index) => (
                <tr key={index}>
                  <td> {dept.Department} </td> <td> {dept.Expenditure} </td>{" "}
                  <td> {dept.Utility} </td> <td> {dept.Risk} </td>{" "}
                  <td> {dept.Priority} </td>{" "}
                  <td> {dept.Optimal_Allocation} </td>{" "}
                </tr>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default App;
