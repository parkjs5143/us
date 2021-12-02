import React, { useState , Component } from "react";
import { Link,BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
const FindidpwStyled = styled.div`
    html{
        text-decoration:none;
        background-color: rgb(248, 250, 252);
    }
    .forheigth{ margin-bottom: 1rem; height: 8.7rem;}
    .red{
        color:red;
        font-size:1.2rem;
        margin: 0;
    }
    *{ text-decoration:none; box-sizing: border-box; }
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .body{
        width: 55rem;
        padding: 2rem;
        position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
    }
    .findtopnav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .findComment{ margin: 3rem 0; }
    .findComment p{
        text-align: left;
        font-size: 2rem;
        color: #222;
        margin: 0;
        word-break : keep-all;
    }
    .findtopnav h2{
        color: #222;
        font-size: 3.5rem;
    }
    .phinput input{
        border: none;
        background-color: #fff;
        width: 100%;
        height: 6rem;
        color: black;
        margin-bottom: 1rem;
        font-size: 2rem;
        border: 1px solid lightgray;
        border-radius: 12px;
        padding-left: 1rem;
        font-size:1.5rem;
    }
    .finregi { margin-top: 1rem;}
    .finregi button{
        display: flex;
        padding: 1.5rem 0;
        font-size: 1.9rem;
        font-weight: bolder;
        color: white;
        width: 100%;
        border-radius: 15px;
        border: 0;
        background: #4fd1c5;
        justify-content: center;
        margin-top: 0.5rem;
        cursor: pointer;
    }
    .finregi button:disabled{ background: #dfdfdf; }
    .ph{ font-size:1.5rem; }
    `;

let hpDisable = false;
const Findidpw = () => {
    
    const formRef = React.createRef();
    const inputRef = React.createRef();

    const [display4 ,setDisplay4] = useState("none")

    const [handp ,setHandp] = React.useState('');

    //핸드폰버노 유효성 검사
    const changeDispaly4 = (display4) => {
        setDisplay4(display4)
    }

     //핸드폰버노 유효성 검사
    const checkPh = (e) => {
        e.preventDefault();
        const regExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
        const ph = e.target.value;
        setHandp(ph)
        console.log('폰번호 유효성 검사 :: ', regExp.test(e.target.value))

        if (!regExp.test(ph)) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled()
    }
    
    const [disabled, setDisabled ] = React.useState('disabled');

    const idDisabled = () => {
        if(hpDisable===true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }

    return (
        <FindidpwStyled>
            <div className="body">
                <div className="findtopnav">
                    <h2>이메일 찾기</h2>
                    <hr/>
                    <div className="findComment">
                        <p>가입 시 등록한 휴대폰 번호를 입력하면
                        이메일 주소의 일부를 알려드립니다.</p>
                    </div>
                </div>
                <form className="findemail" ref={formRef}>
                    <div className="ph">
                        <p>휴대폰 번호</p>
                        <div className="phinput forheigth">
                        <input autocomplete="off"  id="ph" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요."/>
                        <p className="red"  style={{display:display4}}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p>  
                        </div>
                    </div>
                    <div className="finregi">
                        <Link to="/SuckFindId"><button className="activebtn" disabled={disabled}>이메일 찾기</button></Link>
                    </div>    
                </form>
            </div>
        </FindidpwStyled>
    )
}
    
export default Findidpw;