import React, { useState , Component } from "react";
import { Link,BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';

let emailDisable = false;
let hpDisable = false;
const Findidpwcss2 = styled.div`
    *{
        text-decoration:none;
        box-sizing: border-box;
    }
    html{
        background: rgb(248, 250, 252);
    }
    .red{
        color:red;
        font-size:1.2rem;
        margin: 0;
    }
    .forheigth{
        margin-bottom: 1rem;
    }
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }

    .body{
        width: 55rem;
        position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
        padding: 2rem;
    }

    .findtopnav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .findtopnav p{
        font-size: 2rem;
        color: #222;
        word-break : keep-all;
    }
    .findtopnav h2{
        color: #222;
        font-size: 3rem;
    }
    .phinput input{
        border: 1px solid lightgray;
        background-color: #fff;
        border-radius: 12px;
        width: 100%;
        height: 6rem;
        color: black;
        margin-bottom: 1rem;
        font-size: 2rem;
        padding-left: 1rem;
    }
    input:hover{
        border: 1px solid mediumaquamarine;
    }

    .finregi { margin-top: 2rem; }

    .finregi button:hover{
        background-color: lightsteelblue;
    }
    .red{
        color:red;
        display: none;
        margin: 0;
    }
    
    .finregi button{
        display: flex;
        padding: 1.5rem 0; 
        font-size: 1.9rem; 
        font-weight: bolde;
        color: white; 
        width: 100%; 
        border-radius: 15px;
        border:0; 
        background: #4fd1c5;
        margin: 0 auto;
        justify-content: center;
        cursor: pointer;
    }
    .finregi button:disabled{ background: #dfdfdf; }

    .tofind p {
        font-size: 1.5rem;
    }
    `;
const Findidpw2 = () => {

    const formRef = React.createRef();

    const [hp,setHp] = React.useState('')
    const [email, setEmail] = React.useState('')


    const [display ,setDisplay] = useState("none")
    const [display4 ,setDisplay4] = useState("none")
    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly4 = (display4) => {
        setDisplay4(display4)
    }
    const checkEmail = (e) => {
        e.preventDefault();
        var text = document.getElementById('email').value;

        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))

        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false

        } else {
            changeDispaly("none")
            emailDisable = true

        }
        idDisabled()
    }
    const checkPh = (e) => {
        e.preventDefault();
        var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        console.log('폰번호 유효성 검사 :: ', regExp.test(e.target.value))
        if (regExp.test(e.target.value) === false) {
            changeDispaly4("block")
            hpDisable = false

        } else {
            changeDispaly4("none")
            hpDisable = true

        }
        idDisabled()

    }
    
    let to_val = '';

    const makeRanCode = (e) => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 10
        let randomstring = ''
        

        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length)
            randomstring += chars.substring(rnum, rnum + 1)
        }
        return alert("임시 비밀번호는 [" +randomstring+"] 입니다")
    }

    const [disabled, setDisabled ] = React.useState('disabled');

    const idDisabled = () => {
        if(emailDisable===true&&hpDisable===true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }

    function onSubmit(event){
        
    }
    return (
        <Findidpwcss2>
        <div className="body">
            <div className="findtopnav">
                <h2>비밀번호 찾기</h2>
                <hr/>
                <p>가입 시 등록한 휴대폰 번호와 이메일을 입력하시면, 이메일로 임시 비밀번호를 전송해드립니다.</p>
            </div>

            <form className="findemail" ref={formRef} onSubmit={onSubmit}>
                
                <input id="ranpw" name="ran_pw" value={to_val} type="hidden"></input>
                <div className="tofind">
                    <p>휴대폰 번호</p>
                    <div className="phinput forheigth">
                    <input id="ph" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요."/>
                    <p className="red"  style={{display:display4}}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p>
                    </div>
                    

                    <p>이메일 주소</p>
                    <div className="phinput forheigth">
                    <input type="email" id="email" name="user_email" onChange={checkEmail} placeholder="이메일을 입력해주세요."/>
                    <p className="red"  style={{display:display}}>* 이메일 양식을 확인해주세요.</p> 
                    </div>
                
                </div>
                <div className="finregi">
                <Link to="/FinFindidpw">
                <button type="submit" value="Send" onClick={makeRanCode} disabled={disabled}>
                    비밀번호 찾기
                </button>
                </Link>
            </div>
            </form>
            
            
        </div>
        </Findidpwcss2>
    )
}
    
export default Findidpw2;