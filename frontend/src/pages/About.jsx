import "./about.css";

export default function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="about-title">🐾 About PAWS</h1>
        <p className="about-subtitle">
          Predictive and Automated Welfare System for Urban Animals
        </p>
      </header>

      <section className="about-content">
        <div className="about-container">
          {/* What is PAWS */}
          <div className="about-section">
            <h2 className="section-title">What is PAWS?</h2>
            <p className="section-text">
              PAWS is an AI-powered animal welfare platform designed to bridge the gap between 
              citizens who encounter animals in distress and the organizations and professionals 
              who can help them. We leverage cutting-edge technology to make animal rescue faster, 
              more efficient, and more accessible to everyone.
            </p>
          </div>

          {/* The Problem */}
          <div className="about-section">
            <h2 className="section-title">The Problem We Solve</h2>
            <p className="section-text">
              Every day, countless animals in urban areas face critical situations:
            </p>
            <ul className="problem-list">
              <li>🐕 <strong>Injured animals</strong> left without immediate medical attention</li>
              <li>🐱 <strong>Lost pets</strong> struggling to find their way back home</li>
              <li>🐦 <strong>Stray animals</strong> in need of food, shelter, and care</li>
              <li>🚨 <strong>Unreported cases</strong> where people don't know how or where to seek help</li>
            </ul>
            <p className="section-text">
              Traditional reporting methods are slow, fragmented, and often fail to connect 
              those who need help with those who can provide it. PAWS changes that.
            </p>
          </div>

          {/* How It Works */}
          <div className="about-section">
            <h2 className="section-title">How PAWS Works</h2>
            <div className="workflow">
              <div className="workflow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="step-title">Citizens Report</h3>
                  <p className="step-text">
                    Anyone can quickly report an injured, lost, or distressed animal through 
                    our simple interface. Just upload a photo and location.
                  </p>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="step-title">AI Analysis</h3>
                  <p className="step-text">
                    Our AI engine analyzes the report, identifies the animal type, assesses 
                    the severity, and prioritizes cases for faster response.
                  </p>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="step-title">NGOs & Vets Respond</h3>
                  <p className="step-text">
                    Nearby animal welfare organizations and veterinarians receive alerts and 
                    can respond quickly to provide the necessary care.
                  </p>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3 className="step-title">Community Support</h3>
                  <p className="step-text">
                    The community stays informed, shares updates, and helps reunite lost pets 
                    with their families through our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="about-section mission-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              To create a compassionate, connected ecosystem where every animal in need receives 
              timely care and every person who wants to help has the tools to make a difference. 
              We believe that technology, when used with empathy, can transform animal welfare 
              and build stronger, more caring communities.
            </p>
            <p className="mission-text">
              PAWS is more than a platform—it's a movement toward a world where no animal is 
              left behind, and no cry for help goes unheard.
            </p>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h2 className="cta-title">Join Us in Making a Difference</h2>
            <p className="cta-text">
              Whether you're a concerned citizen, an animal welfare organization, or a 
              veterinarian, PAWS provides the tools you need to help animals in your community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
