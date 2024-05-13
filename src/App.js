import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Homescreen from './screens/Homescreen';
import Bookingscrren from './screens/Bookingscrren';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/admin/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>

          {/* <Route path="/" element={<Homescreen />} /> */}
          <Route path="/" element={<LandingScreen />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscrren />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<AdminScreen />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;













