import '../styles/Home.css'

function Home() {
    return (
        <>
            <div className='container'>


                <div className="content">
                    <h1 className="center-align">Welcome to Bookworm</h1>

                    <div className='logo center-align'>
                        <img src={require('./resources/bookworm_logo.png')} className='logo-img' alt='logo'></img>
                    </div>

                    <p className="center-align">
                        The site where you can create your own
                        personal Library, categorizing your books how you like!
                    </p>

                    <p className="center-align">
                        Create or join Groups with similar interests to create a group Library
                        allowing you to share your favorite books with anyone.
                    </p>

                </div>



            </div>
        </>
    )
}

export default Home;
