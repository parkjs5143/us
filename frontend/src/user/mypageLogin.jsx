import React from "react";
import Header from "../UserComponents/header";
import MainProfile from "../UserComponents/mainProfile";
import LoginMap from "../UserComponents/loginMap";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MypageLoginWrap = styled.div`
    * { text-decoration:none; font-size: 2rem;}
    ul, li { list-style: none; padding:0; margin: 0;}
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .container { max-width:100rem; margin: 0 auto; }
    .navBar { float: left; width: 12rem; padding:5rem 3rem 3rem 2rem; }
    .menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
    .menuLink.on { font-weight: 600; color: #14c1c7; }
    .menuLink:hover { color:#14c1c7; font-weight: 600; }
    .content { padding: 3rem 3rem 5rem 7rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1);}
    .profileItem { display: flex; position: relative; align-items: center; }
    .profileItem.marginTop { margin-top: 3rem; }
    .profileItem p { font-weight: bold; }
    .profileItem.padding { padding: 2rem 0; border-bottom: 1px solid rgba(0,0,0,0.2); }
    .section1 { width: 10%; position: relative; right:3rem; font-size: 1.8rem; text-align: right; font-weight: 600;}
    .section2 { width: 90%; }
    .activTime { display: inline-block; }
    .activTime.active { color:#14c1c7; }
    .activTime:after { content: "·";  padding: 0 .5rem;}
    .device { display: inline-block; color: rgba(0,0,0,0.5); }
    `;

const MypageLogin = () =>{
    const param = window.location.search.split('=')[1];
    
    return (
        <>
            <Header idx={param} param={param}/>
            <MypageLoginWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to={"/mypage?idx="+ param}><li className="menuLink ">프로필 편집</li></Link>
                            <Link to={"/mypagePw?idx="+ param}><li className="menuLink">비밀번호 변경</li></Link>
                            <Link to={"/mypageLogin?idx=" + param}><li className="menuLink on">로그인 활동</li></Link>
                            <Link to={"/mypageQnA?idx=" + param}><li className="menuLink">문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem">
                                <p className="mapTitle">로그인 활동</p>
                            </li>
                            <li className="profileItem">
                                <LoginMap/>
                            </li>
                            <li className="profileItem marginTop">
                                <p className="mapTitle">로그인한 위치</p>
                            </li>
                            <li className="profileItem padding">
                                <div className="markerImg section1">
                                    <img src="img/position_icon.svg" alt="positionImage" />
                                </div>
                                <div className="positionItem section2">
                                    <div className="position">
                                        Seongnam, Korea    
                                    </div>
                                    <div className="activTime active">
                                    지금 활동 중
                                    </div>
                                    <div className="device">
                                        이 Windows
                                    </div>
                                </div>
                            </li>
                            <li className="profileItem padding">
                                <div className="markerImg section1">
                                    <img src="img/position_icon.svg" alt="positionImage" />
                                </div>
                                <div className="positionItem section2">
                                    <div className="position">
                                        Suwon, Korea    
                                    </div>
                                    <div className="activTime">
                                        15시간 전
                                    </div>
                                    <div className="device">
                                        Samsung SM-N986N
                                    </div>
                                </div>
                            </li>
                            <li className="profileItem padding">
                                <div className="markerImg section1">
                                    <img src="img/position_icon.svg" alt="positionImage" />
                                </div>
                                <div className="positionItem section2">
                                    <div className="position">
                                        Incheon, Korea    
                                    </div>
                                    <div className="activTime">
                                        10월 20일
                                    </div>
                                    <div className="device">
                                        이 Windows
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </MypageLoginWrap>
        </>
    );
}

export default MypageLogin;