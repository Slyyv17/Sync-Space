"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  MoreVertical,
  Grip, Clock,
  PencilIcon, Users,
  Trash
} from "lucide-react";
import Metrics from "@/components/metrics";
import Graph from "@/components/graph";
import Toolbar from "@/components/toolbar";
import Navigation from "@/components/navigation";

type CardType = {
  id: number;
  title: string;
  editing: boolean;
};

type ContainerType = {
  id: number;
  title: string;
  editing: boolean;
  cards: CardType[];
};

const Card = ({ card, containerId, updateCardTitle, saveCardTitle }: {
  card: CardType;
  containerId: number;
  updateCardTitle: (containerId: number, cardId: number, newTitle: string) => void;
  saveCardTitle: (containerId: number, cardId: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id: card.id, containerId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`w-72 h-fit bg-mainClr border border-mainClr shadow-shadow shadow-sm rounded flex justify-between items-center flex-col p-2 ${isDragging ? 'opacity-50' : 'opacity-100'
        }`}
    >
      {card.editing ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-shadow w-72 h-fit p-3 border-none gap-2 rounded-sm flex justify-between items-center">
            <input
              type="text"
              className="w-full h-fit p-3 border border-greyClr outline-greyClr rounded"
              placeholder="Enter task"
              value={card.title}
              onChange={(e) => updateCardTitle(containerId, card.id, e.target.value)}
            />
            <button
              onClick={() => saveCardTitle(containerId, card.id)}
              className="bg-greyClr text-white px-4 py-2 rounded"
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
  );
};

const Container = ({
  container,
  updateTitle,
  saveTitle,
  addCard,
  updateCardTitle,
  saveCardTitle,
  moveCard,
  setContainers,
}: {
  container: ContainerType;
  updateTitle: (id: number, newTitle: string) => void;
  saveTitle: (id: number) => void;
  addCard: (containerId: number) => void;
  updateCardTitle: (containerId: number, cardId: number, newTitle: string) => void;
  saveCardTitle: (containerId: number, cardId: number) => void;
  moveCard: (fromContainerId: number, toContainerId: number, cardId: number) => void;
  setContainers: React.Dispatch<React.SetStateAction<ContainerType[]>>;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { id: number; containerId: number }) => {
      if (item.containerId !== container.id) {
        moveCard(item.containerId, container.id, item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Change showOptions to track the active container ID
  const [showOptions, setShowOptions] = useState<number | null>(null);

  const handleOptions = (id: number) => {
    // If clicking the same container, toggle the options; otherwise, show the options for the clicked container
    setShowOptions((prev) => (prev === id ? null : id));
  };

  const handleDeleteContainer = (containerId: number) => {
    setContainers((prevContainers) =>
      prevContainers.filter((container) => container.id !== containerId)
    );
  };

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`w-full h-fit bg-background border border-mainClr shadow-shadow shadow-sm rounded flex flex-col p-4 relative ${isOver ? 'bg-opacity-50' : ''
        }`}
    >
      {container.editing ? (
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            value={container.title}
            onChange={(e) => updateTitle(container.id, e.target.value)}
            placeholder="Enter title"
            className="border border-greyClr px-2 py-1 rounded w-full mb-2 outline-greyClr"
          />
          <button
            onClick={() => saveTitle(container.id)}
            className="bg-greyClr text-white px-4 py-2 rounded"
          >
            Add Title
          </button>
        </div>
      ) : (
        <div>
          <div className="w-full flex justify-between items-center">
            <span className="text-lg font-medium">{container.title}</span>
            <button onClick={() => handleOptions(container.id)}>
              <MoreVertical size={20} />
            </button>

            {showOptions === container.id && (
              <ul className="absolute top-8 left-0 w-52 h-fit bg-white text-greyClr text-lg font-medium shadow-lg rounded-md p-2">
                <li className="flex justify-start items-center gap-4 p-1 hover:bg-gray-200 w-full">
                  <button className="flex justify-start items-center gap-4 w-full">
                    <PencilIcon size={16} />
                    Edit Card
                  </button>
                </li>

                <li className="flex justify-start items-center gap-4 p-1 hover:bg-gray-200 w-full">
                  <button className="flex justify-start items-center gap-4 w-full">
                    <Clock size={16} />
                    Schedule
                  </button>
                </li>

                <li className="flex justify-start items-center gap-4 p-1 hover:bg-gray-200 w-full">
                  <button className="flex justify-start items-center gap-4 w-full">
                    <Users size={16} />
                    Add Collaborator
                  </button>
                </li>

                <li className="flex justify-start items-center gap-4 p-1 hover:bg-gray-200 w-full">
                  <button onClick={() => handleDeleteContainer(container.id)} className="flex justify-start items-center gap-4 w-full">
                    <Trash size={16} />
                    Delete
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {container.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                containerId={container.id}
                updateCardTitle={updateCardTitle}
                saveCardTitle={saveCardTitle}
              />
            ))}
          </div>

          <div className="flex justify-center items-center w-full px-4 mt-2">
            <button
              onClick={() => addCard(container.id)}
              className="border border-shadow shadow-sm shadow-shadow text-background px-4 py-2 rounded-lg mb-1 w-full max-w-xs bg-greyClr"
            >
              Add Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default function Home() {
  const [containers, setContainers] = useState<ContainerType[]>([]);

  const moveCard = (fromContainerId: number, toContainerId: number, cardId: number) => {
    setContainers(prev => prev.map(container => {
      if (container.id === fromContainerId) {
        return {
          ...container,
          cards: container.cards.filter(c => c.id !== cardId),
        };
      }
      if (container.id === toContainerId && !container.cards.some(c => c.id === cardId)) {
        const fromContainer = prev.find(c => c.id === fromContainerId);
        const card = fromContainer?.cards.find(c => c.id === cardId);
        if (card) {
          return {
            ...container,
            cards: [...container.cards, card],
          };
        }
      }
      return container;
    }));
  };

  const addContainer = () => {
    setContainers([
      ...containers,
      { id: Date.now(), title: "", editing: true, cards: [] },
    ]);
  };

  const updateTitle = (id: number, newTitle: string) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === id ? { ...container, title: newTitle } : container
      )
    );
  };

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
    <div className="flex items-start justify-center min-h-[100dvh] bg-bgClr p-1 font-pryClr bg-lightGrey">
      <main className="w-full h-fit border-black border flex flex-col items-center justify-between gap-2">
        {/* First section */}
        <section className="w-full flex justify-between items-center h-fit p-2 flex-col gap-2">
          <div className="w-full h-fit p-2 flex justify-between items-center">

            <Navigation />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <Metrics containers={containers} />
            <Graph containers={containers} />
          </div>
        </section>

        {/* Main section */}
        <section className="w-full flex justify-between items-center h-fit p-2">
          <div className="w-full h-fit flex justify-between items-center gap-2">
            <Toolbar />
          </div>

          <button
            onClick={addContainer}
            className="bg-greyClr text-background px-4 py-2 rounded-lg shadow-md flex-shrink-0 whitespace-nowrap"
          >
            Add Container
          </button>

        </section>

        {/* Second section */}
        <DndProvider backend={HTML5Backend}>
          <section className="w-full flex justify-between items-center h-fit p-4 border">
            <div className="grid grid-cols-6 flex-wrap gap-4">
              {containers.map((container) => (
                <Container
                  key={container.id}
                  container={container}
                  updateTitle={updateTitle}
                  saveTitle={saveTitle}
                  addCard={addCard}
                  updateCardTitle={updateCardTitle}
                  saveCardTitle={saveCardTitle}
                  moveCard={moveCard}
                  setContainers={setContainers} // Delete part, i am passing the setContainer to the Container
                />
              ))}
            </div>
          </section>
        </DndProvider>
      </main>
    </div>
  );
}