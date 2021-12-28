const express = require('express');
const mysql = require('mysql');
const config = require('../config/config');
const bodyParser = require('body-parser');
const pool = mysql.createPool(config);

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

// 로그인 후 이동되는 메인페이지
router.route('/main').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        main(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다 </p>')
        res.end();
    }
});

// 메인페이지 게시글 부분
router.route('/main/post').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        mainPost(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.end();
    }
})

// 메인페이지 채팅부분
router.route('/main/chat').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        mainChat(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.end();
    }
});

// 메인페이지 위치부분
router.route('/main/place').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        mainPlace(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>');
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.end();
    }
});

// 친구 목록
router.route('/main/friend/list').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        friendList(idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.end();
    }
})

// 친구 검색
router.route('/main/friend').post((req, res) => {
    const invitationCode = req.query.code;
    const idx = req.query.idx;

    if (pool) {
        invitation(invitationCode, idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.end();
    }
});

// 친구 추가
router.route('/main/insert_friend').post((req, res) => {
    const fIdx = req.query.fIdx;
    const idx = req.query.idx;

    if (pool) {
        insertFriend(fIdx, idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})


// 채팅방 만들기
router.route('/main/insert_chat_room').get((req,res)=>{
    const senderIdx = req.query.senderIdx;
    const receiverIdx = req.query.receiverIdx;

    console.log(senderIdx,receiverIdx)

    if (pool) {
        insertRoom(senderIdx, receiverIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 채팅방 만들기
const insertRoom = function(senderIdx, receiverIdx, callback) { 
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('select m1.idx from room_mem m1 inner join room_mem m2 on m2.roomIdx=m1.roomIdx where m1.memberIdx=? and m2.memberIdx=?',[senderIdx, receiverIdx], (err1, result1) => {
                if (err1) {
                    console.log(err1);
                    conn.release();
                } else {
                    console.log(result1);
                    if(Array.isArray(result1) && result1.length === 0){ // 두 멤버 채팅방 없을 경우
                        conn.query("SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE table_name = 'room' AND table_schema = 'us'",(err2, result2)=>{
                            console.log(result2);
                            if(err2){
                                callback(err2, null);
                                console.log(err2);
                            }else{
                                conn.query('insert into room(title, type) values (?,?)', ['채팅방'+result2[0].auto, '일반']);
                                conn.query('insert into room_mem(roomIdx, memberIdx) values (?,?)', [result2[0].auto, receiverIdx]);
                                conn.query('insert into room_mem(roomIdx, memberIdx) values (?,?)', [result2[0].auto, senderIdx], (err3, result3)=>{
                                    conn.release();
                                    if (err3) {
                                        callback(err3, null);
                                        console.log(err3);
                                        return;
                                    } else {
                                        callback(null, result2);
                                    }
                                })
                            }
                        })
                    }else{  // 두 멤버 채팅방 있을 경우
                        callback(null, 'false');
                        conn.release();
                    }
                }
            })
        }
    })
}


// 메인페이지
const main = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select email, message, name, img from member where idx = ?;';
            const sql1s = mysql.format(sql1, idx);

            const sql2 = 'select count(*) as postCnt from post where memberIdx = ?;'
            const sql2s = mysql.format(sql2, idx);

            const sql3 = 'select count(*) as friendCnt from friend where memberIdx = ?;'
            const sql3s = mysql.format(sql3, idx);

            const sql4 = 'select idx, img, name from member where idx in (select f.friendIdx from member as m join friend as f on m.idx = f.memberIdx where m.idx = ?);';
            const sql4s = mysql.format(sql4, idx);

            conn.query(sql1s + sql2s + sql3s + sql4s, (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, false);
                }
            });
        }
    });
}

// 메인페이지 게시글
const mainPost = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select i.imgName, count(i.imgName) as cnt, i.postIdx, p.createdAt from post as p join member as m on m.idx = p.memberIdx join img as i on p.idx = i.postIdx where p.memberIdx = ? group by i.postIdx;', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 메인페이지 채팅
const mainChat = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // 채팅 query문
            // select r.title, rm.memberIdx, m.img, m.name, (select content from chat where createdAt = (select max(createdAt) from chat where roomIdx = r.idx)) as chat from room_mem as rm join member as m on rm.memberIdx = m.idx join room as r on r.idx = rm.roomIdx where r.title in(select r.title from room_mem as rm join room as r on rm.idx = r.idx where rm.memberIdx = 1 group by r.title having rm.memberIdx != 1);
            conn.query('select r.title, r.idx, rm.memberIdx, m.img, m.name, (select content from chat where createdAt = (select max(createdAt) from chat where roomIdx = r.idx)) as chat, (select max(createdAt) from chat where roomIdx = r.idx) as time from room_mem as rm join member as m on rm.memberIdx = m.idx join room as r on r.idx = rm.roomIdx where r.title in (select title from room_mem as rm join room as r on rm.roomIdx = r.idx where rm.memberIdx = ?) and m.idx != ? group by title;', [idx, idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    console.log(err);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 메인페이지 위치
const mainPlace = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // 위치 query문
        }
    });
}

// 친구 목록
const friendList = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select m.idx, m.img, m.email, m.name, m.message from friend as f join member as m on m.idx = f.friendIdx where f.memberIdx = ?;', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 친구 검색
const invitation = function (invitationCode, idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            let flag = false;
            let fIdx = null;
            conn.query('select idx, name, message, img, email from member where code = ?;', [invitationCode], (err, result1) => {
                if (result1 != "") fIdx = result1[0].idx; 
                conn.query('select exists (select idx from friend where memberIdx = ? and friendIdx = ? limit 1) as success;', [idx, fIdx], (err, result2) => {
                    if (result2[0].success == 1) flag = true;

                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, { result1, flag });
                    }
                })

            });
        }
    });
}

// 친구 추가
const insertFriend = function (fIdx, idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('select exists (select idx from friend where memberIdx = ? and friendIdx = ? limit 1) as success;', [idx, fIdx], (err, result) => {
                if(result[0].success == 1) {
                    conn.query('delete from friend where memberIdx = ? and friendIdx = ?', [idx, fIdx]);
                }else {
                    conn.query('insert into friend(memberIdx, friendIdx) values(?, ?)', [idx, fIdx]);
                }

                conn.release();
                if (err) {
                    callback(err, null)
                    console.log('select문 오류')
                    return;
                } else {
                    callback(null, true);
                }
            });
        }
    })
}

module.exports = router