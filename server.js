var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

Genre = require('./models/genres')
Book = require('./models/books')

// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore')
var db = mongoose.connection

app.get('/', function(req, res){
    res.send("Please use /api/books or /api/genres");
})

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if (err){
            throw err
        }
        res.json(genres)
    })
})

app.post('/api/genres', function(req, res){
    var genr = req.body

    Genre.addGenre(genr, function(err, genr){
        if (err){
            throw err
        }
        res.json(genr)
    })
})

app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id
    var genr = req.body

    Genre.updateGenre(id, genr, {}, function(err, genr){
        if (err){
            throw err
        }
        res.json(genr)
    })
})

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id

    Genre.removeGenre(id, function(err, genr){
        if (err){
            throw err
        }
        res.json(genr)
    })
})

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if (err){
            throw err
        }
        res.json(books)
    })
})

app.post('/api/books', function(req, res){
    var book = req.body
    Book.addBook(book, function(err, book){
        if (err){
            throw err
        }
        res.json(book)
    })
})

app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if (err){
            throw err
        }
        res.json(book)
    })
})


app.listen(3000)
console.log("running on port 3000")