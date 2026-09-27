function ActionButtons({
  onNewQuote,
  onCopy,
  loading,
  copied,
}) {
  return (
    <div className="actions">
      <button
        className="copy-button"
        onClick={onCopy}
        disabled={loading}
      >
        {copied ? "✓ Copied!" : "📋 Copy Quote"}
      </button>

      <button
        className="new-button"
        onClick={onNewQuote}
        disabled={loading}
      >
        {loading ? "Loading..." : "✨ New Quote"}
      </button>
    </div>
  );
}

export default ActionButtons;