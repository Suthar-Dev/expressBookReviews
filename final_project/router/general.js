const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if (!isValid(username)){
      users.push({"username":username , "password":password});
      return res.status(200).json({message: "User Successfully added!"})
    }
    else{
      return res.status(404).json({message: "User already exists!"})
    }
  }
  return res.status(404).json({message: "Cannot register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = books.filter((books) => books.isbn === isbn);
  res.send(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let filtered_books = books.filter((books) => books.author === author);
  res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_books = books.filter((books) => books.title === title);
  res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.review;
  let filtered_books = books.filter((books) => books.review === isbn);
  res.send(filtered_books);
});

module.exports.general = public_users;
