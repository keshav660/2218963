import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        URL Shortener
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
