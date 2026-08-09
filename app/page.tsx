import Header from "./components/Header";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", position: "relative" }}>
        <Hero />
        <Capabilities />
      </main>
    </>
  );
}
