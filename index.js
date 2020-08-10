const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const moment = require('moment')


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


// Get function for all items in mongodb
function allItems(all) {
	let allTerms = []
	termAdd.find({}, 'term', (err, term) => {
			
			term.map((term) => {
				allTerms.push(term)
			});
			//this works to print out to console.
			console.log(allTerms, 'function allTerms')	
			//Question is how to I get this JSON to save to a VAR or be passed to another function
		});
};


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

	console.log('___________');
	console.log(res.statusCode);
	

function getTerms() {
	
	let allTerms = []
	termAdd.find({}, '_id', (err, term) => {
			
			term.map((term) => {
				allTerms.push(term)
				// return allTerms
			});
			//this works to print out to console.
			console.log(allTerms, 'getTerms')
			// console.log(foo)
		});
	};
	
	
	if (res.statusCode === 200) {
		let id = [];
		allItems()
		getTerms()
		console.log('200 statusCode')
		console.log(id)
	}

		//Random Number Generator
		let ranNum = Math.floor((Math.random() * 10) + 1);
		console.log('random number = ',ranNum);

 		res.render('fs', {
	    	flashCard : 'Test Card',
	    	items: ranNum,
	    	// term: allTerms
	    });
 	
});


//listening on port to run engine
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});