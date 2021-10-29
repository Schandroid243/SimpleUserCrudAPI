const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const articleRouter = require('./routes/articles');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/users', userRoute);
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    res.send('Hello this my user server !');
});


mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('Connected to the database !');
});

app.listen(9000);