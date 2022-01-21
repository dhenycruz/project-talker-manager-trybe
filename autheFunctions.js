const generateToken = () => {
  let token = '';
  for (let index = 1; index <= 16; index += 1) {
    const result1 = Math.random().toString(36).substring(2, 3);
    token = token.concat(result1);
  }
  return token;
};

const validateToken = (token) => {
  if (token === undefined) {
    return {
      validate: false,
      message: 'Token não encontrado',
    };
  }

  if (token.length < 16) {
    return {
      validate: false,
      message: 'Token inválido',
    };
  }

  return {
    validate: true,
  };
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

const validateName = (name) => {
  if (name === '' || name === undefined) {
    return {
      validate: false,
      message: 'O campo "name" é obrigatório',
    };
  }
  if (name.length < 3) {
    return {
      validate: false,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }

  return { validate: true };
};

const validateAge = (age) => {
  if (!age || age === '') {
    return {
      validate: false,
      message: 'O campo "age" é obrigatório',
    };
  }
  if (age < 18) {
    return {
      validate: false,
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }
  return { validate: true };
};

const validateWatchedAt = (date) => {
  const re = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  const dateTest = re.test(date);

  if (date === undefined || date === '') {
    return {
      validate: false,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  if (!dateTest) {
    return {
      validate: false,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  return { validate: true };
};

const validateRate = (rate) => {
  if (rate === undefined || rate === '') {
    return {
      validate: false,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (rate < 1 || rate > 5) {
    return {
      validate: false,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }
  return { validate: true };
};

const validateTalk = (talk) => {
  if (talk === undefined) {
    return {
      validate: false,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  const watchedAtStatus = validateWatchedAt(talk.watchedAt);
  const rateStatus = validateRate(talk.rate);
  if (!watchedAtStatus.validate) return watchedAtStatus;
  if (!rateStatus.validate) return rateStatus;
  return { validate: true };
};

const validateTalker = (name, age, talk) => {
  const nameStatus = validateName(name);
  const ageStatus = validateAge(age);
  const talkerStatus = validateTalk(talk);
  if (!nameStatus.validate) return nameStatus;
  if (!ageStatus.validate) return ageStatus;
  if (!talkerStatus.validate) return talkerStatus;
  return {
    validate: true,
  };
};

module.exports = {
  generateToken,
  validateEmail,
  validatePassWord,
  validateToken,
  validateTalker,
};