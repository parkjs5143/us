import React, { useEffect, useState } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import '../../src/admin.css';
import { Link } from "react-router-dom";
import axios from "axios";

const QuestionForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    ul { list-style:none; display: flex; }
    ul li { padding: 0.6rem; font-size: 1.8rem; background-color: none; color: #888; cursor: pointer; font-weight: bold; }
    .form {
        background-color: white;
        margin: 13rem auto 10rem;
        width: 112rem;
        border-radius: 20px;
        padding: 1.5rem 4rem;
        box-shadow: 5px 5px 5px 5px rgb(210, 210, 210);
    }
    .title {
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #14c1c7;
    }
    .content-box {
        border-radius: 10px;
        padding-top: 2rem;
    }
    .content {
        margin: 0;
    }
    input[type="text"] {
        width: 30rem;
        height: 3rem;
        padding-left: 1rem;
        background-color: white;
        border: 2px solid #14c1c7;
        border-radius: 5px;
        box-shadow: 3px 3px 3px rgb(210,210,210);
        caret-color: #14c1c7;
    }
    input[type="text"]:focus { outline: none; border: 2px solid lightgray; }
    input[type="button"] {
        background-color: #14c1c7;
        border: 1px solid white;
        color: white;
        width: 7rem;
        height: 3.5rem;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 2px rgb(210,210,210);
        margin-left: 0.5rem;
        font-size: 1.3rem;
        cursor: pointer;
    }
    .search-box {
        display: flex;
        justify-content: space-between;
    }
    table {
        text-align: center;
        width: 100%;
        border-collapse: collapse;
        border: 2px solid #9b9b9b;
        font-size: 1.4rem;
    }
    table th, table td {
        border: 1px solid #9b9b9b;
        height: 3.8rem;
    }
    table th {
        background-color: rgb(248, 250, 252);
    }
    .fa-check-square {
        font-size: 1.8rem;
        color: #14c1c7;
    }
    .detail-link {
        color: black; 
    }
    .detail-link:hover {
        color: #14c1c7;
        font-weight: bolder;  
        font-size: 1.45rem; 
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    input[type="checkbox"]{ display: none; }
    input[type="checkbox"] + label {
        display: inline-block; 
        height: 2rem; 
        padding-left: 3.2rem; 
        background: url(/img/admin/checkbox.png) no-repeat 0 0; 
        background-size: 2.1rem;
        cursor: pointer; 
        vertical-align: middle; 
    }
    input[type="checkbox"]:checked + label {
        background: url(/img/admin/check.png) no-repeat 0 0;
        background-size: 1.7rem;
    }
    table tr td label { margin-left: 10px; }
    table tr th label { margin-left: 10px; }
    .nonData { height: 10rem; color: #999; font-size: 1.4rem;  }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
const QuestionPage = () => {

    // 체크박스 설정
    const checkAll = (e) =>{
        const checkbox = document.getElementsByName('question');
        if(e.target.checked === true){
            checkbox.forEach((check)=>{
                check.checked = true;
            })
        }else if(e.target.checked === false){
            checkbox.forEach((check)=>{
                check.checked = false;
            })
        }
    }
    function checkSelectAll() {
        const cbox = document.querySelectorAll('input[name="question"]');
        const checked = document.querySelectorAll('input[name="question"]:checked');
        const selectAll = document.querySelector('input[name="selectall"]');

        if(cbox.length === checked.length)  {
            selectAll.checked = true;
        }else {
            selectAll.checked = false;
        }
    }

    // axios 뿌리기
    const [listAxios, setAxios] = useState(0); // list-useEffect axios의 값 존재 여부 저장
    let [question, setQuestion] = useState([]);
    let [pageNum, setPageNum] = useState(1);
    let [change, setChange] = useState(1);
    let [search, setSearch] = useState('')
    let [searchNo, setSearchNo] = useState('')

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
        let e = document.querySelector('.writer');
        e.value = '';
        Search()
    }

    useEffect(async () => {
        const question = await axios.get("http://localhost:3001/admin/inquiry?page=" + pageNum + "&name=" + search)
        setQuestion(question.data)
        let paginationClass = document.querySelectorAll('.paginationClass');
        if(question.data.totalPage!==0){
            for(let i=0; i<paginationClass.length; i++) {
                if(paginationClass.length !== 0){
                    paginationClass[i].style.color = "#888";
                }
            }
            let current = document.getElementById(pageNum);
                current.style.color = "#14c1c7";
        }
        if(question.data.result.length !== 0){ setAxios(1) } // axios의 값 존재 여부 저장
    }, [change]);

    for(let i = question.startPage; i <= question.endPage; i++) { pages[i] = i }

    const Delete = async() =>{
        let delCheck = document.querySelectorAll('.delCheck');
        for(let i in delCheck){ delCheck[i].checked? await axios.get('http://localhost:3001/admin/inquiry/delete?idx='+delCheck[i].id.substring(15)):<></> }
        alert('삭제되었습니다')
        delCheck.forEach((check)=>{ check.checked = false; })
        if(change==1){setChange(0)}else{setChange(1)}
    }

    return (
        <Form>
            <Header/>
            <SideBar/>
            <QuestionForm>
                <div className="form">
                    <p className="title">문의사항</p>
                    <div className="content-box">
                        <p className="content">
                            <div className="search-box">
                                <p><input type="button" value="삭제" onClick={Delete}/></p>
                                <p>
                                    <input type="text" className="writer" placeholder="작성자를 검색하세요" onChange={searchInput}/>
                                    <input type="button" value="검색" onClick={Search}/>
                                    <input type="button" className="resetBtn btn" value="초기화" onClick={Reset}/>
                                </p>
                            </div>
                            <table align= "center">
                                <tr>
                                    <th width="7%"><input type="checkbox" id="question_check" name="selectall" onClick={checkAll}/><label for="question_check"></label></th>
                                    <th width="15%">작성자</th>
                                    <th width="14%">문의유형</th>
                                    <th width="45%">문의내용</th>
                                    <th width="19%">작성일</th>
                                </tr>
                                {  listAxios !== 0 ?
                                    question.result.length !== 0 ?
                                        question.result.map(rowData => (
                                            <tr>
                                                <td><input type="checkbox" id={"question_check_"+ rowData.idx} className="delCheck" name="question" onClick={checkSelectAll}/><label for={"question_check_"+ rowData.idx}></label></td>
                                                <td>{rowData.name}</td>
                                                <td>{rowData.type}</td>
                                                <td><Link to={"/admin/question/detail/" + rowData.idx} className="detail-link">{rowData.content}</Link></td>
                                                <td>{rowData.createdAt}</td>
                                            </tr>
                                        )) :// rowData 가 없으면 나타냄
                                            <tr className="nonData"><td colSpan="5">' {searchNo} ' 에 대한 검색결과가 존재하지 않습니다</td></tr>
                                    :   // member의 데이터가 없으면 나타냄
                                        <tr className="nonData"><td colSpan="5">작성된 문의사항이 없습니다</td></tr>
                                }
                            </table>
                        </p>
                        <div className="pagination">
                            <ul>
                            { question.startPage !== 1 ?
                                <>
                                <li onClick={PaginationArr} value="1">《</li>
                                <li onClick={PaginationArr} value={question.startPage-1}>〈</li>
                                </>
                                : <></> // startPage가 1이면 나타냄
                            }
                            { question.totalPage !== 0 ?
                                pages.map(rowData => (
                                    question.startPage+5 > rowData ?
                                    <li onClick={PaginationNum} class="paginationClass" id={rowData}>{rowData}</li>
                                    : <></>
                                )) : <></> // pages가 없으면 나타냄
                            }
                            { question.endPage !== question.totalPage && question.endPage < question.totalPage ?
                                <>
                                <li onClick={PaginationArr} value={question.endPage+1}>〉</li>
                                <li onClick={PaginationArr} value={question.totalPage}>》</li>
                                </> : <></>
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </QuestionForm>
        </Form>
    );
}

export default QuestionPage;