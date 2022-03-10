import express from 'express';
import routes from './src/routes/routes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;

// mongoose connection
var mongoDBurl = 'mongodb+srv://MongoAnkitDB:9oK1NlItVn5jOCkk@cluster0.4rq54.mongodb.net/PizzaDeliveryApp?retryWrites=true&w=majority';
mongoose.connect(mongoDBurl)
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.get('/', (req, res) => {
    res.send(`The Backend is running on PORT ${PORT}`)
})

app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
}, (req, res) => {
    res.send('Hello from B!')
})

app.listen(PORT, () => {
    console.log(`The Backend is running on PORT ${PORT}`);
})