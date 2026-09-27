import { useEffect, useState } from "react";
import Header from "./components/Header";
import QuoteCard from "./components/QuoteCard";
import ActionButtons from "./components/ActionButtons";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

 const fetchQuote = async () => {
  try {
    setLoading(true);
    setError("");
    setCopied(false);

    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();

    setQuote(data.quote);
    setAuthor(data.author);
  } catch (error) {
    console.error("Quote API Error:", error);
    setError("Unable to fetch a quote. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const copyQuote = async () => {
    if (!quote) return;

    try {
      await navigator.clipboard.writeText(
        `"${quote}" — ${author}`
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []); // Keep this empty

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="intro">
          <p className="eyebrow">
            DAILY DEVELOPER WISDOM
          </p>

          <h1>
            Code better.
            <br />
            <span>Think better.</span>
          </h1>

          <p className="subtitle">
            Get a random quote to inspire your next line of code.
          </p>
        </div>

        {loading ? (
          <div className="status-card">
            <div className="loader"></div>
            <p>Finding some developer wisdom...</p>
          </div>
        ) : error ? (
          <div className="status-card error-card">
            <p>{error}</p>

            <button
              className="retry-button"
              onClick={fetchQuote}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <QuoteCard
              quote={quote}
              author={author}
            />

            <ActionButtons
              onNewQuote={fetchQuote}
              onCopy={copyQuote}
              loading={loading}
              copied={copied}
            />
          </>
        )}

        <div className="footer">
          <span>Built with</span>
          <strong>React</strong>
          <span>+</span>
          <strong>Vite</strong>
          <span>+</span>
          <strong>Quotable API</strong>
        </div>
      </main>
    </div>
  );
}

export default App;