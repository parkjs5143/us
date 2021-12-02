import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';

const MainProfileWrap = styled.div`
    input:focus {outline:none;}
    textarea:focus {outline:none;}

    // 메인 css //
    .section1_box{display: flex; justify-content: left; margin-left:6.5rem;}
    .profile_layer1{display:flex; height:4rem;}
    .profile_layer2{display:flex; height: 3.3rem; margin-top:2.5rem;}
    .profile_img_box{width:17rem; height:17rem; margin-top:2rem;}
    .profile_img{width:100%; height:100%; border: 4px solid #a5a7c38a; border-radius: 50%; cursor:pointer;}
    .profile_detail_box{margin-left: 9rem;}
    .option_box{margin: 3.5rem 0.7rem; cursor:pointer;}
    .posting_box{margin: 3.5rem 0;}
    .post_btn{border-radius: 5px; background-color: #14c1c7; color: white; border:none; height: 3rem; cursor:pointer;}
    .nikname_box{font-size: 2.8rem; color:black;}
    .friend_cnt_box{margin-left: 1.6rem; font-size: 1.8rem; display:flex; cursor:pointer;}
    .posting_cnt_box{font-size: 1.8rem; color:black; display:flex; cursor:pointer;}
    .profile_layer3{height: 1rem; margin-top:3rem;}
    .name{font-size: 1.8rem; font-weight: bold; cursor:pointer;}
    .status_message{font-size: 1.5rem; margin-top: 2rem; cursor:pointer;}
    .section2_container{display:flex; justify-content:center;}
    .section2_box{display: flex; margin-top: 5rem; justify-content: space-around; width: 90rem;}
    .phone_img{width:3rem; height:3rem;}
    .phone_profile{width:8.5rem; height: 8.5rem; border-radius:50%; border: 3px solid #423b422e; cursor:pointer;}
    .phone_name{margin-top: 7rem; text-align: center; font-weight: 600; font-size: 1.4rem; cursor:pointer;}
    .posting_cnt{margin-left:0.8rem; font-weight:600;}
    .friend_cnt{font-weight:600; cursor:pointer;}
    .usually_contect{width:8.5rem;}
    .arr_btn{background: none; border:none;}
    .arr_img{width:6rem; cursor: pointer;}
    .arr_box{transform: translate(93.8rem, -12.5rem);}
    .sec_post_box{display:flex; color: black;}
    .sec_chat_box{display:flex; color: black; margin-left: 4rem;}
    .section3_box{display:flex; border-top: 1px solid rgb(219,219,219); margin-top: -6rem; justify-content: center;}
    .sec_location_box{display:flex; color: black; margin-left: 4rem;}
    .sec_chat_img, .sec_location_img{margin-top:1.6rem;}
    .sec_post_img{margin-top:1.5rem;}
    .sec3_img1, .sec3_img2, .sec3_img3{width:1.7rem;}
    .sec_post_title, .sec_chat_title, .sec_location_title{font-size:1.3rem;}
    .sec_chat_title, .sec_location_title{margin-left:0.5rem;}
    .post_link:active{font-weight: 700;}

    // 친구추가 팝업1 css //
    .friend_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
    .friend_pop_box{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white; border:none; width: 33rem; height: 44rem; border-radius: 15px; padding: 1rem 0 1rem 1rem;}
    .pop_sec1{display:flex; justify-content: space-between;}
    .pop_sec1_add_box{display:flex;}
    .friend_btn{background: none; border:none; font-size: 1.8rem; margin-top:1.7rem; cursor:pointer;}
    .pop1_close_btn{background:none; border:none; cursor: pointer;}
    .pop_sec1_add_title{margin: 0.3rem 0.3rem; font-size: 1.3rem; font-weight: 600;}
    .pop_sec2_box{display:flex; justify-content: space-between; height: 5rem; margin-bottom:1.3rem;}
    .pop_sec2_friend_box{display:flex;}
    .pop_sec2_friend_profile_img{width:5rem; height:5rem; border-radius:50%; border:2px solid #a5a7c391; cursor:pointer;}
    .pop_sec2{margin-top:1.5rem; overflow: auto; height: 37.8rem;}
    .pop_sec2_friend_detail_box{margin: 0.8rem 1.3rem;}
    .pop_sec2_friend_detail_m{font-size: 1.4rem;}
    .chat_img_box{height: 2.8rem; margin: 2rem 0.9rem;}
    .chat_img{width:2.8rem; cursor:pointer;}
    .detail_n, .detail_m{margin:0; cursor:pointer;}
    .detail_n{font-size:1.5rem; font-weight:bold;}
    .detail_m{width: 18rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
    .person_add_btn{border:none; background:none; cursor: pointer;}

    // 친구추가 팝업2(코드 불일치) css //
    .add_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
    .add_friend_pop_box{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white; border:none; width: 33rem; height: 44rem; border-radius: 15px; padding: 1rem 0 1rem 1rem;}
    .add_friend_pop_sec1_box{display:flex; justify-content: space-between; margin-top: 0.5rem;}
    .pop2_close_btn{border:none; background:none; cursor:pointer;}
    .ok_cancel_box{display:flex; justify-content:center;}
    .input_friend_code{border-top:none; border-left:none; border-right:none; width:20rem; cursor:pointer;}
    .code_notFind{font-size: 1.5rem; width: 18rem; text-align: center; margin: 15rem auto;}
    .ok_btn, .cancel_btn{width: 5rem; height: 3rem; background-color: black; color: white; border-radius: 5px; border: none;}
    .cancel_box{margin-left:0.3rem;}
    .ok_box{margin-right:0.3rem;}
    .code_notFind_container{margin:10rem 0;}
    .code_notFind_container{display:none;}
    .cancel_btn, .ok_btn{cursor:pointer;}

    //친구추가 팝업3(코드일치) css  //
    .code_find_box{display:block;}
    .find_profile_img{width:12rem; height:12rem; border-radius:50%; border: 3px solid #a5a7c3ad; cursor:pointer;}
    .find_profile{display: flex; justify-content: center; margin-top: 3rem;}
    .find_profile_m{text-align: center; font-size: 1.4rem; margin: 1rem 0 12.5rem 0; cursor:pointer;}
    .find_profile_name{text-align: center; margin: 1rem 0 0.5rem 0; font-weight: bold; cursor:pointer;}

    //게시물 업로드 팝업1(업로드할 이미지) css //
    .post1_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
    .post1_pop_box{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white;border:none; width: 60rem; height: 56rem; border-radius: 15px; padding: 1rem;}
    .post1_pop_sec1{display:flex; justify-content: space-between; margin-top:1rem;}
    .pop3_close_btn{background:none; border:none;}
    .ch_upload_img{font-size:2.3rem; margin: 0 0 0 20rem; font-weight:600;}
    .post1_pop_sec2_box{margin-top:3rem;}
    #files{display:none;}
    .prev_img{background-color: #efefef; width:17.9rem; height:17.9rem; margin:1rem;}
    .prev_upload{display:flex; flex-wrap:wrap; height:39.8rem;}
    #upload{margin-left:1.3rem; cursor:pointer;}
    .file_aa{display:flex;}
    .upload_txt_box{margin: 0.8rem 1rem;}
    .upload_img_ch{border:none; background-color:#14c1c7; color:white; width:9rem; height:3.5rem; cursor:pointer; border-radius:5px; cursor:pointer;}
    .post1_pop_sec3{margin-top:1.3rem;}
    .post1_pop_sec3_box{display: flex; justify-content: center;}
    .img_del{background:none; border:none; position:absolute; top: 1.2rem; right: 1.5rem; font-size: 2rem;}
    .prev_upload span{position:relative;}
    .fa-times-circle{color:#14c1c7;}

    // 게시물 업로드 팝업2(선택한 이미지로 게시글 작성 팝업) css //
    .pop4_close_btn{background:none; border:none;}
    .post2_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
    .post2_pop_sec1{position:relative;}
    .pop4_close{position:absolute;top:0; right:0;}
    .post2_pop_box{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white;border:none; width: 60rem; height: 56rem; border-radius: 15px; padding: 1rem;}
    .wr_upload_txt{text-align:center; font-size: 2.3rem; margin:1rem 0; font-weight:600;}
    .txt_table{border:1px;}
    .post_input_txt{width: 55rem; height: 33.5rem; border: 3px solid #a5a7c38a; margin-top:-0.5rem; resize:none; font-size:2rem;}
    .post_input_txt_box{display:flex; justify-content:center; margin-top:3rem;}
    .post_txt_btn{border-radius: 5px; background-color: #14c1c7; color: white; border: none; height: 3.5rem; width:10rem; cursor: pointer;}
    .post_txt_btn_box{margin-top: 3.7rem; display: flex; justify-content: center;}
    .post_mark{width:15rem;}
    .post_input_txt_img{width:15rem; margin-left:2rem;}
    .hashtag_box{margin:1.5rem 0 0 2rem;}
    #in_hashtag{border: none;font-size: 1.4rem;width: 20rem;padding: 0 0 0 5px;border-bottom: 1px solid lightgray;}
    .hashtag_tip{margin-left:2rem; color: #ec1111c7;}
    .pop4_close_btn{cursor:pointer;}
    .hashtag_input_submit{margin-left: 1rem; background: black; color: white; border: 1px solid; border-radius: 9px; font-size: 1.4rem; padding: 0.5rem 1rem;}
    #hashtag_list{display: flex; margin-top: 1rem; flex-wrap: wrap; width:55.5rem;}
`;


const MainProfile = ()=>{
//메인화면 값 가져오기
    const [mainProfile, setMainProfiles] = React.useState([]);
    useEffect(() => {
        try{
            Promise.allSettled([
                axios.get('http://localhost:3001/main?idx=1')
            ]).then((res) => {
                // console.log(res[0].value.data[0]);
                // setMainProfiles(res[0].value.data[0]);
            })
        } catch(e){
            console.error(e.message)
        }
    },[])


    //친구추가 목록 팝업
    const[friendOn, setFriendOn] = React.useState(false);
    const onOpenFriend = () => {
        setFriendOn(!friendOn);

         //팝업 창 띄울 시 body 스크롤
        if(friendOn==false){
            document.body.style.overflow = "hidden";
        }else if(friendOn==true){
            document.body.style.overflowY = "unset";
        }
    }

    //친구추가 팝업
    const[addOn, setAddOn] = React.useState(false);
    const onAddFriend = () => {
        setAddOn(!addOn);

         //팝업 창 띄울 시 body 스크롤
        if(addOn==false){
            document.body.style.overflow = "hidden";
        }else if(friendOn==true){
            document.body.style.overflowY = "unset";
        }
    }

    //게시물 올리기 팝업1(업로드될 이미지 선택 팝업)
    const[postOn, setPostOn] = React.useState(false);
    const onOpenPost = () =>{
        setPostOn(!postOn);

         //팝업 창 띄울 시 body 스크롤
        if(postOn==false){
            document.body.style.overflow = "hidden";
        }else if(postOn==true){
            document.body.style.overflowY = "unset";
        }
    }

    //게시물 올리기 팝업2(선택한 이미지로 게시글 작성 팝업)
    const[postTxtOn, setPostTxtOn] = React.useState(false);
    const onOpenPostTxt = () =>{
        setPostTxtOn(!postTxtOn);

         //팝업 창 띄울 시 body 스크롤
        if(postTxtOn==false){
            document.body.style.overflow = "hidden";
        }else if(postTxtOn==true){
            document.body.style.overflowY = "unset";
        }
    }

    const Post2 = () => {
        return(
            <div className="post2_pop_container">
                <div className="post2_pop_box">
                    <div className="post2_pop_sec1">
                        <div>
                            <p className="wr_upload_txt">게시글 작성</p>
                        </div>
                        <div className="pop4_close">
                            <button className="pop4_close_btn" type="button" onClick={onOpenPost}><img src="/img/clear_black.png" alt="close"/></button>
                        </div>
                    </div>
                    <div className="post2_pop_sec2">
                        <div className="post_input_txt_box">
                            <textarea className="post_input_txt" id="upload_textbox" maxLength="5000"/>
                        </div>
                        <div className="hashtag_box">
                            <input id="in_hashtag" type="text" placeholder="해시태그를 입력하세요." maxlength="10"/>
                            <span className="hashtag_input_submit">등록</span>
                            <div id="hashtag_list"></div>
                        </div>
                        <div className="hashtag_tip">해시태그는 4개까지만 입력이 가능합니다.</div>
                        <div className="post_txt_btn_box">
                            <Link to="/uploadPage">
                                <button type="button" className="post_txt_btn">게시물 등록</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //업로드될 이미지 선택 팝업 html
    const Post1 = () =>{
        return(
            <div className="post1_pop_container">
                <div className="post1_pop_box">
                    <div className="post1_pop_sec1_box">
                        <div className="post1_pop_sec1">
                            <div>
                                <p className="ch_upload_img">업로드 이미지 선택</p>
                            </div>
                            <div className="pop3_close">
                                <button className="pop3_close_btn" type="button" onClick={onOpenPost}><img src="/img/clear_black.png" alt="close"/></button>
                            </div>
                        </div>
                    </div>
                    <form id="form" multiple>
                        <div className="post1_pop_sec2_box">
                            <div className="post1_pop_sec2">
                                <div className="filebox">
                                    <div className="file_aa">
                                        <div className="file_label">
                                            <label id="upload" htmlFor="files"><img src="/img/add_photo.png"/></label>
                                        </div>
                                        <div className="upload_txt_box">
                                            <div className="upload_txt">업로드 할 이미지를 선택하세요.</div>
                                        </div>
                                    </div>
                                    <input type="file" id="files" multiple accept="image/png" onChange={handleFileSelect}/>
                                </div>
                                <div className="prev_upload_box">
                                    <div className="prev_upload"></div>
                                </div>
                            </div>
                        </div>
                        <div className="post1_pop_sec3_box">
                            <div className="post1_pop_sec3">
                                <button className="upload_img_ch" type="button" onClick={onOpenPostTxt}>선택 완료</button>{postTxtOn?<Post2/>:""}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    //친구추가(코드 일치/불일치) 팝업 html
    const Add = () => {
        return (
            <div className="add_pop_container">
                <div className="add_friend_pop_box">
                    <div className="add_friend_pop_sec1">
                        <div className="add_friend_pop_sec1_box">
                            <div className="add_friend_pop_logo">
                                <img src="/img/person_add.png" alt="친구추가"/>
                            </div>
                            <form>
                                <div className="input_friend_code_box">
                                    <input className="input_friend_code" type="text"/>
                                </div>
                            </form>
                            <div className="pop2_close">
                                <button className="pop2_close_btn" type="button" onClick={onAddFriend}><img src="/img/clear_black.png" alt="close"/></button>
                            </div>
                        </div>
                    </div>
                    <div className="add_friend_pop_sec2">
                        <div className="code_notFind_container">
                            <div className="code_notFind_box">
                                <p className="code_notFind">해당하는 코드의 회원님을 찾을 수 없습니다.</p>
                            </div>
                        </div>
                        <div className="code_find_box">
                            <div className="find_profile">
                                <img className="find_profile_img" src="/img/mj_image.jpg" alt="일치 프로필"/>
                            </div>
                            <div className="find_profile_name_box">
                                <p className="find_profile_name">밥머거</p>
                            </div>
                            <div className="find_profile_m_box">
                                <p className="find_profile_m">오늘은 뭐 먹지??</p>
                            </div>
                        </div>
                    </div>
                    <div className="add_friend_pop_sec3">
                        <div className="ok_cancel_box">
                            <div className="ok_box">
                                <button className="ok_btn" type="submit" onClick={onAddFriend}>추가</button>
                            </div>
                            <div className="cancel_box">
                                <button className="cancel_btn" type="button" onClick={onAddFriend}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //친구목록 팝업 html
    const Friend = () => {
        return (
            <div className="friend_pop_container">
                <div className="friend_pop_box">
                    <div className="pop_sec1">
                        <div className="pop_sec1_add_box">
                            <div className="pop_sec1_add_image_box">
                                <button className="person_add_btn" type="button" onClick={onAddFriend}>
                                    <img src="/img/person_add.png" alt="친구추가"/>
                                </button>{addOn?<Add/>:""}
                            </div>
                            <div className="pop_sec1_add_title_box">
                                <p className="pop_sec1_add_title">친구추가</p>
                            </div>
                        </div>
                        <div className="pop1_close">
                            <button className="pop1_close_btn" type="button" onClick={onOpenFriend}><img src="/img/clear_black.png" alt="close"/></button>
                        </div>
                    </div>
                    <div className="pop_sec2">
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">미나리</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">바다 가고싶다😥</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">김밥</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">수능엔 김밥이쥐🍣</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">영양갱</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">겁나 배고프다..😭 뭐 먹지</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">라면</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">먹을게 라면밖에 없다니..흑흑</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">미나리</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">바다 가고싶다😥</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">미나리</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">바다 가고싶다😥</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                        <div className="pop_sec2_box">
                            <div className="pop_sec2_friend_box">
                                <div className="pop_sec2_friend_profileImg_box">
                                    <img className="pop_sec2_friend_profile_img" src="/img/mj_image.jpg" alt="프로필 이미지"/>
                                </div>
                                <div className="pop_sec2_friend_detail_box">
                                    <div className="pop_sec2_friend_detail_n"><p className="detail_n">미나리</p></div>
                                    <div className="pop_sec2_friend_detail_m"><p className="detail_m">바다 가고싶다😥</p></div>
                                </div>
                            </div>
                            <div className="chat_img_box">
                                <img className="chat_img" src="/img/message.png" alt="채팅방 이미지"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //main html(전체적으로 보여지는 부분)
    return (
        <MainProfileWrap>
            <div className="section1_box">
                <div className="profile_img_box">
                    <img className="profile_img" src=""alt="profile"/>
                </div>
                <div className="profile_detail_box">
                    <div className="profile_layer1">
                        <div className="nikname_box">
                            <p>{}</p>
                        </div>
                        <div className="option_box">
                            <Link to="/mypage">
                                <img src="/img/setting.png" alt="setting"/>
                            </Link>
                        </div>
                        <div className="posting_box">
                            <button className="post_btn" type="button" onClick={onOpenPost}>게시물 올리기</button>{postOn?<Post1/>:""}
                        </div>
                    </div>
                    <div className="profile_layer2">
                        <div className="posting_cnt_box">
                            <div className="posting">
                                <p>게시물</p>
                            </div>
                            <div className="posting_cnt">
                                <p>503</p>
                            </div>
                        </div>
                        <div className="friend_cnt_box">
                            <div className="friend">
                                <button className="friend_btn" type="button" onClick={onOpenFriend}>친구</button>{friendOn?<Friend/>:""}
                            </div>
                            <div className="friend_cnt">
                                <p>3.3백만</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile_layer3">
                        <div className="name">
                            <p></p>
                        </div>
                    </div>
                    <div className="profile_layer4">
                        <div className="status_message">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section2_container">
                <div className="section2_box">
                    <div className="usually_contect_box1 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>공주님</p>
                        </div>
                    </div>
                    <div className="usually_contect_box2 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>왕자님</p>
                        </div>
                    </div>
                    <div className="usually_contect_box3 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>개구리</p>
                        </div>
                    </div>
                    <div className="usually_contect_box4 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>딸기당</p>
                        </div>
                    </div>
                    <div className="usually_contect_box5 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>포도당</p>
                        </div>
                    </div>
                    <div className="usually_contect_box6 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>바나나</p>
                        </div>
                    </div>
                    <div className="usually_contect_box7 usually_contect">
                        <div className="phone_img">
                            <img className="phone_profile" src="/img/puppy.jpg"/>
                        </div>
                        <div className="phone_name">
                            <p>오렌지</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="arr_box">
                <button type="button" className="arr_btn">
                    <img className="arr_img" src="/img/arr-right-circle.svg"/>
                </button>
            </div>
            <div className="section3_box">
                <div className="sec_post_container">
                    <Link to="/main" className="post_link">
                        <div className="sec_post_box">
                            <div className="sec_post_img">
                                <img className="sec3_img1" src="/img/post_img.png"/>
                            </div>
                            <div className="sec_post_title">
                                <p>게시물</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="sec_chat_container">
                    <Link to="/mainTalk">
                        <div className="sec_chat_box">
                            <div className="sec_chat_img">
                                <img className="sec3_img2" src="/img/chat.png"/>
                            </div>
                            <div className="sec_chat_title">
                                <p>채팅</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="sec_location_container">
                    <Link to="/mainMap">
                        <div className="sec_location_box">
                            <div className="sec_location_img">
                                <img className="sec3_img3" src="/img/location.png"/>
                            </div>
                            <div className="sec_location_title">
                                <p>위치</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </MainProfileWrap>
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
                            '"/><br><div class="img_del"><i class="fas fa-times-circle"></i></div></div>'
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

export default MainProfile;