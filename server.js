const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to download video
app.get('/download', async (req, res) => {
  const url = req.query.url;
  const quality = req.query.quality || 'highest';

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).send('Error downloading video');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
