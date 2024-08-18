"use client";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({ question, lowestId, highestId, id }) => {
  const [result, setResult] = useState(true);

  const handleChange = () => {
    setResult((prevResult) => !prevResult);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full cursor-pointer max-w-screen-lg  w-full">
      {result ? (
        <div
          className="text-left border-[0.1px] border-gray-400 p-10 rounded-md mb-10 shadow-md min-w-[50vw] min-h-[50vh] bg-slate-800  text-slate-300 w-full active:scale-[.98] transition-app duration-200"
          onClick={handleChange}
        >
          <h1 className="font-bold text-lg mb-4 overflow-hidden">
            {question.desc}
          </h1>
          <div className="space-y-2">
            {question.answers.map((ans, index) => (
              <p
                className="font-semibold text-base"
                key={index}
              >{`${String.fromCharCode(97 + index)}. ${ans}`}</p>
            ))}
          </div>
          <div className=" w-full flex justify-center mt-6">
            <button className="rounded-md bg-slate-900 text-gray-300 py-3 px-4 font-semibold hover:bg-black hover:scale-105 duration-300">
              See Answer
            </button>
          </div>
        </div>
      ) : (
        <div
          className="text-left border-[0.1px] 
          border-gray-400 p-10 rounded-md mb-10 shadow-md min-w-[50vw] min-h-[50vh] bg-slate-800 text-slate-300  w-full active:scale-[.98] transition-app duration-200"
          onClick={handleChange}
        >
          <h1 className="font-bold text-2xl mb-4">Result</h1>
          <p className="font-semibold text-lg"> {question.answer}</p>
          <div className=" w-full flex justify-center mt-6  relative top-24">
            <button className="rounded-md bg-slate-900 text-gray-300 py-3 px-4 font-semibold hover:bg-black hover:scale-105 duration-300 ">
              Back to Question
            </button>
          </div>
        </div>
      )}
      <div className="mt-4 flex space-x-4">
        <Link
          href={`/cards/${question.id - 1}`}
          className={`px-4 py-2 rounded ${
            id == lowestId
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          aria-disabled={id === lowestId}
        >
          Prev
        </Link>
        <Link
          href={`/cards/${question.id + 1}`}
          className={`px-4 py-2 rounded ${
            id == highestId
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          aria-disabled={id === highestId}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Card;
