import React, { useEffect, useCallback, useState } from "react";
import "./ClientTestimony.css";
import { getAllClients } from "../../services/client-service";

const ClientTestimony = () => {
  // clients
  const [clients, setClients] = useState(null);

  // Dynamic Card Items
  const cardItems = clients ? [...clients] : [];

  // Determine classes
  function determineClasses(indexes, cardIndex) {
    if (indexes.currentIndex === cardIndex) {
      return "active";
    } else if (indexes.nextIndex === cardIndex) {
      return "next";
    } else if (indexes.previousIndex === cardIndex) {
      return "prev";
    }
    return "inactive";
  }

  // Indexes
  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1,
  });

  // Handle Transition
  const handleCardTransition = useCallback(() => {
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2,
      }));
    }
  }, [indexes.currentIndex, cardItems.length]);

  // Fetch clients when the component mounts
  useEffect(() => {
    getAllClients()
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Log updated clients whenever it changes
//   useEffect(() => {
//     console.log(clients);
//   }, [clients]);

  // Set up transition interval
  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleCardTransition();
    }, 4000);

    return () => clearInterval(transitionInterval);
  }, [handleCardTransition, indexes]);

  return (
    <div className="black-background">
      <div className="my-2">
        {/* Heading */}
        <h5 style={{ fontWeight: "bold", fontSize: "50px" }}>OUR CLIENTS SAY...</h5>
      </div>
      <ul className="card-carousel">
        {cardItems.map((card, index) => (
          <li
            key={card.id}
            className={`client-card ${determineClasses(indexes, index)}`}
          >
            <h1>{card.clientName}</h1>
            <p>{card.testimony}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientTestimony;