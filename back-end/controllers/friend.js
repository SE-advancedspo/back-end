const Friend = require('../models/friend');
const User = require('../models/user');

const addFriend = async (req, res) => {
    const exists = await User.findOne({
        username: req.body.friend_username,
    });

    if(exists) {
	    const newFriend = new Friend ({
		    username: req.params.username,
		    friend_username: req.body.friend_username,
	    })
	    newFriend.save((err, data)=>{
		    if(err) return res.json({Error: err});
		    return res.json(data);
	    })
    }
    else
        return res.status(400).json({res: 'User does not exist'}).send()
};

const removeFriend = async (req, res) => {
	let remFriend = await Friend.findOne({
        username: req.params.username,
		friend_username: req.body.friend_username,
    });
    if(!remFriend) {
        res.status(404).json({res: 'Not your friend or user does not exists'}).send()
        return;
    }
    await remFriend.deleteOne()
    res.status(204).send()
};

const getFriends = async (req, res) => {
    let friends;
    if(req.params.username) {
        friends = await Friend.find({
            username: req.params.username
        }).exec();
    }
    else
        friends = await Friend.find({}).exec();
    friends = friends.map((dbEntry) => {
        return {
            username: dbEntry.username,
            friend_username: dbEntry.friend_username,
        };
    });
    for(let i = 0; i < friends.length; i++) {
        let tmp = await User.findOne({username: friends[i].friend_username})
        friends[i].status = tmp.status
    }
    res.status(200).json(friends);
};

module.exports = {
    addFriend,
    removeFriend,
    getFriends
};