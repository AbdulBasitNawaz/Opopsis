import Header from "./components/Header";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main style={{ minHeight: "100vh", position: "relative" }}>
        <Hero />
        <Capabilities />
      </main>
    </SmoothScroll>
  );
}
