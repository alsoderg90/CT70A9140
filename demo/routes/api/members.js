const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');
const e = require('express');

//Gets all members
router.get('/', (req, res) => res.json(members));
// Get single member
router.get('/:id', (req,res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json( { msg: `No member with id: ${req.params.id}` });
    }
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(), 
        name: req.body.name
    }
    if(!newMember.name) {
        return res.status(400).json({ msg: 'Please include a name and email'});
    } 
    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update Member
router.put('/:id', (req,res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach(m => {
            if(m.id === parseInt(req.params.id)) {
                m.name = updMember ? updMember.name : m.name
            }
            res.json( {msg: 'Member updated', member: m})
        })
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json( { msg: `No member with id: ${req.params.id}` });
    }
});

//Delete member 
router.get('/:id', (req,res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id !== parseInt(req.params.id)));
    } else {
        res.status(400).json( { msg: `No member with id: ${req.params.id}` });
    }
});

module.exports = router;