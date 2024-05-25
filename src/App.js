import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { ProvideAuth } from "./components/Context/UserContext";
import { Grid } from "./components/Grid";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/grid" element={<Grid/>}/>
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
