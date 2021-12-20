import React, { useState, useEffect } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';

const MemberChatForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    ul { list-style:none; display: flex; }
    ul li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberChatListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .memberChatSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .memberChatSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .memberChatSearch{ width: 26rem; height: 2.9rem; padding-left: 1rem; background-color: white; border: 2px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .memberChatSearch:focus{ outline:none; border:2px solid lightgray; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .returnBtnBox{ text-align: center; }
    .returnBtn{ text-align: center; font-size: 1.5rem; background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 1rem 0 2.5rem; }
    table a{ text-decoration: none; color: black; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .memberChatNum{ width: 15%; }
    .memberChatTitle{ width: 65%; }
    .memberChatDate{ width: 20%; }
    .chatTitle:hover{ font-size: 1.5rem; font-weight:bold; color: #14c1c7; }
    .popTitle{ margin: 3.2rem 0 2.8rem; font-size:1.6rem; text-align: center; font-weight: bold; }
    .chatContentBox{ height: 44.8rem; border: 1px solid lightgray; overflow-y: scroll; padding-bottom: 1.5rem; }
    .chatBox{ display: flex; }
    .chatImg{ width: 4rem; height: 4rem; border-radius: 50%; border: 1px solid lightgray; margin: 1rem 0.7rem 1rem 1rem; }
    .chatText{ margin: 0; font-size:1.1rem; max-width: 24rem; overflow-wrap: anywhere; height: fit-content; max-height: 15rem; overflow-y: auto; margin-top: 0.5rem; padding: 0.7rem 1rem 0.8rem; border: 1px solid lightgray; border-radius: 10px; }
    .chatName{ margin: 1.1rem 0 0; font-weight: bold; font-size: 1.1rem; }

    // 멤버 팝업 css
    .member-openBtn{ margin-top: 1.1rem; padding: 0.5rem 2rem 0.6rem; border: 1px solid #14c1c7; border-radius: 10px; background-color: #14c1c7; color: white; }
    .member-closeBox, .member-openBox{ width: 100%; text-align: center; }
    .member-pop{ position: absolute; z-index:1100; top: 58%; left: 130%; width: 27rem; height: 50.4rem; transform: translate(-50%, -50%); background: #fff; border-radius: 30px; }
    .chatMemberBox{ height: 42rem; margin-top: 3rem; overflow-y:scroll }
    .member-closeBtn{ margin-top: 1.1rem; padding: 0.3rem 2rem 0.4rem; border-radius: 10px; background-color: #14c1c7; border: 1px solid #14c1c7; color:white;  }
    .memberBox{ width: calc(100% - 0.7rem); padding: 0.7rem 0 0.7rem 0.7rem; display:flex; align-items: center; }
    .memberImg{ width: 4rem; height: 4rem; border-radius: 50%; border: 1px solid lightgray; }
    .memberText{ margin: 0; padding-left:0.5rem; font-size: 1.1rem; }
    .nonData { height: 10rem; color: #999; font-size: 1.4rem; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
const MemberChatPage = () => {

    const id = useParams(); // 넘겨받은 id값
    const [listAxios, setAxios] = useState(0); // list-useEffect axios의 값 존재 여부 저장
    let [detailId, setId] = useState(null); // 팝업으로 띄울 room idx 값 저장 

    // axios 저장 / list, chatModal
    let [list, setList] = useState([])
    let [detail, setDetail] = useState({chatDetail:[0], chatMember:[1]})

    let [change, setChange] = useState(1);
    let [search, setSearch] = useState('')
    let [searchNo, setSearchNo] = useState('')
    let [pageNum, setPageNum] = useState(1);
    let pages = [];

    //채팅창, 멤버 팝업
    const [chatOn, setChatOn] = useState(false); 
    const [memberOn, setMemberOn] = useState(false); 

    const onOpenChat = (e) => {
        setChatOn(!chatOn);
        let idx = e.target.id
        setId(idx)
        //채팅창 팝업 창 띄울 시 body 스크롤
        if(chatOn==false){
            document.body.style.overflow = "hidden";
        }else if(chatOn==true){
            document.body.style.overflow = "unset";
            setMemberOn(false);
        }
    }

    const onOpenMember = () => {
        setMemberOn(!memberOn);
    }

    console.log(list)

    // 페이지네이션
    const Pagination = (page) =>{ 
        setPageNum(page)
        if(change==1){setChange(0)}else{setChange(1)} } // useEffect 재실행을 위해 change값을 변경
    const PaginationNum = (e) =>{
        let pageNum = e.target.id
        Pagination(pageNum)
    }
    const PaginationArr = (e) =>{
        let pageArr = e.target.value
        Pagination(pageArr)
    }
    for(let i=list.startPage; i<=list.totalPage;i++){pages[i]=i}

    // 조건검색
    const searchInput = (e)=>{
        e.preventDefault()
        const searchInput = e.target.value;
        setSearch(searchInput)
    }
    const Search = () =>{
        setPageNum(1)
        setSearchNo(search)
        if(change==1){setChange(0)}else{setChange(1)} // useEffect 재실행을 위해 change값을 변경
    }
    const Reset = () =>{
        setSearch('')
        let e = document.querySelector('.memberChatSearch')
        e.value = '';
        Search()
    }

    useEffect(async () => { // list-useEffect
        const list = await axios.get("http://localhost:3001/admin/member/room?idx="+id.idx+"&page="+pageNum+"&title="+search)
        setList(list.data)
        let paginationClass = document.querySelectorAll('.paginationClass');
        if(list.data.totalPage!==0){
            for(let i=0; i<paginationClass.length; i++){
                paginationClass[i].style.color = "#888";
            }
            let current = document.getElementById(pageNum);
            current.style.color = "#14c1c7";
        }
        if(list.data.result.length !== 0){ setAxios(1) } // axios의 값 존재 여부 저장
    }, [change]);

    useEffect(async () => { // modal-useEffect
        const info = await axios.get("http://localhost:3001/admin/member/room/detail?roomIdx="+detailId)
        setDetail({chatDetail:info.data[0], chatMember:info.data[1]})
    }, [chatOn]);

    console.log(detail)

    const Modal = () => {
        return (
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenChat}><i class="fas fa-times"></i></div>
                    <p className="popTitle">{detail.chatDetail.length!==0 ? detail.chatDetail[0].title:<></>}</p>
                    <div className="popBox">
                        <div className="chatContentBox">
                            {detail.chatDetail.length!==0 ?
                                detail.chatDetail.map(chatData => (
                                    <div className="chatBox">
                                        <img className="chatImg" src={chatData.img===null?'/img/admin/noneImg.png':'/'+chatData.img}/>
                                        <div>
                                            <p className="chatName">{chatData.name}</p>
                                            <p className="chatText">{chatData.content}</p>
                                        </div>
                                    </div>
                                )):<></>
                            }
                        </div>
                        <div className="member-openBox"><button className="member-openBtn" onClick={onOpenMember}>참여멤버</button></div>
                    </div>
                    {memberOn? <MemberModal/>: ''}
                </div>
            </div>
        );
    };

    const MemberModal = () => {
        return (
            <div className="member-pop">
                <div className="popBox">
                    <div className="chatMemberBox">
                        {detail.chatMember.length!==0 ?
                            detail.chatMember.map(memberData => (
                                <div className="memberBox">
                                    <img className="memberImg" src={memberData.img===null?'/img/admin/noneImg.png':'/'+memberData.img}/>
                                    <p className="memberText">{memberData.name}</p>
                                </div>
                            )):<></>
                        }
                    </div>
                    <div className="member-closeBox"><button className="member-closeBtn" onClick={onOpenMember}>닫기</button></div>
                </div>
            </div>
        );
    } 

    return (
        <Form>
            <Header/>
            <SideBar/>
            <MemberChatForm>
            <div className="memberChatListBox">
                <p className="title">회원관리 <i class="fas fa-chevron-right"></i> 채팅방목록</p>
                <div className="memberChatSearchBox">
                        <p>
                            <input type="text" className="memberChatSearch" placeholder="채팅방 제목을 입력하세요" onChange={searchInput}/>
                            <input type="button" className="searchBtn btn" value="검색" onClick={Search}/>
                            <input type="button" className="resetBtn btn" value="초기화" onClick={Reset}/>
                        </p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th className="memberChatNum">채팅방 번호</th>
                            <th className="memberChatTitle">채팅방 제목</th>
                            <th className="memberChatDate">생성날짜</th>
                        </tr>
                        {listAxios !== 0 ?
                            list.result.length !== 0 ?
                                list.result.map(rowData => (
                                    <tr>
                                        <td className="memberChatNum">{rowData.idx}</td>
                                        <td className="memberChatTitle chatTitle"><div  id={rowData.idx} onClick={onOpenChat} className="contentOverflow">[{rowData.type}] {rowData.title}</div></td>
                                        <td className="memberChatDate">{rowData.createdAt}</td>
                                    </tr>
                                )) :
                                // rowData 가 없으면 나타냄
                                <tr className="nonData"><td colSpan="3">' {searchNo} ' 에 대한 검색결과가 존재하지 않습니다</td></tr>
                            : 
                            // member의 post 데이터가 없으면 나타냄
                            <tr className="nonData"><td colSpan="3">채팅창이 존재하지 않습니다</td></tr>
                        }
                    </table>
                </div>
                <div className="pagination">
                    <ul>
                        { list.startPage !== 1 ?
                            <>
                            <li onClick={PaginationArr} value="1">《</li>
                            <li onClick={PaginationArr} value={list.startPage-1}>〈</li>
                            </> : <></> // startPage가 1이면 나타냄
                        }
                        { list.totalPage !== 0 ?
                            pages.map(rowData => (
                                list.startPage+5 > rowData ?
                                <li onClick={PaginationNum} class="paginationClass" id={rowData}>{rowData}</li>
                                : <></>
                            )) : <></> // pages가 없으면 나타냄
                        }
                        { list.endPage !== list.totalPage && list.endPage < list.totalPage ?
                            <>
                            <li onClick={PaginationArr} value={list.endPage+1}>〉</li>
                            <li onClick={PaginationArr} value={list.totalPage}>》</li>
                            </> : <></>
                        }
                    </ul>
                </div>
                <div className="returnBtnBox">
                    <Link to= "/admin/member"><button className="returnBtn">뒤로가기</button></Link>
                </div>
            </div>
            {chatOn? <Modal/>: ''}
            </MemberChatForm>
        </Form>
    );
}

export default MemberChatPage;