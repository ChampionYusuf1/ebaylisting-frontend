import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ViewParts: React.FC = () => {
    const [parts, setParts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3001/api/fetchparts', {
                    headers: {
                        'Authorization': token
                    }
                });
                setParts(response.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching parts');
            }
        };

        fetchParts();
    }, []);

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    View Parts
                </Typography>
                {error && <Typography color="error" variant="body1">{error}</Typography>}
                <Grid container spacing={4}>
                    {parts.map((part) => (
                        <Grid item key={part.id} xs={12} sm={6} md={4}>
                            <Card>
                                {part.image && (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`http://localhost:3001/${part.image}`} // Ensure this URL matches your backend static files route
                                        alt={part.part_number}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {part.part_number}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: {part.price}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Location: {part.location}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Description: {part.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default ViewParts;
