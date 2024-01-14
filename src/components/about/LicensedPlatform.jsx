import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import { BASE_URL } from "../../services/helper";
import { useState } from "react";
import PlatformRotation from "./PlatformRotation";

const items = [
    {
      src: BASE_URL+"/games/image/gamePattyLogo.png",
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


const LicensedPlatform = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
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
        <div className="my-2">
            {/* Heading */}
            <h5 className="text-center my-5" style={{fontWeight:'bold', fontSize:'25px'}}>LICENSED PLATFORM</h5>

            {/* Carousel */}
            {/* <div>
            <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...settings}
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
            </div> */}

            <PlatformRotation/>
        </div>
    )

}

export default LicensedPlatform;