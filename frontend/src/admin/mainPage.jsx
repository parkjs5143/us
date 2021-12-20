import React, { useState, useEffect } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const MainForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .mw { position:fixed; top:0; left:0; width:100%; height:100%; z-index: 1000; }
    .mw .bg { position:fixed; top:0; left:0; width:100%; height:100%; background:#000; opacity:.5; filter:alpha(opacity=50); }
    .mw .fg { position:absolute; top:50%; left:50%; width: 50rem; height: 60rem;  transform: translate(-50%, -50%); background:#fff; border-radius: 30px; }
    .openBtn {
        background-color: #F9B514;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .mainDashBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .dashFlexBox{ display: flex; justify-content: center; margin-top: 5rem; }
    .dashBox{ border: 1px solid lightgray; border-radius: 10px; display: flex; align-items: center; margin: 0 1rem; padding: 0 2rem 0 1rem; }
    .dashImgBox{ font-size: 6rem; margin: 1rem; color: #14c1c7;}
    .dashTextBox p{ margin: 0; }
    .dashBText{ font-size: 2.2rem; font-weight: bold; }
    .dashSText{ font-size: 1.2rem; }
    .dashListBox{ width:32rem; font-size: 1.5rem; border: 1px solid lightgray; border-radius: 5px; margin: 0 1rem; padding: 1.5rem 1rem; text-align: center; }
    .fa-user, .fa-clipboard-list, .fa-bell{ font-size: 2rem; color: gray; }
    .sListBox{ text-align: left; }
    .sListBox p{ margin: 1.5rem auto; width: 90%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sListBox p:hover{ font-weight: bold; color: #14c1c7; }
    .ListTitle{ margin: 0.8rem 0 2rem 0; font-weight: bold; }
    .dashChatFlexBox{ width: 95.1%; display: flex; border: 1px solid lightgray; border-radius: 5px; margin: 2rem auto; }
    .dashChatTextBox{ width: 20rem; border-right: 1px solid lightgray; text-align: center; }
    .fa-comments{ font-size: 3rem; margin-top: 6rem; color: gray; }
    .dashChatTextBox { height: 19rem;}
    .dashChatTextBox p{ font-size: 1.5rem; font-weight: bold; }
    .dashChatListBox p{ font-size: 1.5rem; padding: 0 0 0 2rem; }
    .dashChatListBox p span{ font-weight: bold; }
    .dashChatListBox p:hover{ font-weight: bold; color: #14c1c7; }
    a { color: black; text-decoration-line: none; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;

const MainPage = () => {

    // axios 뿌리기
    let [member, setMember] = useState([]);
    let [post, setPost] = useState([]);
    let [question, setQuestion] = useState([]);
    let [chat, setChat] = useState([]);
    let [memCount, setMemCount] = useState([]);
    let [postCount, setPostCount] = useState([]);
    let [questionCount, setQuesCount] = useState([]);
    let [chatCount, setChatCount] = useState([]);

    useEffect(async () => {
        const main = await axios.get("http://localhost:3001/admin/dashBoard")
        setMemCount(main.data[0])
        setPostCount(main.data[1])
        setQuesCount(main.data[3])
        setChatCount(main.data[2])
        setMember(main.data[4])
        setPost(main.data[5])
        setQuestion(main.data[6])
        setChat(main.data[7])
    }, []);
    console.log(post);
    console.log(chatCount)

    return (
        <Form>
            <Header/>
            <SideBar/>
            <MainForm>
                <div className="mainDashBox">
                    <p className="title">대시보드</p>
                    <div className="dashFlexBox">
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="fas fa-child"></i></div>
                            <div className="dashTextBox">
                                { memCount !== 0 ?
                                    memCount.map(rowData =>(
                                        <p className="dashBText">{rowData.memberCnt}명</p>
                                    )):
                                    <p className="dashBText"><span>0</span> 명</p>
                                }
                                <p className="dashSText">전체 회원 수</p>
                            </div>
                        </div>
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="far fa-clipboard"></i></div>
                            <div className="dashTextBox">
                            { postCount !== 0 ?
                                postCount.map(rowData =>(
                                    <p className="dashBText">{rowData.postCnt}개</p>
                                )):
                                    <p className="dashBText"><span>0</span> 명</p>
                            }
                                <p className="dashSText">게시물 수</p>
                            </div>
                        </div>
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="fas fa-comment-dots"></i></div>
                            <div className="dashTextBox">
                                { chatCount !== 0 ?
                                    chatCount.map(rowData =>(
                                        <p className="dashBText">{rowData.roomCnt}개</p>
                                    )):
                                        <p className="dashBText"><span>0</span> 명</p>
                                }
                                <p className="dashSText">채팅방 수</p>
                            </div>
                        </div>
                        <div className="dashBox">
                            <div className="dashImgBox"><i class="far fa-question-circle"></i></div>
                            <div className="dashTextBox">
                                { questionCount !== 0 ?
                                    questionCount.map(rowData =>(
                                        <p className="dashBText">{rowData.inquiryCnt}개</p>
                                    )):
                                        <p className="dashBText"><span>0</span> 명</p>
                                }
                                <p className="dashSText">문의 수</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashFlexBox">
                        <div className="dashListBox">
                            <i class="fas fa-user"></i>
                            <p className="ListTitle">최신 회원</p>
                            { member.length !== 0 ?
                                member.map(rowData => (
                                    <div className="sListBox">
                                        <Link to={"/admin/member/detail/" + rowData.idx}><p>{rowData.email}</p></Link>
                                    </div>
                                )):
                                    <div className="sListBox">
                                        <p>게시글이 없습니다</p>
                                    </div>
                            } 
                        </div>
                        <div className="dashListBox">
                        <i class="fas fa-clipboard-list"></i>
                            <p className="ListTitle">최신 게시물</p>
                            { post.length !== 0 ?
                                post.map(rowData => (
                                <div className="sListBox">
                                    <Link to={"/admin/post/detail/" + rowData.idx}><p>{rowData.postContent}</p></Link>
                                </div>
                            )):
                                <div className="sListBox">
                                    <p>게시글이 없습니다</p>
                                </div>
                            } 
                        </div>
                        <div className="dashListBox">
                            <i class="fas fa-bell"></i>
                            <p className="ListTitle">최신 문의 사항</p>
                            { question.length !== 0 ?
                                question.map(rowData => (
                                    <div className="sListBox">
                                        <Link to={"/admin/question/detail/" + rowData.idx}><p>{rowData.inquiryContent}</p></Link>
                                    </div>
                                )):
                                    <div className="sListBox">
                                        <p>게시글이 없습니다</p>
                                    </div>
                            }   
                        </div>
                    </div>
                    <div className="dashChatFlexBox">
                        <div className="dashChatTextBox">
                            <i class="fas fa-comments"></i>
                            <p>최신 채팅방</p>
                        </div>
                        <div className="dashChatListBox">
                        { chat.length !== 0 ?
                            chat.map(rowData => (
                                <Link to={"/admin/chat/detail/" + rowData.idx}><p><span>{rowData.title}</span> - {rowData.type}채팅 / 인원 : {rowData.ChatCnt}명(정영범 외 {rowData.ChatCnt - 1}명) / 생성날짜 : {rowData.createdAt} </p></Link>
                            )):
                                <p>게시글이 없습니다</p>
                        } 
                        </div>
                    </div>
                </div>
            </MainForm>
        </Form>
    );
}

export default MainPage;