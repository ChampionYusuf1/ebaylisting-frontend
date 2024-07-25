import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CreateListing: React.FC = () => {
    const [formData, setFormData] = useState({
        part_number: '',
        price: '',
        location: '',
        description: '',
        image: null as File | null
    });
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('part_number', formData.part_number);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post('http://localhost:3306/api/createlisting', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setMessage('Listing created successfully!');
            setFormData({
                part_number: '',
                price: '',
                location: '',
                description: '',
                image: null
            });
        } catch (err) {
            console.error(err);
            setMessage('Error creating listing');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <Typography variant="h4" gutterBottom>
                    Create Listing
                </Typography>
                {message && <Typography color="primary" variant="body1">{message}</Typography>}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Part Number"
                        name="part_number"
                        value={formData.part_number}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        required
                    />
                    <Button
                        variant="contained"
                        component="label"
                        style={{ marginTop: '16px' }}
                    >
                        Upload Image
                        <input
                            type="file"
                            name="image"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '16px' }}
                    >
                        Create Listing
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CreateListing;
