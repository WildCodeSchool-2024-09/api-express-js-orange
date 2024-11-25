const express = require('express'); // j'importe le framework Expressjs
const cors = require('cors');
const app = express(); // Je fais appel a ma fonction APP
const Datas = require('./datas.json'); // Mes données  JSON

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    optionsSuccessStatus: 200,
};

app.use(express.json()); // J'utilise un MIDDLEWARE pour exploiter le JSON
app.use(express.urlencoded({ extended: true })); // J'utilise un MIDDLEWARE pour l'encodage
app.use(cors(corsOptions));

/*

################# CRUD #################

app.get // Pour la lecture => R
app.post // Pour l'insertion => C
app.delete // Pour la suppression => D
app.update // Pour la MAJ => U

*/
app.get('/', (req, res) => {
    return res.send({ message: 'Vive API' })
});

app.get('/items', (req, res) => {
    if (Datas && Datas.length <= 0) {
        return res.send({ message: 'Erreur technique' })
    }
    return res.send(Datas)
})

app.get('/items/:id([0-9]+)', (req, res) => {
    const id = parseInt(req.params.id);

    return res.send(Datas.filter(data => data.id === id));
})

app.listen(3002, () => console.log('Mon serveur tourne'));

module.exports = app;