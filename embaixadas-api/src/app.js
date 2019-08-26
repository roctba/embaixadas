const express = require('express') //importacao do pacote
const app = express() //instanciando express
const db = require("./db/db");
const bcrypt = require('bcrypt')
const bodyParser  =  require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const secrekey = process.env.SECRET_KEY;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function verifyJWT(req, res, next){
  var token = req.headers['authorization'];
  if (!token) return res.status(401).send('Acesso não autorizado.');
  
  token = token.replace('Bearer ', '');

  jwt.verify(token, secrekey, function(err, decoded) {
    if (err) return res.status(500).send('Acesso não autorizado');
    next();
  });
}

app.post('/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(req.body.password, saltRounds);
  db.saveUser(user);

  const expiresIn = 24 * 60 * 60;
  const accessToken = jwt.sign({ id:  user.id }, secrekey, {
    expiresIn: expiresIn
  });

  const usr = JSON.parse(JSON.stringify(user));
  delete usr.password;

  res.status(200).send({"user": usr, "token": accessToken});
});

app.post('/signin', (req, res) => {
  const user = req.body;

  const userFound = db.getUser(user.email);
  if (!userFound) return res.status(404).send('User not found!');

  const result = bcrypt.compareSync(user.password, userFound.password);
  if(!result) return res.status(401).send('Password not valid!');

  const expiresIn = 24 * 60 * 60;
  const accessToken = jwt.sign({ id: user.id }, secrekey, {
    expiresIn: expiresIn
  });

  res.status(200).send({"user": userFound, "token": accessToken});
});

app.get('/embassies', verifyJWT, function (req, res) { //endereco da requisicao onde e retornado hello world
  const embassies = db.getEmbassies();

  res.status(200).send(embassies);
});

app.listen(3001);