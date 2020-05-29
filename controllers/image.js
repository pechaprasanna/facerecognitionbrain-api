const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '15fd44e594d34b78bd7ae739d8afd217'
});

const handleAPICall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to process the image'))
}

const handleImage = (req,res,db)=> {
	const {id} = req.body;
	db('users').where('id','=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage,
	handleAPICall
}