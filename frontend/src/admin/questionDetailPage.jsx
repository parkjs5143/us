import React, { useEffect, useState } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import '../../src/admin.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import qs from 'qs';

const QuestionDetailForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .form { background-color: white; margin: 13rem auto 10rem; width: 112rem; min-height: 55rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .content-box { height: 37rem; border-radius: 10px; padding-top: 2rem; }
    .content { font-size: 1.4rem; text-align: left; width: 75rem; margin: 0 auto; border-bottom: 2px solid rgb(215, 215, 215); box-shadow: 3px 3px 3px 4px rgb(240, 240, 240); padding: 1.3rem 3rem; }
    .content table th { width: 17rem; padding: 1.2rem 0; }
    .content table td { width: 41rem; }
    .content table td span { color: #14c1c7; font-weight: bold; }
    .answer { width: 78rem; margin: 0 auto; }
    .answer-title { font-size: 1.4rem; font-weight: bold; color: #888; margin-top: 2rem; padding: 1rem; box-shadow: 2px 2px 2px 2px rgb(248, 250, 252); border-radius: 5px; }
    .answer-content { background-color: rgb(248, 250, 252); height: 15rem; width: 100%; border: 2px solid #14c1c7; border-radius: 5px; padding: 1rem; font-size: 1.5rem; box-shadow: 2px 2px 2px 2px rgb(210,210,210); resize: none; overflow-y: scroll; }
    .answer-content:focus { outline: none; caret-color: #14c1c7; }
    input[type="button"] { background-color: #14c1c7; border: 1px solid white; color: white; width: 9rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210);  margin-left: 2rem; font-size: 1.3rem; cursor: pointer; }
    .button-box { text-align: center; margin-top: 3rem; }
    .nonData { margin-left: 4rem; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
const QuestionDetailPage = () => {

    let [detail, setDetail] = useState({qnaInfo:[0], qnaDec:[0]});
    let [message, setMessage] = useState(null);

    const idx = useParams();

    useEffect(async () => {
        const questionDetail = await axios.get("http://localhost:3001/admin/inquiry/detail?idx=" + idx.idx)
        setDetail({qnaInfo:questionDetail.data[0][0], qnaDec:questionDetail.data[1]})
        setMessage(questionDetail.data[0][0].message)
        console.log(questionDetail)
    }, []);

    const content = (e) =>{
        let msg = e.target.value
        setMessage(msg)
    }

    const Repeat = () => {
        axios.put("http://localhost:3001/admin/inquiry/repeat?idx=" + idx.idx + "&message=" + message)
        if(message===''){alert('답변을 지웠습니다')}else{alert('답변이 등록되었습니다')}
    }

    console.log(detail.qnaInfo.message)
    return (
        <Form>
            <Header/>
            <SideBar/>
            <QuestionDetailForm>
                <div className="form">
                    <p className="title">문의사항 <i class="fas fa-chevron-right"></i> 문의 상세</p>
                    <div className="content-box">
                        <div className="content">
                            <table>
                                <tr>
                                    <th>작성자</th>
                                    <td>{detail.qnaInfo.name}</td>
                                    <th>작성일자</th>
                                    <td>{detail.qnaInfo.createdAt}</td>
                                </tr>
                                <tr>
                                    <th>문의유형</th>
                                    <td>{detail.qnaInfo.type}</td>
                                    <th>신고대상자</th>
                                    {detail.qnaInfo.type === "신고문의" ?
                                        <td>{detail.qnaDec.name} [<span> {detail.qnaDec.email} </span>]</td> : <td>-</td> }
                                </tr>
                                <tr>
                                    <th>문의내용</th>
                                    <td colSpan="3">{detail.qnaInfo.content}</td>
                                </tr>
                            </table>
                        </div>
                        {detail.qnaInfo.message === null ?
                            <div className="answer">
                                <p className="answer-title">답변 등록하기</p>
                                <textarea className="answer-content" onChange={content} value={message}></textarea>
                            </div>
                            :
                            <div className="answer">
                                <p className="answer-title">답변 수정하기</p>
                                <textarea className="answer-content" onChange={content} value={message}>{detail.qnaInfo.message}</textarea>
                            </div>
                        }
                        {detail.qnaInfo.message === null ?
                            <p className="button-box">
                                <Link to="/admin/question"><input type="button" value="뒤로가기"/></Link>
                                <input type="button" value="등록" onClick={Repeat}/>
                            </p>
                        :
                            <p className="button-box">
                                <Link to="/admin/question"><input type="button" value="뒤로가기"/></Link>
                                <input type="button" value="수정" onClick={Repeat}/>
                            </p>
                        }
                    </div>
                </div>
            </QuestionDetailForm>
        </Form>
    );
}

export default QuestionDetailPage;