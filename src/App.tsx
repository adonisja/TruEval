import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage.js';
import UserPage from './UserPage.js';
import ProtectedRoute from './components/Guards/ProtectedRoute.js';
import UnauthenticatedRoute from './components/Guards/UnauthenticatedRoute.js';

/* Switched to using the React Router component for web and TypeScript as the main language for 
    strict type enforcement, making it easier for us to catch potential bugs
*/
const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={
                <ProtectedRoute>
                    <UserPage />
                </ProtectedRoute>
            } />
        </Routes>
    </Router>
);

export default App;