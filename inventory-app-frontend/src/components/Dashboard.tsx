import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';

const Dashboard: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };

    return (
        <div style={{ display: 'flex' }}>
            <AppBar position="fixed" style={{ zIndex: 1400 }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Inventory
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                style={{ width: 240, flexShrink: 0 }}
                PaperProps={{ style: { width: 240 } }}
            >
                <Toolbar />
                <div>
                    <List>
                        <ListItem button component={Link} to="create-part">
                            <ListItemText primary="Create Part" />
                        </ListItem>
                        <ListItem button component={Link} to="view-parts">
                            <ListItemText primary="View Parts" />
                        </ListItem>
                        <ListItem button component={Link} to="settings">
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main style={{ flexGrow: 1, padding: '16px' }}>
                <Toolbar />
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
};

export default Dashboard;
