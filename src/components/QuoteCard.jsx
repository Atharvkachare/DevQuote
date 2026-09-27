function QuoteCard({ quote, author }) {
  return (
    <div className="quote-card">
      <div className="quote-mark">“</div>

      <p className="quote-text">
        {quote}
      </p>

      <div className="author">
        <span className="author-line"></span>
        <span>— {author}</span>
      </div>
    </div>
  );
}

export default QuoteCard;