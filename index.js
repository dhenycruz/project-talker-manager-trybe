const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync('./talker.json'));
  response.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const dataId = id;
  const data = JSON.parse(fs.readFileSync('./talker.json'));
  const talker = data.find((r) => r.id === parseInt(dataId));
  if (!talker) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  response.status(HTTP_OK_STATUS).json(talker);
});