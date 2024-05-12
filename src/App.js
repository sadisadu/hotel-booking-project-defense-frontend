import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Homescreen from './screens/Homescreen';
import Bookingscrren from './screens/Bookingscrren';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Homescreen />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscrren />}/>
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;













