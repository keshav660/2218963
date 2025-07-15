import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';

const UrlStatistics = ({ results }) => {
    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" align="center">URL Statistics</Typography>
            {results.length === 0 ? (
                <Typography variant="body1" align="center">No URLs shortened yet.</Typography>
            ) : (
                results.map((result, index) => (
                    <Grid container spacing={2} key={index} style={{ marginBottom: '15px' }}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Shortened URL: {result.shortLink}</Typography>
                            <Typography variant="body2">Created At: {new Date(result.createdAt).toLocaleString()}</Typography>
                            <Typography variant="body2">Expiry: {new Date(result.expiry).toLocaleString()}</Typography>
                            <Typography variant="body2">Clicks: {result.clicks}</Typography>
                        </Grid>
                    </Grid>
                ))
            )}
        </Paper>
    );
};

export default UrlStatistics;
