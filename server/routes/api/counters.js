const express = require('express')
const app = express.Router()
const Counter = require('../../models/Counter');
const { count } = require('../../models/Counter');
const {ensureAuthenticated} = require('./auth');
  app.get('/api/counters',ensureAuthenticated, (req, res, next) => {
    Counter.find()
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });
  app.get('/api/counters/:name',ensureAuthenticated, (req, res, next) => {
    Counter.find({name: req.params.name})
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });

  app.post('/api/counters',ensureAuthenticated, function (req, res, next) {
    const counter = new Counter();
    counter.name = req.body.name;

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });

  app.delete('/api/counters/:id',ensureAuthenticated, function (req, res, next) {
    Counter.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((counter) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/counters/:id/increment',ensureAuthenticated, (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count++;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/counters/:id/decrement',ensureAuthenticated, (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count--;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });


module.exports = app
