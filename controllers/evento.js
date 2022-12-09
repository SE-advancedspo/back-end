const Evento = require('../models/evento')

// Non previsto nelle API, serve a noi per aggiungere eventi
const newEvento = (req, res) => {

		const newEvento = new Evento({
            id_evento: req.body.id,
            nome: req.body.nome,
            data: req.body.data,
            luogo: req.body.luogo
		})
		// save this object to database
		newEvento.save((err, data)=>{
			if(err) return res.json({Error: err});
			return res.json(data);
		})
};

const getAllEvents = async (req, res) => {
	let events = await Evento.find({});
	events = events.map( (event) => {
		return { event };
	});
	res.status(200).json(events);
};

const getOneEvent = (req, res) => {
	Evento.findOne({id_evento: req.query.id}, (err, data) => {
		if(!data) {
			return res.json({message: "Event does not exists"});
		}
		return res.json(data);
	})
};

module.exports = {
    newEvento,
    getAllEvents,
    getOneEvent
};