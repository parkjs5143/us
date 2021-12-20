import React, { useState, useEffect } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';

const MemberPostForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    ul { list-style:none; display: flex; }
    ul li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberPostListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .memberPostSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .memberPostSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .memberPostSearch{ width: 26rem; height: 2.9rem; padding-left: 1rem; background-color: white; border: 2px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .memberPostSearch:focus{ outline:none; border:2px solid lightgray; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .returnBtnBox{ text-align: center; }
    .returnBtn{ text-align: center; font-size: 1.5rem; background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); font-size: 1.3rem; margin: 1rem 0 2.5rem; }
    table a{ text-decoration: none; color: black; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .memberPostNum{ width: 14%; }
    .memberPostContent{ width: 68%; }
    .memberPostDate{ width: 18%; }
    .postContent:hover{ font-size: 1.5rem; font-weight:bold; color: #14c1c7; }
    .popTitle{ margin: 3.2rem 0 2.8rem; font-size:1.6rem; text-align: center; font-weight: bold; }
    .popFlexBox{ width: calc(100% - 2rem); display: flex; padding:1rem 1rem 0.5rem 1rem; justify-content: space-between; }
    .imgBox{ width: 25rem; height: 25rem; border: 1px solid lightgray; }
    .imgBox img{ width: 100%; height: 100%; }
    .contentBox{ width: calc(22rem - 2rem); height: calc(25rem - 2rem); border: 1px solid lightgray; padding: 1rem; overflow-y: scroll; }
    .content{ margin: 0; font-size: 1.3rem; }
    .contentOverflow{ width:56rem; height: 2rem; overflow: hidden; padding: 0 9rem; text-overflow: ellipsis; margin: 0 auto; }
    .popBox{ width: calc(100% - 2rem); padding: 0rem 1rem 1rem 1rem; }
    .reBox{ width: 100%; border: 1px solid lightgray; height: 23rem; overflow-y: scroll; }
    .reTextBox img{ width: 4rem; height: 4rem; border: 1px solid lightgray; border-radius: 50%; margin-right: 1rem; }
    .reMember, .reText{ margin: 0; margin-top: 0.2rem; }
    .reMember{ font-weight: bold; }
    .reText{ font-size: 1.2rem; max-width: 30rem; overflow-wrap: anywhere; }
    .reTextBox{ display: flex;  margin: 1rem; }
    .reImg{ width: 4rem; height: 4rem; margin-right: 1rem; position: relative; }
    .reReImg{ width: 8rem; height: 4rem; margin-right: 1rem; position: relative; }
    .fa-replyd{ font-size: 3rem; position: absolute; bottom: 0; right: 0; color: gray; }
    .postImgBtn{ width: 100%; display:flex; justify-content: space-between; position: relative; bottom: 17rem; } 
    .postImgBtn img{ width: 6rem; }
    .nonData { height: 10rem; color: #999; font-size: 1.4rem; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
let img = 0;

const MemberPostPage = () => {

    const id = useParams(); // 넘겨받은 id값
    const [listAxios, setAxios] = useState(0); // list-useEffect axios의 값 존재 여부 저장

    // axios 저장 / list, modal
    let [list, setList] = useState([])
    let [detail, setDetail] = useState({postInfo:[0], postImg:[0], postReply:[0]});

    let [detailImg, setDetailImg] = useState(0) // scrollImg-useEffect 재실행을 위한 값 변경 저장
    let [modalOn, setModalOn] = useState(false); // 팝업 open/close를 위한 변경 값
    let [scrollImg, setScrollImg ] = useState(''); // imgName 저장
    let [detailId, setId] = useState(null); // 팝업으로 띄울 post idx 값 저장 

    let [change, setChange] = useState(1);
    let [search, setSearch] = useState('')
    let [searchNo, setSearchNo] = useState('')
    let [pageNum, setPageNum] = useState(1);
    let pages = [];
    
    useEffect(async () => { // list-useEffect
        const list = await axios.get("http://localhost:3001/admin/member/post?idx="+id.idx+"&page="+pageNum+"&content="+search)
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
        const info = await axios.get("http://localhost:3001/admin/member/post/detail?postIdx="+detailId)
        setDetail({postInfo:info.data[0], postImg:info.data[1], postReply:info.data[2]})
        if(detailImg===0){setDetailImg(1)}else{setDetailImg(0)} // scrollImg-useEffect 재실행을 위해 detailImg 값 변경
    }, [modalOn]);

    useEffect(async () => { // scrollImg-useEffect
        if(detail.postImg.length!==0){setScrollImg(detail.postImg[0].imgName)}
    }, [detailImg]);

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
        let e = document.querySelector('.memberPostSearch')
        e.value = '';
        Search()
    }

    // 이미지 버튼
    const next = () => {
        img = detail.postImg.length-1 === img ? img : img+1;
        setScrollImg(detail.postImg[img].imgName)
    }
    const prev = () => {
        img = img === 0 ? 0 : img-1;
        setScrollImg(detail.postImg[img].imgName)
    }

    const onOpenModal = (e) => { // 팝업창 open/close
        img = 0
        setModalOn(!modalOn)
        let idx = e.target.id
        setId(idx)
        //팝업 창 띄울 시 body 스크롤
        if(modalOn==false){
            document.body.style.overflow = "hidden";
        }else if(modalOn==true){
            document.body.style.overflow = "unset";
        }
    }
    
    const Modal = () => { //팝업창
        return (
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                    <p className="popTitle">{detail.postInfo.length!==0?<span>{detail.postInfo[0].createdAt}</span>:<span></span>}</p>
                    <div className="popFlexBox">
                        <div className="imgBox">
                            <img className="postImg" src={"/uploads/"+scrollImg}/>
                            <div className="postImgBtn"><img style={img===0?{opacity: '0'}:{opacity: '1'}} onClick={prev} src="/img/admin/insta-left-circle.svg"/><img style={img===detail.postImg.length-1?{opacity: '0'}:{opacity: '1'}} onClick={next} src="/img/admin/insta-right-circle.svg"/></div>
                            <div></div>
                        </div>
                        <div className="contentBox">
                            <p className="content">{detail.postInfo.length!==0?<span>{detail.postInfo[0].content}</span>:<span></span>}</p>
                        </div>
                    </div>
                    <div className="popBox">
                        <div className="reBox">
                            {detail.postReply.length!==0?
                                detail.postReply.map(ReplyData => (
                                    ReplyData.depth===0?
                                    <div className="reTextBox">
                                        <img src="/img/admin/yb.png"/>
                                        <div className="onRe">
                                            <p className="reMember">{ReplyData.name} ⦁ {ReplyData.createdAt}</p>
                                            <p className="reText">{ReplyData.content}</p>    
                                        </div>
                                    </div>
                                    : ReplyData.depth===1?
                                    <div className="reTextBox">
                                        <div className="reImg"><i class="fab fa-replyd"></i></div>
                                        <img src="/img/admin/yb.png"/>
                                        <div className="onRe">
                                            <p className="reMember">{ReplyData.name} ⦁ {ReplyData.createdAt}</p>
                                            <p className="reText">{ReplyData.content}</p>    
                                        </div>
                                    </div>
                                    : ReplyData.depth>=2?
                                    <div className="reTextBox">
                                        <div className="reReImg"><i class="fab fa-replyd"></i></div>
                                        <img src="/img/admin/yb.png"/>
                                        <div className="onRe">
                                            <p className="reMember">{ReplyData.name} ⦁ {ReplyData.createdAt}</p>
                                            <p className="reText">{ReplyData.content}</p>    
                                        </div>
                                    </div>
                                    : <></>
                                )):
                                <p>등록된 댓글이 없습니다.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Form>
            <Header/>
            <SideBar/>
            <MemberPostForm>
            <div className="memberPostListBox">
                <p className="title">회원관리 <i class="fas fa-chevron-right"></i> 게시물목록</p>
                <div className="memberPostSearchBox">
                    <p>
                        <input type="text" className="memberPostSearch" placeholder="게시물 내용을 입력하세요" onChange={searchInput}/>
                        <input type="button" className="searchBtn btn" value="검색" onClick={Search}/>
                        <input type="button" className="resetBtn btn" value="초기화" onClick={Reset}/>
                    </p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th className="memberPostNum">게시물번호</th>
                            <th className="memberPostContent">게시물내용</th>
                            <th className="memberPostDate">게시날짜</th>
                        </tr>
                        {listAxios !== 0 ?
                            list.result.length !== 0 ?
                                list.result.map(rowData => (
                                    <tr>
                                        <td className="memberPostNum">{rowData.idx}</td>
                                        <td className="memberPostContent postContent"><div  id={rowData.idx} onClick={onOpenModal} className="contentOverflow">{rowData.content}</div></td>
                                        <td className="memberPostDate">{rowData.createdAt}</td>
                                    </tr>
                                )) :
                                // rowData 가 없으면 나타냄
                                <tr className="nonData"><td colSpan="3">' {searchNo} ' 에 대한 검색결과가 존재하지 않습니다</td></tr>
                            : 
                            // member의 post 데이터가 없으면 나타냄
                            <tr className="nonData"><td colSpan="3">게시글이 존재하지 않습니다</td></tr>
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
            {modalOn? <Modal/>: ''}
            </MemberPostForm>
        </Form>
    );
}

export default MemberPostPage;