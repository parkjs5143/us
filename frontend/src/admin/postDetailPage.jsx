import React, { useEffect, useState } from "react";
import Header from "../AdminComponents/header";
import SideBar from "../AdminComponents/sidebar";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../../src/admin.css';

const PostForm = styled.div`
    overflow-x: hidden;
    margin-left: 24rem;
    .title { border-radius: 10px; font-size: 1.5rem; font-weight: bold; color: #14c1c7; }
    .postListBox{ background-color: white; margin: 13rem auto 10rem; width: 112rem; border-radius: 20px; padding: 1.5rem 4rem; box-shadow: 5px 5px 5px 5px rgb(210, 210, 210); }
    .postDetailBox{ display: flex; font-size:1.5rem; margin-top: 2rem; width: 100%; justify-content: space-between; }
    .registDate{ display:flex; align-items: end; }
    .registText{ margin: 0 }
    .registMember{ margin-top: 0.5rem }
    .textBold{ font-weight: bold; }
    hr{ margin-top: 0; margin-bottom: 1rem; }
    .postDetailInfoBox{ width:100%; display:flex; justify-content: space-between; }
    .postImgBox{ width: calc(49.7% - 2px); border:1px solid #979797; height: 50rem; }
    .postImg{ width:100%; height:100%; }
    .postImgBtn{ display:flex; justify-content: space-between; position: relative; bottom: 30rem; } 
    .postBox{ width: calc(49.7% - 2px); height: 50rem; }
    .postTextBox{ height: calc(49.7% - 2px); border:1px solid #979797; overflow-y: scroll; }
    .firstBox{ margin-bottom: 0.9% }
    .postDetail_text, .postDetail_re{ padding: 1rem; overflow-wrap: anywhere; font-size: 1.4rem; }
    .postDetail_re p { margin:0.5rem 0; }
    .postDetail_re p span{ margin-left: 1.5rem; font-size: 1rem; font-weight: bolder; }
    input[type="button"] { background-color: #14c1c7; border: 1px solid white; color: white; width: 9rem; height: 3.5rem; border-radius: 5px; box-shadow: 2px 2px 2px 2px rgb(210,210,210);  margin-left: 2rem; font-size: 1.3rem; cursor: pointer; }
    .button-box { text-align: center; margin-top: 3rem; }
    .reply { padding-bottom: 1rem; padding-left: 1rem;  }
    .nonReply { font-weight: bold; color: #777; }
`;
const Form = styled.div` background-color: rgb(248, 250, 252); height: 100%; position: fixed; width: 100%; overflow-y: auto;`;
let img = 0;

const PostDetailPage = () => {
    const id = useParams();  // 넘겨받은 id값

    const [detail, setDetail] = useState({postInfo:[0], postImg:[0], postReply:[0]});
    let [detailImg, setDetailImg] = useState(0) // scrollImg-useEffect 재실행을 위한 값 변경 저장
    let [scrollImg, setScrollImg ] = useState(''); // imgName 저장
    

    useEffect(async () => {
        const postDetail = await axios.get("http://localhost:3001/admin/post/detail?postIdx=" + id.idx)
        setDetail({postInfo:postDetail.data[0][0], postImg:postDetail.data[1], postReply:postDetail.data[2]})
        if(detailImg===0){setDetailImg(1)}else{setDetailImg(0)} // scrollImg-useEffect 재실행을 위해 detailImg 값 변경
    }, []);

    useEffect(async () => { // scrollImg-useEffect
        if(detail.postImg.length!==0){setScrollImg(detail.postImg[0].imgName)}
    }, [detailImg]);

    // 이미지 버튼
    const next = () => {
        img = detail.postImg.length-1 === img ? img : img+1;
        setScrollImg(detail.postImg[img].imgName)
    }
    const prev = () => {
        img = img === 0 ? 0 : img-1;
        setScrollImg(detail.postImg[img].imgName)
    }

    return (
        <Form>
            <Header/>
            <SideBar/>
            <PostForm>
                <div className="postListBox">
                <p className="title">게시물관리 <i class="fas fa-chevron-right"></i> 상세페이지</p>
                    {
                        <div className="postDetailBox">
                            <div className="registInfo">
                                <p className="registText textBold">작성자</p>
                                <p className="registMember">{detail.postInfo.name} / {detail.postInfo.email}</p>
                            </div>
                            <div className="registDate">
                                <p><span className="textBold">게시날짜 | </span> {detail.postInfo.createdAt}</p>
                            </div>
                        </div>
                    }
                    <hr/>
                    <div className="postDetailInfoBox">
                        <div className="postImgBox">
                            <img className="postImg" src={"/uploads/"+scrollImg}/>
                            <div className="postImgBtn"><img style={img===0?{opacity: '0'}:{opacity: '1'}} onClick={prev} src="/img/admin/insta-left-circle.svg"/><img style={img===detail.postImg.length-1?{opacity: '0'}:{opacity: '1'}} onClick={next} src="/img/admin/insta-right-circle.svg"/></div>
                            <div></div>
                        </div>
                        <div className="postBox">
                            <div className="postTextBox firstBox">
                                {
                                    <div className="postDetail_text">
                                        {detail.postInfo.content}
                                    </div>
                                }
                            </div>
                            <div className="postTextBox">
                                <div className="postDetail_re">
                                    {
                                        detail.postReply.length !== 0 ?
                                            detail.postReply.map(rowData => (
                                                <p className="reply">{rowData.content} <span>{rowData.createdAt}</span></p>
                                        )):
                                            <p className="reply nonReply">등록된 댓글이 없습니다</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="button-box">
                        <Link to="/admin/post"><input type="button" value="목록으로"/></Link>
                    </p>
                </div>
            </PostForm>
        </Form>
    );
}

export default PostDetailPage;