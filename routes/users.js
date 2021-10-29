const { json } = require('express');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err) {
        res.json({message: err});
    }
});

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch(err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err) {
        res.json({message: err});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const user = await User.updateOne({_id: req.params.id,},{
            $set: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password: req.body.password
            }
        });
        res.json(user);
    }catch(err) {
        res.json({message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const user = await User.deleteOne({_id: req.params.id});
        res.json(user);
    } catch(err) {
        res.json({message: err});
    }
});




module.exports = router;