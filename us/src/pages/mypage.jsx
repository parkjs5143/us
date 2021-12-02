import React, {useState} from "react";
import Header from "../components/header";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const MypageWrap = styled.div`
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

const WithdrawWrap = styled.div`
    z-index: 100; 
    position:fixed; 
    left:0; 
    top:0; 
    width:100%; 
    height:100%; 
    background:rgba(0,0,0,0.3);
    text-align: center;
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 35rem; height: 30rem; }
    .closeIcon { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; }
    .popHeader { padding: 4rem 5rem 3rem; }
    .title { font-size: 2rem; font-weight: 700; }
    .popContent { padding: 0 3rem 3rem; }
    .desc { font-size: 1.4rem; color: rgba(35,35,35,.8); }
    .btnItem button { 
        border: 0;
        outline: none;
        background: none;
        background-color: rgba(0,0,0,0);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        cursor:pointer;
        vertical-align: center;
        padding: 1rem 1.8rem;
        font-size: 1.6rem;
        border-radius: 12px;
        background-color: #14c1c7;
        color: #fff;
    }
    .linkWidthraw { color: rgba(34,34,34,.5); text-decoration: underline; margin-top:1.5rem; font-size: 1.3rem; cursor: pointer; }
`;

const Mypage = () =>{
    // 파일 미리보기 
    const [fileImage, setFileImage] = useState("img/hamster_profile.jpg");
    const changeImage = (e)=>{
        setFileImage(""+URL.createObjectURL(e.target.files[0]));
    }

    // 탈퇴진행
    const withdrawRun = ()=>{
        axios.delete('http://127.0.0.1:3000/member/delete?idx=75')
        .then(function (response) {
            // handle success
            console.log(response);
            alert('탈퇴되었습니다. 이용해주셔서 감사합니다.');
            window.location.href = '/';
        })
        .catch(function (error) {
            // handle error
            alert('탈퇴 실패했습니다.');
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    // 탈퇴하기 html
    const WithdrawPop = ()=>{
        return (
            <WithdrawWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title">정말 탈퇴하시겠습니까?</div>
                        <img className="closeIcon" src="img/clear_black.png" alt="엑스버튼" onClick={changePop}/>
                    </div>
                    <div className="popContent">
                        <div className="desc">
                            탈퇴하기 클릭 시 바로 탈퇴 처리됩니다.<br/>
                            탈퇴 후 재가입할 수 없으며,<br/>
                            재가입 시 동일 이메일을 사용할 수 없습니다.<br/>
                        </div>
                    </div>
                    <div className="btnItem">
                        <button onClick={changePop}>탈퇴 안 할래요</button>
                    </div>
                    <p className="linkWidthraw" onClick={withdrawRun}>탈퇴하기</p>
                </div>
            </WithdrawWrap>
        )
    }

    const [withdrawPop, setWithdrawPop] = useState(false);
    const changePop = ()=>{
        setWithdrawPop(!withdrawPop);
        if(withdrawPop){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    return (
        <>
            {withdrawPop ? <WithdrawPop/> : ""}
            <Header/>
            <MypageWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink on">프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink">비밀번호 변경</li></Link>
                            <Link to="/mypageLogin"><li className="menuLink">로그인 활동</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink">문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem">
                                <div className="profileImg section1">
                                    <img src={fileImage} alt="프로필사진"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">햄수수수수타</div>
                                    <label htmlFor="inputImg"><div className="modifyImg">프로필 사진 바꾸기</div></label>
                                    <input type="file" name="inputImg" id="inputImg" accept="image/*" style={{display:"none"}} onChange={changeImage}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">이름</div>
                                <div className="section2">
                                    <input type="text" name="name" id="name" placeholder="이름"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">코드</div>
                                <div className="section2">
                                    <input type="text" name="code" id="code" placeholder="코드" value="xsf123!2r"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">소개</div>
                                <div className="section2">
                                    <textarea name="intro" id="intro" placeholder="소개"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1"></div>
                                <div className="section2">
                                    <h3>개인정보</h3>
                                    <p className="">아래 개인정보 내용은 프로필에 공개되지 않습니다.</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">이메일</div>
                                <div className="section2">
                                    <input type="text" name="email" id="email" placeholder="이메일" value="star1234@us.com"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">번호</div>
                                <div className="section2">
                                    <input type="text" name="hp" id="hp" placeholder="번호" value="+82 1022225555"/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">성별</div>
                                <div className="section2">
                                    <input type="text" name="gender" id="gender" placeholder="성별" value="여자"/>
                                </div>
                            </li>
                        </ul>
                        <div className="widthraw" onClick={changePop}> 탈퇴하기 </div>
                        <div className="submitBtn">
                            <button type="submit" className="btn"> 수정 </button>
                        </div>
                    </div>
                </div>
            </MypageWrap>
        </>
    );
}

export default Mypage;