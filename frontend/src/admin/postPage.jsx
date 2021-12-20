import React, { useEffect, useState } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../src/admin.css';
import axios from "axios";

const PostForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    ul { list-style:none; display: flex; }
    ul li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .postListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .postSearchBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: end; margin-bottom:2rem; }
    .postSearchBox p{ margin: 0 1rem; display: flex; align-items: center; }
    .btn{ padding: 0.4rem 1.2rem }
    .searchBtn{ background-color: #14c1c7; border: 1px solid white; color: white; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1.5rem; font-size: 1.3rem; }
    .resetBtn{ background-color: white; border: 1px solid #14c1c7; color: #14c1c7; width: 7rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); margin-left: 1rem; font-size: 1.3rem; }
    select{ width:12rem; margin-right:1rem; border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); }
    select:focus, .postDate:focus{outline:none;}
    .postDate{ border: 1px solid #14c1c7; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210); }
    .postContent{ width:45%; }
    .postContent a{ text-decoration: none; color: black; }
    .postContent a:hover{ font-size: 1.45rem; color: #14c1c7; font-weight: bolder; }
    .postRegist{ width:20%; }
    .postDateText{ width:20%; }
    .postDec{ width:15%; }
    table { text-align: center; width: 100%; margin-top: 10px; border-collapse: collapse; border: 2px solid #9b9b9b; font-size:1.4rem }
    table th, table td { border: 1px solid #9b9b9b; height: 3.8rem; }
    table th { background-color: rgb(248, 250, 252); }
    .nonData { height: 10rem; color: #999; font-size: 1.4rem;  }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
const PostPage = () => {

    const [listAxios, setAxios] = useState(0); // useEffect axios의 값 존재 여부 저장
    let [post, setPost] = useState([]);
    let [pageNum, setPageNum] = useState(1);
    let [change, setChange] = useState(1);
    let [search, setSearch] = useState('');
    let [dateStart, setDateStart] = useState('');
    let [dateEnd, setDateEnd] = useState('')

    let pages = [];

    const Pagination = (page) =>{ 
        setPageNum(page)
        if(change == 1){ setChange(0) }else{ setChange(1) } } // useEffect 재실행을 위해 change값을 변경

    const PaginationNum = (e) =>{
        let pageNum = e.target.id
        Pagination(pageNum)
    }

    const PaginationArr = (e) =>{
        let pageArr = e.target.value
        Pagination(pageArr)
    }

    const Start = (e)=>{
        e.preventDefault()
        const dateStart = e.target.value;
        setDateStart(dateStart)
    }

    const End = (e)=>{
        e.preventDefault()
        const dateEnd = e.target.value;
        setDateEnd(dateEnd)
    }

    const searchSelect = (e)=>{
        e.preventDefault()
        const searchSelect = e.target.value;
        setSearch(searchSelect)
    }
    
    const Search = () =>{
        setPageNum(1)
        if(change==1){setChange(0)}else{setChange(1)} // useEffect 재실행을 위해 change값을 변경
    }

    const Reset = () =>{
        setSearch('')
        setDateStart('')
        setDateEnd('')
        let e1 = document.getElementById('startDate');
        let e2 = document.getElementById('endDate');
        let e3 = document.getElementById('report');
        e1.value = '';
        e2.value = '';
        e3.value = '전체';
        Search()
    }

    useEffect(async () => {
        const post = await axios.get("http://localhost:3001/admin/post?page=" + pageNum + "&report=" + search + "&date1=" + dateStart + "&date2=" + dateEnd)
        setPost(post.data)
        let paginationClass = document.querySelectorAll('.paginationClass');
        if(post.data.totalPage!==0){
            for(let i=0; i<paginationClass.length; i++){
                paginationClass[i].style.color = "#888";
            }
            let current = document.getElementById(pageNum);
                current.style.color = "#14c1c7";
        }
        if(post.data.result.length !== 0){ setAxios(1) } // axios의 값 존재 여부 저장
    }, [change]);

    for(let i = post.startPage; i <= post.endPage; i++) { pages[i] = i }

    return (
        <Form>
            <Header/>
            <SideBar/>
            <PostForm>
                <div className="postListBox">
                <p className="title">게시물관리</p>
                    <div className="postSearchBox">
                        <p>구분</p>
                        <select id="report" onChange={searchSelect}>
                            <option>전체</option>
                            <option value="Y">신고여부 : Y</option>
                            <option value="N">신고여부 : N</option>
                        </select>
                        <p>날짜</p>
                        <input type="date" className="postDate" id="startDate" onChange={Start}/>
                        <p>~</p>
                        <input type="date" className="postDate" id="endDate" onChange={End}/>
                        <input type="button" className="searchBtn btn" value="검색" onClick={Search}/>
                        <input type="button" className="resetBtn btn" value="초기화" onClick={Reset}/>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th className="postRegist">작성자</th>
                                <th className="postContent">게시물 내용</th>
                                <th className="postDateText">게시물 생성 날짜</th>
                                <th className="postDec">게시물 신고 여부</th>
                            </tr>
                            { listAxios !== 0 ?
                                post.result.length !== 0 ?
                                    post.result.map(rowData => (
                                        <tr>
                                            <td className="postRegist">{rowData.name}</td>
                                            <td className="postContent"><Link to={"/admin/post/detail/"+rowData.idx}>{rowData.content}</Link></td>
                                            <td className="postDateText">{rowData.createdAt}</td>
                                            <td className="postDec">{rowData.report}</td>
                                        </tr>
                                    )) : // rowData 가 없으면 나타냄
                                    <tr className="nonData"><td colSpan="4">검색결과가 존재하지 않습니다</td></tr>
                                : // post의 데이터가 없으면 나타냄
                                <tr className="nonData"><td colSpan="4">작성된 게시물이 없습니다</td></tr>
                            }
                        </table>
                    </div>
                    <div className="pagination">
                        <ul>
                        { post.startPage !== 1 ?
                            <>
                            <li onClick={PaginationArr} value="1">《</li>
                            <li onClick={PaginationArr} value={post.startPage-1}>〈</li>
                            </>
                            : <></> // startPage가 1이면 나타냄
                        }
                        { post.totalPage !== 0 ?
                            pages.map(rowData => (
                                post.startPage+5 > rowData ?
                                <li onClick={PaginationNum} class="paginationClass" id={rowData}>{rowData}</li>
                                : <></>
                            )) : <></> // pages가 없으면 나타냄
                        }
                        { post.endPage !== post.totalPage && post.endPage < post.totalPage ?
                            <>
                            <li onClick={PaginationArr} value={post.endPage+1}>〉</li>
                            <li onClick={PaginationArr} value={post.totalPage}>》</li>
                            </> : <></>
                        }
                        </ul>
                    </div>
                </div>
            </PostForm>
        </Form>
    );
}

export default PostPage;