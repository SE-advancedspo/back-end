const User_Event = require('../models/user_event');
const User = require('../models/user');
const Evento = require('../models/evento');

const addUE = async (req, res) => {
    const existsU = await User.findOne({
        username: req.params.username,
    });
    
  var existsE;
  if(req.body.id.length == 24) {
    existsE = await Evento.findOne({
        _id: req.body.id,
    });
  }
  else
    existsE = false;

  const existsUE = await User_Event.findOne({
    username: req.params.username,
    id_evento: req.body.id
  })
    
  if(!existsUE) {
    if(existsU && existsE) {
	    const newUE = new User_Event ({
		    username: req.params.username,
		    id_evento: req.body.id,
	    })
	    newUE.save((err, data)=>{
		    if(err) return res.json({Error: err});
		    return res.json(data);
	    })
    }
    else
      res.status(400).json({res: 'User or event does not exist'}).send()
  }
  else
    res.status(400).json({res: 'You already follow this event'}).send()
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

const remUE = async (req, res) => {
  const UE = await User_Event.findOne({
    username: req.params.username,
    id_evento: req.body.id
  })
    
  if(UE) {
    UE.deleteOne((err)=>{
	    if(err) return res.json({Error: err});
	    return res.json({message: "Follow rimosso con successo"});
    })
  }
  else
    res.status(400).json({res: 'You do not follow this event'}).send()
};

module.exports = {
  addUE,
  getUE,
  remUE
};
