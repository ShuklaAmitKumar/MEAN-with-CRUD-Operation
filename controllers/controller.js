const Product = require('../models/model');

//Simple version, without validation or sanitation
exports.test = function (req, res, next) {

    // Product.find({ qty : {$regex: /47/, $options: 'i'} },function (err, product) {
    //     console.log(err);
    //     if (err) return next(err);
    //     res.send(product);
    // })

    // Product.find({ $where: "/37/.test(this._id)" },function (err, product) {
    //     console.log(err);
    //     if (err) return next(err);
    //     res.send(product);
    // })
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res, next) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err, data) {
        if (err) {
            return next(err);
        }
        res.send({ 'msg': 'Product Created successfully', 'data': data })
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, data) {
        if (err) return next(err);
        if (!data) {
            return res.send({ 'msg': 'Data does not exists' });
        }
        res.send(data);
    })
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, data) {
        if (err) return next(err);
        if (!data) {
            return res.send({ 'msg': 'Data does not exists' });
        }
        /*
        Product.findById(req.params.id, function (err, data) {
            if (err) return next(err);
            if (!data) {
                return res.send({ 'msg': 'Data does not exists' });
            }
            res.send(data);
        })
        */
        res.send({ 'msg': 'Data updated.', 'data': data });
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, data) {
        if (err) return next(err);
        if (!data) {
            return res.send({ 'msg': 'Data does not exists' });
        }
        res.send({ 'msg': 'Deleted Successfully!', 'data': data });
    })
};