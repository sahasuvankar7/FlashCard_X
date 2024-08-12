"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateCard() {
  const [desc, setDesc] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(id);
    const result = {id, desc, answers, answer }
    try {
      const response = await fetch("/api/updateCard", {
        // Adjust the API route if needed
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful update
        router.push("/admin"); // Redirect to admin cards page or wherever you want
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to update card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Card</h1>
      {error && <div className="mb-4 p-2 bg-red-200 text-red-800">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Card"}
        </button>
      </form>
    </div>
  );
}
