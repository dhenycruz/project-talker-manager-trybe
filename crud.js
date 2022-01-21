const fs = require('fs').promises;

const FILE = './talker.json';

const saveTalker = ({ name, age, talk }) => {
  const talker = fs.readFile(FILE, 'utf-8').then((
    data,
  ) => {
    const dataSave = JSON.parse(data);
    const id = dataSave.length + 1;
    const newTalker = {
      age,
      id,
      name,
      talk,
    };
    dataSave.push(newTalker);
    fs.writeFile(FILE, JSON.stringify(dataSave));
    return newTalker;
  });

  return talker;
};

const updateTalker = (id, { age, name, talk }) => {
  const talker = fs.readFile(FILE, 'utf-8').then((data) => {
    const talkerUpdate = {
      name,
      age,
      id: Number(id),
      talk,
    };
    const dataArray = JSON.parse(data);
    const talkerFilter = dataArray.filter((res) => res.id !== Number(id));
    talkerFilter.push(talkerUpdate);
    fs.writeFile(FILE, JSON.stringify(talkerFilter));
    return talkerUpdate;
  });

  return talker;
};

const deleteTalker = (id) => {
  fs.readFile(FILE, 'utf-8').then((data) => {
    const dataArray = JSON.parse(data);
    const talkerFilter = dataArray.filter((res) => res.id !== Number(id));
    fs.writeFile(FILE, JSON.stringify(talkerFilter));
    return true;
  });
};

module.exports = {
  saveTalker,
  updateTalker,
  deleteTalker,
};