import React from "react";
import { Link,BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
const FinFindidpw = () => {
    const Findidpw = styled.div`
    html{
        background-color: rgb(248, 250, 252);
    }
    .body{
        width: 50rem;
        position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
        padding: 2rem;
    }
    .topNum{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .topNum img{
        width:18rem
    }
    .findtopnav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 2rem;
    }
    .findtopnav p{
        font-size: 1.9rem;
        margin: 1rem 0;
    }
    .findtopnav h2{
        border-bottom: 2px black;
    }
    .finfind { text-align: center; margin-top: 3rem;}
    .finfind button{
        padding: 1.5rem 0; 
        font-size: 1.9rem; 
        font-weight: bold;
        color: white; 
        width: 80%; 
        border-radius: 15px;
        border:0; 
        background: #4fd1c5;
        cursor: pointer;
    }
    .finfind button:hover{
        background-color: lightsteelblue;
    }
    `;
    return (
        <Findidpw>
        <div className="body">
            <div className="topNum">
            <img src="/img/us_logo_forLogin.png"></img>
                </div>
            <div className="findtopnav">
                <p>임시 비밀번호를 전송하였습니다</p>
                <p>전송 받은 임시 비밀번호로 로그인 해주세요</p>
            </div>
            
            <div className="finfind">
                <Link to="/">
                <button>
                    로그인
                </button>
                </Link>
            </div>
            
        </div>
        </Findidpw>
    )
}
    
export default FinFindidpw;