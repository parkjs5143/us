import React, { useState, useEffect } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import '../../src/admin.css';
import axios from "axios";

const ChatDetailForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .chatListBox { background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .Number a { text-decoration: none; color: #14c1c7; font-weight: bolder; }
    .postDetailInfoBox{ width:100%; display:flex; justify-content: space-between; margin: 6rem 0; }
    .chatBox { width: calc(49.7% - 2px); height: 50rem; padding: 1rem 0; }
    .chatTextBox { height: calc(49.7% - 2px); border:2px solid rgb(210,210,210); overflow-y: scroll; height: 45rem; padding: 2rem; background-color: rgb(248, 250, 252); border-radius: 5px;}
    .chatDetail_text { padding: 1rem; overflow-wrap: anywhere; font-size: 1.4rem; }
    .chatDetail_text p { margin: 0.5rem 0; border-radius: 5px; border: 1px solid lightgray; padding: 0.8rem 1rem; color: #333; background-color: white; }
    .chatDetail_text p span { margin-left: 1.5rem; font-size: 1rem; font-weight: bolder; color: #888; }
    .chatDetail_text p input { width: 5rem; font-size: 0.5rem; border-radius: 5px; border: 1px solid #14c1c7; color: #14c1c7; background-color: white; cursor: pointer; margin-left: 0.5rem; }
    .chatDetail_text .nickname { font-size: 1.4rem; margin-left: 0; margin-right: 2rem; }
    .chatInfoBox { width: calc(49.7% - 2px); height: 50rem; padding: 1rem 0; }
    .InfoForm { height: calc(49.7% - 2px); border:2px solid rgb(248, 250, 252); height: 49rem; padding: 0 3rem; border-radius: 5px; }
    .chatTitle { font-size: 1.5rem; font-weight: bold; color: #14c1c7; padding: 5rem 0; margin-right: 2rem; }
    .chatInfoText { font-size: 1.7rem; color: #555; font-weight: bold; margin-bottom: 3rem; border-bottom: 2px solid lightgray; padding: 0.4rem 0 0.6rem 0.5rem; border-radius: 5px; }
    .InfoText { padding: 0 1rem 0.5rem; }
    .profileImgForm { display: flex; }
    .profileImg { margin-right: 1rem; }
    .profileImg img { width: 5.5rem; height: 5.5rem; border-radius: 30px; border: 2px solid #14c1c7; }
    .profileName { font-size: 1.1rem; font-weight: bold; margin-left: 1.2rem; color: #555; }
    .info { font-size: 1.4rem; font-weight: bold; color: #888; }
    .first-chatInfo { margin-bottom: 3rem; }
    // 모달창 css
    .mw .fg .modalTitle { border: none; width: 11rem; margin: 2rem auto; font-size: 2rem; font-weight: bold;  }
    .fa-times { font-size: 3.5rem; }
    .modalForm .user { font-size: 1.7rem; font-weight: bold; color: #666; border: none; text-align: center; border-bottom: 4px solid rgb(240,240,240); border-radius: 10px; width: 20rem; margin: 4rem auto 0;}
    .modalForm .userName { font-size: 1.7rem; }
    .chat {
        width: 35rem; border: 2px solid rgb(240, 240, 240); height: 33rem; margin: 3rem auto; overflow-y: scroll; background-color: rgb(248, 250, 252); padding: 2rem; font-size: 1.5rem; font-weight: normal; color: #444; }
    .nonData { font-size: 1.6rem; color: #777; margin: 3rem auto; }
    .chatTextBox .nonChat { font-size: 1.6rem; margin: 0 auto; font-weight: bold; }
    .chatTextBox .nonChat p { color: #999; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;

const ChatDetailPage = () => {
    // axios 뿌리기
    let [infomation, setInfo] = useState([]);
    let [profile, setProfile] = useState([]);
    let [chat, setChat] = useState([]);
    let [search, setSearch] = useState('');
    let [change, setChange] = useState(1);
    let [popup, setPopup] = useState();
    let [popupId, setId] = useState(null); // 팝업으로 띄울 room idx 값 저장 
    const id = useParams();

    const searchInput = (e)=>{
        e.preventDefault()
        const searchInput = e.target.value;
        setSearch(searchInput)
    }
    
    const Search = () =>{
        if(change==1){setChange(0)}else{setChange(1)} // useEffect 재실행을 위해 change값을 변경
    }

    //팝업
    const [modalOn, setModalOn] = useState(false); 

    const onOpenModal = (e) => {
        setModalOn(!modalOn);
        let idx = e.target.id
        setId(idx)

        //팝업 창 띄울 시 body 스크롤
        if(modalOn==false){
            document.body.style.overflow = "hidden";
        }else if(modalOn==true){
            document.body.style.overflow = "unset";
        }
    }

    useEffect(async () => {
        const infomation = await axios.get("http://localhost:3001/admin/chat/detail?idx=" + id.idx + "&content=" + search)
        setInfo(infomation.data[1][0])
        setProfile(infomation.data[2])
        setChat(infomation.data[0])
    }, [change]);

    //팝업 url
    useEffect(async () => { 
        const detail = await axios.get("http://localhost:3001/admin/chat/detail/plus?idx=" + popupId)
        setPopup(detail.data[0])
    }, [modalOn]);

    console.log(profile)

    const Modal = () => {
        return(
            <div id="mw_temp" className="mw">
                <div className="bg" style={{opacity: '0.2'}}></div>
                {
                    popup !== undefined ?
                        <div className="fg">
                            <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                            <p className="modalTitle">채팅 더보기</p>
                            <div className="modalForm">
                                <p className="user">사용자 :<span className="userName">{popup.name}</span></p>
                            </div>
                            <div>
                                <div className="chat">
                                    <div>{popup.content}</div>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="fg">
                        <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                        <p className="modalTitle">채팅 더보기</p>
                        <div className="modalForm">
                            <p className="user">사용자 :<span className="userName"></span></p>
                        </div>
                        <div>
                            <div className="chat">
                                <div></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    return (
        <Form>
            <Header/>
            <SideBar/>
            <ChatDetailForm>
                <div className="chatListBox">
                <p className="title">채팅관리 <i class="fas fa-chevron-right"></i> 상세페이지</p>
                    <div className="postDetailInfoBox">
                        <div className="chatBox">
                            <div className="chatTextBox">
                                <div className="chatDetail_text">
                                { chat.length !== 0 ?
                                    chat.map(rowData => (
                                        <p><span className="nickname">{rowData.name}</span> {rowData.content} <span><input type="button" value="더보기" id={rowData.idx} className="openBtn" onClick={onOpenModal}/>
                                        {modalOn? <Modal/>: ''}</span><span>{rowData.createdAt}</span></p>
                                    )):
                                    <div className="nonChat">
                                        <p>채팅내역이 없습니다</p>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                        <div className="chatInfoBox">
                            <div className="InfoForm">
                            { 
                                <div className="chatInfo first-chatInfo">
                                    <p className="chatInfoText">채팅방 정보</p>
                                    <p className="InfoText"><span className="chatTitle">채팅방명</span><span className="info chatName">{infomation.title}</span></p>
                                    <p className="InfoText"><span className="chatTitle">채팅인원</span><span className="info chatCount">{infomation.cnt}</span></p>
                                    <p className="InfoText"><span className="chatTitle">생성일자</span><span className="info chatRegdate">{infomation.createdAt}</span></p>
                                    <p className="InfoText"><span className="chatTitle">채팅유형</span><span className="info chatType">{infomation.type}</span></p>
                                    <p className="InfoText"><span className="chatTitle">신고여부</span><span className="info chatDec">{infomation.report}</span></p>
                                </div>
                            }
                                <div className="chatInfo">
                                    <p className="chatInfoText">프로필 정보</p>
                                    <div className="profileImgForm">
                                        { profile.length !== 0 ?
                                            profile.map(rowData => (
                                                <div className="profileImg">
                                                    <img src={rowData.img !== null ? '/'+rowData.img :  '/img/admin/noneImg.png'}/>
                                                    <p className="profileName">{rowData.name}</p>
                                                </div>
                                            )):
                                                <div className="profileImg nonData">
                                                    <p>채팅에 참여한 사람이 없습니다</p>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </ChatDetailForm>
        </Form>
    );
}

export default ChatDetailPage;