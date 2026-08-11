import Header from "./components/Header";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import HowWeWork from "./components/HowWeWork";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main style={{ minHeight: "100vh", position: "relative" }}>
        <Hero />
        <Capabilities />
        <HowWeWork />
      </main>
    </SmoothScroll>
  );
}
