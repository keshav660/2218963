const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');

// POST /shorturls
router.post('/shorturls', async (req, res) => {
    const { url, validity, shortcode } = req.body;

    // Validate URL
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (!urlPattern.test(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate a unique shortcode if not provided
    let shortCode = shortcode || shortid.generate();
    const expiry = new Date(Date.now() + (validity || 30) * 60000); // Default to 30 minutes

    try {
        const newUrl = new Url({ longUrl: url, shortCode, expiry });
        await newUrl.save();
        res.status(201).json({ shortLink: `http://localhost:${5000}/${shortCode}`, expiry });
    } catch (error) {
        res.status(400).json({ error: 'Error creating short URL' });
    }
});

// GET /shorturls/:code
router.get('/shorturls/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const url = await Url.findOne({ shortCode: code });
        if (!url) return res.status(404).json({ error: 'URL not found' });

        // Increment click count and log click data
        url.clicks += 1;
        await url.save();

        if (url.expiry < Date.now()) {
            return res.status(410).json({ error: 'URL has expired' });
        }

        res.redirect(url.longUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
