import { useState } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl: longUrl })
    });

    const data = await res.json();
    setShortUrl(data.shortUrl || 'Something went wrong');
  };

  return (
    <div className="app">
      <h2>🔗 URL Shortener</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste your long URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
