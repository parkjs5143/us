import React from "react";
import Header from "../components/header";
import styled from "styled-components";
import { Link } from "react-router-dom";


const UploadForm = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
    .upload_container{max-width: 100rem; border: 2px solid #a5a7c38a; height: 82rem; margin: 1rem auto;}
    .upload_header_box{display:flex; margin:2rem; position:relative; padding: 0 1rem; width:54rem;}
    .upload_profile_img{width: 5.5rem; height: 5.5rem; border-radius: 50%; border: 2px solid #0000009e;}
    .upload_profile_box{display:flex;}
    .upload_profile_id{font-size: 2.4rem; margin-left:1rem;}
    .upload_option_box{position:absolute; top: 1.8rem; right: 0.6rem;}
    .upload_option_img{cursor:pointer; width:3rem;}
    .images_list{margin: 2rem auto; width: 53rem; height: 39rem; overflow:hidden; display:flex;}
    .upload_mini_header{display:flex; margin:0 0 0 4rem; position:relative;}
    .mini_header_logo{width: 4rem; height: 3rem;}
    .cats_img{width: 13rem; height: 3.7rem; position: absolute; top: 0.3rem; right: 4rem;}
    .wr_post_container{display: flex; margin:1rem auto; width:51rem; height: 13rem; border: 2px solid #00000045; font-size: 1.7rem; padding: 1rem; border-radius: 6px;}
    .return_main_btn{border-radius: 5px; background-color: #14c1c7; color: white; border: none; height: 4.5rem; cursor: pointer; width:15rem; font-size:1.7rem; box-shadow:3px 3px 3px #9b9b9b9e;}
    .return_main_btn_container{display: flex; justify-content: center; margin-top: 3.5rem;}
    .option_btn{border:none; background:none;}
    .option_pop_container{position:relative;}
    .option_pop_box{position:absolute; top: -3px; right: -82px;}
    .wr_post_area{padding-left:2rem; padding-top:0.7rem;}
    .wr_post_writer{font-weight:bold; padding-left:1rem; padding-top:0.5rem;}
    .up_replay_box{margin-top: 9rem; width: 38rem; height: 61rem; border: 2px solid #00000045; border-radius: 5px;}
    .left_right_container{display:flex;}
    .upload_time{font-size:1.5rem; margin-left:1rem; color:#555;}
    .reply_header{display:flex; position:relative;}
    .reply_img{width:3.5rem; height:3rem;}
    .reply_img_box{position:absolute; top:4.5rem; left:6.6rem;}
    .reply_title{position:absolute; top:1.3rem; left:0.7rem; font-size:2.8rem;}
    .up_img{width:53rem; height:39rem;}
    .img_pagnation{position: relative; display:flex;}
    .prev_box{position:absolute; top:-25.7rem; left:2.5rem;}
    .next_box{position:absolute; top:-25.7rem; right:2.5rem;}
    .reply1_box{display:flex; margin: 2rem 1rem 1rem 1rem;}
    .re_profile_img{width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #00000054;}
    .re_reply{font-size: 1.4rem; margin:0.5rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:9.7rem;}
    .re_time{font-size: 0.7rem; margin-left:1.5rem; color: gray;}
    .reply2_box{display:flex; margin: 1rem 1rem 1rem 6.5rem;}
    .reply3_box{display:flex; margin: 1rem 1rem 1rem 12rem;}
    .input_reply_box{display:flex;}
    .re_btn{background-color:#f8fafc; color:#14c1c7; border:none; height:3.9rem; width:4.4rem; font-weight:600;font-size:1.5rem; line-height: 4.7rem;}
    .input_reply_container{margin-top: 32rem; height: 4rem;}
    .like_img{width:2rem; height:2rem;}
    .like_box{display:flex; margin-left: auto;}
    .in_input{outline: none; width:30rem; height:2.5rem; border: 1px solid #808080b0; resize:none; border-radius:15px; line-height: 2.5rem; font-size: 1.3rem; padding: 0.5rem 1rem; font-family: 'Nanum Gothic', sans-serif;}
    .re_time_reply_box{display:flex;}
    .reply_btn{border:none; background:none; color:gray; font-size:0.5rem; cursor:pointer; margin:0; line-height:0.1rem; font-weight:600;}
    .re_delete_btn{background: none; border: none;}
    .like_delete_box{display:flex;}
    .re_delete_box{display:flex;}
    .re_delete_btn{padding:0;}
    .re_delete{font-size: 0.5rem;
        color: gray; line-height: 0rem; margin: 0; font-weight:600;}
    .in_input_box{margin:0.5rem;}
    .like_btn{background:none; border:none;}
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
    .btn_container{display:flex; position: relative;
    }
    .edit_btn{width:7rem;height: 3.5rem; background: black;border-radius: 5px;border: 1px solid black;font-size: 1.5rem;font-weight:600; color: white;}
    .delete_btn{width:7rem;height: 3.5rem;background: black;border-radius: 5px;border: 1px solid black;font-size: 1.5rem;font-weight:600; color: white;}
    .edit_btn_box{position:absolute; top: 2.7rem; left: 0.1rem;}
    .delete_btn_box{position:absolute; top: 2.7rem;right: 0.1rem;}

`


const UploadPage = () => {

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
                        <img className="closeIcon" src="img/clear_black.png" alt="엑스버튼" onClick={openEditOn}/>
                    </div>
                    <div className="popContent">
                        <div className="textWrap">
                            <textarea name="content" id="content">헤이 모두들 안녕?? 내가 누군지 아뉘??</textarea>
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
                                    <span>
                                        <div className="prev_img">
                                            <img src="img/hamster_profile.jpg" alt="게시물사진"/>
                                            <br/><div className="img_del"><i className="fas fa-times-circle"></i></div>
                                        </div>
                                    </span>
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
                        <div className="textWrap">게시물을 삭제하시겠습니까?</div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={delSubmit}>네, 삭제할래요</button>
                        <button onClick={openPostDel}>아니요</button>
                    </div>
                </div>
            </DelPopWrap>
        )
    }

    // 수정하기 실행
    function editSubmit () {
        alert('수정되었습니다.');
        window.location.reload();
    }

    // 삭제하기 실행
    function delSubmit () {
        alert('삭제되었습니다.');
        window.location.reload();
    }


    // 전체 DOM
    return (
        <>
        <Header/>
        <UploadForm>
            {postEditOn ? <EditPop/> : ""}
            {PostDelOn ? <DelPop/> : ""}
            <div className="upload_container">
                <div className="left_right_container">
                    <div className="upload_left_box">
                        <div className="upload_header_box">
                            <div className="upload_profile_box">
                                <div className="upload_profile">
                                    <img className="upload_profile_img" src="/img/profile_img.png" alt="게시물 프로필"/>
                                </div>
                                <div className="up_pro_time_container">
                                    <div className="upload_profile_id">
                                        <span>sh239_tt</span>
                                    </div>
                                    <div className="upload_time">
                                        <span>2시간전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="upload_option_box">
                                <button className="option_btn" onClick={OpenPostOption}>
                                    <img className="upload_option_img" src="/img/more_vert_black.png" alt="게시물 메뉴"/>
                                </button>
                                {PostOptionOn?<PostOption/>:''}
                            </div>
                        </div>
                        <div className="post_images_box">
                            <div className="images_list">
                                <img className="up_img" src="/img/puppy.jpg" alt="게시물 사진"/>
                                <img className="up_img" src="/img/puppy.jpg" alt="게시물 사진"/>
                                <img className="up_img" src="/img/puppy.jpg" alt="게시물 사진"/>
                            </div>
                            <div className="img_pagnation">
                                <div className="prev_box">
                                    <img className="prev_arr" src="/img/arr-left-circle.svg" alt="이전"/>
                                </div>
                                <div className="next_box">
                                    <img className="prev_arr" src="/img/arr-right-circle.svg" alt="다음"/>
                                </div>
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
                            <div className="wr_post_writer">sh239_tt</div>
                            <div className="wr_post_area">헤이 모두들 안녕?? 내가 누군지 아뉘??</div>
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
                                <div className="reply1_box">
                                    <div className="re_profile">
                                        <img className="re_profile_img" src="/img/profile_img.png" alt="댓글 프로필"/>
                                    </div>
                                    <div className="re_reply_box">
                                        <div className="re_id_box">
                                            <div className="re_id_div">
                                                <span className="re_id_span">shdd_0594</span>
                                            </div>
                                            <div className="re_reply">
                                                <span className="reply">아니 안녕 못해!!ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎhhh</span>
                                            </div>
                                        </div>
                                        <div className="re_time_reply_box">
                                            <div className="re_time">
                                                <span>30분 전</span>
                                            </div>
                                            <div>
                                                <button type="button" className="reply_btn">댓글달기</button>
                                            </div>
                                            <div className="re_delete_box">
                                                <button className="re_delete_btn" type="button">
                                                    <p className="re_delete">삭제</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="like_box">
                                        <button type="button" className="like_btn"><img className="like_img" src="/img/smile.png" alt="좋아요"/></button>
                                    </div>
                                </div>
                                <div className="reply1_box">
                                    <div className="re_profile">
                                        <img className="re_profile_img" src="/img/profile_img.png" alt="댓글 프로필"/>
                                    </div>
                                    <div className="re_reply_box">
                                        <div className="re_id_box">
                                            <div className="re_id_div">
                                                <span className="re_id_span">shdd_0594</span>
                                            </div>
                                            <div className="re_reply">
                                                <span className="reply">💛💚💙💛🧡❤💜🤎🖤</span>
                                            </div>
                                        </div>
                                        <div className="re_time_reply_box">
                                            <div className="re_time">
                                                <span>30분 전</span>
                                            </div>
                                            <div>
                                                <button type="button" className="reply_btn">댓글달기</button>
                                            </div>
                                            <div className="re_delete_box">
                                                <button className="re_delete_btn" type="button">
                                                    <p className="re_delete">삭제</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="like_box">
                                        <button type="button" className="like_btn"><img className="like_img" src="/img/smile.png" alt="좋아요"/></button>
                                    </div>
                                </div>
                                <div className="reply2_box">
                                    <div className="re_profile">
                                        <img className="re_profile_img" src="/img/profile_img.png" alt="댓글 프로필"/>
                                    </div>
                                    <div className="re_reply_box">
                                        <div className="re_id_box">
                                            <div className="re_id_div">
                                                <span className="re_id_span">shdd_0594</span>
                                            </div>
                                            <div className="re_reply">
                                                <span className="reply">바다 가고싶다...😥😣</span>
                                            </div>
                                        </div>
                                        <div className="re_time_reply_box">
                                            <div className="re_time">
                                                <span>30분 전</span>
                                            </div>
                                            <div>
                                                <button type="button" className="reply_btn">댓글달기</button>
                                            </div>
                                            <div className="re_delete_box">
                                                <button className="re_delete_btn" type="button">
                                                    <p className="re_delete">삭제</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="like_box">
                                        <button type="button" className="like_btn"><img className="like_img" src="/img/smile.png" alt="좋아요"/></button>
                                    </div>
                                </div>
                                <div className="reply3_box">
                                    <div className="re_profile">
                                        <img className="re_profile_img" src="/img/profile_img.png" alt="댓글 프로필"/>
                                    </div>
                                    <div className="re_reply_box">
                                        <div className="re_id_box">
                                            <div className="re_id_div">
                                                <span className="re_id_span">shdd_0594</span>
                                            </div>
                                            <div className="re_reply">
                                                <span className="reply">에이 요!!</span>
                                            </div>
                                        </div>
                                        <div className="re_time_reply_box">
                                            <div className="re_time">
                                                <span>30분 전</span>
                                            </div>
                                            <div>
                                                <button type="button" className="reply_btn">댓글달기</button>
                                            </div>
                                            <div className="re_delete_box">
                                                <button className="re_delete_btn" type="button">
                                                    <p className="re_delete">삭제</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="like_box">
                                        <button type="button" className="like_btn">
                                            <img className="like_img" src="/img/smile.png" alt="좋아요"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="input_reply_container">
                                <form>
                                    <div className="input_reply_box">
                                        <div className="in_input_box">
                                            <textarea className="in_input" value="댓글 달기.."/>
                                        </div>
                                        <div className="re_btn_box">
                                            <button type="submit" className="re_btn">게시</button>
                                        </div>
                                    </div>
                                </form>
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
        let fileSize = document.querySelectorAll(".prev_img");
        var files = evt.target.files;
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
                    document.querySelector('.prev_upload').insertBefore(span, null);
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