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
/*
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
}; */

async function getAllTerms() {
    let allTerms = []
    const fetchedTerms = await termAdd.find({}, '')
    fetchedTerms.forEach(fetchedTerm => allTerms.push(fetchedTerm))
    // console.log(allTerms, 'getAllTerms')
    return allTerms
}


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

	// console.log('___________');
	// console.log(res.statusCode);
	
	let foo = {foo: "bar"} //test JSON return
	
	
	if (res.statusCode === 200) {
		
		let newTerm2 = []

		getAllTerms().then(value => {
			// console.log('Terms', value)
			// console.log('Number of Terms', value.length)
			
			for(var i = 0; i < value.length; i++) {
				newTerm2.push(value[i]);
				// console.log(value[i], 'foo');
				// console.log('*****************')

			}
			console.log('                       ');	
			console.log('***********************');	
			console.log('***********************');	
			// console.log(newTerm2, 'newTerm2')

			// console.log('Array Length = ', newTerm2.length)	

		
	
   			 
		//Random Number Generator
			let ranNum = Math.floor((Math.random() * newTerm2.length));
			// console.log('random number = ',ranNum);
			

		//single flash card	
			let fs = newTerm2[ranNum]
			// console.log(fs, 'flash card')

		//breaking up flash card into a new array ","
			let newArray = fs.term
			// console.log(newArray)


		//return to page	
   			res.render('fs', {
		    	fsTopic: fs.topic,
		    	fsTerm: fs.term,
		    	fsDef: fs.def
	    		});

 			});
	
	};
	
});


//listening on port to run engine
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});