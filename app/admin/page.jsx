"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    getAllCards();
  }, []);

  async function getAllCards() {
    setLoading(true);
    const res = await fetch("/api/getAllCards");
    const card = await res.json();
    if (!res.ok) {
      throw new Error("couldn't get card");
    }
    setCards(card);
    setLoading(false);
  }

  async function deleteCards(id) {
    const pervCards = cards;
    const newCards = pervCards.filter((card) => card.id !== id);
    setCards(newCards);

    // posr request to delete card

    const res = await fetch("/api/deleteCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    console.log(res);
    if (res.ok) {
    } else {
      setCards(pervCards);
      throw new Error("couldn't delete card");
    }
  }

  // updating card
  async function updateCard(id) {
    router.push(`/admin/update/${id}`); // navigate through that page
  }

  return (
    <div className="flex justify-center items-center w-full  min-h-screen  bg-gray-100 p-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-start">
          {cards.map((card) => (
            <div key={card.id} className="rounded-lg shadow-lg bg-white p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  {card.desc}
                </h1>
                <div className="mt-2">
                  {card.answers.map((answer, index) => (
                    <p key={index} className="text-gray-600">
                      {`${index + 1}. ${answer}`}
                    </p>
                  ))}
                </div>

                <div className="py-3 ">
                  <span>Ans : {card.answer}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  className="rounded-lg border-[1px] border-blue-500 bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600"
                  onClick={() => updateCard(card.id)}
                >
                  Update
                </button>
                <button
                  onClick={() => deleteCards(card.id)}
                  className="rounded-lg border-[1px] border-red-500 bg-red-500 text-white px-4 py-2 font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
