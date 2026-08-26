function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1>🌌 Explore Space</h1>
        <p>Discover planets, stars and the wonders of the universe.</p>
        <button className="btn btn-primary">Explore</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center p-3">
            <h2>🌍</h2>
            <h3>Planets</h3>
            <p>Learn about planets in our solar system.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3">
            <h2>🌙</h2>
            <h3>Moon</h3>
            <p>Discover interesting facts about the Moon.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3">
            <h2>⭐</h2>
            <h3>Stars</h3>
            <p>Explore the fascinating world of stars.</p>
          </div>
        </div>
      </div>
    </div>
  )}
export default Home