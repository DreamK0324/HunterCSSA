import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from './pages/home';
import { Affairs } from './pages/affairs';
import { CreateAffair } from "./pages/createAffair";
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
          <Route path="/affairs" element={<Affairs />} />
          <Route path="/createAffair" element={<CreateAffair />} />
          <Route path="/about" element={<About />} />
          <Route path="/contectUs" element={<ContectUs />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
