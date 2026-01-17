import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>ABOUT US</li>
        <li>CONTACT</li>
      </ul>
      <button className="login-btn">LOGIN</button>
    </nav>
  );
}

export default Navbar;
