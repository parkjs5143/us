import React, { useEffect, useRef, useState } from "react";
import Header from "../UserComponents/header";
import ReplyLike from "../UserComponents/replyLike";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UploadForm = styled.div`
    button{cursor:pointer;}
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
    .upload_container{max-width: 100rem; border: 2px solid #a5a7c38a; height: 82rem; margin: 1rem auto;}
    .upload_header_box{display:flex; margin:2rem; position:relative; padding: 0 1rem; width:54rem;}
    .upload_profile_img{width: 5.5rem; height: 5.5rem; border-radius: 50%; border: 2px solid #0000009e;}
    .upload_profile_box{display:flex;}
    .upload_profile_id{font-size: 2.4rem; margin-left:1rem;}
    .upload_option_box{position:absolute; top: 1.8rem; right: 0.6rem;}
    .upload_option_img{cursor:pointer; width:3rem;}
    .images_list{margin: 2rem auto; width: 53rem; overflow:hidden; display:flex; position: relative;}
    .upload_mini_header{display:flex; margin:0 0 0 4rem; position:relative;}
    .mini_header_logo{width: 4rem;}
    .cats_img{width: 13rem; height: 3.7rem; position: absolute; top: 0.3rem; right: 4rem;}
    .wr_post_container{display: flex; margin:1rem auto; width:51rem; height: 7rem; border: 2px solid #00000045; font-size: 1.7rem; padding: 1rem; border-radius: 6px;}
    .return_main_btn{border-radius: 5px; background-color: #14c1c7; color: white; border: none; height: 4.5rem; cursor: pointer; width:15rem; font-size:1.7rem; box-shadow:3px 3px 3px #9b9b9b9e;}
    .return_main_btn_container{display: flex; justify-content: center; padding: 7rem;}
    .option_btn{border:none; background:none;}
    .option_pop_container{position:relative;}
    .option_pop_box{position:absolute; top: -3px; right: -82px;}
    .wr_post_area{padding-left:2rem; padding-top:0.7rem;}
    .wr_post_writer{font-weight:bold; padding-left:1rem; padding-top:0.5rem;}
    .up_replay_box{margin-top: 9rem; width: 38rem; height: 87%; border: 2px solid #00000045; border-radius: 5px; position:relative;}
    .left_right_container{display:flex;}
    .upload_time{font-size:1.5rem; margin-left:1rem; color:#555;}
    .reply_header{display:flex; position:relative;}
    .reply_img{width:3.5rem; height:3rem;}
    .reply_img_box{position:absolute; top:4.5rem; left:6.6rem;}
    .reply_title{position:absolute; top:1.3rem; left:0.7rem; font-size:2.8rem;}
    .up_img{width:53rem;}
    .img_pagnation{position: relative; display:flex;}
    .prev_box{position:absolute; top:45%; left:0;}
    .next_box{position:absolute; top:45%; right:0;}
    .reply1_box{display:flex; margin: 2rem 1rem 1rem 1rem;}
    .re_profile_img{width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #00000054;}
    .re_reply{font-size: 1.4rem; margin:0.5rem; }
    .re_time{font-size: 0.7rem; margin-left:1.5rem; color: gray;}
    .reply2_box{display:flex; margin: 1rem 1rem 1rem 6.5rem;}
    .reply3_box{display:flex; margin: 1rem 1rem 1rem 12rem;}
    .input_reply_box{display:flex;}
    .re_btn{background:none; color:#14c1c7; border:none; height:3.9rem; width:4.4rem; font-weight:600;font-size:1.5rem; line-height: 4.7rem; cursor:pointer;}
    .input_reply_container{margin-top: 32rem; position: absolute; bottom:1rem;}
    .like_img{width:2rem; height:2rem; cursor:pointer;}
    .in_input{outline: none; width:30rem; height:2.5rem; border: 1px solid #808080b0; resize:none; border-radius:15px; line-height: 2.5rem; font-size: 1.3rem; padding: 0.5rem 1rem; font-family: 'Nanum Gothic', sans-serif;}
    .re_time_reply_box{display:flex;}
    .reply_btn{border:none; background:none; color:gray; font-size:0.5rem; cursor:pointer; margin:0; line-height:0.1rem; font-weight:600;}
    .re_delete_btn{background: none; border: none;}
    .like_delete_box{display:flex;}
    .re_delete_box{display:flex;}
    .re_delete_btn{padding:0; cursor:pointer;}
    .re_delete{font-size: 0.5rem; color: gray; line-height: 0rem; margin: 0; font-weight:600;}
    .in_input_box{margin:0.5rem;}
    .like_box{display:flex; margin-left: auto;}
    .like_btn{ background:none; border:none; }
    .re_id_box{display:flex;}
    .re_id_div{margin:1rem 0 0 0.5rem;}
    .re_id_span{font-size: 1.5rem; font-weight: 600; line-height: 1rem;}
`;

const EditPopWrap = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Courgette&family=Noto+Sans+KR:wght@300&display=swap');
z-index: 100;
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,0.3);
textarea {
    border: 1px solid lightgray;
    background-color: #fff;
    border-radius: 3px;
    width: 98%;
    height: 15rem;
    color: #222;
    font-size: 1.7rem;
    padding-left: 1rem;
    padding-top: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    resize: none;
}
textarea:focus { outline:none; }
.popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 55rem; height: auto; }
.popHeader { padding: 4rem 5rem 3rem; text-align: center; }
.closeIcon { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; }
.title { font-size: 2rem; font-weight: 700; }
.popContent{ padding: 0 3rem; }
button { border: 0;
    outline: none;
    appearance: none;
    cursor:pointer;
    vertical-align: center;
    padding: 1rem 1.8rem;
    font-size: 1.6rem;
    border-radius: 12px;
    background-color: #14c1c7;
    color: #fff;
}
button:nth-child(2) { margin-left: 1rem; }
.btnWrap { text-align: center;  padding: 2rem 0; }
// 게시물 업로드 팝업1(업로드할 이미지) css
.post1_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
.post1_pop_box{ position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white;border:none; width: 60rem; height: 56rem; border-radius: 15px; padding: 1rem; }
.post1_pop_sec1{ display:flex; justify-content: space-between; margin-top:1rem; }
.pop3_close_btn{ background:none; border:none; }
.ch_upload_img{ font-size:2.3rem; margin: 0 0 0 20rem; font-weight:600; }
.post1_pop_sec2_box { margin-top:3rem; }
#files { display:none; }
.prev_img { background-color: #efefef; width:14rem; height:14rem; margin:1rem; }
.prev_img img { width: 100%; height: 100%; }
.prev_img_be { background-color: #efefef; width:14rem; height:14rem; margin:1rem; }
.prev_upload { display:flex; flex-wrap:wrap; min-height:15rem; }
.prev_upload_be { display:flex; flex-wrap:wrap; min-height:15rem; }
#upload { cursor:pointer; }
#upload p { display: inline-block; margin-left: .5rem; position: relative; top: -.5rem; }
#upload img { margin-left: 1rem; }
.file_aa { display:flex; align-items: center; margin: 1rem 0 0 0; }
.prev_upload_box { border: 1px solid lightgray; }
.upload_txt_box { margin: 0.8rem 1rem; }
.upload_img_ch { border:none; background-color:#3bf1f1; color:white; width:9rem; height:3.5rem; cursor:pointer; border-radius:5px; cursor:pointer;}
.post1_pop_sec3 { margin-top:1.3rem; }
.post1_pop_sec3_box { display: flex; justify-content: center; }
.img_del { background:none; border:none; position:absolute; top: 1.2rem; right: 1.5rem; font-size: 2rem;}
.prev_upload span { position:relative; }
.fa-times-circle { color:#3bf1f1; }
`;

const DelPopWrap = styled.div`
    z-index: 100; 
    position: fixed; 
    left: 0; 
    top: 0; 
    width: 100%; 
    height: 100%; 
    background: rgba(0,0,0,0.3);
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 55rem; height: auto; }
    .popHeader { padding: 4rem 5rem 3rem; text-align: center; }
    .title { font-size: 2rem; font-weight: 700; }
    .popContent{ padding: 0 3rem; }
    .textWrap { font-size: 2rem; text-align: center; padding-bottom: 2rem; }
    button { border: 0; outline: none; appearance: none; cursor:pointer; vertical-align: center; padding: 1rem 1.8rem; font-size: 1.6rem; border-radius: 12px; background-color: #14c1c7; color: #fff; }
    button:nth-child(2) { margin-left: 1rem; }
    .btnWrap { text-align: center; padding: 3rem 0; }
`;

//게시물 수정/삭제 팝업 css
const PostEditDelete = styled.div`
    .option_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5)}
    .option_pop_box{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white;border:none; width: 15rem; height: 15rem; border-radius: 15px; padding: 1rem;}
    .edit_delete_close_btn{background:none; border:none;}
    .edit_delete_close{display: flex; justify-content: right;}
    .btn_container{display:flex; position: relative;}
    .edit_btn{width:7rem;height: 3.5rem; background: black;border-radius: 5px;border: 1px solid black;font-size: 1.5rem;font-weight:600; color: white;}
    .delete_btn{width:7rem;height: 3.5rem;background: black;border-radius: 5px;border: 1px solid black;font-size: 1.5rem;font-weight:600; color: white;}
    .edit_btn_box{position:absolute; top: 2.7rem; left: 0.1rem;}
    .delete_btn_box{position:absolute; top: 2.7rem;right: 0.1rem;}
`
let img = 0;

// 몇일전, 분, 시간, 일, 년 까지 구하는 함수
function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 31) {
        return `${betweenTimeDay}일전`;
    }

    const betweenTimeMonth = Math.floor(betweenTime / 60 / 24 / 30);
    if (betweenTimeDay < 365){
        return `${betweenTimeMonth}달 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

const UploadPage = () => {
    const param = window.location.search.split('=')[1]  // memberIdx

    const {idx} = useParams();  // postIdx
    const [memEmail, setMemEmail] = useState('');
    const [memImg, setMemImg] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postTime, setPostTime] = useState('');
    const [postMemIdx, setPostMemIdx] = useState('');
    const [postImgArr, setPostImgArr] = useState([]);
    const [replyArr, setReplyArr] = useState([]);

    let [detailImg, setDetailImg] = useState(0) // scrollImg-useEffect 재실행을 위한 값 변경 저장
    let [scrollImg, setScrollImg ] = useState(''); // imgName 저장

    // 대댓글 댓글idx, 그룹idx
    const [reReIdx, setReReIdx] = useState(null);
    const [reReGroupIdx, setReReGroupIdx] = useState(null);
    const [reReName, setReReName] = useState(null);

    // 내용 업데이트 상태
    const [isUpdate, setIsUpdate] = useState(false);

    // 댓글 입력 textarea
    const replyValue = useRef();

    // 게시물 수정 textarea
    const editContent = useRef();
    // 게시물 수정 파일저장
    const [imgFile, setImgFile] = useState(null);

    useEffect(async () => {
        const list = await axios.get("http://localhost:3001/post/detail?postIdx="+idx);
        console.log(list);

        setMemEmail(list.data[0][0].email.split('@')[0]);
        setMemImg(list.data[0][0].img);
        setPostContent(list.data[0][0].content);
        setPostMemIdx(list.data[0][0].memberIdx);
        setPostTime(timeForToday(list.data[0][0].createdAt));
        setPostImgArr(list.data[1]);
        setReplyArr(list.data[2]);

        // scrollImg-useEffect 재실행을 위해 detailImg 값 변경
        if(detailImg===0){
            setDetailImg(1)
        }else{
            setDetailImg(0)
        }
    }, [isUpdate]);

    useEffect(async () => { // scrollImg-useEffect
        if(postImgArr.length!==0){
            setScrollImg(postImgArr[0].imgName)
        }
    }, [detailImg]);

    // 이미지 swipe 버튼
    const next = () => {
        img = postImgArr.length-1 === img ? img : img+1;
        setScrollImg(postImgArr[img].imgName)
    }
    const prev = () => {
        img = img === 0 ? 0 : img-1;
        setScrollImg(postImgArr[img].imgName)
    }

    //게시물 수정/삭제 팝업열기
    const[PostOptionOn, setPostOptionOn] = React.useState(false);
    const OpenPostOption = () =>{
        setPostOptionOn(!PostOptionOn);
        if(PostOptionOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    // 게시물 수정 팝업열기
    const[postEditOn, setPostEditOn] = React.useState(false);
    const openEditOn = () =>{
        setPostEditOn(!postEditOn);
        setPostOptionOn(!PostOptionOn);
        if(postEditOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    //게시물 삭제 팝업열기
    const[PostDelOn, setPostDelOn] = React.useState(false);
    const openPostDel = () =>{
        setPostDelOn(!PostDelOn);
        setPostOptionOn(false);
        if(PostDelOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    // 게시물 수정 실행
    const editSubmit = async () => {
        const content = editContent.current.value;
        console.log(content);
        console.log(imgFile);
        let formData = new FormData();
        
        if(imgFile!==null){   // 수정할 사진을 등록했을 경우
            for (const key of Object.keys(imgFile)) {
                formData.append('fileupload', imgFile[key]);
            }
        }
            formData.append('idx', idx);
            formData.append('content', content);
            formData.append('hashTag', '');
    
            return await axios.post(`http://localhost:3001/post/edit`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((res)=>{
                alert('게시물이 등록되었습니다.');
                console.log(res);
                window.location.href = '/detail/'+idx+'?idx=' + param;
            });
    }

    // 게시물 삭제하기 실행
    const delSubmit = async () => {
        await axios.get('http://localhost:3001/post/delete?idx='+idx)
        .then(function (response) {
            console.log(response);
            alert('삭제되었습니다.');
            setIsUpdate(true);
        })
        .catch(function (error) {
            alert('삭제실패했습니다..');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 댓글 등록 실행
    const submitReply = async () =>{
        const content = replyValue.current.value;
        await axios({
            method: "post",
            url:`http://localhost:3001/reply/insert_reply`,
            data: {
                idx: reReIdx,
                groupIdx: reReGroupIdx,
                postIdx: idx,
                content: content,
                memberIdx: param,
                parentIdx: reReIdx
            }
        }).then(function (response) {
            console.log(response);
            alert('등록되었습니다.');
            window.location.href=`/detail/${idx}?idx=${param}`;
        })
        .catch(function (error) {
            alert('등록실패했습니다.');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 댓글 삭제 실행
    const delReply = (replyIdx)=>{
        axios.get('http://localhost:3001/reply/delete_reply?idx='+replyIdx)
        .then(function (response) {
            console.log(response);
            alert('삭제되었습니다.');
            setIsUpdate(true);
        })
        .catch(function (error) {
            alert('삭제 실패했습니다.');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 게시물 수정/삭제 팝업 DOM
    const PostOption = () =>{
        return(
            <PostEditDelete>
                <div className="option_pop_container">
                    <div className="option_pop_box">
                        <div>
                            <div className="edit_delete_close">
                                <button className="edit_delete_close_btn" type="button" onClick={OpenPostOption}><img src="/img/clear_black.png" alt="close"/></button>
                            </div>
                            <div className="btn_container">
                                <div className="edit_btn_box">
                                    <button type="button" className="edit_btn" onClick={openEditOn}>수정</button>
                                </div>
                                <div className="delete_btn_box">
                                    <button type="button" className="delete_btn" onClick={openPostDel}>삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PostEditDelete>
        );
    }

    // 게시물 수정 팝업 DOM
    const EditPop = ()=>{
        return (
            <EditPopWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title">게시글 수정</div>
                        <img className="closeIcon" src="/img/clear_black.png" alt="엑스버튼" onClick={openEditOn}/>
                    </div>
                    <div className="popContent">
                        <div className="textWrap">
                            <textarea name="content" id="content" ref={editContent}>{postContent}</textarea>
                        </div>
                        <div className="post1_pop_sec2">
                            <div className="filebox">
                                <div className="file_aa">
                                    <div className="file_label">
                                        <label id="upload" htmlFor="files">
                                            <p>여기를 눌러 수정 사진을 넣으세요.</p>
                                            <img src="/img/add_photo.png" alt="추가"/>
                                        </label>
                                    </div>
                                </div>
                                <input type="file" id="files" multiple accept="image/png" onChange={handleFileSelect}/>
                            </div>
                            <div className="prev_upload_box">
                                <div className="prev_upload">
                                    {postImgArr.map((data)=>{
                                        return(
                                            <span>
                                                <div className="prev_img">
                                                    <img src={'/uploads/'+data.imgName} alt="게시물사진"/>
                                                    <br/><div className="img_del"><i className="fas fa-times-circle"></i></div>
                                                </div>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={editSubmit}>수정</button>
                        <button onClick={openEditOn}>취소</button>
                    </div>
                </div>
            </EditPopWrap>
        )
    }

     // 게시물 삭제 팝업 DOM
    const DelPop = ()=>{
        return (
            <DelPopWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title"><img src="img/us_logo.png" alt="로고" /></div>
                    </div>
                    <div className="popContent">
                        <div className="textWrap">{}</div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={delSubmit}>네, 삭제할래요</button>
                        <button onClick={openPostDel}>아니요</button>
                    </div>
                </div>
            </DelPopWrap>
        )
    }

    // 전체 DOM
    return (
        <>
        <Header idx={param}/>
        <UploadForm>
            {postEditOn ? <EditPop/> : ""}
            {PostDelOn ? <DelPop/> : ""}
            <div className="upload_container">
                <div className="left_right_container">
                    <div className="upload_left_box">
                        <div className="upload_header_box">
                            <div className="upload_profile_box">
                                <div className="upload_profile">
                                    <img className="upload_profile_img" src={memImg!==null?'/'+memImg:'/img/blank_profile.png'} alt="게시물 프로필"/>
                                </div>
                                <div className="up_pro_time_container">
                                    <div className="upload_profile_id">
                                        <span>{memEmail}</span>
                                    </div>
                                    <div className="upload_time">
                                        <span>{postTime}</span>
                                    </div>
                                </div>
                            </div>
                            {postMemIdx==param ?
                                <div className="upload_option_box">
                                    <button className="option_btn" onClick={OpenPostOption}>
                                        <img className="upload_option_img" src="/img/more_vert_black.png" alt="게시물 메뉴"/>
                                    </button>
                                    {PostOptionOn?<PostOption/>:''}
                                </div>
                            :
                            ''}
                        </div>
                        <div className="post_images_box">
                            <div className="images_list">
                                <img className="up_img" src={"/uploads/"+scrollImg} alt="게시물 사진"/>
                                <div className="prev_box">
                                    <img className="prev_arr" style={img===0?{opacity: '0'}:{opacity: '1'}} onClick={prev} src="/img/arr-left-circle.svg" alt="이전"/>
                                </div>
                                <div className="next_box">
                                    <img className="prev_arr" style={img===postImgArr.length-1?{opacity: '0'}:{opacity: '1'}} onClick={next}src="/img/arr-right-circle.svg" alt="다음"/>
                                </div>
                            </div>
                            <div className="img_pagnation">
                                
                            </div>
                        </div>
                        <div className="upload_mini_header">
                            <div className="mini_header_logo">
                                <Link to="/main">
                                    <img className="mini_header_logo" src="/img/us_logo.png" alt="댓글부분 로고"/>
                                </Link>
                            </div>
                        </div>
                        <div className="wr_post_container">
                            <div className="wr_post_writer">{memEmail}</div>
                            <div className="wr_post_area">{postContent}</div>
                        </div>
                    </div>
                    <div className="upload_right_box">
                        <div className="reply_header">
                            <div className="reply_title">
                                <p>댓글</p>
                            </div>
                            <div className="reply_img_box">
                                <img className="reply_img" src="/img/bubble_chat.png" alt="댓글"/>
                            </div>
                        </div>
                        <div className="up_replay_box">
                            <div className="up_reply_minibox">
                                {/* 댓글시작 */}
                                {
                                    replyArr.length !== 0 ?
                                        replyArr.map((data) => {
                                            if(data.depth===0){
                                                return (
                                                    <div className="reply1_box">
                                                        <div className="re_profile">
                                                            <img className="re_profile_img" src={data.img!==null?"/"+data.img:'/img/blank_profile.png'} alt="댓글 프로필"/>
                                                        </div>
                                                        <div className="re_reply_box">
                                                            <div className="re_id_box">
                                                                <div className="re_id_div">
                                                                    <span className="re_id_span">{data.email.split('@')[0]}</span>
                                                                </div>
                                                                <div className="re_reply">
                                                                    <span className="reply">{data.content}</span>
                                                                </div>
                                                            </div>
                                                            <div className="re_time_reply_box">
                                                                <div className="re_time">
                                                                    <span>{timeForToday(data.createdAt)}</span>
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="reply_btn" onClick={()=>{setReReIdx(data.idx); setReReGroupIdx(data.groupIdx); setReReName(data.email.split('@')[0]);}}>댓글달기</button>
                                                                </div>
                                                                {
                                                                    param == data.memberIdx ? 
                                                                    <div className="re_delete_box">
                                                                        <button className="re_delete_btn" type="button" onClick={()=>{delReply(data.idx)}}>
                                                                            <p className="re_delete">삭제</p>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    ""
                                                                }
                                                            </div>
                                                        </div>
                                                        <ReplyLike className="like_box" replyIdx={data.idx} memberIdx={param}/>
                                                    </div>
                                                )
                                            } else if(data.depth===1) {
                                                return (
                                                    <div className="reply2_box">
                                                        <div className="re_profile">
                                                            <img className="re_profile_img" src={data.img!==null?"/"+data.img:'/img/blank_profile.png'} alt="댓글 프로필"/>
                                                        </div>
                                                        <div className="re_reply_box">
                                                            <div className="re_id_box">
                                                                <div className="re_id_div">
                                                                    <span className="re_id_span">{data.email.split('@')[0]}</span>
                                                                </div>
                                                                <div className="re_reply">
                                                                    <span className="reply">{data.content}</span>
                                                                </div>
                                                            </div>
                                                            <div className="re_time_reply_box">
                                                                <div className="re_time">
                                                                    <span>{timeForToday(data.createdAt)}</span>
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="reply_btn" onClick={()=>{setReReIdx(data.idx); setReReGroupIdx(data.groupIdx); setReReName(data.email.split('@')[0]);}}>댓글달기</button>
                                                                </div>
                                                                {
                                                                    param == data.memberIdx ? 
                                                                    <div className="re_delete_box">
                                                                        <button className="re_delete_btn" type="button" onClick={()=>{delReply(data.idx)}}>
                                                                            <p className="re_delete">삭제</p>
                                                                        </button>
                                                                    </div>
                                                                    : ""
                                                                }
                                                            </div>
                                                        </div>
                                                        <ReplyLike className="like_box" replyIdx={data.idx} memberIdx={param}/>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="reply3_box">
                                                        <div className="re_profile">
                                                            <img className="re_profile_img" src={data.img!==null?"/"+data.img:'/img/blank_profile.png'} alt="댓글 프로필"/>
                                                        </div>
                                                        <div className="re_reply_box">
                                                            <div className="re_id_box">
                                                                <div className="re_id_div">
                                                                    <span className="re_id_span">{data.email.split('@')[0]}</span>
                                                                </div>
                                                                <div className="re_reply">
                                                                    <span className="reply">{data.content}</span>
                                                                </div>
                                                            </div>
                                                            <div className="re_time_reply_box">
                                                                <div className="re_time">
                                                                    <span>{timeForToday(data.createdAt)}</span>
                                                                </div>
                                                                <div>
                                                                    <button type="button" className="reply_btn" onClick={()=>{setReReIdx(data.idx); setReReGroupIdx(data.groupIdx); setReReName(data.email.split('@')[0]);}}>댓글달기</button>
                                                                </div>
                                                                {
                                                                    param == data.memberIdx ? 
                                                                    <div className="re_delete_box">
                                                                        <button className="re_delete_btn" type="button" onClick={()=>{delReply(data.idx)}}>
                                                                            <p className="re_delete">삭제</p>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    ""
                                                                }
                                                            </div>
                                                        </div>
                                                        <ReplyLike className="like_box" replyIdx={data.idx} memberIdx={param}/>
                                                    </div>
                                                )
                                            }
                                        })
                                    :
                                    <div style={{lineHeight: "20rem", textAlign: "center", fontSize: "1.3rem", color: "rgba(0,0,0,.8)"}}>등록된 댓글이 없습니다. 댓글을 등록해보세요.</div>
                                }
                                {/* 댓글끝 */}
                            </div>
                            <div className="input_reply_container">
                                {reReIdx!==null?
                                <div className="reply_to_wrap">
                                    <div className="reply_to_box" style={{display:'inline-block', backgroundColor:'#14c1c7', borderRadius:'3rem',color:'#fff', marginLeft:'1rem', padding:'.3rem .5rem'}}>
                                        <span className="reply_to_val">{reReName}</span>
                                        <span className="reply_to_del" style={{marginLeft:'.5rem', cursor:'pointer'}} onClick={()=>{setReReIdx(null); setReReGroupIdx(null); setReReName(null)}}>X</span>
                                    </div>
                                </div>
                                :
                                ''
                                }
                                <div className="input_reply_box">
                                    <div className="in_input_box">
                                        <textarea className="in_input" placeholder="댓글 달기.." ref={replyValue}/>
                                    </div>
                                    <div className="re_btn_box">
                                        <button type="submit" className="re_btn" onClick={submitReply}>게시</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="return_main_btn_container">
                    <Link to="/main">
                    <button type="button" className="return_main_btn">메인으로 가기</button>
                    </Link>
                </div>
            </div>
        </UploadForm>
        </>
    );

    //이미지 업로드 js 
    function handleFileSelect(evt) {
        setImgFile(evt.target.files);
        let fileSize = document.querySelectorAll(".prev_img");
        var files = evt.target.files;
        // document.querySelector('.prev_upload').removeChild('span');
        if(fileSize.length + files.length < 7){
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            '<div class="prev_img" style="display: block;"><img style="width:100%; height:100%;" src="',
                            e.target.result,
                            '" title="', escape(theFile.name),
                            '" alt="게시물 사진"/><br><div class="img_del"><i class="fas fa-times-circle"></i></div></div>'
                        ].join('');
                    document.querySelector('.prev_upload').insertBefore(span,null);
                    const muti_img_list = document.querySelectorAll(".img_del");
                    for (let i = 0; i < muti_img_list.length; i++) {
                        muti_img_list[i].addEventListener('click', function () {
                            this.parentNode.remove();
                            console.log(i);
                        });
                    }
                };
            })(f);
            reader.readAsDataURL(f);
        }}else{ alert("사진은 6개까지 첨부 가능합니다");}
    }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

export default UploadPage;