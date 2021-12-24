import React, { useState,useEffect ,Component } from "react";

import { Link, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
const Login = styled.div`
html{
    background: rgb(248, 250, 252);
}

input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }

.body{
    width: 50rem;
    padding: 2rem;
    position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
}
.logo{
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo img{
    width: 18rem;
}
.login_top input{
    border-radius: 12px;
    width: 49rem;
    height: 6rem;
    margin-bottom: 0.5rem;
    border: 1px solid lightgray;
    font-size:2rem;
    background-color: #fff;
    padding-left: 1rem;
}
.login_top input:hover{
    border: 1px solid mediumaquamarine;
}
button{
    border: 1px solid black;
    border-radius: 12px;
    cursor: pointer;
}
.login_btn2{
    display: flex;
    align-items: baseline;
        cursor: pointer;
}
.signup{
    background: #4fd1c5;
    width: 24.5rem;
    margin-right: 5px;
    color: white; 
    border:0; 
    font-size: 1.9rem;
    padding: 1.5rem 0;
    font-weight: 600;
}
.find{
    background: #4fd1c5;
    width: 24.5rem;
    color: white; 
    border:0; 
    margin-left:0.5rem;
    font-size: 1.9rem;
    padding: 1.5rem 0;
    font-weight: 600;
}
.login_btn_box{
    margin-top: 3rem;
}
.login_btn1 {
    border-radius: 15px;
    border:0; 
    background: #4fd1c5;
    width: 100%; 
    padding: 1.5rem 0; 
    font-size: 2rem; 
    color: white; 
    margin-bottom: 5px;
    font-weight: 600;
}
.login_btn1:disabled{ background: #dfdfdf; }
.forheigth{
    height:69px
}

.login-text{
    font-size:1.5rem;
}
.red{
    color:red;
    font-size:1.2rem;
    margin: 0;
}
`;

let emailDisable = false;
let passwordDisable = false;

const LoginPage = () => {
    const formRef = React.createRef();

    function onSubmit(event){
        
    }

    

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")

    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly2 = (display2) => {
        setDisplay2(display2)
    }
    var alltruecnt = 0;


    const checkEmail = (e) => {
        e.preventDefault();
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))

        const inputId = e.target.value;
        setEmail(inputId);
        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()

    }

    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        e.preventDefault();
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        const inputPw = e.target.value;
        setPassword(inputPw);
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            passwordDisable = false

        } else {
            changeDispaly2("none")
            passwordDisable = true

        }
        idDisabled()
    }

    const [disabled, setDisabled] = React.useState('disabled');

    const idDisabled = () => {
        if (emailDisable === true && passwordDisable === true) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }

    //axios
    //http://localhost:3001/member/login
    const onClickLogin = (e) => {
        e.preventDefault();

        axios.post('/member/login',null,{
            //params을 config로 보내주려고 중간데이터 null넣어쥼!
            params: {
            'email': email,
            'userPw': password
            }
        })
        .then(res => {
            console.log(res)

            // 작업 완료 되면 페이지 이동(새로고침)
            if(res.data == false){
                alert("아이디와 패스워드가 일치하지 않습니다.");
            } else{
                document.location.href = `/main/${res.data}?idx=${res.data}`
            }
        })
        .catch()
    }
    
    useEffect(() => {
        axios.get('/member/login')
            .then(res => console.log(res))
            .catch()
    }, [])

	// function getLocation() {
    //     if (navigator.geolocation) { // GPS를 지원하면
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             alert(position.coords.latitude + ' ' + position.coords.longitude);
    //         }, function(error) {
    //             console.error(error);
    //         }, {
    //             enableHighAccuracy: false,
    //             maximumAge: 0,
    //             timeout: Infinity
    //         });
    //     } else {
    //         alert('GPS를 지원하지 않습니다');
    //     }
    // }
    // getLocation();

    return (
        <Login>
            <div className="body">
                <div className="logo">
                    <img src="img/us_logo_forLogin.png"></img>
                </div>
                <div>
                    <form className="Login" ref={formRef} onSubmit={onSubmit}>
                        <div className="login_top">
                            {/* 이메일 인풋창 */}
                            <p className='login-text'>이메일</p>
                            <div className="forheigth">
                                <input id="email" value={email} onChange={checkEmail} placeholder="이메일을 입력해주세요." />
                                <p className="red" style={{ display: display }}>* 이메일 양식을 확인해주세요.</p>
                            </div>
                            {/* 비밀번호 인풋 */}
                            <p className='login-text'>비밀번호</p>
                            <div className="forheigth">
                                <input id="pw" value={password} onChange={checkPassword} placeholder="비밀번호를 입력해주세요." type="password" onKeyPress={(e)=>{if(e.key=='Enter'){onClickLogin(e)}}}/>
                                <p className="red" style={{ display: display2 }}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                            </div>
                        </div>

                        <div className="login_btn_box">
                            {/* 로그인버튼 , 회원가입버튼*/}
                            
                                <button className="login_btn1" type="button" disabled={disabled} onClick={onClickLogin} >로그인</button>
                            
                        </div>

                        
                        {/* 회원가입 버튼 클릭 -> /signup페이지로 이동 */}
                    </form>
                    <div className="login_btn2">
                            <Link to="/Regist1">
                                <button className="signup">
                                    회원가입
                                </button>
                            </Link>

                            <Link Link to="/FindIdPw">
                                <button className="find">이메일/비밀번호 찾기</button>
                            </Link>
                        </div>
                </div>
            </div>
        </Login>
    )
}
export default LoginPage;