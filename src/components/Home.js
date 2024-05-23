import "../styles/Home.css";

function Home() {
  return (
    <>
      <div className="library">
        <div className="container">
          <div className="content">
            <h1 className="center-align">Welcome to Bookworm</h1>

            <div className="logo center-align">
              <img
                src={require("./resources/bookworm_logo.png")}
                className="logo-img"
                alt="logo"
              ></img>
            </div>

            <p className="center-align">
              Discover a platform where you can build your own personal library,
              organizing your books in any way you prefer!
            </p>

            <p className="center-align">
              Join or create groups with similar interests to form a group
              library, enabling you to share your favorite books with others
              easily.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
