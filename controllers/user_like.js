const User_Like = require('../models/user_like');
const User = require('../models/user');
const Spot = require('../models/spot');

const addLike = async (req, res) => {
    const existsU = await User.findOne({
        username: req.params.username,
    });
    const existsS = await Spot.findOne({
        id_spot: req.query.id,
    });
    const existsL = await User_Like.findOne({
        username: req.params.username,
        id_spot: req.query.id,
    });

    if(!existsL) {
        if(existsU && existsS) {
	        const newLike = new User_Like ({
		        username: req.params.username,
    		    id_spot: req.query.id,
	        })
            var numLikes = existsS.num_like + 1;
            await existsS.updateOne({num_like: numLikes});
	        newLike.save((err, data)=>{
		        if(err) return res.json({Error: err});
		        return res.json(data);
	        })
        }
        else
            return res.status(400).json({res: 'User or spot does not exist'}).send()
    }
    else
        return res.status(400).json({res: 'Spot already liked'}).send()
};

const removeLike = async (req, res) => {
    const existsL = await User_Like.findOne({
        username: req.params.username,
        id_spot: req.query.id,
    });

    if(existsL) {
        const spot = await Spot.findOne({
            id_spot: req.query.id
        })
	    const remLike = User_Like.findOne ({
		    username: req.params.username,
    	    id_spot: req.query.id,
	    })
        var numLikes = spot.num_like - 1;
        await spot.updateOne({num_like: numLikes})
        remLike.deleteOne((err, data)=>{
	        if(err) return res.json({Error: err});
	        return res.json(data);
        })
    }
    else
        return res.status(400).json({res: 'Like does not exists'}).send()
};

module.exports = {
    addLike,
    removeLike
};