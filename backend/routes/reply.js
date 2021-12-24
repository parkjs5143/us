const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const pool = mysql.createPool(config);
const cors = require('cors');

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())  
router.use(cors({origin : 'http://localhost:3000', credentials : true, methods : "PUT,GET,POST,DELETE,OPTIONS,HEAD"}));

// 댓글 입력
router.route('/reply/insert_reply').post((req, res) => {
    const idx = req.body.idx;
    const groupIdx = req.body.groupIdx;
    const postIdx = req.body.postIdx;
    const content = req.body.content;
    const memberIdx = req.body.memberIdx;
    const parentIdx = req.body.parentIdx;

    if (pool) {
        replyInsert(idx, groupIdx, postIdx, content, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});

// 댓글 수정
router.route('/reply/edit_reply').put((req, res) => {
    const idx = req.body.idx;
    const content = req.body.content;

    if (pool) {
        replyEdit(idx, content, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 댓글 삭제
router.route('/reply/delete_reply').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        replyDelete(idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 댓글 좋아요
router.route('/reply/like').get((req, res) => {
    const replyIdx = req.query.replyIdx;
    const memberIdx = req.query.memberIdx;

    if (pool) {
        replyLike(replyIdx, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 댓글 좋아요 여부
router.route('/reply/like/exist').get((req, res) => {
    const replyIdx = req.query.replyIdx;
    const memberIdx = req.query.memberIdx;

    if (pool) {
        replyLikeExist(replyIdx, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})


// 댓글 입력
const replyInsert = function (idx, groupIdx, postIdx, content, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            if (groupIdx == undefined) {
                conn.query("SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE table_name = 'reply' AND table_schema = DATABASE();", (err, result) => {
                    conn.query('insert into reply(postIdx, groupIdx, groupNum, depth, content, memberIdx, parentIdx) values(?, ?, 0, 0, ?, ?, ?);', [postIdx, result[0].auto, content, memberIdx, result[0].auto], (err, result) => {
                        conn.release();
                        if (err) {
                            callback(err, null);
                            console.log('select문 오류')
                            return;
                        } else {
                            callback(null, true);
                        }
                    });
                });
            } else {
                conn.query('select idx, groupIdx, groupNum, depth from reply where idx = ?', [idx], (err, result1) => {
                    conn.query('select ifnull(MIN(groupNum),0) as cnt from reply where groupIdx = ? and groupNum > ? and depth >= ?;', [result1[0].groupIdx, result1[0].groupNum, result1[0].depth], (err, result2) => {
                        console.log(result2[0].cnt)
                        if (result2[0].cnt == 0) {
                            conn.query('select ifnull(max(groupNum),0)+1 as cnt from reply where groupIdx = ?', [result1[0].groupIdx], (err, result3) => {

                                conn.query('insert into reply(postIdx, groupIdx, groupNum, depth, content, memberIdx, parentIdx) values(?, ?, ?, ?, ?, ?, ?)', [postIdx, groupIdx, result3[0].cnt, result1[0].depth + 1, content, memberIdx, idx], (err, result) => {
                                    conn.release();
                                    if (err) {
                                        callback(err, null);
                                        console.log('select문 오류')
                                        return;
                                    } else {
                                        callback(null, true);
                                    }
                                });
                            });
                        } else {
                            conn.query('update reply set groupNum = groupNum +1 where groupIdx = ? and groupNum >= ?', [result1[0].groupIdx, result2[0].cnt], (err, result3) => {

                                conn.query('insert into reply(postIdx, groupIdx, groupNum, depth, content, memberIdx, parentIdx) values(?, ?, ?, ?, ?, ?, ?)', [postIdx, result1[0].groupIdx, result2[0].cnt, result1[0].depth + 1, content, memberIdx, idx]);
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('select문 오류')
                                    return;
                                } else {
                                    callback(null, true);
                                }
                            });
                        }
                    });
                });
            }
        }
    });
}

// 댓글 수정
const replyEdit = function (idx, content, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('update reply set content = ? where idx = ?', [content, idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, true);
                }
            })
        }
    })
}

// 댓글 삭제
const replyDelete = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('delete from reply_like where replyIdx = ?', [idx]);

            conn.query('select EXISTS (select idx from reply where parentIdx = ? limit 1) as success;', [idx], (err, result) => {
                if (err) {
                    console.log(err);
                }

                if (result[0].success == 1) {
                    conn.query('update reply set memberIdx = ?, content = ? where idx = ?', [null, '삭제된 댓글입니다.', idx]);
                } else if (result[0].success == 0) {
                    conn.query('delete from reply where idx = ?', [idx]);
                }

                conn.release();
                if (err) {
                    callback(err, null);
                    console.log('select문 오류')
                    return;
                } else {
                    callback(null, true);
                }
            })
        }
    })
}

// 댓글 좋아요
const replyLike = function (replyIdx, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select exists (select idx from reply_like where replyIdx = ? and memberIdx = ? limit 1) as success;', [replyIdx, memberIdx], (err, result) => {
                if (result[0].success == 1) {
                    conn.query('delete from reply_like where replyIdx = ? and memberIdx = ?', [replyIdx, memberIdx]);
                } else {
                    conn.query('insert into reply_like(replyIdx, memberIdx) values(?, ?)', [replyIdx, memberIdx]);
                }

                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, true);
                }
            })
        }
    });
}

// 댓글 좋아요 여부
const replyLikeExist = function (replyIdx, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select exists (select idx from reply_like where replyIdx = ? and memberIdx = ? limit 1) as success;', [replyIdx, memberIdx], (err, result) => {

                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    });
}





module.exports = router