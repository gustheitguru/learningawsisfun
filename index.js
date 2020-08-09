var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();


const mongoose = require('mongoose');
let uri = process.env.MONGO_URI;
mongoose.connect(uri, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true 
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//MongoDB Schema setup for terms
let termSchema = new mongoose.Schema({
	topic: {type: String, required: true},
	term: {type: String, required: true},
	def: {type: String, required: true}
})

//Term for mongoDB Call
let termAdd = mongoose.model('termAdd', termSchema)

 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about.html', (req, res) => {
    res.render('about');
});

app.get('/rs.html', (req, res) => {
    res.render('rs');
});

app.get('/fs.html', (req, res) => {
    res.render('fs', {
    	flashCard : 'Test Card'
    });
});






//listening on port to run engine
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});