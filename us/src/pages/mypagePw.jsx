import React, { useState , useEffect ,Component } from "react";
import Header from "../components/header";
import MainProfile from "../components/mainProfile";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
const MyPagePwWrap = styled.div`
* { text-decoration:none; }
ul, li { list-style: none; padding:0; margin: 0;}
input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
.container { max-width:100rem; margin: 0 auto;  }
.navBar { float: left; width: 12rem; padding:5rem 3rem 3rem 2rem; }
.menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
.menuLink.on { font-weight: 600; color: #14c1c7; }
.menuLink:hover { color:#14c1c7; font-weight: 600; }
.content { padding: 5.5rem 3rem 5rem 10rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1); height: 77.5vh;}
.profileItem { display: flex; position: relative; align-items: center; margin-bottom: 1.5rem; margin-left: 4.5rem; }
.profileFirst { margin-left: -2rem; margin-bottom: 5rem; }
.section1 { width: 11rem; position: relative; right:3rem; font-size: 1.4rem; text-align: left; font-weight: 600; margin-top: -2rem; }
.section2 { width: 80%; height: 6.2rem; }
.profileImg img { width: 6.5rem; border-radius: 50%; vertical-align:middle; border: 2px solid #999; margin-left: 6rem; }
.profileName { font-size: 1.7rem; font-weight: bold; color: #444; margin-top: 1rem; margin-left: 0.5rem; }
.section2 .red { font-size: 1.2rem; margin-top: 0.5rem; color: #fb3b3b; }
.section2 input { border: 1px solid lightgray; background-color: #fff; border-radius: 5px; width: 90%; height: 4rem; color: black; font-size: 1.4rem; padding-left: 1rem; }
.section2 p { font-size: 1.4rem;  margin: 0; margin-left:1rem; }
.submitBtn { text-align: center; margin-top: 5rem; }
.btn:disabled { background: #dfdfdf; }
.btn { width: 12rem; height: 4rem; font-size: 1.5rem; background: #14c1c7; border-radius: 7px; color: #fff; cursor: pointer; box-shadow: 3px 3px 3px #d0d0d0; }
`;
let passwordDisable = false;
let passwordDisable2 = false;


const MyPagePw = () =>{
    
    const cookies = document.cookie.substring(6);
        console.log("쿠키!!!! => " + cookies);
    const editProfile = () =>{
        window.location.href="/mypage/" + cookies ;
    }
    const editPw = () =>{
        window.location.href="/mypagePw/" + cookies ;
    }
    const oneToOne = () =>{
        window.location.href="/mypageQnA/" + cookies ;
    }

    
        axios.get("http://localhost:3001/member/edit", {
            params: {
                'idx': cookies
            }
        })
        .then(function (result) {
            console.log(result.data[0]) 
            setName(result.data[0].name)
            setProImg(result.data[0].img)
        }).catch(function (error) {
        });
    
///member/ComparePassword
    const [name , setName] = React.useState('')
    const [proImg, setProImg] = React.useState('')
    const [idxPw , setIdxPw] = React.useState('')


    //비밀번호 유효성 검사
   
    const send = async () => {
        console.log(password3+"///////////////"+password +"///////////"+ cookies)
        let log = await axios.post('http://localhost:3001/member/ComparePassword?userPw='+password3+"&userPw2="+password+"&idx="+cookies)
        console.log(log)

        // if(log.data===true){
        //     alert('비밀번호가 수정되었습니다')
        //     editPw();
        // }else{
        //     alert('이전 비밀번호 또는 새 비밀번호를 확인해주세요')
        // }
    }

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');

    

    //오류메시지 저장
    const [passwordMessage, setPasswordMessage] = useState('');

    //유효성 검사
    const [isPassword, setIsPassword] = useState(false);

    //새 비밀번호
    const passwordInput = (e) => {
        e.preventDefault();
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const password = e.target.value;
        setPassword(password);
        if (!regExp.test(password)) {
            setPasswordMessage('* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.');
            setIsPassword(false);
            passwordDisable = false
        } else {
            setPasswordMessage('');
            setIsPassword(true);
            passwordDisable = true
        }
        idDisabled()
    }
    //새 비밀번호 확인 
    const passwordInput2 = (e) => {
        e.preventDefault();
        const passwordC = e.target.value;
        setPassword2(passwordC);
        console.log(password2 +"//////////////"+ password)

        if(password === password2){
            passwordDisable2 = true
            changeDispaly2('none')
        }else{
            changeDispaly2('block')
        }
        idDisabled()
    }
    //전 비밀번호 
    const passwordInput3 = (e) => {
        e.preventDefault();
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const password = e.target.value;
        setPassword3(password);
        if (!regExp.test(password)) {
            passwordDisable = false
            changeDispaly('block')

        } else {
            passwordDisable = true
            changeDispaly('none')

        }
        idDisabled()
    }

    const [ disabled, setDisabled ] = useState('disabled');

    const [forDis, setForDis] = useState("none");
    const [forDis2, setForDis2] = useState("none");

    const changeDispaly = (display) => {
        setForDis(display)
    }
    const changeDispaly2 = (display2) => {
        setForDis2(display2)
    }

    const idDisabled = () => {
        if(passwordDisable === true && passwordDisable2 === true) {
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }
   

    return (
        <>
            <Header/>
            <MyPagePwWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                                <li className="menuLink" onClick={editProfile}>프로필 편집</li>
                                <li className="menuLink on" onClick={editPw}>비밀번호 변경</li>
                                <li className="menuLink" >로그인 활동</li>
                                <li className="menuLink" onClick={oneToOne}>문의하기</li>
                        </ul>
                        </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem profileFirst">
                                <div className="profileImg section1">
                                    <img src={proImg==null||proImg==''? "/img/blank_profile.png": "/"+proImg} alt="프로필사진"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">{name}</div>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">이전 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="currPw" id="currPw" placeholder="이전 비밀번호" onChange={passwordInput3}/>
                                    <p className="red" style={{display:forDis}}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">새 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="newPw" id="newPw" placeholder="새 비밀번호" onChange={passwordInput}/>
                                    <p className="red">{password.length > 0 && <span className={`message ${isPassword  ? 'success' : 'error'}`}>{passwordMessage}</span>}</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">새 비밀번호 확인</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="confirmNewPw" id="confirmNewPw" placeholder="새 비밀번호 확인" onChange={passwordInput2}/>
                                    <p className="red" style={{display: forDis2}}>* 새 비밀번호가 일치하지 않습니다.</p>
                                </div>
                            </li>
                        </ul>
                        <div className="submitBtn">
                            <button type="button" onClick={send} className="btn" disabled={disabled}> 변경 </button>
                        </div>
                    </div>
                </div>
            </MyPagePwWrap>
        </>
    );
}

export default MyPagePw;