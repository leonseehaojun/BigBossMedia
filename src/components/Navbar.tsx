export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="/">
          <img src="logoxbackground.png" alt="Big Boss Media logo" />
          <span className="brand-copy">
            <strong>Big Boss Media</strong>
            <span>Content studio for ambitious brands</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
          <a className="nav-cta" href="#contact">
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
