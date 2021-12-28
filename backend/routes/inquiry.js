const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const pool = mysql.createPool(config);
const router = express.Router();
const cors = require('cors');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(cors({origin : 'http://localhost:3000', credentials : true, methods : "put,get,post,delete,options"}));

// 문의하기
router.route('/inquiry').post((req, res) => {
    const memberIdx = req.body.memberIdx;
    const respondent = req.body.respondent;
    const title = req.body.title;
    const content = req.body.content;
    const type = req.body.type;

    if (pool) {
        inquiry(memberIdx, title, content, type, respondent, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})


//문의 하기
const inquiry = function (memberIdx, title, content, type, respondent, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            console.log(respondent)
            if (respondent == undefined) {
                conn.query('insert into inquiry(memberIdx, title, content, type) values (?,?,?,?)', [memberIdx, title, content, type], (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, result);
                    }
                })
            } else {
                conn.query('insert into inquiry(memberIdx, title, content, type, respondent) values (?,?,?,?,?)', [memberIdx, title, content, type, respondent], (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, result);
                    }
                })
            }
        }
    });
}

// 문의 내용 확인
router.route('/inquiry_che').get((req, res) => {
    const memberIdx = req.body.memberIdx;
    const title = req.body.title;
    const contet = req.body.content;
    const type = req.body.type;
    const type2 = req.body.type2;

    if(pool){
        inquiry_chk((err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

const inquiry_chk = function(callback){
    pool.getConnection((err, conn)=>{
        if(err){
            console.log(err);
        }else{
            conn.query('select memberIdx, title, content, type, type2 from inquiry', (err, result)=>{
                conn.release();
                if(err){
                    callback(err, null);
                    console.log('select문 오류');
                    return;
                }else{
                    callback(null, result);
                }
            })
        }
    })
}


module.exports = router