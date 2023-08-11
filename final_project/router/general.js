const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');


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

//This is done after completing tasks 1 to 9
/*
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookss = books[isbn]
  res.send(JSON.stringify(bookss));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookss = Object.values(books);
  let filtered_books = bookss.filter((book) => book.author === author);
  res.send(JSON.stringify(filtered_books));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookss = Object.values(books);
  let filtered_books = bookss.filter((books) => books.title === title);
  res.send(JSON.stringify(filtered_books));
});
*/
let myPromise =  new Promise((resolve) => {
  setTimeout(() => {
    resolve(books);
  }, 6000);
});

public_users.get('/',function (req, res) {
  myPromise.then(books=>{
    res.send(JSON.stringify(books))
  })
});

public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookss = books[isbn]
  myPromise.then(books=>{
    res.send(JSON.stringify(bookss))
  })
});

public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookss = Object.values(books);
  let filtered_books = bookss.filter((book) => book.author === author);
  myPromise.then(books=>{
    res.send(JSON.stringify(filtered_books))
  })
});

public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookss = Object.values(books);
  let filtered_books = bookss.filter((books) => books.title === title);
  myPromise.then(books=>{
    res.send(JSON.stringify(filtered_books))
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const review = books[isbn].reviews;
  res.send(JSON.stringify(review));
});

module.exports.general = public_users;
