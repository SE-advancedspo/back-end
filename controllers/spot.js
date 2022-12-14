const Spot = require('../models/spot')
const User = require('../models/user')
const User_Like = require('../models/user_like');

const newSpot = async (req, res) => {

    const exists = await User.findOne({
        username: req.body.autore,
    });
	
	if(exists) {
		//create a new user object using the User model and req.body
		let desc
		if(req.body.dec == undefined)
			desc = 'none'
		if(req.body.lang == undefined)
			desc = 'Italiano'
		const newSpot = new Spot({
            testo: req.body.testo,
            autore: req.body.autore,
            num_like: req.body.num_like,

			desc: desc,
            lang: req.body.lang,
		})
		// save this object to database
		newSpot.save((err, data)=>{
			if(err) return res.json({Error: err});
			return res.json({message: "Spot creato con successo"});
		})
	}
	else
		return res.json({message: "Impossibile creare lo spot"})
};

const getAllSpots = async (req, res) => {

	let spots = await Spot.find({});
	spots = spots.map( (spot) => {
		return {
			id_spot: spot._id.toString(),
			testo: spot.testo,
			autore: spot.autore,
			num_like: spot.num_like,
			desc: spot.desc,
			lang: spot.lang,
		};
	});
	res.status(200).json(spots);
};

const getOneSpot = (req, res) => {
	Spot.findOne({_id: req.query.id}, (err, data) => {
		if(!data) {
			return res.json({message: "Spot does not exists"});
		}
		return res.json(data);
	})
};

module.exports = {
    newSpot,
    getAllSpots,
    getOneSpot
};