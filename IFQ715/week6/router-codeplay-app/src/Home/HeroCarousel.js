import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const carouselData = [
  {
    image: "https://picsum.photos/id/114/700/250",
    heading: "Cloudy",
    caption: "Slide 1",
  },
  {
    image: "https://picsum.photos/id/124/700/250",
    heading: "Boat Trip",
    caption: "Slide 2",
  },
  {
    image: "https://picsum.photos/id/13/700/250",
    heading: "Sun Out",
    caption: "Slide 3",
  },
];

function CarouselImage({ image, heading, caption }) {
  return (
    <Carousel.Item>
      <img
        src={image}
        className="d-block w-100"
        style={{ maxHeight: "400px", objectFit: "cover" }}
        alt={heading}
      />
      <Carousel.Caption>
        <h3>{heading}</h3>
        <p>{caption}</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

export default function HeroCarousel() {
  return <Carousel>{carouselData.map(CarouselImage)}</Carousel>;
}
