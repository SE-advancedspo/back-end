const User = require('../models/user')

//GET '/user'
const getAllUsers = async (req, res) => {
	let users = await User.find({});
	users = users.map( (user) => {
		return {
			username: user.username,
			password: user.password
		};
	});
	res.status(200).json(users);
};

//POST user
const newUser = (req, res) => {
	//check if the user email already exists in db
	User.findOne({ email: req.body.email }, (err, data) => {
		//if user not in db, add it
		if (!data) {
			//create a new user object using the User model and req.body
			const newUser = new User({
				email: req.body.email,
    			password: req.body.password,
    			username: req.body.username,
    			contatto: req.body.contatto,
    			foto: req.body.foto,
    			bio: req.body.bio,
    			facolta: req.body.facolta,
    			anno_acc: req.body.anno_acc,
				regione: req.body.regione,
    			desc: req.body.desc,

				status: true,
			})
			// save this object to database
			newUser.save((err, data)=>{
				if(err) return res.json({Error: err});
				return res.json(data);
			})
		//if there's an error or the user is in db, return a message
		}else{
			if(err) return res.json(`Something went wrong, please try again. ${err}`);
			return res.json({message:"User already exists"});
		}
	})
};

//DELETE '/user'
const deleteAllUsers = (req, res) => {
	res.json({message: "DELETE all tea"});
};

//GET '/user/:username'
const getOneUser = (req, res) => {
	User.findOne({username: req.query.username}, (err, data) => {
		if(!data) {
			return res.json({message: "User does not exists"});
		}
		return res.json(data);
	})
};

//POST '/user/:name'
const newComment = (req, res) => {
	res.json({message: "POST 1 tea comment"});
};

//DELETE '/user/:uesrname'
const deleteOneUser = async (req, res) => {
	const remUser = await User.findOne({username: req.query.username})

    if(!remUser) {
        res.status(404).json({res: 'User not found'}).send()
        return;
    }
    await remUser.deleteOne()
    res.status(204).json({
		res: 'Utente rimosso',
	}).send()
};



//export controller functions
module.exports = {
	getAllUsers,
	newUser,
	deleteAllUsers,
	getOneUser,
	newComment,
	deleteOneUser
};
