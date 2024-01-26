import React, { useEffect, useState } from "react";
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import { BASE_URL } from "../../services/helper";
import { doGetGamesByCategoryId, getAllGames } from "../../services/game-service";
import { toast } from "react-toastify";

const SimilarGames = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    doGetGamesByCategoryId(2)
      .then((data) => {
        setGames(data);
        console.log(data);
      })
      .catch((error) => {
        toast.error("Error in Loading games");
        console.log(error);
      });
  }, []);

  const next = () => {
    if (animating || !games || games.length <= 4) return;
    const nextIndex = activeIndex === Math.ceil(games.length / 4) - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating || !games || games.length <= 4) return;
    const nextIndex = activeIndex === 0 ? Math.ceil(games.length / 4) - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = (games || []).reduce((accumulator, item, index) => {
    if (index % 4 === 0) {
      // Create a new set of four images
      accumulator.push([]);
    }

  // Add the current image to the last set
  accumulator[accumulator.length - 1].push(
    <div key={item.gameId} className="col-md-3">
      <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Maintain aspect ratio
            objectPosition: 'center', // Center the image
          }}
          src={BASE_URL + '/games/image/' + item.squareImage}
          alt={`Image ${index + 1}`}
          className="img-fluid"
        />
        <div className="caption" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', textAlign: 'center', color: 'white', padding: '10px' }}>
          <h5>{item.gameTitle}</h5>
        </div>
      </div>
    </div>
  );

  return accumulator;
}, []);


  // Render the sets of four images
  const carouselSlides = games && games.length > 0 ? (
    slides.map((set, setIndex) => (
      <CarouselItem className="img-fluid" key={setIndex}>
        <div className="row">{set}</div>
      </CarouselItem>
    ))
  ) : null;

  return (
    <div>
      {/* Banners */}
      <div style={{ border: '5px solid #000', color: '#fff' }}>
        {/* Heading */}
        <div className="py-2" style={{ backgroundColor: '#000', color: '#fff' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '40px' }}>Similar Games</h1>
        </div>

        {/* Carousel Banner*/}
        <div className="p-5">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {carouselSlides}
            {games && games.length > 4 && (
              <>
                <CarouselIndicators items={carouselSlides} activeIndex={activeIndex} onClickHandler={goToIndex} />
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SimilarGames;