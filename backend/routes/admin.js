const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
const pool = mysql.createPool(config);
const cors = require('cors');

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cors());

const cookieParser = require('cookie-parser');
router.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록
const session = require('express-session'); // 세션 설정과 관리
const MySQLStore = require('express-mysql-session')(session); // 세션 설정과 관리
var sessionStore = new MySQLStore(config);

router.use(cors({origin : 'http://localhost:3000', credentials : true, methods : "put,get,post,delete,options"}));

// 세션 환경세팅
router.use(session({
    key: "first",
    secret: "session_cookie_secret", // sessioId를 hash하기 위해 사용되는 key값
    store: sessionStore,
    resave: false, // 세션을 접속할때마다 새로운 세션을 발급할지 말지(기본 false)
    saveUninitialized: false, // 세션 ID를 발급하지 않는 세션도 다 기록할지 정함(기본 false)
    cookie : {
        httpOnly : true, // js로 cookie에 접근하지 못하게 하는 옵션
        
    }
}));

router.route('/admin/login').get((req, res) => {
    const email = req.query.email;
    const userPw = req.query.userPw;
    console.log(`email:${email}, userpw:${userPw}`);
    if(pool){
        LoginAdmin(email, userPw, (err, result)=>{
            if(err){
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            }else{
                
                let dataLoading = true;
                if(result == true){
                    req.session.user = {
                        email: email,
                        pw: userPw,
                        name: "first",
                        authorized: true
                    };
                    res.json(result)
                    const hi  = new Promise((resolve, reject)=>{
                        if(dataLoading){
                            resolve("true");
                        }else{
                            reject("false");
                        }
                    });
                    hi.then((res)=> console.log(`Resolve : ${res}`))
                    .catch((err)=> console.log(err));
                }else{
                    res.send(false);
                    console.log(false);
                }
            }
        })
    }
});
const LoginAdmin = function(email, userPw, callback){
    pool.getConnection((err, conn)=>{
        if(err){
            console.log(err);
        }else{
            console.log('접근 성공');
            const sql = conn.query('select email,userPw from member where email=? and userPw=?', [email,userPw], (err, result)=>{
                console.log(result);
                conn.release();
                if(err){
                    callback(err, null);
                    return;
                }else{
                    if(result == ""){
                        callback(null, false);
                    }else{
                        callback(null, true);
                    }
                }
            })
        }
    })
}
// 로그아웃
router.route('/admin/logout').get((req, res) => {
    res.clearCookie("first");
    req.session.destroy(function (err, result) {
        if (err) console.err('err : ', err);
        res.json({message: "로그아웃!"});
    });
});


// 전체회원
router.route('/admin/member').get((req, res) => {
    const cur = req.query.page;
    const email = req.query.email;
    if (pool) {
        adminMember(cur, email, (err, result) => {
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

// 회원 디테일
router.route('/admin/member/Mdetail').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        adminMemberMdetail(idx, (err, result) => {
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

// 회원 디테일 게시물 목록
router.route('/admin/member/post').get((req, res) => {
    const idx = req.query.idx;
    const cur = req.query.page;
    const content = req.query.content;
    if (pool) {
        adminMemberPost(idx, cur, content, (err, result) => {
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

// 회원 디테일 게시글 디테일
router.route('/admin/member/post/detail').get((req, res) => {
    const postIdx = req.query.postIdx;

    if (pool) {
        adminMemberPostDetail(postIdx, (err, result) => {
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

// 회원 디테일 채팅창 목록
router.route('/admin/member/room').get((req, res) => {
    const idx = req.query.idx;
    const cur = req.query.page;
    const title = req.query.title;
    if (pool) {
        adminMemberRoom(idx, cur, title, (err, result) => {
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

// 회원 디테일 채팅창 디테일
router.route('/admin/member/room/detail').get((req, res) => {
    const roomIdx = req.query.roomIdx;

    if (pool) {
        adminMemberRoomDetail(roomIdx, (err, result) => {
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

// 게시글 목록
router.route('/admin/post').get((req, res) => {
    const cur = req.query.page;
    const report = req.query.report;
    const date1 = req.query.date1;
    const date2 = req.query.date2;
    if (pool) {
        adminPost(cur, report, date1, date2, (err, result) => {
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

// 게시글 디테일
router.route('/admin/post/detail').get((req, res) => {
    const postIdx = req.query.postIdx;

    if (pool) {
        adminPostDetail(postIdx, (err, result) => {
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

// 채팅 목록
router.route('/admin/chat').get((req, res) => {
    const cur = req.query.page;
    const report = req.query.report;
    const date1 = req.query.date1;
    const date2 = req.query.date2;

    if (pool) {
        adminChat(cur, report, date1, date2, (err, result) => {
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

// 채팅 상세
router.route('/admin/chat/detail').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        adminChatDetail(idx, (err, result) => {
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

// 채팅 메시지 상세
router.route('/admin/chat/detail/plus').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        adminChatDetailPlus(idx, (err, result) => {
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

// 1:1문의 내역
router.route('/admin/inquiry').get((req, res) => {
    const cur = req.query.page;
    const name = req.query.name;
    if (pool) {
        adminInquiry(cur, name, (err, result) => {
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

// 문의 상세
router.route('/admin/inquiry/detail').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        adminInquiryDetail(idx, (err, result) => {
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

// 문의 답변
router.route('/admin/inquiry/repeat').put((req, res) => {
    const idx = req.query.idx;
    const message = req.query.message;
    if (pool) {
        adminInquiryRepeat(idx, message, (err, result) => {
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

// 대시보드
router.route('/admin/dashBoard').get((req, res) => {
    if (pool) {
        adminDashBoard((err, result) => {
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

// 문의 삭제
router.route('/admin/inquiry/delete').get((req, res) => {
    const idx = req.query.idx;
    if(pool) {
        adminInquiryDelete(idx, (err, result) => {
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






// 전체회원
const adminMember = function (cur, email, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (email == null) {
                conn.query('select count(*) as cnt from member', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select idx, email, createdAt from member order by idx desc limit ?, ?', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        })
                    }
                })
            } else {
                const keyword = "%" + email + "%";
                conn.query('select count(*) as cnt from member where email like ?', [keyword], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select idx, email, createdAt from member where email like ? order by idx desc limit ?, ?', [keyword, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        })
                    }
                })
            }
        }
    });
}

// 회원 디테일
const adminMemberMdetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('select idx, email, code, img, createdAt, (select count(*) from friend where memberIdx = ?) as friendCnt, agreement1, agreement2 from member where idx = ?;', [idx, idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null)
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    })
}

// 회원 디테일 게시글 목록
const adminMemberPost = function (idx, cur, content, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (content == null) {
                conn.query('select count(*) as cnt from post where memberIdx = ?', [idx], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;
                        console.log(totalPageCount)
                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select idx, content, createdAt from post where memberIdx = ? order by idx desc limit ?, ?', [idx, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            } else {
                const keyword = "%" + content + "%";
                conn.query('select count(*) as cnt from post where content like ? and memberIdx = ?', [keyword, idx], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select idx, content, createdAt from post where memberIdx = ? and content like ? order by idx desc limit ?, ?', [idx, keyword, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 회원 게시글 디테일
const adminMemberPostDetail = function (postIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select p.content, p.createdAt, m.email, m.name from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
            const sql1s = mysql.format(sql1, postIdx)

            const sql2 = 'select imgName from img where postIdx = ?;';
            const sql2s = mysql.format(sql2, postIdx);

            const sql3 = 'select r.content, m.name, r.groupIdx, r.depth, r.createdAt from reply as r join member as m on r.memberIdx = m.idx where postIdx = ? order by groupIdx asc, groupNum asc;';
            const sql3s = mysql.format(sql3, postIdx);

            conn.query(sql1s + sql2s + sql3s, (err, result) => {
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

// 회원 디테일 채팅방 목록
const adminMemberRoom = function (idx, cur, title, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (title == null) {
                conn.query('select count(*) as cnt from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ?;', [idx], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select r.idx, r.title, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? order by r.idx desc limit ?, ?;', [idx, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null); 3
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            } else {
                const keyword = "%" + title + "%";
                conn.query('select count(*) as cnt from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? and r.title like ?', [idx, keyword], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select r.idx, r.title, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where rm.memberIdx = ? and title like ? order by r.idx desc limit ?, ?;', [idx, keyword, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null); 3
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 회원 디테일 채팅방 디테일
const adminMemberRoomDetail = function (roomIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select r.title, c.content, c.createdAt, m.name, m.img from room as r join chat as c on r.idx = c.roomIdx join member as m on c.memberIdx = m.idx where c.roomIdx = ? order by c.createdAt asc;';
            const sql1s = mysql.format(sql1, roomIdx);

            const sql2 = 'select distinct m.name, m.img from chat as c join member as m on c.memberIdx = m.idx where roomIdx = ?;'
            const sql2s = mysql.format(sql2, roomIdx);

            conn.query(sql1s + sql2s, (err, result) => {
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

// 게시글 목록
const adminPost = function (cur, report, date1, date2, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const date11 = date1 + " 00:00:00";
            const date22 = date2 + " 23:59:59";
            if (report != "" && date1 != "") {
                conn.query('select count(*) as cnt from post where report = ? and createdAt between ? and ? ', [report, date11, date22], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select p.idx, p.content, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where report = ? and p.createdAt between ? and ? order by idx desc limit ?, ?', [report, date11, date22, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            } else if (report != "" || date1 != "") {
                if (report) {
                    conn.query('select count(*) as cnt from post where report = ?', [report], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 5) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            let endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            if (endPage > totalPage) {
                                endPage = totalPage;
                            }

                            conn.query('select p.idx, p.content, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where report = ? order by idx desc limit ?, ?', [report, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage, totalPage });
                                }
                            });
                        }
                    });
                } else {
                    conn.query('select count(*) as cnt from post where createdAt between ? and ? ', [date11, date22], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;
                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }
                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 5) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            let endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            if (endPage > totalPage) {
                                endPage = totalPage;
                            }

                            conn.query('select p.idx, p.content, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx where p.createdAt between ? and ? order by idx desc limit ?, ?', [date11, date22, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    console.log('1111111')
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage, totalPage });
                                }
                            });
                        }
                    });
                }
            } else {
                conn.query('select count(*) as cnt from post', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select p.idx, p.content, m.name, p.createdAt, p.report from post as p join member as m on p.memberIdx = m.idx order by idx desc limit ?, ?', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 게시글 디테일
const adminPostDetail = function (postIdx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select p.content, p.createdAt, m.email, m.name from post as p join member as m on p.memberIdx = m.idx where p.idx = ?;';
            const sql1s = mysql.format(sql1, postIdx)

            const sql2 = 'select imgName from img where postIdx = ?;';
            const sql2s = mysql.format(sql2, postIdx);

            const sql3 = 'select r.content, m.email, r.createdAt from reply as r join member as m on r.memberIdx = m.idx where postIdx = ?;';
            const sql3s = mysql.format(sql3, postIdx);

            conn.query(sql1s + sql2s + sql3s, (err, result) => {
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

// 채팅 목록
const adminChat = function (cur, report, date1, date2, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            console.log(date1)
            console.log(report)
            const date11 = date1 + " 00:00:00";
            const date22 = date2 + " 23:59:59";
            if (report != "" && date1 != "") {
                console.log('3333')
                conn.query('select count(*) as cnt from room where report = ? and createdAt between ? and ?', [report, date11, date22], (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select r.idx, r.title, r.report, count(rm.roomIdx) as cnt, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where r.createdAt between ? and ? and r.report = ? group by title order by idx desc limit ?, ?;', [date11, date22, report, no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            } else if (report == "" && date1 == "") {
                console.log('11111')
                conn.query('select count(*) as cnt from room', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }

                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select r.idx, r.title, r.report, count(rm.roomIdx) as cnt, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx group by title order by idx desc limit ?, ?;', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            } else {
                console.log('2222')
                if (report) {
                    conn.query('select count(*) as cnt from room where report = ?', [report], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 5) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            let endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            if (endPage > totalPage) {
                                endPage = totalPage;
                            }

                            conn.query('select r.idx, r.title, r.report, count(rm.roomIdx) as cnt, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where r.report = ? group by title order by idx desc limit ?, ?;', [report, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage, totalPage });
                                }
                            });
                        }
                    });
                } else {
                    conn.query('select count(*) as cnt from room where createdAt between ? and ?', [date11, date22], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 5) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            let endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            if (endPage > totalPage) {
                                endPage = totalPage;
                            }

                            conn.query('select r.idx, r.title, r.report, count(rm.roomIdx) as cnt, r.createdAt, r.type from room as r join room_mem as rm on r.idx = rm.roomIdx where r.createdAt between ? and ? group by title order by idx desc limit ?, ?;', [date11, date22, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage, totalPage });
                                }
                            });
                        }
                    });
                }
            }
        }
    });
}

// 채팅 상세
const adminChatDetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select m.name, m.img, c.content, c.idx, c.createdAt from room as r join chat as c on r.idx = c.roomIdx join member as m on c.memberIdx = m.idx where c.roomIdx = ? order by c.createdAt asc;';
            const sql1s = mysql.format(sql1, idx);

            const sql2 = 'select r.title, count(rm.roomIdx) as cnt, r.createdAt, r.report, r.type from room_mem as rm join room as r where roomIdx = ?;';
            const sql2s = mysql.format(sql2, idx);

            const sql3 = 'select m.name, m.img from room_mem as rm join member m on rm.memberIdx = m.idx where roomIdx = ?;'
            const sql3s = mysql.format(sql3, idx);

            conn.query(sql1s + sql2s + sql3s, (err, result) => {
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

// 채팅 상세 더보기
const adminChatDetailPlus = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select m.name ,c.content from chat as c join member as m on c.memberIdx = m.idx where c.idx = ?;', [idx], (err, result) => {
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

// 문의 목록
const adminInquiry = function (cur, name, callback) {
    // 페이지 당 게시물 수
    const page_size = 10;
    // 페이지의 갯수
    const page_list_size = 5;
    // limit의 변수
    let no = "";
    // 전체 게시물숫자
    let totalPageCount = 0;
    // 현재 페이지
    let curPage = cur;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            if (name == "") {
                conn.query('select count(*) as cnt from inquiry', (err, result) => {
                    if (err) {
                        console.log(err);
                        console.log('sql문 오류')
                    } else {
                        totalPageCount = result[0].cnt;

                        if (totalPageCount < 0) {
                            totalPageCount = 0;
                        }
                        // 전체 페이지수
                        const totalPage = Math.ceil(totalPageCount / page_size);
                        // 전체 세트수
                        const totalSet = Math.ceil(totalPage / page_list_size);
                        // 현재 세트 번호
                        const curSet = Math.ceil(curPage / page_list_size);
                        //  현재 세트내 출력될 첫 페이지
                        const startPage = ((curSet - 1) * 5) + 1;
                        // 현재 세트내 출력될 마지막 페이지
                        let endPage = (startPage + page_list_size) - 1;

                        if (curPage < 0) {
                            no = 0
                        } else {
                            no = (curPage - 1) * 10
                        }

                        if (endPage > totalPage) {
                            endPage = totalPage;
                        }

                        conn.query('select m.name, i.idx, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx order by i.idx desc limit ?, ?;', [no, page_size], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(err, null);
                                console.log('sql문 오류')
                                return;
                            } else {
                                callback(null, { result, startPage, endPage, totalPage });
                            }
                        });
                    }
                });
            } else {
                conn.query('select idx from member where name = ?', [name], (err, resultIdx) => {
                    if (err) {
                        console.log(err);
                    }
                    let idx = "";
                    if(resultIdx != "") {
                        idx = resultIdx[0].idx
                    }
                    conn.query('select count(*) as cnt from inquiry where memberIdx = ?', [idx], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log('sql문 오류')
                        } else {
                            totalPageCount = result[0].cnt;

                            if (totalPageCount < 0) {
                                totalPageCount = 0;
                            }

                            // 전체 페이지수
                            const totalPage = Math.ceil(totalPageCount / page_size);
                            // 전체 세트수
                            const totalSet = Math.ceil(totalPage / page_list_size);
                            // 현재 세트 번호
                            const curSet = Math.ceil(curPage / page_list_size);
                            //  현재 세트내 출력될 첫 페이지
                            const startPage = ((curSet - 1) * 5) + 1;
                            // 현재 세트내 출력될 마지막 페이지
                            let endPage = (startPage + page_list_size) - 1;

                            if (curPage < 0) {
                                no = 0
                            } else {
                                no = (curPage - 1) * 10
                            }

                            if (endPage > totalPage) {
                                endPage = totalPage;
                            }

                            conn.query('select m.name, i.idx, i.type, i.content, i.createdAt from inquiry as i join member m on i.memberIdx = m.idx where memberIdx = ? order by i.idx desc limit ?, ?;', [idx, no, page_size], (err, result) => {
                                conn.release();
                                if (err) {
                                    callback(err, null);
                                    console.log('sql문 오류')
                                    return;
                                } else {
                                    callback(null, { result, startPage, endPage, totalPage });
                                }
                            });
                        }
                    });
                });
            }
        }
    });
}

// 문의 상세
const adminInquiryDetail = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select m.name, i.type, i.content, i.createdAt, i.message from inquiry as i join member m on i.memberIdx = m.idx where i.idx = ?;';
            const sql1s = mysql.format(sql1, idx)

            const sql2 = 'select m.name, m.email from inquiry as i join member m on i.respondent = m.idx where i.idx = ?;';
            const sql2s = mysql.format(sql2, idx)

            conn.query(sql1s + sql2s, (err, result) => {
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

// 문의 답변
const adminInquiryRepeat = function (idx, message, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('update inquiry set message = ? where idx = ?', [message, idx], (err, result) => {
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

// 대시보드
const adminDashBoard = function (callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql1 = 'select count(*) as memberCnt from member;';
            const sql2 = 'select count(*) as postCnt from post;';
            const sql3 = 'select count(*) as roomCnt from room;';
            const sql4 = 'select count(*) as inquiryCnt from inquiry;';

            const sql5 = 'select idx, email from member order by createdAt desc limit 0, 5;';
            const sql6 = 'select idx, content as postContent from post order by createdAt desc limit 0, 5;';
            const sql7 = 'select idx, content as inquiryContent from inquiry order by createdAt desc limit 0, 5;';
            const sql8 = 'select r.title, r.type, count(*) as ChatCnt, r.createdAt  from room as r join room_mem as rm on r.idx = rm.roomIdx group by r.title order by r.createdAt desc limit 0, 5;';

            conn.query(sql1 + sql2 + sql3 + sql4 + sql5 + sql6 + sql7 + sql8, (err, result) => {
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

// 문의 삭제
const adminInquiryDelete = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('delete from inquiry where idx = ?', [idx], (err, result) => {
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

module.exports = router