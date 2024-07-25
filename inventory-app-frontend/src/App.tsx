import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import CreateListing from './pages/CreateListing';
import ViewListings from './pages/ViewListings';
import Settings from './pages/Settings';
import './styles/index.css'; // Ensure this imports your CSS

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="create-listing" element={<CreateListing />} />
                    <Route path="view-listings" element={<ViewListings />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
