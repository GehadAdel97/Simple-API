var express = require('express');
var productRouter  = express.Router();

var mongoose = require('mongoose');

var Products = require('../models/products');

productRouter.route('/')
.get(function(req,res,next){

  Products.find({}, function(err, product){
      if(err){
        throw err;
      }
      res.json(product);
  });

})

.post(function (req, res, next) {
    Products.create(req.body, function (err, product) {
        if (err) throw err;
        console.log('Product created!');
        var id = product._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the product with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Products.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

productRouter.route('/:productId')

.get(function (req, res, next) {
    Products.findById(req.params.productId, function (err, product) {
        if (err) throw err;
        res.json(product);
    });
})

.put(function (req, res, next) {
  Products.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, {
        new: true
    }, function (err, product) {
        if (err) throw err;
        res.json(product);
    });
})

.delete(function (req, res, next) {
    Products.findByIdAndRemove(req.params.productId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = productRouter;