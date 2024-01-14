import React, { useEffect, useCallback, useState } from "react";
import "./ClientTestimony.css";
import { getAllClients } from "../../services/client-service";





const CardCarousel = () => {

    const [clients, setClients] = useState(null);

    useEffect(() => {

        getAllClients().then((data) => {

            setClients(data);
            console.log(clients);
        }).catch((error) => {

            console.log(error);
        })

    }, [])

    

    ///Dynamic Card Items
    const cardItems = [...clients];


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

  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });

  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes(prevState => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2
      }));
    }
  }, [indexes.currentIndex]);

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
            <h5 style={{fontWeight:'bold', fontSize:'50px'}}>OUR CLIENTS SAY...</h5>
        </div>
      <ul className="card-carousel">
        {cardItems.map((card, index) => (
          <li
            key={card.id}
            className={`card ${determineClasses(indexes, index)}`}
          >
            <h1>{card.clientName}</h1>
            <p>{card.testimony}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;
