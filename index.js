const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crud = require('./crud');
const auth = require('./autheFunctions');

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

app.get('/talker/search', async (request, response) => {
  const { authorization } = request.headers;
  const { search } = request.query;
  const tokenStatus = auth.validateToken(authorization);
  if (!tokenStatus.validate) {
    return response.status(401).json({ message: tokenStatus.message });
  }

  const talker = await crud.talkSearch(search);
  response.status(200).json(talker);
});

app.get('/talker', (_request, response) => {
  // const data = JSON.parse(fs.readFileSync('./talker.json'));
  fs.readFile('./talker.json', 'utf-8').then((
    data,
  ) => response.status(HTTP_OK_STATUS).json(JSON.parse(data)));
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  fs.readFile('./talker.json').then((
    data,
    ) => {
      const talker = JSON.parse(data).find((r) => r.id === Number(id));
      if (!talker) {
        return response.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
      response.status(HTTP_OK_STATUS).json(talker);
  });
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const emailStatus = auth.validateEmail(email);
  const passwordStatus = auth.validatePassWord(password);

  if (!emailStatus.validate) {
    return response.status(400).json({
      message: emailStatus.message,
    }); 
  }

  if (!passwordStatus.validate) {
    return response.status(400).json({ message: passwordStatus.message });
  }

  const token = auth.generateToken();
  response.status(HTTP_OK_STATUS).json({ token: `${token}` });
});

app.post('/talker', async (request, response) => {
  const { authorization } = request.headers;
  const { name, age, talk } = request.body;
  const tokenStatus = auth.validateToken(authorization);
  const talkerStatus = auth.validateTalker(name, age, talk);
  if (!tokenStatus.validate) {
    return response.status(401).json({ message: tokenStatus.message });
  }
  if (!talkerStatus.validate) {
    return response.status(400).json({ message: talkerStatus.message });
  }

  const newTalker = await crud.saveTalker(request.body);
  response.status(201).json(newTalker);
});

app.put('/talker/:id', async (request, response) => {
  const { authorization } = request.headers;
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const tokenStatus = auth.validateToken(authorization);
  const talkerStatus = auth.validateTalker(name, age, talk);
  if (!tokenStatus.validate) {
    return response.status(401).json({ message: tokenStatus.message });
  }
  if (!talkerStatus.validate) {
    return response.status(400).json({ message: talkerStatus.message });
  }
  const talkerUpdate = await crud.updateTalker(id, request.body);
  response.status(200).json(talkerUpdate);
});

app.delete('/talker/:id', async (request, response) => {
  const { authorization } = request.headers;
  const { id } = request.params;
  const tokenStatus = auth.validateToken(authorization);

  if (!tokenStatus.validate) {
    return response.status(401).json({ message: tokenStatus.message });
  }

  await crud.deleteTalker(id);
  response.status(204).send();
});
