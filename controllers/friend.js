const Friend = require('../models/friend');
const User = require('../models/user');

const addFriend = async (req, res) => {
    const exists = await User.findOne({
        username: req.body.friend_username,
    });

    if(exists) {
	    const newFriend = new Friend ({
		    username: req.body.username,
		    friend_username: req.body.friend_username,
	    })
	    newFriend.save((err, data)=>{
		    if(err) return res.json({Error: err});
		    return res.json(data);
	    })
    }
    else
        return res.status(400).json({res: 'Friend does not exist'}).send()
};

const removeFriend = async (req, res) => {
	let remFriend = await Friend.findOne({
        username: req.body.username,
		friend_username: req.body.friend_username,
    });
    if(!remFriend) {
        res.status(404).json({res: 'Friend not found'}).send()
        return;
    }
    await remFriend.deleteOne()
    res.status(204).send()
};

const getFriends = async (req, res) => {
    let friends;
    req.params.username = req.params.username.substring(1)
    if(req.params.username) {
        friends = await Friend.find({
            username: req.params.username
        }).exec();
    }
    else
        friends = await Friend.find({}).exec();
    friends = friends.map((dbEntry) => {
        let tmp = User.findOne({username: dbEntry.friend_username,}).then()
        console.log(tmp.username)
        return {
            username: dbEntry.username,
            friend_username: dbEntry.friend_username,
        };
    });
    res.status(200).json(friends);
};

module.exports = {
    addFriend,
    removeFriend,
    getFriends
};