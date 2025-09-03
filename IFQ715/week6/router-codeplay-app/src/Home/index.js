import HeroCarousel from "./HeroCarousel";
import Locations from "./Locations";
import BluePart from "./BluePart";

export default function Home() {
  return (
    <main className="flex-grow-1">
        <HeroCarousel />
        <Locations />
        <BluePart />
    </main> );
}
