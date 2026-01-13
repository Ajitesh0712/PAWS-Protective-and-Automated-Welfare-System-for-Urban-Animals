import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const [postText, setPostText] = useState("");

  // Dummy community posts data
  const communityPosts = [
    {
      id: 1,
      username: "AnimalLover23",
      avatar: "🐕",
      text: "Just rescued a beautiful golden retriever near Sector 62! He's safe now and being checked by a vet. If anyone knows his owner, please reach out. #rescue #found",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop",
      location: "Noida",
      tags: ["#rescue", "#found"],
      upvotes: 42,
      comments: 8
    },
    {
      id: 2,
      username: "RescueHero",
      avatar: "🐱",
      text: "Success story! Luna was reunited with her family after 3 weeks. The community support was amazing. Thank you everyone who shared and helped!",
      location: "Delhi NCR",
      tags: ["#success", "#reunited"],
      upvotes: 67,
      comments: 15
    },
    {
      id: 3,
      username: "PetCareNoida",
      avatar: "🐾",
      text: "Looking for a forever home for this sweet kitten. She's about 3 months old, fully vaccinated, and very friendly. DM if interested! #adoption #kitten",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&h=400&fit=crop",
      location: "Noida",
      tags: ["#adoption", "#kitten"],
      upvotes: 89,
      comments: 23
    },
    {
      id: 4,
      username: "StreetWatcher",
      avatar: "🐕",
      text: "Spotted a group of stray dogs near the metro station. They look healthy but could use some food. Planning to visit tomorrow with supplies. Anyone want to join?",
      location: "Noida",
      tags: ["#stray", "#help"],
      upvotes: 34,
      comments: 12
    },
    {
      id: 5,
      username: "MissingPetsAlert",
      avatar: "🐱",
      text: "URGENT: Missing black and white cat, last seen near Sector 18 market. Responds to 'Whiskers'. Please share!",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop",
      location: "Noida",
      tags: ["#missing", "#urgent"],
      upvotes: 156,
      comments: 45
    },
    {
      id: 6,
      username: "WildlifeHelper",
      avatar: "🐦",
      text: "Found an injured bird in my garden. Contacted local wildlife rescue. They're on their way! Always happy to help our feathered friends.",
      location: "Delhi NCR",
      tags: ["#wildlife", "#rescue"],
      upvotes: 28,
      comments: 6
    }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // UI only - no actual submission
    alert("Post submitted! (Demo mode - no data saved)");
    setPostText("");
  };

  return (
    <div className="home">
      <header className="topbar">
        <div className="logo brand">🐾 PAWS</div>

        <div className="navlinks">
          <span onClick={() => navigate("/report")}>Report Animal</span>
          <span onClick={() => navigate("/missing")}>Missing Pets</span>
          <span onClick={() => navigate("/partners")}>NGOs & Vets</span>
          <span onClick={() => navigate("/about")}>About</span>
          <button className="login" onClick={() => navigate("/login")}>Login</button>
        </div>
      </header>

      {/* Quick Action Strip */}
      <section className="quick-actions-section">
        <div className="quick-actions-container">
          <div className="quick-action-card" onClick={() => navigate("/report")}>
            <div className="action-icon">🚑</div>
            <h3 className="action-title">Report Injured Animal</h3>
            <p className="action-description">Report an injured or distressed animal</p>
          </div>
          <div className="quick-action-card" onClick={() => navigate("/missing")}>
            <div className="action-icon">🐾</div>
            <h3 className="action-title">Report Missing Pet</h3>
            <p className="action-description">Help reunite lost pets with families</p>
          </div>
          <div className="quick-action-card" onClick={() => navigate("/partners")}>
            <div className="action-icon">🤝</div>
            <h3 className="action-title">View NGOs & Vets</h3>
            <p className="action-description">Find trusted organizations nearby</p>
          </div>
        </div>
      </section>

      {/* NGO & Vet Highlight Section */}
      <section className="partners-highlight-section">
        <div className="partners-highlight-container">
          <div className="highlight-header">
            <h2 className="highlight-title">Featured Partners</h2>
            <button className="view-all-btn" onClick={() => navigate("/partners")}>
              View All Partners →
            </button>
          </div>
          <div className="highlight-grid">
            {[
              {
                id: 1,
                name: "Animal Welfare Society",
                type: "ngo",
                location: "Noida, Sector 62",
                available: true,
                hours: "24×7"
              },
              {
                id: 2,
                name: "Dr. Priya Sharma",
                type: "vet",
                location: "Delhi NCR",
                available: true,
                hours: "Mon-Sat: 9 AM - 8 PM"
              },
              {
                id: 3,
                name: "Paws & Claws Rescue",
                type: "ngo",
                location: "Noida, Sector 18",
                available: true,
                hours: "24×7"
              },
              {
                id: 4,
                name: "Dr. Rajesh Kumar",
                type: "vet",
                location: "Noida, Sector 50",
                available: true,
                hours: "24×7"
              }
            ].map((partner) => (
              <div key={partner.id} className="highlight-card">
                <div className="highlight-card-header">
                  <span className="highlight-type-badge">
                    {partner.type === "ngo" ? "NGO" : "Veterinarian"}
                  </span>
                  {partner.available && (
                    <span className="highlight-availability">{partner.hours}</span>
                  )}
                </div>
                <h3 className="highlight-name">{partner.name}</h3>
                <p className="highlight-location">📍 {partner.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="community-header">
          <h2 className="community-title">🐾 Community</h2>
          <p className="community-subtitle">Updates, rescues, sightings, and stories</p>
        </div>

        <div className="community-container">
          {/* Create Post Box */}
          <div className="create-post-box">
            <form onSubmit={handlePostSubmit} className="post-form">
              <textarea
                className="post-input"
                placeholder="Share a sighting, rescue story, or update…"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows="3"
              />
              <button type="submit" className="post-button">
                Post
              </button>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {communityPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-user">
                    <div className="user-avatar">{post.avatar}</div>
                    <div className="user-info">
                      <span className="username">{post.username}</span>
                      <span className="post-location">📍 {post.location}</span>
                    </div>
                  </div>
                </div>

                <div className="post-content">
                  <p className="post-text">{post.text}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="post-image" />
                  )}
                  <div className="post-tags">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="post-interactions">
                  <button className="interaction-btn upvote-btn">
                    <span>▲</span>
                    <span>{post.upvotes}</span>
                  </button>
                  <button className="interaction-btn comment-btn">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Are you an NGO or Veterinarian?</p>
        <button className="partner" onClick={() => navigate("/ngo-dashboard")}>
          Partner Login
        </button>
        <div className="footer-links">
          <span onClick={() => navigate("/partners")}>View NGOs & Vets</span>
          <span onClick={() => navigate("/about")}>About PAWS</span>
        </div>
      </footer>
    </div>
  );
}
