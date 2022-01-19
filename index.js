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
  const data = JSON.parse(fs.readFileSync('./talker.json'));
  const talker = data.find((r) => r.id === Number(id));
  if (!talker) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  response.status(HTTP_OK_STATUS).json(talker);
});

const generateToken = () => {
  let token = '';
  for (let index = 1; index <= 16; index += 1) {
    const result1 = Math.random().toString(36).substring(2, 3);
    token = token.concat(result1);
  }
  return token;
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  const emailStatus = re.test(email);

  if (emailStatus === '' || email === undefined) {
    return { 
      validate: false, 
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!emailStatus) {
    return {
      validate: false,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return { validate: true };
};

const validatePassWord = (password) => {
  if (password === '' || password === undefined) {
    return { 
      validate: false, 
      message: 'O campo "password" é obrigatório',
    };
  }

  if (password.length < 6) {
    return {
      validate: false,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }

  return {
    validate: true,
  };
};

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const emailStatus = validateEmail(email);
  const passwordStatus = validatePassWord(password);

  if (!emailStatus.validate) {
    return response.status(400).json({
      message: emailStatus.message,
    }); 
  }

  if (!passwordStatus.validate) {
    return response.status(400).json({ message: passwordStatus.message });
  }

  const token = generateToken();
  response.status(HTTP_OK_STATUS).json({ token: `${token}` });
});