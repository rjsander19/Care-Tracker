const express = require("express")
const mongoose = require("mongoose")
const List = require('./models/list')
const methodOverride = require("method-override")
const { findOneAndUpdate } = require('./models/list')
const app = express()
require('dotenv').config()
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


// INDUCES

// I 
app.get('/', async (req, res) => {
    const allLists = await List.find({}).exec();
    res.render('index.ejs', {
      lists: allLists,
    });
  });

// New
app.get('/new', (req, res) => {
    res.render('new.ejs', { list: {} });
  });

// Delete
app.delete('/:id', async (req, res) => {
    await List.findByIdAndDelete(req.params.id);
    res.redirect('/');
  });

// Update
app.put('/:id', async (req, res) => {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/${updatedList._id}`);
  });




// C is for CREATE
app.post('/', (req,res) => {
    const createdList = new List(req.body)
    createdList.save().then(res.redirect('/'))
  })


// Edit
  app.get('/:id/edit', async (req, res) => {
      const foundList = await List.findById(req.params.id).exec();
      if (!foundList) {
        res.send('List not found');
        return;
      }
      res.render('edit.ejs', { list: foundList });
    });

// Show
app.get('/:id', async (req, res) => {
    const foundList = await List.findById(req.params.id).exec();
    if (!foundList) {
      res.send('List not found');
      return;
    }
    res.render('show.ejs', {
      list: foundList,
    });
  });



// Listener
const PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 8000;
  }
  app.listen(PORT);