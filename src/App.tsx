import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage.js';

// import SignUpPage from './SignUpPage';
import UserPage from './UserPage.js';

/* Switched to using the React Router component for web and TypeScript as the main language for 
    strict type enforcement, making it easier for us to catch potential bugs
*/
const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={<UserPage />} />
        </Routes>
    </Router>
);

export default App;