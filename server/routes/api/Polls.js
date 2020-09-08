const express = require('express')
const router = express.Router()
const Poll = require('../../models/Polls');
const { count } = require('../../models/Counter');
const {ensureAuthenticated} = require('./auth');



router.use(ensureAuthenticated)

  router.get('/', (req, res, next) => {
    Poll.find()
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });
  router.post('/checkduplication', (req, res, next) => {
    Poll.find({name: req.body.name})
      .exec()
      .then((poll) => res.json(poll))
      .catch((err) => next(err));
  });
  router.post('/checkduplicationopt', (req, res, next) => {
    Poll.find({_id: req.body.qid,'options.name': req.body.name})
      .exec()
      .then((poll) => res.json(poll))
      .catch((err) => next(err));
  });

  router.post('/add',  (req, res, next)=> {
    const poll = new Poll();
    poll.name = req.body.name;

    poll.save()
      .then(() => res.json(poll))
      .catch((err) => next(err));
  });
  router.post('/addOption', (req, res, next)=> {

    Poll.findById({_id:req.body.qid})
      .exec()  
      .then((poll) => {
        poll.options.push({'name':req.body.name})
        poll.save()
          .then(()=>res.json({name:req.body.name}))
          .catch((err) => next(err));

        
      })
      .catch((err) => next(err));
  })

  router.put('/increment', (req, res, next) => {
    Poll.findById({_id: req.body.qid})
      .exec()
      .then((poll) => {
        ++poll.options.id(req.body.optid).count; 
        poll.save()
          .then(() => res.json(poll))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  router.put('/decrement', (req, res, next) => {
    Poll.findById({_id: req.body.qid})
      .exec()
      .then((poll) => {
        // console.log(poll.options.id(req.body.optid))
        --poll.options.id(req.body.optid).count; 

        poll.save()
          .then(() => res.json(poll))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });



module.exports = router
