const youtubeDownload = require('youtube-dl-exec');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/download', async (req, res) => {
  var videoUrl = req.body.url;
  var options = {
      format: 'mp4',
      output: '%(title)s.%(ext)s'
  };
  youtubeDownload(videoUrl, options).then(output => {
    res.json({"message":"sucesso"})
  }).catch(err => {
    res.status(500).send('Erro ao baixar o vídeo');
  });
});

app.get('/', async (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
