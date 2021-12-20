import React, { useEffect, useState } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/admin.css';
import axios from "axios";

const MemberForm = styled.div`
    overflow-x: hidden; margin-left: 24rem;
    ul { list-style:none; display: flex; }
    ul li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .memberListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .memberSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .memberSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .memberSearch{ width: 26rem; height: 2.9rem; padding-left: 1rem; background-color: white; border: 2px solid #14c1c7; border-radius: 5px; box-shadow: 3px 3px 3px rgb(210,210,210); caret-color: #14c1c7; }
    .memberSearch:focus{ outline:none; border:2px solid lightgray; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    .postDate{ border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); }
    .fa-user-shield, .fa-clipboard, .fa-comments{ font-size: 1.7rem }
    .fa-user-shield:hover, .fa-clipboard:hover, .fa-comments:hover{ font-size: 2rem; color: #14c1c7; }
    .memberEmail{ width:35%; }
    .memberInfo{ width:15%; }
    .memberPost{ width:15%; }
    .memberChat{ width:15%; }
    .memberDate{ width:20%; }
    table a{ text-decoration: none; color: black; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .nonData { height: 10rem; color: #999; font-size: 1.4rem; }

`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
const MemberPage = () => {

    const [memberAxios, setAxios] = useState(0); // list-useEffect axios의 값 존재 여부 저장

    let [change, setChange] = useState(1);
    let [search, setSearch] = useState('')
    let [searchNo, setSearchNo] = useState('')

    let [member, setMember] = useState([]);
    let [pageNum, setPageNum] = useState(1);

    let pages = [];

    const Pagination = (page) =>{ 
        setPageNum(page)
        if(change==1){setChange(0)}else{setChange(1)} // useEffect 재실행을 위해 change값을 변경
    } 

    const PaginationNum = (e) =>{
        let pageNum = e.target.id
        Pagination(pageNum)
    }

    const PaginationArr = (e) =>{
        let pageArr = e.target.value
        console.log(pageArr)
        Pagination(pageArr)
    }

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
        let e = document.querySelector('.memberSearch')
        e.value = '';
        Search()
    }

    useEffect(async () => {
        const member = await axios.get("http://localhost:3001/admin/member?page=" + pageNum + "&email=" + search)
        console.log(member.data)
        setMember(member.data)
        let paginationClass = document.querySelectorAll('.paginationClass');
        if(member.data.totalPage!==0){
            for(let i=0; i<paginationClass.length; i++){
                paginationClass[i].style.color = "#888";
            }
            let current = document.getElementById(pageNum);
                current.style.color = "#14c1c7";
        }
        if(member.data.result.length !== 0){ setAxios(1) } // axios의 값 존재 여부 저장
    }, [change]);
    for(let i=member.startPage; i<=member.endPage;i++){pages[i]=i}
    
    return (
        <Form>
            <Header/>
            <SideBar/>
            <MemberForm>
            <div className="memberListBox">
                <p className="title">회원관리</p>
                    <div className="memberSearchBox">
                        <p>
                            <input type="text" className="memberSearch" placeholder="이메일을 검색하세요" onChange={searchInput} />
                            <input type="button" className="searchBtn btn" value="검색" onClick={Search}/>
                            <input type="button" className="resetBtn btn" value="초기화" onClick={Reset}/>
                        </p>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th className="memberEmail">이메일 / 아이디</th>
                                <th className="memberInfo">정보</th>
                                <th className="memberPost">게시물</th>
                                <th className="memberChat">채팅방</th>
                                <th className="memberDate">가입날짜</th>
                            </tr>
                            {memberAxios !== 0 ?
                                member.result.length !== 0 ?
                                    member.result.map(rowData => (
                                        <tr>
                                            <td className="memberEmail">{rowData.email}</td>
                                            <td className="memberInfo"><Link to={"/admin/member/detail/"+rowData.idx}><i class="fas fa-user-shield"></i></Link></td>
                                            <td className="memberPost"><Link to={"/admin/member/post/"+rowData.idx}><i class="far fa-clipboard"></i></Link></td>
                                            <td className="memberChat"><Link to={"/admin/member/chat/"+rowData.idx}><i class="fas fa-comments"></i></Link></td>
                                            <td className="memberDate">{rowData.createdAt}</td>
                                        </tr>
                                    )) :
                                    // rowData 가 없으면 나타냄
                                    <tr className="nonData"><td colSpan="5">' {searchNo} ' 에 대한 검색결과가 존재하지 않습니다</td></tr>
                                : 
                                // member의 데이터가 없으면 나타냄
                                <tr className="nonData"><td colSpan="5">데이터가 존재하지 않습니다</td></tr>
                            }
                        </table>
                    </div>
                    <div className="pagination">
                        <ul>
                            { member.startPage !== 1 ?
                                <>
                                <li onClick={PaginationArr} value="1">《</li>
                                <li onClick={PaginationArr} value={member.startPage-1}>〈</li>
                                </>
                                : <></> // startPage가 1이면 나타냄
                            }
                            { member.totalPage !== 0 ?
                                pages.map(rowData => (
                                    member.startPage+5 > rowData ?
                                    <li onClick={PaginationNum} class="paginationClass" id={rowData}>{rowData}</li>
                                    : <></>
                                )) : <></> // pages가 없으면 나타냄
                            }
                            { member.endPage !== member.totalPage && member.endPage < member.totalPage ?
                                <>
                                <li onClick={PaginationArr} value={member.endPage+1}>〉</li>
                                <li onClick={PaginationArr} value={member.totalPage}>》</li>
                                </> : <></>
                            }
                        </ul>
                    </div>
                </div>
            </MemberForm>
        </Form>
    );
}

export default MemberPage;