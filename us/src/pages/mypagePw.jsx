import React from "react";
import Header from "../components/header";
import MainProfile from "../components/mainProfile";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyPagePwWrap = styled.div`
    * { text-decoration:none; font-size: 2rem;}
    ul, li { list-style: none; padding:0; margin: 0;}
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto; }
    .navBar { float: left; width: 15rem; padding:3rem; }
    .menuLink { margin-bottom: 2rem; color: #222; cursor: pointer; font-size: 1.7rem; }
    .menuLink.on { font-weight: 600; }
    .menuLink:hover { color:#5c5c5c; }
    .content { padding: 3rem 3rem 5rem 7rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1);}
    .profileItem { display: flex; position: relative; align-items: center; margin-bottom: 3rem; }
    .section1 { width: 20%; position: relative; right:3rem; font-size: 1.8rem; text-align: right; font-weight: 600;}
    .section2 { width: 80%; }
    .modifyImg { color: #1cbbeb; font-weight: bold; cursor: pointer; font-size: 1.5rem; margin-top: .5rem; }
    .profileImg img { width: 7rem; border-radius: 50%; vertical-align:middle; }
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
        height: 8rem;
        color: black;
        font-size: 1.5rem;
        padding-left: 1rem;
        padding-top: 1rem;
    }
    .section2 h3 { font-size: 1.6rem; margin: 2rem 0 0 1rem; font-weight: 400; }
    .section2 p { font-size: 1.4rem;  margin: 0; margin-left:1rem; }
    .widthraw { color: #1cbbeb; cursor: pointer; display: inline-block; font-size: 1.5rem; position:relative; left: 4rem; }
    .widthraw:hover { font-weight: 600; }
    .submitBtn { text-align: center; margin-top: 2rem; }
    .btn { padding: 1rem 1.5rem; font-size: 1.7rem; background: #14c1c7; border-radius: 10px; color: #fff; cursor: pointer; }
    `;

const MyPagePw = () =>{
    const menuClick = ()=>{
        
    };
    return (
        <>
            <Header/>
            <MyPagePwWrap>
                <div className="container">
                    <div>
                    <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink" onClick={menuClick}>프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink on" onClick={menuClick}>비밀번호 변경</li></Link>
                            <Link to="/mypageLogin"><li className="menuLink" onClick={menuClick}>로그인 활동</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink" onClick={menuClick}>문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem">
                                <div className="profileImg section1">
                                    <img src="img/hamster_profile.jpg" alt="프로필사진"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">햄수수수수타</div>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="profileName section1">이전 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="currPw" id="currPw" placeholder="이전 비밀번호"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="profileName section1">새 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="newPw" id="newPw" placeholder="새 비밀번호"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="profileName section1">새 비밀번호 확인</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="confirmNewPw" id="confirmNewPw" placeholder="새 비밀번호 확인"/>
                                </div>
                            </li>
                        </ul>
                        <div className="submitBtn">
                            <button type="submit" className="btn"> 수정 </button>
                        </div>
                    </div>
                </div>
            </MyPagePwWrap>
        </>
    );
}

export default MyPagePw;