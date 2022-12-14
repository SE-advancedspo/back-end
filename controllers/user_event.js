const User_Event = require('../models/user_event');
const User = require('../models/user');
const Evento = require('../models/evento');

const addUE = async (req, res) => {
    const existsU = await User.findOne({
        username: req.params.username,
    });
    const existsE = await Evento.findOne({
        id_evento: req.body.id,
    });

    /*if(existsU && existsE) {
	    const newUE = new User_Event ({
		    username: req.params.username,
		    _id: req.body.id,
	    })
	    newUE.save((err, data)=>{
		    if(err) return res.json({Error: err});
		    return res.json(data);
	    })
    }
    else*/
    res.status(400).json({res: 'User or event does not exist'}).send()
};

const getUE = async (req, res) => {
    let ue = await User_Event.find({
            username: req.params.username
        }).exec();

    ue = ue.map((dbEntry) => {
        return {
            username: dbEntry.username,
            id_evento: dbEntry.id_evento,
        };
    });
    for(let i = 0; i < ue.length; i++) {
        let tmp = await Evento.findOne({_id: ue[i].id_evento})
        ue[i].evento = tmp
    }
    res.status(200).json(ue);
};

module.exports = {
    addUE,
    getUE
};