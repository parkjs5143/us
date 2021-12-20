import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
axios.defaults.withCredentials = true;

const LoginForm = styled.div`
    .login-form{width: 35rem; position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);}
    .login_logo_box{text-align: center;}
    .login-text{margin:0; margin-top: 2.7rem; margin-bottom: 1rem; font-size:1.6rem}
    .login-input{width: calc(100% - 3.2rem); font-size: 1.4rem; padding: 1.5rem 1.4rem; border-radius: 15px; border:1.9px solid rgb(219, 219, 219); background: none;}
    .login-input:focus{outline: none; border:1.9px solid rgb(53, 110, 156)}
    .login-button{padding: 1.5rem 0; font-size: 1.4rem; font-weight: bolder; color: white; width: 100%; margin: 3.5rem 0 0; border-radius: 15px; border:0; background: #4fd1c5;}
    .login-button:disabled{ background: #dfdfdf; }
    .login_logo{width: 10rem;}
    .loginPage-text{text-align:center; font-size:1.2rem; color:#8d8d8d;}
    .text{ color: red; margin:0.5rem; font-size: 1.1rem; height: 1rem; }
`;

let emailDisable = false;
let passwordDisable = false;

const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;

function Login(){
    const formRef = React.createRef();
    const inputRef = React.createRef();

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    //오류메시지 저장
    const [emailMessage, setEmailMessage] = React.useState('')
    const [passwordMessage, setPasswordMessage] = React.useState('')

    //유효성 검사
    const [isEmail, setIsEmail] = React.useState(false)
    const [isPassword, setIsPassword] = React.useState(false)

    //이메일
    const emailInput = (e)=>{
        e.preventDefault();
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        const email = e.target.value;
        setEmail(email)
        if (!regExp.test(email)) {
            setEmailMessage('* 이메일 형식에 맞게 입력해주세요')
            setIsEmail(false)
            emailDisable = false
        } else {
            setEmailMessage('')
            setIsEmail(true)
            emailDisable = true
        }
        idDisabled()
    }

    //비밀번호
    const passwordInput = (e)=>{
        e.preventDefault();
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const password = e.target.value;
        setPassword(password)
        if (!regExp.test(password)) {
            setPasswordMessage('* 비밀번호는 영어, 숫자, 특수문자 포함 8자 이상입니다.')
            setIsPassword(false)
            passwordDisable = false
        } else {
            setPasswordMessage('')
            setIsPassword(true)
            passwordDisable = true
        }
        idDisabled()
    }
    
    const [ disabled, setDisabled ] = React.useState('disabled');

    const idDisabled = () => {
        if(emailDisable===true&&passwordDisable===true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }

    const login = async () => {
        let password = document.getElementById('pwInput');
        let idx = document.getElementById('emailInput')
        let log = await axios.get('http://localhost:3001/admin/login?email='+idx.value+"&userPw="+password.value)
        if(log.data===true){
            alert('환영합니다')
            window.location.href="/admin/main"
        }else{
            alert('이메일/비밀번호를 확인하세요')
            window.location.href="/admin"
        }
    }
    return (
        <Form>
        <LoginForm>
            <form className="login-form" ref={formRef}>
                <div className='login_logo_box'><img src="/img/admin/us_logo.png" className="login_logo"/></div>
                <p className='login-text'>이메일</p>
                <input type="text" id="emailInput" className="login-input email" onChange={emailInput} placeholder="Your email adress"/>
                <p className="text">{email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}</p>
                <p className='login-text'>비밀번호</p>
                <input type="password" id="pwInput" className="login-input password" onChange={passwordInput} placeholder="Your password"/><br/>
                <p className="text">{password.length > 0 && <span className={`message ${isPassword  ? 'success' : 'error'}`}>{passwordMessage}</span>}</p>
                <button className="login-button" type="button" onClick={login} disabled={disabled}>로그인</button>
                <p className="loginPage-text">Us Admin Server</p>
            </form>
        </LoginForm>
        </Form>
    );
}

export default Login;