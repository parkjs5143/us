const express = require('express');
const app = express();

const mysql = require('mysql');
const config = require('../config/config.json');

const cors = require('cors');


const bodyParser = require('body-parser');
const pool = mysql.createPool(config);

const router = express.Router()
router.use(cors());
router.use(express.static('views'));



module.exports = router