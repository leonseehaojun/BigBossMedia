export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p className="footer-title">Big Boss Media</p>
          <p className="footer-subtitle">Social-first production studio based in Singapore.</p>
          <p className="footer-subtitle">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a
            href="https://www.instagram.com/bigbossmediabbm/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@big.boss.media"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            TikTok
          </a>
          <a
            href="mailto:hello@bigbossmedia.sg"
            aria-label="Email Big Boss Media"
          >
            Email us
          </a>
        </div>
      </div>
    </footer>
  );
}
