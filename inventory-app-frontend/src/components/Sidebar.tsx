import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Create, ViewList, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div>
            <List>
                <ListItem button component={Link} to="/dashboard/create-listing">
                    <ListItemIcon>
                        <Create />
                    </ListItemIcon>
                    <ListItemText primary="Create Listings" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/dashboard/view-listings">
                    <ListItemIcon>
                        <ViewList />
                    </ListItemIcon>
                    <ListItemText primary="View Listings" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/dashboard/settings">
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;
