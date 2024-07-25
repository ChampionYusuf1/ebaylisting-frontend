import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [tab, setTab] = useState(0);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:3306/api/login', {
                username,
                password,
            });
            localStorage.setItem('authToken', response.data.token);
            navigate('/dashboard/create-listing'); // Redirect to dashboard
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials');
        }
    };

    const handleCreateUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:3306/api/users', {
                username,
                password,
            });
            alert('User created successfully!');
            setUsername('');
            setPassword('');
        } catch (err) {
            console.error('Create user error:', err);
            setError('Error creating user');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(43, 45, 66, 0.9)', padding: 4, borderRadius: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" gutterBottom>
                    {tab === 0 ? 'Sign In' : 'Create Account'}
                </Typography>
                <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label="sign-in-tabs">
                    <Tab label="Sign In" />
                    <Tab label="Create Account" />
                </Tabs>
                <form onSubmit={tab === 0 ? handleLoginSubmit : handleCreateUserSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        {tab === 0 ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignIn;
