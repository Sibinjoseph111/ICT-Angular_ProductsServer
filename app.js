const express = require('express');
const cors = require('cors');
const _ = require('lodash');

const mongoose = require('./src/model/mongoose');
const productData = require('./src/model/productData');
const userData = require('./src/model/userData');

var app = new express();
app.use(cors());
app.use(express.json());

app.get('/products', (req,res)=>{
    
    productData.find().then((products)=>{
        res.send(products);
    });
});

app.post('/products/insert', (req,res)=>{

    var data = _.pick(req.body.product,['productId', 'name', 'code', 'releaseDate', 'description', 'price', 'rating', 'imageUrl']);

    var product = new productData(data);

    product.save().then((product)=>{
        res.send(product);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.post('/products/edit', (req,res)=>{

    var data = _.pick(req.body.product,['_id', 'productId', 'name', 'code', 'releaseDate', 'description', 'price', 'rating', 'imageUrl']);

    productData.findByIdAndUpdate(data._id, {$set: data}, {new: true}).then((product)=>{
        res.send(product);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.post('/products/delete', (req,res)=>{

    productData.findOneAndDelete({productId: req.body.id}).then(()=>{
        res.send();
    },(err)=>{
        res.status(400).send(err);
    });
});

app.post('/user/login',(req,res)=>{
       
    userData.findOne({email: req.body.email}).then((user)=>{
        if(req.body.password == user.password){
            res.send(user);
        }else res.status(400).send('Email and password do not match');
    }).catch((err)=>{
        res.status(401).send('User not found');
    });
});

app.post('/user/signup',(req,res)=>{

    var data = _.pick(req.body,['username','email','password']);

    var user = new userData(data);
    user.save().then((user)=>{
        console.log(user);
        res.send(user);
    },(err)=>{
        res.status(409).send('Email already exists');
    }).catch((err)=>{
        res.status(400).send('Error adding user');
    });
});

app.listen('3000',()=>{
    console.log('App started at port 3000')
});