import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./partners.css";

export default function Partners() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // "all", "ngo", "vet"

  // Dummy data for NGOs and Veterinarians
  const partners = [
    {
      id: 1,
      name: "Animal Welfare Society",
      type: "ngo",
      location: "Noida, Sector 62",
      description: "Dedicated to rescuing and rehabilitating stray animals. 24/7 emergency response team.",
      phone: "+91 98765 43210",
      email: "contact@awsnoida.org",
      available: true,
      hours: "24×7"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      type: "vet",
      location: "Delhi NCR",
      description: "Experienced veterinarian specializing in emergency care and surgery for small animals.",
      phone: "+91 98765 43211",
      email: "drpriya@vetcare.in",
      available: true,
      hours: "Mon-Sat: 9 AM - 8 PM"
    },
    {
      id: 3,
      name: "Paws & Claws Rescue",
      type: "ngo",
      location: "Noida, Sector 18",
      description: "Non-profit organization focused on animal adoption, vaccination drives, and community awareness.",
      phone: "+91 98765 43212",
      email: "info@pawsclaws.org",
      available: true,
      hours: "24×7"
    },
    {
      id: 4,
      name: "Dr. Rajesh Kumar",
      type: "vet",
      location: "Noida, Sector 50",
      description: "Mobile veterinary services. Home visits available for injured and sick animals.",
      phone: "+91 98765 43213",
      email: "rajesh.vet@mobilecare.in",
      available: true,
      hours: "24×7"
    },
    {
      id: 5,
      name: "Street Animal Foundation",
      type: "ngo",
      location: "Delhi NCR",
      description: "Comprehensive animal welfare services including rescue, medical care, and adoption programs.",
      phone: "+91 98765 43214",
      email: "help@streetanimal.org",
      available: true,
      hours: "24×7"
    },
    {
      id: 6,
      name: "Dr. Anjali Mehta",
      type: "vet",
      location: "Noida, Sector 104",
      description: "Specialized in trauma care and rehabilitation. Equipped with advanced surgical facilities.",
      phone: "+91 98765 43215",
      email: "anjali.mehta@vetclinic.in",
      available: true,
      hours: "Mon-Fri: 10 AM - 7 PM"
    },
    {
      id: 7,
      name: "Hope for Animals",
      type: "ngo",
      location: "Noida, Sector 21",
      description: "Community-driven organization providing food, shelter, and medical assistance to stray animals.",
      phone: "+91 98765 43216",
      email: "hope@animals.org",
      available: true,
      hours: "24×7"
    },
    {
      id: 8,
      name: "Dr. Vikram Singh",
      type: "vet",
      location: "Delhi NCR",
      description: "Expert in wildlife rescue and exotic animal care. Available for emergency consultations.",
      phone: "+91 98765 43217",
      email: "vikram.singh@wildlifevet.in",
      available: true,
      hours: "24×7"
    }
  ];

  const filteredPartners = filter === "all" 
    ? partners 
    : partners.filter(p => p.type === filter);

  return (
    <div className="partners-page">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <header className="partners-header">
        <h1 className="partners-title">🤝 NGOs & Veterinarians</h1>
        <p className="partners-subtitle">
          Connect with trusted organizations and professionals dedicated to animal welfare
        </p>
      </header>

      {/* Filter Buttons */}
      <div className="filter-section">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "ngo" ? "active" : ""}`}
          onClick={() => setFilter("ngo")}
        >
          NGOs
        </button>
        <button
          className={`filter-btn ${filter === "vet" ? "active" : ""}`}
          onClick={() => setFilter("vet")}
        >
          Veterinarians
        </button>
      </div>

      {/* Partners Grid */}
      <section className="partners-container">
        <div className="partners-grid">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="partner-card">
              <div className="partner-header">
                <div className="partner-type-badge">
                  {partner.type === "ngo" ? "NGO" : "Veterinarian"}
                </div>
                {partner.available && (
                  <div className="availability-badge">
                    {partner.hours}
                  </div>
                )}
              </div>

              <h3 className="partner-name">{partner.name}</h3>
              <p className="partner-location">📍 {partner.location}</p>
              <p className="partner-description">{partner.description}</p>

              <div className="partner-contact">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">{partner.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">{partner.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
