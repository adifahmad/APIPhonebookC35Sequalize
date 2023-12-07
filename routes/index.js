var express = require('express');
var router = express.Router();
const models = require('../models')
const { Op } = require("sequelize");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const { page = 1, sortBy = "id", sortMode = "desc", limit = 5, keyword = ''} = req.query
    const offset = (page - 1) * limit
    const user = await models.users.findAll({
      where : { 
         [Op.or] : [ {name : {[Op.iLike]: `%${keyword}%`}}, {phone : {[Op.iLike]: `%${keyword}%`}}]
       },
       order : [
        [sortBy, sortMode]
       ]
      });
      
    const total = user.length
    const pages = Math.ceil(total / limit)
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json({ err })
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { name, phone } = req.body
    const user = await models.users.create({
      name, phone
    });
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json({ err })
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { name, phone } = req.body
    const user = await models.users.update({ name, phone }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    });
    res.json(user[1])
  } catch (err) {
    console.log(err)
    res.json({ err })
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    const user = await models.users.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json({ err })
  }
});

router.put('/:id/avatar', async function (req, res, next){
  try{
    const {avatar} = req.body
    const user = await models.users.update({ avatar }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    });
    res.json(user[1])
  }catch(err) {
    console.log(err)
    res.json({ err })
  }
});

module.exports = router;
