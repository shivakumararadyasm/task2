const express=  require('express');
const res = require('express/lib/response');
const match = require('nodemon/lib/monitor/match');
const router= express.Router();
const Employ =  require('../models/employ')

router.get('/', async(req,res)=>{
    try {
        const employes = await Employ.find()
        res.json(employes)
    } catch (e) {
        res.send('Error: ' +e)
    }
})

router.get('/id/:id', async(req,res)=>{
    try {
        const employ = await Employ.findById(req.params.id)
        res.json(employ)
    } catch (e) {
        res.send('Error: ' +e)
    }
})


// search by name
router.post('/name', async(req,res)=>{
    try {
        const employ = await Employ.find({name:req.body.name})
        res.json(employ)
    } catch (e) {
        res.send('Error: ' +e)
    }
})

// sorting by age
router.get('/age', async(req,res)=>{
    try {
        const employ = await Employ.find({}).sort({age: 1})
        res.json(employ)
    } catch (e) {
        res.send('Error: ' +e)
    }
})


// pagenation
router.get("/page", paginatedResults(), (req, res) => {
    res.json(res.paginatedResults);
  });
  
  function paginatedResults() {
    return async (req, res, next) => {
      
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skipIndex = (page - 1) * limit;
      const results = {};
  
      try {
        results.results = await Employ.find()
          .sort({ _id: 1 })
          .limit(limit)
          .skip(skipIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: "Error Occured" });
      }
    };
  }




router.post('/', async(req,res)=>{
    const employ = new Employ({
        name:req.body.name,
        age:req.body.age
    })
    try {

      const a1 =  await employ.save()
      res.json(a1)

    } catch (e) {
        res.send('Error: ' + e)
    }
})


module.exports = router