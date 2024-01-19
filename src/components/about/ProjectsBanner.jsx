import { Button, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import { BASE_URL } from "../../services/helper";
import { useEffect, useState } from "react";
import PauseOnHover from "./ProjectSmallCards";
import { getAllGames } from "../../services/game-service";
import { toast } from "react-toastify";

const items = [
    {
      src: "https://picsum.photos/id/123/1200/400",
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
    },
    {
      src: 'https://picsum.photos/id/456/1200/400',
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
    },
    {
      src: 'https://picsum.photos/id/678/1200/400',
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
    },
  ];


const ProjectsBanner = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [games, setGames] = useState([]);

    useEffect(() => {
      getAllGames(0, 5).then((data) => {

        setGames(data);
        console.log(data);

      }).catch((error) => {
        toast.error("Error in Loading games");
        console.log(error);
      })
    }, [])
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === games.content.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? games.content.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };
  
    const slides = (games.content || []).map((item) => {
      
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.gameId}
        >
          <img src={BASE_URL+'/games/image/'+item.bannerImage} alt={item.altText} style={{ width: '100%' }} />
          <CarouselCaption
            captionHeader={item.gameTitle}
          />
        </CarouselItem>
      );
    });

    const settings = {
        slidesToShow: 3, // Show 3 slides at a time
        slidesToScroll: 1, // Scroll 1 slide at a time
        speed: 500000000, // Transition speed in milliseconds
      };

    return(
        <div>
            {/* Banners */}
            <div style={{backgroundColor:'#000', color:'#fff'}}>

                {/* Heading */}
                <div className="px-5 py-5" style={{backgroundColor:'#000', color:'#fff'}}>
                    <h1 style={{fontWeight:'bold', fontSize:'50px'}}>PROJECTS</h1>
                </div>
            

                {/* Carousel Banner*/}
                <div >
                    <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                        direction="prev"
                        directionText="Previous"
                        onClickHandler={previous}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Next"
                        onClickHandler={next}
                    />
                    </Carousel>
                </div>

            </div>
        </div>
    )

}

export default ProjectsBanner;