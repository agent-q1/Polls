const express = require('express')
const router = express.Router()
const Poll = require('../../models/Polls');
const { count } = require('../../models/Counter');
const {ensureAuthenticated} = require('./auth');


  router.get('/',ensureAuthenticated, (req, res, next) => {
    Poll.find()
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });
  router.post('/checkduplication',ensureAuthenticated, (req, res, next) => {
    Poll.find({name: req.body.name})
      .exec()
      .then((poll) => res.json(poll))
      .catch((err) => next(err));
  });
  router.post('/checkduplicationopt',ensureAuthenticated, (req, res, next) => {
    Poll.find({_id: req.body.qid,'options.name': req.body.name})
      .exec()
      .then((poll) => res.json(poll))
      .catch((err) => next(err));
  });

  router.post('/add',ensureAuthenticated,  (req, res, next)=> {
    const poll = new Poll();
    poll.name = req.body.name;

    poll.save()
      .then(() => res.json(poll))
      .catch((err) => next(err));
  });
  router.post('/addOption',ensureAuthenticated, (req, res, next)=> {

  Poll.findByIdAndUpdate({_id:req.body.qid},{
    $push: 
        {options: 
            {
                name:req.body.name,
            }
        }
  })
  .then(() => res.json({name:req.body.name}))
  .catch((err) => next(err));

  })
//   app.delete('/api/counters/:id',ensureAuthenticated, function (req, res, next) {
//     Counter.findOneAndDelete({ _id: req.params.id })
//       .exec()
//       .then((counter) => res.json())
//       .catch((err) => next(err));
//   });

//   app.put('/api/counters/:id/increment',ensureAuthenticated, (req, res, next) => {
//     Counter.findById(req.params.id)
//       .exec()
//       .then((counter) => {
//         counter.count++;

//         counter.save()
//           .then(() => res.json(counter))
//           .catch((err) => next(err));
//       })
//       .catch((err) => next(err));
//   });

//   app.put('/api/counters/:id/decrement',ensureAuthenticated, (req, res, next) => {
//     Counter.findById(req.params.id)
//       .exec()
//       .then((counter) => {
//         counter.count--;

//         counter.save()
//           .then(() => res.json(counter))
//           .catch((err) => next(err));
//       })
//       .catch((err) => next(err));
//   });


module.exports = router
