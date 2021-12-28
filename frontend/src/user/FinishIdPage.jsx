import React, {useEffect, useRef, useState} from "react";
import { Link,BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { matchPath, useParams } from "react-router";
import { UseParams } from "react-router";

const SuckFindId = (props) => {
    const SuckFindIdcss = styled.div`
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
        width: 18rem;
    }
    .twoKindBtn{
        padding: 1.5rem 0; 
        font-size: 1.9rem; 
        font-weight: bolder;
        color: white; 
        width: 48%; 
        margin: 3.5rem 0 0; 
        border-radius: 15px;
        border:0; 
        background: #93a2b5;
        margin-right: 5px;
        cursor: pointer;
    }
    .twoKindBtn2{
        padding: 1.5rem 0; 
        font-size: 1.9rem; 
        font-weight: bolder;
        color: white; 
        width: 48%; 
        margin: 3.5rem 0 0;
        border-radius: 15px;
        border:0; 
        background: #4fd1c5;
        cursor: pointer;
    }
    .topNum{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span{
        color: gray;
    }
    `;
    const {urldata} = useParams();
    console.log(urldata)
    const [data ,setData] = useState(urldata)
    
    const usedata = {
        url : data
    };

    return (
        <SuckFindIdcss>
        <div className="body">
            <div className="findtopnav">
            <div className="topNum">
            <img src="/img/us_logo_forLogin.png"></img>
                </div>
                <h1>회원님의 이메일 주소는 <span>{urldata}</span> 입니다.</h1>
                <hr/>
            </div>

            <div className="twoBtn">
                <Link to="/FindIdPw2">
                <button className="twoKindBtn">
                    비밀번호 찾기
                </button>
                </Link>
                <Link to="/">
                <button className="twoKindBtn2">
                로그인
                </button>
                </Link>
            </div>
        </div>
        </SuckFindIdcss>
    )
}
    
export default SuckFindId;