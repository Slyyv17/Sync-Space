"use client";

import { useState } from "react";
import { ListFilter, CalendarDays, MoreVertical, Grip } from "lucide-react";

export default function Home() {
  const [containers, setContainers] = useState<{
    id: number;
    title: string;
    editing: boolean;
    cards: { id: number; title: string; editing: boolean }[];
  }[]>([]);

  // Function to add a new container
  const addContainer = () => {
    setContainers([
      ...containers,
      { id: Date.now(), title: "", editing: true, cards: [] },
    ]);
  };

  // Function to update the title of a specific container
  const updateTitle = (id: number, newTitle: string) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === id ? { ...container, title: newTitle } : container
      )
    );
  };

  // Function to save the title and stop editing mode
  const saveTitle = (id: number) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) => {
        if (container.id === id) {
          if (container.title.trim() === "") {
            alert("Title cannot be empty");
            return container;
          }
          return { ...container, editing: false };
        }
        return container;
      })
    );
  };

  // Function to add a card to a specific container
  const addCard = (containerId: number) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cards: [
                ...container.cards,
                { id: Date.now(), title: "", editing: true },
              ],
            }
          : container
      )
    );
  };

  // Function to update a card's title
  const updateCardTitle = (containerId: number, cardId: number, newTitle: string) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cards: container.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle } : card
              ),
            }
          : container
      )
    );
  };

  // Function to save a card's title
  const saveCardTitle = (containerId: number, cardId: number) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cards: container.cards.map((card) =>
                card.id === cardId ? { ...card, editing: false } : card
              ),
            }
          : container
      )
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-bgClr p-1 font-pryClr">
      <main className="w-full h-fit border-black border flex flex-col items-center justify-between gap-2">
        {/* First section */}
        <section className="w-full flex justify-between items-center h-fit p-2 border border-red-500">
          <div className="w-20 py-4 flex justify-between items-center">
            <button className="py-2 px-2 bg-mainClr shadow-sm shadow-shadow rounded-full">
              <ListFilter size={20} />
            </button>
            <button className="py-2 px-2 bg-mainClr shadow-sm shadow-shadow rounded-full">
              <CalendarDays size={20} />
            </button>
          </div>
          <div>
            <button
              onClick={addContainer}
              className="bg-btnClr text-mainClr border-none rounded-full px-5 py-3 text-center shadow-sm shadow-btnClr"
            >
              Add Container
            </button>
          </div>
        </section>

        {/* Second section */}
        <section className="w-full flex justify-between items-center h-fit p-4 border border-red-500">
          <div className="grid grid-cols-4 flex-wrap gap-4">
            {containers.map((container) => (
              <article key={container.id} className="w-full flex flex-col gap-4">
                <div className="w-full h-fit bg-mainClr border border-mainClr shadow-shadow shadow-sm rounded flex flex-col p-4">
                  {container.editing ? (
                    <div className="w-full flex flex-col items-center">
                      <input
                        type="text"
                        value={container.title}
                        onChange={(e) => updateTitle(container.id, e.target.value)}
                        placeholder="Enter title"
                        className="border border-shadow px-2 py-1 rounded w-full mb-2 outline-btnClr"
                      />
                      <button
                        onClick={() => saveTitle(container.id)}
                        className="bg-btnClr text-white px-4 py-2 rounded"
                      >
                        Add Title
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full flex justify-between items-center">
                        <span className="text-lg font-medium">{container.title}</span>
                        <button>
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      {/* Render the cards */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        {container.cards.map((card) => (
                          <div
                            key={card.id}
                            className="w-72 h-fit bg-mainClr border border-mainClr shadow-shadow shadow-sm rounded flex justify-between items-center flex-col p-2"
                          >
                            {card.editing ? (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-shadow w-72 h-fit p-3 border-none gap-2 rounded-sm">
                                  <input
                                    type="text"
                                    className="w-full h-fit p-3 mb-1"
                                    placeholder="Enter task"
                                    value={card.title}
                                    onChange={(e) => updateCardTitle(container.id, card.id, e.target.value)}
                                  />
                                  <button
                                    onClick={() => saveCardTitle(container.id, card.id)}
                                    className="bg-btnClr text-white px-4 py-2 rounded"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>

                            ) : (
                                <div className="w-full flex justify-between items-center">
                                  <span className="text-left w-full">{card.title}</span>
                                  <button>
                                    <Grip size={20} />
                                  </button>
                                </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center items-center w-full px-4 mt-2">
                        <button
                          onClick={() => addCard(container.id)}
                          className="border border-shadow shadow-sm shadow-shadow px-4 py-2 rounded-lg mb-1 w-full max-w-xs"
                        >
                          Add Card
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
