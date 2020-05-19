var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect('mongodb://localhost/books_db');

// Schema
var Schema = mongoose.Schema;
var BookSchema = new Schema({
    coverImage:String,
    title:String,
    author:String,
    releaseDate:Date,
    price:Number,
    description:String
});

// Model
mongoose.model('Book', BookSchema);
var Book = mongoose.model('Book');

// Create server
var app = express();

app.use(express.static(__dirname + '/site'));
app.use(bodyParser.json());



//ROUTES

//return all books from the db
app.get('/api/books', function(req,res){
    Book.find(function(err,docs){
        docs.forEach(function(item){
            console.log('Received a GET request fo _id: ' + item._id);
        });
        res.send(docs);
    });
});

//return single book
app.get('/api/books/:id', function(req, res){
    return Book.findById(req.params.id, function(err, book){
        if(!err){
            res.send(book);
        }else{
            console.log(err);
        }
    })
});
//insert a new book 
app.post('/api/books', function(req,res){
    console.log('Received a POST request ');
    for(var key in req.body){
        console.log(key + ': ' + req.body[key]);
    }
    var book = new Book(req.body);
    book.save(function(err,doc){
        if(!err){
            res.send(doc);
        }else{console.log(err);}
    });
});

//delete 
app.delete('/api/books/:id', function(req, res){
    console.log("Received a DELETE request for _id: " + req.params.id);
    Book.remove({_id: req.params.id}, function(err){
        res.send({_id:req.params.id});
    });
});

//update 
app.put('/api/books/:id', function(req,res){
    console.log("Received a UPDATE request for _id: " + req.params.id);
    Book.update({_id: req.params.id}, req.body, function(err){
       if(!err){
        res.send({_id: req.params.id});
       }else{
           console.log(err);
       }
    });
});



// Start server
var port = 4000;
app.listen(port);
console.log('Server on ' + port);