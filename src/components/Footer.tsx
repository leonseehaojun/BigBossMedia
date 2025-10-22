export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Big Boss Media. All rights reserved.</p>
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
            href="#"  // replace with real link if they have one
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
