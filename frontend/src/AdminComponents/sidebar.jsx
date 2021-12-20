import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const SideBarForm = styled.div`
    background-color: rgb(248, 250, 252); width: 24rem; margin-top: 7rem; box-sizing: border-box; position:fixed;  overflow-y: auto; box-shadow: 3px 3px 3px rgb(240,240,240); height: 100%;
    .link-form { padding: 10px 0; }
    .side-link { display: block; text-decoration : none; width: 16rem; margin: 2.5rem auto 0; border-radius: 5px; padding: 1rem 1rem 1.2rem; color: black; font-weight: bold; font-size: 1.34rem; }
    .side-link:hover { background-color: white; text-decoration : none; color: #14c1c7; font-weight: bold; font-size: 1.36rem; box-shadow: 2px 2px 2px #9b9b9b; }
    .fa-house-user, .fa-users, .fa-clipboard-list, .fa-comment-dots, .fa-quora { color: #14c1c7; margin-right: 1.1rem; font-size: 2rem; width: 4rem; }
    .sub-sidebar { font-weight: bold; font-size: 1.8rem; color: #666; width: 14rem; margin: 6rem auto 3rem; }
    .sub-link { font-size: 1.5rem; font-weight: bold; color: #777; margin-left: 1rem; }
    .link-main img { width: 6rem;  border-radius: 10px; }
    .link-main a {  text-decoration:none;  display: flex; }
    .link-main { margin-left: 2.5rem; margin-top: 5rem; box-shadow: 3px 3px 3px 3px rgb(240, 240, 240); border-radius: 10px; padding-left: 1rem; width: 18rem; }
    .small-text { color: #999; text-align: center; font-size: 1.1rem; margin-top: 4rem; margin-bottom: 5rem; }
`;

const SideBar = () => {
    
    let location = window.location.pathname;
    let curr = location.split('/')

    React.useEffect(
        (e) => {
            let current = document.getElementById(curr[2]);
            current.style.backgroundColor = "white";
            current.style.textDecoration = "none";
            current.style.color = "#14c1c7";
            current.style.fontWeight = "bold";
            current.style.fontSize = "1.36rem";
            current.style.boxShadow = "2px 2px 2px #9b9b9b";
        },
    );


    return (
        <SideBarForm>
            <div className="link-form">
                <p className="sub-sidebar">ADMIN</p>
                <Link to="/admin/main" className="side-link first-link" id="main"><i class="fas fa-house-user"></i>메인</Link>
                <Link to="/admin/member" className="side-link" id="member"><i class="fas fa-users"></i>회원관리</Link>
                <Link to="/admin/post" className="side-link" id="post"><i class="fas fa-clipboard-list"></i>게시물관리</Link>
                <Link to="/admin/chat" className="side-link" id="chat"><i class="far fa-comment-dots"></i>채팅관리</Link>
                <Link to="/admin/question" className="side-link" id="question"><i class="fab fa-quora"></i>문의사항</Link>
            </div>
            <div className="link-form link-main">
                <Link to="/login"><img src="/img/admin/us_main.png" /><p className="sub-link">Go WebSite <i class="fas fa-angle-right"></i></p></Link>
            </div>
            <div className="small-form">
                <p className="small-text">Made In Korea</p>
            </div>
        </SideBarForm>  
    );
}

export default SideBar;