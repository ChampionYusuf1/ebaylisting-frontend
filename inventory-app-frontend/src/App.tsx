import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import CreatePart from './pages/CreatePart';
import ViewParts from './pages/ViewParts';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';
import './styles/index.css'; // Ensure this imports your CSS

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="create-part" element={<CreatePart />} />
                    <Route path="view-parts" element={<ViewParts />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
