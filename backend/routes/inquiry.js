const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const pool = mysql.createPool(config);
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

// 문의하기
router.route('/inquiry').post((req, res) => {
    const memberIdx = req.body.memberIdx;
    const title = req.body.title;
    const content = req.body.content;
    const type = req.body.type;
    const type2 = req.body.type2;
    const sql = 'insert into inquiry(memberIdx, title, content, type,type2) values (?,?,?,?,?)';
    const data = [memberIdx, title, content, type, type2];
    console.log(`memberIdx:${memberIdx}, title:${title}, content:${content}, type:${type}, type2: ${type2}`);

    pool.query(sql, data, (err, rows, fields) => {
        if (err) {
            console.log('err : ' + err);
            res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
            res.write('<h2>문의 실패!</h2>');
            res.write('<p>오류가 발생했습니다</p>');
            res.end();
        } else {
            console.log(rows);
            res.json({message : "문의 성공!"});
        }
    })
});

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