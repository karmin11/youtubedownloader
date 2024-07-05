document.getElementById('downloadForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  
  const url = document.getElementById('url').value;
  const quality = document.getElementById('quality').value;
  const messageDiv = document.getElementById('message');

  if (!url) {
    messageDiv.textContent = 'Please enter a YouTube URL.';
    messageDiv.style.color = 'red';
    return;
  }

  messageDiv.textContent = 'Preparing your download...';
  messageDiv.style.color = 'black';

  try {
    const response = await fetch(`/download?url=${encodeURIComponent(url)}&quality=${quality}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'video.mp4'; // The filename should ideally be dynamic based on the video title
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      messageDiv.textContent = 'Download started!';
      messageDiv.style.color = 'green';
    } else {
      throw new Error('Failed to download video.');
    }
  } catch (error) {
    messageDiv.textContent = 'Error: ' + error.message;
    messageDiv.style.color = 'red';
  }
});
