const express = require('express');
const connection = require('./connection');

const app = express();
const port = process.env.PORT;

app.get('/api', (req, res) => {
    const randomSet = new Set([])

    const sql = 'SELECT task FROM tasks'
    connection.query(sql, (err, rows) => {
        if (err instanceof Error) {
            console.log(err);
            return;
        }

        while (randomSet.size !== 10) {
            const randVal = Math.floor(Math.random() * rows.length + 1);
            randomSet.add(rows[randVal])
        }

        res.json(Array.from(randomSet));
    })
})

app.listen(port || 80, (req, res) => {
    console.log(`Server listening on ${port}`)
})