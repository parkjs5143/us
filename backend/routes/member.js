const express = require('express');
const bodyParser = require('body-parser'); // post방식
const ejs = require('ejs');
const mysql = require('mysql');
const logger = require('morgan'); // 로그모듈
const config = require('../config/config');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // 세션 설정과 관리
const MySQLStore = require('express-mysql-session')(session); // 세션 설정과 관리
const bcrypt = require('bcrypt'); // 암호화 (현업에서 salt랑 가장 많이 사용)
const saltRounds = 10; // 해킹 방지를 위한 접근 제한 변수 
const nodemailer = require('nodemailer'); // 임시 비밀번호 보내기
const multer = require('multer'); // 이미지 업로드
const { ignore } = require('nodemon/lib/rules');
const cors = require('cors');

const app = express();
const router = express.Router(); // 라우터 사용(특정 경로로 들어오는 요청에 대해 함수를 수행 시킬 수 있는 기능을 express가 제공)

router.use(bodyParser.urlencoded({ extended: false }))
router.use(logger('dev'));
router.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록
router.use(cors({origin : 'http://localhost:3000', credentials : true, methods : "put,get,post,delete,options"}));
var sessionStore = new MySQLStore(config);
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

app.set('view engine', 'ejs'); // 화면 engine을 ejs로 설정
app.set('views', '../views'); // view 경로 설정 


const pool = mysql.createPool(config);

// 회원가입
// 회원가입
// http://127.0.0.1:3000/member/regist (post)
router.route('/member/regist').post((req, res) => {
    const email = req.query.email;
    const userPw = req.query.userPw;
    const name = req.query.name;
    const tel = req.query.tel;
    const code = req.query.code;
    const gender = req.query.gender;
    const agreement1 = req.query.agreement1;
    const agreement2 = req.query.agreement2;

    console.log(`email: ${email}, userpw:${userPw}, name:${name}, tel:${tel}, code:${code}, agreement1:${agreement1}, agreement2:${agreement2}, gender:${gender}`);

    if (pool) {
        joinMember(email, userPw, name, tel, gender, code, agreement1, agreement2, (err, result) => {
            if (err) {
                console.log(err);
                res.send(false)
                res.end();
            } else {
                res.send(true);
                res.end();
            }
        });
    }
});

const joinMember = function (email, userPw, name, tel, gender, code, agreement1, agreement2, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const encryptedPassword = bcrypt.hashSync(userPw, saltRounds) // 비밀번호 암호화 
            if (agreement1 == 'Y' && agreement2 == 'Y') {
                const sql = conn.query('insert into member(email, userPw, name, tel,gender, code, agreement1, agreement2) values (?, ?, ?, ?, ?, ?, ?,?)', [email, encryptedPassword, name, tel, gender, code, agreement1, agreement2], (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        console.log("가입완료!");
                        callback(null, result);
                    }
                });
            } else {
                callback('약관동의를 체크해주세요');
            }
        }
    });
}

// 로그인 
router.route('/member/login').get((req, res) => {
    res.render('login.ejs');
}); 
router.route('/member/login').post((req,res)=>{
    const email = req.query.email;
    const userPw = req.query.userPw;
    // const encryptedPassword = bcrypt.hashSync(userPw, saltRounds) // 비밀번호 암호화

    console.log(`email : ${email}, userPw:${userPw}`);

    if(pool){
        LoginMember(email, userPw, (err, result)=>{
            if(err){
                console.log(err);
                res.send(false);
            } else {
                console.log(result);
                if(result[0] != undefined){
                    if(!bcrypt.compareSync(userPw, result[0].userPw)){
                        console.log('패스워드 일치 x');
                        res.send(false)
                    }else{
                        console.log(bcrypt.compareSync(userPw, result[0].userPw))
                        console.log(userPw);
                        console.log(result[0].userPw);
                        let dataLoading = true;
                        if(result[0] != null){
                            req.session.user = {
                                idx: result[0].idx,
                                email: result[0].email,
                                name: "first",
                                authorized: true
                            };
                            res.cookie('three', result[0].idx);
                            res.json(result[0].idx);    
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
                }else{
                    console.log(result[0]);
                    console.log('해당 유저가 없습니다.');
                    res.send(false);
                }
                
            }
        })
    }
})





const LoginMember = function(email, userPw, callback){
    pool.getConnection((err, conn)=>{
        if(err){
            console.log(err);
        }else{
            const sql = conn.query('select * from member where email=?', [email], (err, result)=>{
                conn.release();
                if(err){
                    callback(err, null);
                    return;
                }else{
                    if(result == ""){
                        callback(null, false);
                    }else{
                        callback(null, result);
                    }
                }
            })
        }
    })
}

// 쿠키 값 가져오기
router.route('/getCookie').get((req, res)=>{
    res.send(req.cookies.three);
})


// 로그아웃
router.route('/member/logout').get((req, res) => {
    res.clearCookie("first");
    res.clearCookie("three");
    req.session.destroy(function (err, result) {
        if (err) console.err('err : ', err);
        res.send(result);
    });
});


// 이메일 찾기 
router.route('/member/findId').post((req, res) => {
    const tel = req.query.tel;
    const email = req.query.email;
    console.log(tel);

    pool.query('select tel, email from member where tel=?', [tel], (err, data) => {
        console.log(tel);
        console.log(data);
        console.log(data[0]);        

        if (err) {
            console.log(err);
        } else {
            if(data == ""){
                console.log('ddd');
                res.send(false);
                res.end();
                return
            }
            if (tel == data[0].tel) {
                res.send(emailSecurity(data))
                res.end();
            } else {
                res.send(false);
                res.end();
            }
        }
    });
});
function emailSecurity(data) {
    var id = data[0].email.split('@')[0];
    var mail = data[0].email.split('@')[1];

    var maskingId = function (id) {
        var splitId = id.substring(0, 1);

        for (var i = 1; i < id.length; i++) {
            splitId += '*';
        }
        return splitId;
    };

    var maskingMail = function (mail) {
        var splitMail = mail.substring(0, 1);

        for (var i = 1; i < mail.length; i++) {
            splitMail += '*';
        }
        return splitMail;
    };

    userEmail = maskingId(id) + '@' + maskingMail(mail);

    return userEmail;
}

// 비밀번호 찾기
router.route('/member/findPassword').post((req, res) => {
    const tel = req.query.tel;
    const email = req.query.email;
    const userPw = req.body.userPw;


    pool.query('select tel,email,userPw from member where tel=? and email=?', [tel, email], (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
            console.log('비밀번호 찾기 실패');
            res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
            res.write('<h2>아이디 또는 비밀번호를 확인해주세요.</h2>');
            res.end();
        } else {
            var variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,!,@,#,$,%,^,&,*".split(",");

            var number ="0,1,2,3,4,5,6,7,8,9".split(",");
            var eng ="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            var code ="!,@,#,$,%".split(",");
            
            var randomPassword = createCode(number,eng,code, 3,3,2);


            function createCode(objArr1,objArr2,objArr3, iLength,xLength,kLength) {
                var variable1 = objArr1;
                var variable2 = objArr2;
                var variable3 = objArr3;

                var randomStr = "";
                for (var j = 0; j < iLength; j++) {
                    randomStr += variable1[Math.floor(Math.random() * variable1.length)];
                }
                for (var a = 0; a < xLength; a++) {
                    randomStr += variable2[Math.floor(Math.random() * variable2.length)];
                }
                for (var c = 0; c < kLength; c++) {
                    randomStr += variable3[Math.floor(Math.random() * variable3.length)];
                }
                return randomStr
            }


            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: { // 이메일을 보낼 계정 데이터 입력
                    user: 'wd4537syj@nsu.ac.kr',
                    pass: 'syj30408!!',
                },
            });
            const emailOptions = { // 옵션값 설정
                from: 'wd4537syj@nsu.ac.kr',
                to: 'jaesung712@naver.com',
                subject: 'Us에서 임시비밀번호를 알려드립니다.',
                html:
                    "<h1 >Us에서 새로운 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : " + randomPassword + "</h2>"
                    + '<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>',
            };
            transporter.sendMail(emailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email sent : ' + info.response);
                    if (pool) {
                        SendMember(randomPassword, email, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
                                res.write('<h2>비밀번호 업데이트 실패!</h2>');
                                res.write('<p>수정중 오류가 발생했습니다</p>');
                                res.end();
                            } else {
                                res.send(result)
                            }
                        })
                    }
                }
            }); //전송
        }

    })
})
const SendMember = function (randomPassword, email, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const encryptedPassword = bcrypt.hashSync(randomPassword, saltRounds) // 비밀번호 암호화  
            const sql = conn.query('update member set userPw=? where email=?', [encryptedPassword, email], (err, result) => {
                conn.release();
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    });
}

// 비밀번호 변경
router.route('/member/ComparePassword').post((req, res) => {
    const userPw = req.query.userPw;
    const userPw2 = req.query.userPw2;
    const idx = req.query.idx;
    console.log(`userPw : ${userPw}, userPw2:${userPw2}, idx:${idx}`);

    if (pool) {
        UpdatePassword(userPw, userPw2, idx, (err, result) => {
            if (err) {
                console.log(err);
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>비밀번호 변경 실패!</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            } else {
                res.send(result)
            }
        })
    }

})
const UpdatePassword = function (userPw, userPw2, idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select userPw from member where idx=?',[idx], (err1, result1)=>{
                console.log(result1);
                if(bcrypt.compareSync(userPw, result1[0].userPw) == false){
                    console.log(bcrypt.compareSync(userPw, result1[0].userPw))
                    console.log('password 틀림')
                    callback(null, false);
                    return;
                } else {
                    console.log('패스워드 맞음');
                    if(userPw != userPw2){
                        const encryptedPassword = bcrypt.hashSync(userPw2, saltRounds) // 비밀번호 암호화
                        console.log(encryptedPassword)
                        conn.query('update member set userPw=? where idx=?', [encryptedPassword, idx], (err, result) => {
                            conn.release();
                            console.log(result);
                            if(err){
                                callback(null, false);
                                return;
                            }else{
                                callback(null, result);
                            }
                        })
                    }
                }
            })
        }
    })
}


// 정보 수정
// 기존 데이터를 불러오는 곳
router.route('/member/edit').get((req, res)=>{
    const idx = req.query.idx;

    if(pool){
        edit(idx, (err, result)=>{
            if (err) {
                res.send(false)
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})
const edit = function(idx,callback){
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }else{
            conn.query('select img, name, code, message, email, tel, gender from member where idx=?',[idx],(err,result)=>{
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

// 여기가 정보 수정하는곳
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
router.route('/member/editMember').post(upload.single('img'), async (req, res) => {
    const img = req.query.img;
    const email = req.query.email;
    const name = req.query.name;
    const tel = req.query.tel;
    const message = req.query.message;
    const gender = req.query.gender;

    console.log(`img : ${img}, email:${email}, name:${name}, tel:${tel}, message:${message}, gender:${gender}`);
    if(pool){
        editMember(img, name, tel, message, gender, email, (err, result)=>{
            if(err){
                console.log(err)
                res.send(false);
            }else{
                res.send(true);
                res.end();
            }
        })
    }
});
const editMember = function (img, name, tel, message, gender, email, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('update member set img=?, name=?, tel=?, message=?, gender=? where email=?', [img, name, tel, message, gender, email], (err, result) => {
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

// 이미지 변경 
// router.route('/upload').get((req, res) => {
//     res.render('upload.ejs');
// });
// router.route('/upload').post(upload.single('img'), async (req, res, next) => {
//     const email = req.body.email;
//     console.log(req.file)
//     console.log(req.file.path)
//     console.log(upload)
//     console.log(upload.storage.getFilename)

//     pool.query('update member set img=? where email=?', [req.file.path, email], function(){
//         res.json({message : "성공!!"});
//     })
// })


// 정보 삭제(탈퇴)
// http://127.0.0.1:3000/member/delete (delete)
router.route('/member/delete').get((req, res) => {
    const idx = req.query.idx;

    if (pool) {
        deleteMember(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>회원삭제 실패!</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            } else {
                if (result.deletedCount > 0) {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원 삭제 실패!</h2>');
                    res.write('<p>회원 삭제 실패하였습니다.</p>');
                    res.end();
                } else {
                    res.send(result)
                }
            }
        });
    }
});
const deleteMember = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql = conn.query('delete from member where idx=?', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    console.log("삭제완료!");
                    callback(null, result);
                }
            });
        }
    });
}


module.exports = router