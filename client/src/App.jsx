import { useState } from "react";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: longUrl }),
    });

    const data = await res.json();
    setShortUrl(data.shortUrl || "Something went wrong in the system");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🔗 URL Shortener App</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="result">
            <p>Your short URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
