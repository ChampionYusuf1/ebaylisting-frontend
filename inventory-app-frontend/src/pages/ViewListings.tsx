import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ViewListings: React.FC = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:3306/api/fetchlistings', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setListings(response.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching listings');
            }
        };

        fetchListings();
    }, []);

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    View Listings
                </Typography>
                {error && <Typography color="error" variant="body1">{error}</Typography>}
                <Grid container spacing={4}>
                    {listings.map((listing) => (
                        <Grid item key={listing.id} xs={12} sm={6} md={4}>
                            <Card>
                                {listing.image && (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`http://localhost:3306/${listing.image}`}
                                        alt={listing.part_number}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {listing.part_number}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: {listing.price}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Location: {listing.location}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Description: {listing.description}
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

export default ViewListings;
