import { Button, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import { BASE_URL } from "../../services/helper";
import { useEffect, useState } from "react";
import { getAllGames } from "../../services/game-service";
import { toast } from "react-toastify";

const SmallCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames(0, 10)
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
    if (animating || !games.content || games.content.length <= 3) return;
    const nextIndex = activeIndex === Math.ceil(games.content.length / 3) - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  
  const previous = () => {
    if (animating || !games.content || games.content.length <= 3) return;
    const nextIndex = activeIndex === 0 ? Math.ceil(games.content.length / 3) - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = (games.content || []).reduce((accumulator, item, index) => {
    if (index % 3 === 0) {
      // Create a new set of three images
      accumulator.push([]);
    }

    // Add the current image to the last set
    accumulator[accumulator.length - 1].push(
      <div key={item.gameId} className="col-md-4">
        <div style={{ position: 'relative' }}>
          <img
          style={{width:'250px', height:'250px'}}
            src={BASE_URL + '/games/image/' + item.imageName}
            alt={`Image ${index + 1}`}
            className="img-fluid square-image"
          />
          <div className="caption">
            <CarouselCaption captionHeader={item.gameTitle} />
          </div>
        </div>
      </div>
    );

    return accumulator;
  }, []);

  // Render the sets of three images
  const carouselSlides = games.content && games.content.length > 0 ? (
    slides.map((set, setIndex) => (
      <CarouselItem key={setIndex}>
        <div className="row">{set}</div>
      </CarouselItem>
    ))
  ) : null;

  return (
    <div>
      {/* Banners */}
      <div style={{ backgroundColor: '#000', color: '#fff' }}>
        {/* Heading */}
        <div className="px-5 py-5" style={{ backgroundColor: '#000', color: '#fff' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '50px' }}></h1>
        </div>

        {/* Carousel Banner*/}
        <div>
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {carouselSlides}
            {games.content && games.content.length > 3 && (
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

export default SmallCards;