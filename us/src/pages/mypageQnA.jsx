import React from "react";
import Header from "../components/header";
import MainProfile from "../components/mainProfile";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyPageQnAWrap = styled.div`
    * { text-decoration:none; font-size: 2rem;}
    ul, li { list-style: none; padding:0; margin: 0;}
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto; }
    .navBar { float: left; width: 15rem; padding:3rem; }
    .menuLink { margin-bottom: 2rem; color: #222; cursor: pointer; font-size: 1.7rem; }
    .menuLink.on { font-weight: 600; }
    .menuLink:hover { color:#5c5c5c; }
    .content { padding: 3rem 3rem 5rem 7rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1);}
    .profileItem { position: relative; align-items: center; margin-bottom: 3rem; }
    .profileItem select, .profileItem option { font-size: 1.6rem; padding: .7rem; border-color: rgba(0,0,0,0.2); border-radius: 3px; }
    .profileItem select:focus { border-color: rgba(0,0,0,0.1); outline: none; }
    .profileItem div { display: inline-block; }
    .section1 { width: 10%; font-size: 1.7rem; font-weight: 600; vertical-align: top; }
    .section2 { width: 80%; font-size: 1.3rem; }
    .modifyImg { color: #1cbbeb; font-weight: bold; cursor: pointer; font-size: 1.5rem; margin-top: .5rem; }
    .profileImg img { width: 5rem; border-radius: 50%; vertical-align: middle; }
    .section2 input {
        border: 1px solid lightgray;
        background-color: #fff;
        border-radius: 3px;
        width: 100%;
        height: 4rem;
        color: black;
        font-size: 1.5rem;
        padding-left: 1rem;
    }
    .section2 textarea {
        border: 1px solid lightgray;
        background-color: #fff;
        border-radius: 3px;
        width: 100%;
        height: 17rem;
        color: black;
        font-size: 1.5rem;
        padding-left: 1rem;
        padding-top: 1rem;
    }
    select:nth-child(2) { margin-left: 1rem; }
    .section2 h3 { font-size: 1.6rem; margin: 2rem 0 0 1rem; font-weight: 400; }
    .section2 p { font-size: 1.7rem;  margin: 0; position: relative; top:1rem; }
    .widthraw { color: #1cbbeb; cursor: pointer; display: inline-block; font-size: 1.5rem; position:relative; left: 4rem; }
    .widthraw:hover { font-weight: 600; }
    .submitBtn { text-align: center; margin-top: 2rem; }
    .btn { padding: 1rem 1.5rem; font-size: 1.7rem; background: #14c1c7; border-radius: 10px; color: #fff; cursor: pointer; }
    `;

const MyPageQnA = () =>{
    const menuClick = ()=>{
        
    };
    return (
        <>
            <Header/>
            <MyPageQnAWrap>
                <div className="container">
                    <div>
                    <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink" onClick={menuClick}>프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink" onClick={menuClick}>비밀번호 변경</li></Link>
                            <Link to="/mypageLogin"><li className="menuLink" onClick={menuClick}>로그인 활동</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink on" onClick={menuClick}>문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem">
                                <h1>문의하기</h1>
                            </li>
                            <li className="profileItem">
                                <div className="profileImg section1">
                                    <img src="img/hamster_profile.jpg" alt="프로필사진"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <p className="profileName">햄수수수수타</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <select name="category" id="category">
                                    <option value="categoty">일반 문의</option>
                                    <option value="categoty">신고 하기</option>
                                </select>
                                <select name="category" id="category">
                                    <option value="categoty">계정관리</option>
                                    <option value="categoty">로그인 활동</option>
                                    <option value="categoty">사용법 안내</option>
                                </select>
                            </li>
                            <li className="profileItem">
                                <div className="QnaTitle section1">제목</div>
                                <div className="titleBox section2">
                                    <input type="text" name="title" id="title" placeholder="제목"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="QnaContent section1">내용</div>
                                <div className="contentBox section2">
                                    <textarea type="text" name="content" id="content" placeholder="내용"/>
                                </div>
                            </li>
                        </ul>
                        <div className="submitBtn">
                            <button type="submit" className="btn"> 제출 </button>
                        </div>
                    </div>
                </div>
            </MyPageQnAWrap>
        </>
    )
    function select(e){
        
    }
}

export default MyPageQnA;