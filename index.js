const express = require('express');
const cors = require('cors');
const connection = require('./connection');

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/api', (req, res) => {
    const randomTasks = new Promise((resolve, reject) => {
        const sql = 'SELECT task FROM tasks ORDER BY RAND() LIMIT 10'
        connection.query(sql, (err, rows) => {
            if (err instanceof Error) {
                console.log(err);
                reject({ error: 'Something Went Wrong' });
            }
            resolve(rows)
        })
    })

    randomTasks
        .then((value) => res.json(value))
        .catch((err) => res.status(500).json(err))
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(port || 80, (req, res) => {
    console.log(`Server listening on ${port}`)
})