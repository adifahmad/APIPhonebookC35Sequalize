var express = require('express');
var router = express.Router();
const models = require('../models')
const path = require('path')
const { Op } = require("sequelize");
const { off } = require('process');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const { page = 1, sortBy = "id", sortMode = "desc", limit = 30, keyword = ''} = req.query
    const offset = (page - 1) * limit
    const user = await models.users.findAndCountAll({
      where : { 
         [Op.or] : [ {name : {[Op.iLike]: `%${keyword}%`}}, {phone : {[Op.iLike]: `%${keyword}%`}}]
       },
       order : [
        [sortBy, sortMode]
       ], 
       limit : limit,
       offset : offset

      });
      console.log(user)
    const total = user.count
    const pages = Math.ceil(total / limit)
    res.json({phonebook: user.rows, page : Number(page), limit : Number(limit), pages, total})
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
    res.status(201).json(user)
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
    res.status(201).json(user[1])
  } catch (err) {
    console.log(err)
    res.json({ err })
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    const users = await models.users.findOne({
      where: {
        id: req.params.id
      }
    })
    const user = await models.users.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(users)
  } catch (err) {
    console.log(err)
    res.json({ err })
  }
});

router.put('/:id/avatar', async function (req, res, next){
  try{
    const {avatar} = req.files
    let avatarName = Date.now() + '-' + avatar.name;
    let avatarPath = path.join(__dirname, '..', 'public', 'images', avatarName);
    avatar.mv(avatarPath, async function (err) {
      const user = await models.users.update({ avatar : avatarName }, {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      });
      console.log(user)
      res.json(user[1])

    });
    
  }catch(err) {
    console.log(err)
    res.json({ err })
  }
});

module.exports = router;
