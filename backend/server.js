const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const paginate = require('jw-paginate');

const Data = require('./dataSchems/data');
const Cart = require('./dataSchems/cart');
const User = require('./dataSchems/users');

let token = require('crypto-token');
const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
// this is our MongoDB database
const dbRoute = (
  'mongodb+srv://dbLpnEvg:321pusk@gettingstarted-xnt7i.mongodb.net/BookSrote?retryWrites=true&w=majority');

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// ================================= Load =========================================
router.get('/getData', (req, res) => {
  let lang = req.query.lang.toLowerCase();
  let search = req.query.search;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  if (search) {
    let searchText = new RegExp(search, 'i');
    let searchQueryRU = { $or: [{ ru_title: searchText }, { ru_author: searchText }, { ru_genre: searchText }] };
    let searchQueryEN = { $or: [{ en_title: searchText }, { en_author: searchText }, { en_genre: searchText }] };
    let findQ = (lang == 'ru') ? searchQueryRU : searchQueryEN;

    Data.find(findQ).sort([['updatedAt', 'descending']]).exec((err, data) => {
      if (err) return res.json({ success: false, error: err });
      let newData = setLang(data, lang);
      const items = newData;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 6;
      const pager = paginate(items.length, page, pageSize);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      return res.json({ pager, pageOfItems });
    });
    return;
  }

  Data.find().sort([['updatedAt', 'descending']]).exec((err, data) => {
    if (err) return res.json({ success: false, error: err });
    let newData = setLang(data, lang);

    if (startDate) {
      newData = filterDate(startDate, endDate, newData);
    }
    const items = newData;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const maxPages = 3;
    const pager = paginate(items.length, page, pageSize, maxPages);
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    return res.json({ pager, pageOfItems });
  });

});
// function returns an object with the selected language
function setLang(data, lang) {
  return data.map((item, i) => {
    let obj = {};
    for (let name in item) {
      let flag = name.startsWith(lang + '_');
      let newName = name.replace(lang + '_', '')
      if (flag || name == '_id' || name == 'createdAt' || name == 'updatedAt') {
        obj[newName] = item[name];
      }
    };
    return obj;
  });
}

// function returns an object with the selected date
function filterDate(from, to, data) {
  let dd = data.filter((item) => {
    if (item.createdAt.toISOString() >= from && item.createdAt.toISOString() <= to) {
      return item;
    }
  });
  return dd;
}



// ================================= Load END =========================================

// ================================= ADMIN ============================================
// add new post 
router.post('/putData', (req, res) => {
  let data = new Data();

  const { en_genre, en_author, en_title, en_price,
    ru_genre, ru_author, ru_title, ru_price
  } = req.body;
  if (!en_genre || !en_author || !en_title || !en_price || !ru_genre || !ru_author || !ru_title || !ru_price) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.en_genre = en_genre;
  data.ru_genre = ru_genre;
  data.en_author = en_author;
  data.ru_author = ru_author;
  data.en_title = en_title;
  data.ru_title = ru_title;
  data.en_price = en_price;
  data.ru_price = ru_price;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
// update post
router.post('/updateDB', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
// get one post for update
router.get('/getOne', (req, res) => {
  let id = req.query.id;
  Data.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// delete post
router.delete('/removePost', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
// ================================= ADMIN END ============================================

// =================================== CART ============================================


// get data cart for user
router.get('/getDataCart', (req, res) => {
  let data = new Cart();
  Cart.findOne({ token: req.query.token }, (err, obj) => {

    // if the user does not have a token, create a new cart for user
    if (obj == null) {
      let t = token(32);
      data.cart = [];
      data.token = t;
      data.needUpdate = true;
      data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    } else {
      obj.needUpdate = false; // else return user's cart
      return res.json({ success: true, data: obj });
    }
  });
});

// put products to cart
router.post('/putDataCart', (req, res) => {
  const { token, products } = req.body;
  if (!token || !products) {
    return res.json({
      success: false,
      error: 'INVALID DATA',
    });
  }
  Cart.findOneAndUpdate({ token: token }, { $push: { cart: products } }, (err, obj) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// remove product from cart
router.delete('/delDataCart', (req, res) => {
  const { token, id } = req.body;
  
  if (!token || !id) {
    return res.json({
      success: false,
      error: 'INVALID DATA',
    });
  }

  Cart.findOneAndUpdate({ token: token }, { $pull: { cart: { _id: id } } }, (err, obj) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// clean all cart
router.delete('/cleanDataCart', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({
      success: false,
      error: 'INVALID DATA',
    });
  }
  Cart.findOneAndUpdate({ token: token }, { $set: { cart: [] } }, (err, obj) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});



// =================================== CART END============================================


// =================================== USER ============================================

// registration new user
router.post('/registration', (req, res) => {
  let data = new User();
  const { name, surname, email, password } = req.body;
  if (!name || !surname || !email || !password) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  User.find({ email: email }, (err, obj) => {
    if (!obj.length) {
      data.token = token(32);
      data.name = name;
      data.surname = surname;
      data.email = email;
      data.password = password;
      data.role = 'user';
      data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    } else {
      return res.json({ success: false });
    }
  });
});
// load user data
router.get('/userLoad', (req, res) => {
  let token = req.query.token;
  User.findOne({ token: token }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


// login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  User.findOne({ email: email, password: password }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    if (data == null) {
      return res.json({ success: false });
    }
    return res.json({ success: true, data: data });
  });
});


// update password
router.post('/reset', (req, res) => {
  const { email, oldpassword, newpassword } = req.body;
  User.findOneAndUpdate({ email: email, password: oldpassword }, { $set: { password: newpassword } }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    if (data == null) {
      return res.json({ success: false });
    }
    return res.json({ success: true, data: data });
  });
});

// =================================== USER ============================================



// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));