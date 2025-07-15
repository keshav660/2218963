const API_URL = 'http://localhost:5000';

export const createShortUrl = async (url, validity, shortcode) => {
    const response = await fetch(`${API_URL}/shorturls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, validity, shortcode }),
    });
    return response.json();
};

export const getUrlStats = async (shortcode) => {
    const response = await fetch(`${API_URL}/shorturls/${shortcode}/stats`);
    return response.json();
};
