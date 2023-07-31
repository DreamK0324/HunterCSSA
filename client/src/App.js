import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from './pages/home';
import { Facts } from './pages/facts';
import { CreateFact } from "./pages/createFact";
import { About } from './pages/about';
import { ContectUs } from './pages/contectUs';
import { Auth } from './pages/auth';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/createFact" element={<CreateFact />} />
          <Route path="/about" element={<About />} />
          <Route path="/contectUs" element={<ContectUs />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
