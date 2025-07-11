import { useEffect, useRef } from 'react'
import './App.css'
import gsap from "gsap";
function App() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "#4ade80",
          margin: "2rem auto",
        }}
      >
        Animado con GSAP
      </div>
    </>
  )
}

export default App
