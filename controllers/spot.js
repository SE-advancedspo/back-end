const Spot = require('../models/spot')

const newSpot = (req, res) => {

    // Metto il controllo che l'autore esiste?
	
		//create a new user object using the User model and req.body
		const newSpot = new Spot({
            id_spot: req.body.id,
            testo: req.body.testo,
            autore: req.body.autore,
            num_like: req.body.num_like,
            altezza: req.body.altezza,
            regione: req.body.regione,
            colore_capelli: req.body.colore_capelli,
            barba: req.body.barba,
            facolta: req.body.facolta,
            lang: req.body.lang,
		})
		// save this object to database
		newSpot.save((err, data)=>{
			if(err) return res.json({Error: err});
			return res.json(data);
		})
};

const getAllSpots = async (req, res) => {
	let spots = await Spot.find({});
	spots = spots.map( (spot) => {
		return { spot };
	});
	res.status(200).json(spots);
};

const getOneSpot = (req, res) => {
	Spot.findOne({id_spot: req.query.id}, (err, data) => {
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