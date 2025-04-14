import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  plants: PlantType[];
  options?: EmblaOptionsType;
  selected: string;
  onSelect: (url: string) => void;
};

type PlantType = {
  name: string;
  url: string;
  thumb?: string;
};

const PlantCarousel: React.FC<PropType> = ({ plants, options, onSelect }) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {plants.map((plant) => (
            <div
              className="embla__slide"
              key={plant.url}
              onClick={() => onSelect(plant.url)}
            >
              <div className="embla__slide__number">
                {plant.thumb && (
                  <img
                    src={plant.thumb}
                    alt={plant.name}
                    className="h-20 w-20 object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCarousel;
