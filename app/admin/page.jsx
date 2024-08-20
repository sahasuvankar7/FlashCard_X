"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

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
      toast({
        title: "Success",
        description: "Card deleted successfully",
        type: "success",
        duration:9000,
        className:"bg-green-600 text-white"

      })
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
    <div className="flex justify-center items-center w-full  min-h-screen  p-8">
      {loading ? (
        <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div class="flex justify-center">
            <div
              class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full justify-start  ">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg flex flex-row justify-between  items-center shadow-lg bg-slate-800 p-6 gap-4 border-[0.1px] border-gray-300"
            >
              <div className="flex flex-col justify-center text-slate-300 items-center ">
                <h1 className="text-lg font-mono font-medium overflow-hidden ">
                  {card.desc}
                </h1>
              </div>
              <div className="flex flex-row items-center gap-2">
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
