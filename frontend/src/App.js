import React, { useState } from 'react';
import Header from './components/Header';
import UrlShortener from './components/UrlShortener';
import UrlStatistics from './components/UrlStatistics';
import { Container } from '@mui/material';

const App = () => {
    const [results, setResults] = useState([]);

    return (
        <Container maxWidth="md">
            <Header />
            <UrlShortener setResults={setResults} />
            <UrlStatistics results={results} />
        </Container>
    );
};

export default App;
