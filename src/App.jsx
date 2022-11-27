import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Films from "./pages/Films";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Film from "./pages/Film";
import "./index.css";
import Character from "./pages/Character";
import Characters from "./pages/Characters";

const App = () => {
  return (
    <div id="App">
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<Film />} />
          <Route path="/people" element={<Characters />} />
          <Route path="/people/:id" element={<Character />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
