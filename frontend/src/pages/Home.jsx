import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const cards = [
    {
      img: "https://i.pinimg.com/736x/40/ab/6c/40ab6c52018bb2289db992ca9a9214c7.jpg",
      text: "Recent Rescue: Max"
    },
    {
      img: "https://i.pinimg.com/originals/6b/39/42/6b394283a124f7daeb3bf40002c886df.jpg",
      text: "Urgent Help Needed — Noida Sector 128"
    },
    {
      img: "https://i.pinimg.com/1200x/5c/51/53/5c515359c530c316a4d9ee8abe453e64.jpg",
      text: "Successful Reunification"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % cards.length);
  const prev = () => setIndex((i) => (i - 1 + cards.length) % cards.length);

  return (
    <div className="home">
      <header className="topbar">
        <div className="logo brand">🐾 PAWS</div>

        <div className="navlinks">
          <span onClick={() => navigate("/report")}>Report Animal</span>
          <span onClick={() => navigate("/missing")}>Missing Pets</span>
          <span>Rescue Map</span>
          <span>Volunteer</span>
          <button className="login" onClick={() => navigate("/login")}>Login</button>
        </div>
      </header>

      <section className="hero">
        <h1 className="brand">PAWS</h1>
        <p>Protective and Automated Welfare System</p>
      </section>

      <section className="carousel">
        <button className="arrow" onClick={prev}>‹</button>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {cards.map((c, i) => (
              <div className="carousel-card" key={i}>
                <img src={c.img} alt="animal" />
                <h3>{c.text}</h3>
              </div>
            ))}
          </div>
        </div>

        <button className="arrow" onClick={next}>›</button>
      </section>

      <footer className="footer">
        <p>Are you an NGO or Veterinarian?</p>
        <button className="partner" onClick={() => navigate("/dashboard")}>
          Partner Login
        </button>
      </footer>
    </div>
  );
}
