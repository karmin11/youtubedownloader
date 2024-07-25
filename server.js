const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/download', async (req, res) => {
    const videoURL = req.query.url;

    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(videoURL).pipe(res);
    } catch (err) {
        res.status(500).send('Failed to download video');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
