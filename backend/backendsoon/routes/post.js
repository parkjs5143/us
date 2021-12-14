const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const pool = mysql.createPool(config);

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

// 업로드 저장방법
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 이미지 파일
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, 'uploads')
            //텍스트 파일
        } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
            cb(null, 'uploads')
        }
    },
    // 파일이름 설정
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

// 업로드
const upload = multer({ storage: storage })

// 게시글 등록
router.route('/post/upload').post(upload.array('fileupload', 10), (req, res) => {
    const memberIdx = req.body.memberIdx;
    const content = req.body.content;
    const file = req.files;
    const hashTag = req.body.hashTag;

    if (pool) {
        postUpload(memberIdx, content, file, hashTag, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});

// 게시글 수정
router.route('/post/edit').put(upload.array('fileupload', 10), (req, res) => {
    const idx = req.body.idx;
    const content = req.body.content;
    const file = req.files;
    const hashTag = req.body.hashTag;

    if (pool) {
        postEdit(idx, content, file, hashTag, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 삭제
router.route('/post/delete').delete((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        postDelete(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 좋아요
router.route('/post/like').get((req, res) => {
    const postIdx = req.query.postIdx;
    const memberIdx = req.query.memberIdx;

    if (pool) {
        postLike(postIdx, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 좋아요 여부
router.route('/post/like/exist').get((req, res) => {
    const postIdx = req.query.postIdx;
    const memberIdx = req.query.memberIdx;

    if (pool) {
        postLikeExist(postIdx, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})




// 게시글 등록
const postUpload = function (memberIdx, content, file, hashTag, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('insert into post(memberIdx, content, report) values(?, ?, ?)', [memberIdx, content, "N"], (err, result1) => {
                for (let i = 0; i < file.length; i++) {
                    let fileName = file[i].filename;
                    let filePath = file[i].path;
                    let postIdx = result1.insertId;
                    conn.query('insert into img(postIdx, imgPath, imgName) values(?, ?, ?)', [postIdx, filePath, fileName])
                }

                for (let i = 0; i < hashTag.length; i++) {
                    const tagName = hashTag[i];
                    conn.query('select (select idx from hashTag where name = ? limit 1) as success;', [tagName], (err, result2) => {
                        if(result2[0].success != null) {
                            conn.query('insert into post_hashTag(postIdx, hashTagIdx) values(?, ?)', [result1.insertId, result2[0].success])
                        } else {
                            conn.query('insert into hashTag(name) values(?)', [tagName], (err, result3) => {
                                conn.query('insert into post_hashTag(postIdx, hashTagIdx) values(?, ?)', [result1.insertId, result3.insertId])
                            });
                        }
                    });
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

// 게시글 수정
const postEdit = function (idx, content, file, hashTag, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('update post set content = ? where idx = ?', [content, idx], (err, result1) => {
                conn.query('select imgName from img where postIdx = ?', [idx], (err, result2) => {
                    for (let i = 0; i < result2.length; i++) {
                        fs.unlink('uploads/images/'+result2[i].imgName, (err) => {
                            console.log(err);
                        });
                    } 
                });

                conn.query('delete from post_hashTag where postIdx = ?', [idx]);
                for (let i = 0; i < hashTag.length; i++) {
                    const tagName = hashTag[i];
                    conn.query('select (select idx from hashTag where name = ? limit 1) as success;', [tagName], (err, result2) => {
                        if(result2[0].success != null) {
                            conn.query('insert into post_hashTag(postIdx, hashTagIdx) values(?, ?)', [idx, result2[0].success])
                        } else {
                            conn.query('insert into hashTag(name) values(?)', [tagName], (err, result3) => {
                                conn.query('insert into post_hashTag(postIdx, hashTagIdx) values(?, ?)', [idx, result3.insertId])
                            });
                        }
                    });
                }
                
                conn.query('delete from img where postIdx = ?', [idx]);

                for (let i = 0; i < file.length; i++) {
                    let fileName = file[i].filename;
                    let filePath = file[i].path;
                    conn.query('insert into img(postIdx, imgPath, imgName) values(?, ?, ?)', [idx, filePath, fileName])
                }

                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, true);
                }
            });
        }
    });
}

// 게시글 삭제
const postDelete = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select imgName from img where postIdx = ?', [idx], (err, result) => {
                for (let i = 0; i < result.length; i++) {
                    fs.unlink('uploads/images/'+result[i].imgName, (err) => {
                        console.log(err);
                    });
                }
                conn.query('delete from img where postIdx = ?', [idx], (err, result) => {
                    conn.query('delete from post_like where postIdx = ?', [idx]);
                
                    conn.query('select idx from reply where postIdx = ?', [idx], (err, result) => {
                        if(err) {
                            console.log(err);
                        }
                        for (let i = 0; i < result.length; i++) {
                            conn.query('delete from reply_like where replyIdx = ?', [result[0].idx]);          
                        }
                    })

                    conn.query('delete from reply where postIdx = ?', [idx]);
                    conn.query('delete from post_hashtag where postIdx = ?', [idx]);
                    conn.query('delete from post where idx = ?', [idx]);
                    conn.release();
                    if(err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, true);
                    }
                })
            });
        }
    });
}

// 게시글 좋아요
const postLike = function (postIdx, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select exists (select idx from post_like where postIdx = ? and memberIdx = ? limit 1) as success;', [postIdx, memberIdx], (err, result) => {
                if(result[0].success == 1) {
                    conn.query('delete from post_like where postIdx = ? and memberIdx = ?', [postIdx, memberIdx]);
                } else {
                    conn.query('insert into post_like(postIdx, memberIdx) values(?, ?)', [postIdx, memberIdx]);
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

// 게시글 좋아요 여부
const postLikeExist = function (postIdx, memberIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select EXISTS (select idx from post_like where postIdx = ? and memberIdx = ? limit 1) as success;', [postIdx, memberIdx], (err, result) => {

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