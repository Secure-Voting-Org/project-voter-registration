import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import IdentityCheck from './pages/IdentityCheck';
import FaceEnrollment from './pages/FaceEnrollment';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/identity" element={<IdentityCheck />} />
        <Route path="/face-enroll" element={<FaceEnrollment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
