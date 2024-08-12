"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCardForm() {
  const [desc, setDesc] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/createCard", {
        // Update this with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc, answers, answer }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const result = await response.json();
      console.log(result); // Handle successful response
      router.push("/admin"); // Redirect to a success page or another URL
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Card</h1>
      {error && <div className="mb-4 p-2 bg-red-200 text-red-800">{error}</div>}
      <form  className="space-y-4">
        <div>
          <label htmlFor="desc" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            className="w-full p-2 border border-gray-300 rounded"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="4"
            placeholder="Enter the question description"
          />
        </div>
        <div>
          <label htmlFor="answer" className="block text-gray-700">
            Answer
          </label>
          <input
            id="answer"
            className="w-full p-2 border border-gray-300 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            type="text"
            placeholder="Enter the answer"
          />
        </div>
        <div>
          <label htmlFor="answers" className="block text-gray-700">
            Answers
          </label>
          <textarea
            id="answers"
            className="w-full p-2 border border-gray-300 rounded"
            value={answers.join(", ")}
            onChange={(e) =>
              setAnswers(e.target.value.split(",").map((ans) => ans.trim()))
            }
            rows="4"
            placeholder="Enter possible answers separated by commas"
          />
        </div>
        <div>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>
            Create Card
          </button>
        </div>
      </form>
    </div>
  );
}
