import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, Snackbar, Alert } from '@mui/material';
import { createShortUrl } from '../utils/api';

const UrlShortener = () => {
    const [urls, setUrls] = useState([{ longUrl: '', validity: 30, shortcode: '' }]);
    const [results, setResults] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (index, event) => {
        const newUrls = [...urls];
        newUrls[index][event.target.name] = event.target.value;
        setUrls(newUrls);
    };

    const handleAddUrl = () => {
        if (urls.length < 5) {
            setUrls([...urls, { longUrl: '', validity: 30, shortcode: '' }]);
        }
    };

    const handleSubmit = async (index) => {
        const { longUrl, validity, shortcode } = urls[index];
        const response = await createShortUrl(longUrl, validity, shortcode);
        
        if (response.error) {
            setSnackbarMessage(response.error);
            setSnackbarOpen(true);
            return;
        }

        setResults((prevResults) => [...prevResults, response]);
        setSnackbarMessage('URL shortened successfully!');
        setSnackbarOpen(true);
    };

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" align="center">URL Shortener</Typography>
            {urls.map((url, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '15px' }}>
                    <Grid item xs={8}>
                        <TextField
                            name="longUrl"
                            label="Long URL"
                            value={url.longUrl}
                            onChange={(event) => handleChange(index, event)}
                            fullWidth
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            name="validity"
                            label="Validity (min)"
                            type="number"
                            value={url.validity}
                            onChange={(event) => handleChange(index, event)}
                            fullWidth
                            variant="outlined"
                            inputProps={{ min: 1 }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            name="shortcode"
                            label="Custom Shortcode"
                            value={url.shortcode}
                            onChange={(event) => handleChange(index, event)}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={() => handleSubmit(index)}>Shorten</Button>
                    </Grid>
                </Grid>
            ))}
            <Button variant="outlined" color="secondary" onClick={handleAddUrl}>Add Another URL</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="info">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div>
                {results.map((result, index) => (
                    <Typography key={index} variant="body1">Shortened URL: {result.shortLink} (Expires: {result.expiry})</Typography>
                ))}
            </div>
        </Paper>
    );
};

export default UrlShortener;
