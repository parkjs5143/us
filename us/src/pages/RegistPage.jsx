import React, { useState, Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import { useEffect } from "react";
const Regi1 = styled.div`
html{
    background: rgb(248, 250, 252);
}

    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }

    input[type="checkbox"] { -webkit-appearance: auto; }

    .body{
        width: 50rem;
        padding: 2rem;
        position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
    }
    .topNum{
        display: flex;
        justify-content: center;
        align-items: center;
    
    }
    .topNum img{
        width: 18rem;
    }
    .topnav h2 {
        color: #4c4c4c;
        text-align: center;
    }
    
    .forregi {
        display: flex;
        flex-direction: column;
        margin-top: 4rem;
    }
    .forregi input{
        border-bottom: 1px solid lightgray;
        height: 5rem;
        color: #222;
        border-left: none;
        border-right: none;
        margin-bottom: 1rem;
        font-size: 2rem;
        width:100%
    }

    .checkbtn input{
        position: relative;
        bottom:-0.4rem;
        height: 2rem;
        width: auto;
        margin-bottom: 0;
        margin-right: 1rem;
    }

    .checkbtn span{
        color: blue;
        font-weight: bold;
        
    }

    .activebtn button{
        padding: 1.5rem 0; 
        font-size: 1.9rem; 
        font-weight: bold;
        color: white; 
        width: 100%; 
        margin: 3.5rem 0 0;
        border-radius: 15px;
        border:0; 
            background: #4fd1c5;
        cursor: pointer;
    }
    .activebtn button:disabled{ background: #dfdfdf; }

    

    .red{
        color:red;
        font-size:1.2rem;
        margin: 0;
    }

    .checkbtn p{
    font-size: 15px;
    position: relative;
    top: -7px;
    left: -4px;
    z-index: 10;
    }
    
    .forheigth{
        height:75px
    }
    .checkinput{
        border: 1px red
    }
    .checkimg{
        position: relative;
        top: 6px;
    }
    input[id="check"] {
        display: none;
    }
    input[id="check2"] {
        display: none;
    }
    select { width: 200px; padding: .8em .5em; background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%; border: 1px solid lightgray; border-radius: 0px; appearance: none; outline:none; }
    .genderSelectBox { margin: 2rem 0; }
    input[type=checkbox]{height: 0;width: 0;visibility: hidden;}
    label {cursor: pointer;text-indent: -9999px;width: 45px;height: 28px;background: grey;display: block;border-radius: 100px;position: relative; top: -3px; margin-right: 8px;}
    label:after {content: '';position: absolute;top: 5px;left: 5px;width: 19px;height: 19px;background: #fff;border-radius: 90px;transition: 0.3s;}
    input:checked + label {background: #4fd1c5;}
    input:checked + label:after {left: calc(100% - 5px);transform: translateX(-100%);}
    label:active:after {width: 45px;}
    .checkbtn p {
        display:flex;
    }
    `;
    let emailDisable = false;
    let passwordDisable = false;
    let nameDisable = false;
    let hpDisable = false;
    let btnDisable =false;
    let btn2Disable =false;
const RegistPage1 = () => {

    const formRef = React.createRef();
    const inputRef = React.createRef();

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name,setName] = React.useState('')
    const [hp,setHp] = React.useState('')

    

    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")
    const [display3, setDisplay3] = useState("none")
    const [display4, setDisplay4] = useState("none")

    const changeBox = (checkbox) => {
        chageCheckbox(checkbox)
    }
    const changeBox2 = (checkbox2) => {
        chageCheckbox2(checkbox2)
    }
    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly2 = (display2) => {
        setDisplay2(display2)
    }
    const changeDispaly3 = (display3) => {
        setDisplay3(display3)
    }
    const changeDispaly4 = (display4) => {
        setDisplay4(display4)
    }

    const isActive = false;

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

    ///비밀번호 유효성 검사
    const checkPassword = (e) => {
        e.preventDefault();
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            
            passwordDisable = false
        } else {
            changeDispaly2("none")
            passwordDisable = true
        }
        idDisabled()

    }

    //한글이름 유효성 검사
    const checkName = (e) => {
        e.preventDefault();
        var regExp = /^[가-힣]{2,15}$/;
        console.log('한글이름 유효성 검사 :: ', regExp.test(e.target.value))
        if (regExp.test(e.target.value) === false) {
            changeDispaly3("block")
            nameDisable = false
        } else {
            changeDispaly3("none")
            nameDisable = true
        }
        idDisabled()

    }

    //핸드폰버노 유효성 검사
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


    const makeRanCode = (e) => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 6
        let randomstring = ''
        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length)
            randomstring += chars.substring(rnum, rnum + 1)
        }
        return alert("회원가입을 축하합니다 🤩회원님의 개인 코드는 " + randomstring + "입니다")
    }


    const [checkbox, chageCheckbox] = useState("icon/outline_check_box_outline_blank_black_24dp.png");

    const [checkedInputs, setCheckedInputs] = useState([]);

    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
            console.log("체크 반영 완료");
            changeBox("icon/outline_check_box_black_24dp.png")
            btnDisable = true;
        } else {
            setCheckedInputs(checkedInputs.filter(el => el !== id));
            console.log("체크 해제 반영 완료");
            changeBox("icon/outline_check_box_outline_blank_black_24dp.png")
            btnDisable = false;
        }
        idDisabled()
    };

    const [checkbox2, chageCheckbox2] = useState("icon/outline_check_box_outline_blank_black_24dp.png");

    const [checkedInputs2, setCheckedInputs2] = useState([]);

    const changeHandler2 = (checked2, id2) => {
        if (checked2) {
            setCheckedInputs2([...checkedInputs2, id2]);
            console.log("체크 반영 완료");
            changeBox2("icon/outline_check_box_black_24dp.png")
            btn2Disable = true;

        } else {
            setCheckedInputs2(checkedInputs2.filter(el => el !== id2));
            console.log("체크 해제 반영 완료");
            changeBox2("icon/outline_check_box_outline_blank_black_24dp.png")
            btn2Disable = false;

        }
        idDisabled()
    };

    const isAllChecked = checkedInputs.length === 2;
    
    // const disabled = !isAllChecked;
    const [disabled, setDisabled ] = React.useState('disabled');

    const idDisabled = () => {
        if(emailDisable===true&&passwordDisable===true&&nameDisable===true&&hpDisable===true&&btnDisable===true&&btn2Disable==true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }
    return (
        <Regi1>
            <div className="body">
                <div className="topnav">
                    <div className="topNum">
                    <img src="img/us_logo_forLogin.png"></img>
                    </div>
                    <h2>US 에 처음 오신 것을 환영합니다</h2>
                </div>

                <form className="forregi" ref={formRef}>
                    <div className="forheigth">
                        <input id="email" onChange={checkEmail} placeholder="이메일을 입력해주세요." />
                        <p className="red" style={{ display: display }}>* 이메일 양식을 확인해주세요.</p>
                    </div>
                    <div className="forheigth">
                        <input id="pw" onChange={checkPassword} placeholder="비밀번호를 입력해주세요." type="password" />
                        <p className="red" style={{ display: display2 }}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                    </div>
                    <div className="forheigth">
                        <input id="koreaName" onChange={checkName} placeholder="이름을 입력해주세요." />
                        <p className="red" style={{ display: display3 }}>* 한글 2글자 이상 입력해주세요.</p>
                    </div>
                    <div className="forheigth">
                        <input id="ph" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요." />
                        <p className="red" style={{ display: display4 }}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p>
                    </div>
                    <div className="genderSelectBox">
                    <select className="choiceGender">
                        <option value="1">남성</option>
                        <option value="2">여성</option>
                    </select>
                    </div>
                    <div className="checkbtn">

                        <p><input type="checkbox" className="checkinput" id="check" onChange={e => { changeHandler(e.currentTarget.checked, 'check'); }} checked={checkedInputs.includes('check') ? true : false} />
                            <label id="check" htmlFor="check">Toggle</label>
                            <span>이용약관</span> 에 동의합니다</p>

                        <p><input type="checkbox" className="checkinput" id="check2" onChange={e => { changeHandler2(e.currentTarget.checked, 'check2'); }} checked={checkedInputs2.includes('check2') ? true : false} />
                            <label id="check2" htmlFor="check2">Toggle</label>
                            <span>개인 정보 보호 약관</span> 에 동의합니다</p>
                    </div>
                    <div className="activebtn">
                        <Link to="/">
                            <button
                                onClick={makeRanCode} disabled={disabled}>
                                회원가입
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </Regi1>
    )
}
export default RegistPage1;