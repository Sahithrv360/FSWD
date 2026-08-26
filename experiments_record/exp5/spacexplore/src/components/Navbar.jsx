import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🌌 SpaceXplore</Link>
        <div>
          <Link className="text-white me-3" to="/">Home</Link>
          <Link className="text-white me-3" to="/about">About</Link>
          <Link className="text-white" to="/contact">Contact</Link>
        </div>  </div>
    </nav>
  )}
export default Navbar