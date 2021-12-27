import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MainProfileWrap = styled.div`
    input:focus {outline:none;}
    textarea:focus {outline:none;}

    // 메인 css //
    .section1_box{display: flex; align-items: center; margin: 2rem 0 0 6.5rem;}
    .profile_layer1{display:flex; height:4rem; align-items: center; }
    .profile_layer2{display:flex; height: 3.3rem; }
    .profile_layer1 p, .status_message p{ margin: 0; }
    .phone_name p{ margin: 1rem 0; }
    .profile_img_box{width:17rem; height:17rem; }
    .profile_img{width:100%; height:100%; border: 4px solid lightgray; border-radius: 50%; cursor:pointer;}
    .profile_detail_box{margin-left: 9rem;}
    .option_box{ cursor:pointer; margin: 0 1rem; }
    .post_btn{border-radius: 5px; background-color: #14c1c7; color: white; border:none; height: 3rem; cursor:pointer;}
    .nikname_box{font-size: 2.8rem; color:black;}
    .friend_cnt_box{margin-left: 1.6rem; font-size: 1.8rem; display:flex;}
    .posting_cnt_box{font-size: 1.8rem; color:black; display:flex; cursor:pointer;}
    .profile_layer3{height: 1rem; margin-top:3rem;}
    .name{font-size: 1.8rem; font-weight: bold;}
    .status_message{font-size: 1.5rem; margin-top: 2rem;}
    .section2_container{display:flex; z-index: 2000;}
    .section2_box{display: flex; margin-top: 5rem; width: 90rem; margin: 5rem auto 0; }
    .phone_profile{width:8.5rem; height: 8.5rem; border-radius:50%; border: 3px solid lightgray; cursor:pointer; z-index: 500;}
    .phone_name{ text-align: center; font-weight: 600; font-size: 1.4rem; cursor:pointer;}
    .posting_cnt{margin-left:0.8rem; font-weight:600;}
    .usually_contect{ width:8.5rem; margin: 0 1.35rem; }
    .arr_btn{background: none; border:none; padding:0;}
    .arr_img{width:6rem; cursor: pointer;}
    .arr_box{ position: relative; bottom: 12rem; display: flex; justify-content: space-between; }
    .sec_post_box{display:flex; color: black;}
    .sec_chat_box{display:flex; color: black; margin-left: 4rem;}
    .section3_box{display:flex; border-top: 1px solid rgb(219,219,219); justify-content: center;}
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
    .pop_sec1_add_box{display:flex;align-items:center;}
    .friend_btn{background: none; border:none; font-size: 1.8rem; margin-top:1.7rem; cursor:pointer;}
    .pop1_close{margin: 0 0.5rem 0 0;}
    .pop1_close_btn{background:none; border:none; cursor: pointer;}
    .pop_sec1_add_title{margin: 0; font-size: 1.3rem; font-weight: 600;}
    .pop_sec2_box{display:flex; justify-content: space-between; height: 5rem; margin-bottom:1.3rem;}
    .pop_sec2_friend_box{display:flex;}
    .pop_sec2_friend_profile_img{width:5rem; height:5rem; border-radius:50%; border:2px solid lightgray; cursor:pointer;}
    .pop_sec2{margin-top:1.5rem; overflow: auto; height: 37.8rem;}
    .pop_sec2_friend_detail_box{margin: 0.8rem 1.3rem;}
    .pop_sec2_friend_detail_m{font-size: 1.4rem;}
    .chat_img_box{ display: flex; align-items: center; padding-right: 0.8rem; }
    .chat_img{width:2.8rem; cursor:pointer;}
    .detail_n, .detail_m{margin:0; cursor:pointer;}
    .detail_n{font-size:1.5rem; font-weight:bold;}
    .detail_m{width: 18rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
    .person_add_btn{border:none; background:none; cursor: pointer;}
    .pop_no_friend_box{ width: calc(100% - 1rem); height: 92%; text-align: center; display:flex; justify-content: center; align-items: center; color: gray; font-size: 1.5rem; font-weight: bold; }

    // 친구추가 팝업2(코드 불일치) css //
    .add_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; }
    .add_friend_pop_box{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white; border:none; width: 33rem; height: 44rem; border-radius: 15px; padding: 1rem 0 1rem 1rem;}
    .add_friend_pop_sec1_box{ width: calc(100% - 1rem); display:flex; justify-content: center; margin-top: 1rem;}
    .ok_cancel_box{display:flex; justify-content:center; width: calc(100% - 1rem);}
    .input_friend_code{border: none; border-bottom: 1px solid; margin:0 1.2rem 0 1rem; font-size: 1.8rem; text-align: center; width:17rem; cursor:pointer;}
    .code_notFind{font-size: 1.5rem; width: 18rem; text-align: center; margin: 15rem auto;}
    .ok_btn, .cancel_btn{cursor:pointer; padding: 0.8rem 2rem; background-color: black; color: white; border-radius: 5px; border: none;}
    .cancel_box{margin-left:0.3rem;}
    .ok_box{margin-right:0.3rem;}
    .select_friend_btn{ background: black; color: white; padding: 0 1rem; border-radius: 5px; cursor: pointer; border: none;}

    //친구추가 팝업3(코드일치) css  //
    .code_find_box{display:block; width: calc(100% - 1rem);padding: 7.5rem 0 5.5rem;}
    .find_profile_img{width:12rem; height:12rem; border-radius:50%; border: 3px solid lightgray; cursor:pointer;}
    .find_profile{display: flex; justify-content: center;}
    .find_profile_m{text-align: center; width:85%; font-size: 1.4rem; margin: 1rem auto 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor:pointer;}
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
    .post_input_txt{width: 55rem; height: 39.5rem; border: 3px solid #a5a7c38a; margin-top:-0.5rem; resize:none; font-size:2rem;}
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

const MainProfile = ({idx, param})=>{
    const [profile, setProfile] = useState({info:[0], postCnt:0, friendCnt:0, friend:[0]});
    const [email, setEmail] = useState('');
    const [btn, setBtn] = useState(true);
    let [friends, setFriends] = useState([])
    let friendFor = [];
    let [friendPage, setFPage] = useState(0);
    // 게시물 업로드 파일저장
    const [imgFile, setImgFile] = useState(null);
    const contentInput = useRef();

    // main 정보 불러오기
    useEffect(async () => {
        const profile = await axios.get(`http://localhost:3001/main?idx=${idx}`)
        console.log(profile);
        setProfile({info:profile.data[0][0], postCnt:profile.data[1][0].postCnt, friendCnt:profile.data[2][0].friendCnt, friend:profile.data[3]})
        const curr = profile.data[0][0].email.split('@');
        setEmail(curr[0])
        if(profile.data[3].length>8){ 
            setBtn(false);
            for(let i=0; i<8; i++){friendFor[i]=profile.data[3][i]}
            setFriends(friendFor);
        }else{ 
            for(let i=0; i<profile.data[3].length; i++){friendFor[i]=profile.data[3][i]}; 
            setFriends(friendFor); 
        }
    }, []);


    // 상단 친구목록 버튼
    const prev = () =>{
        for(let i=0; i<8; i++){friendFor[i]=profile.friend[i];}
        setFriends(friendFor);
        setFPage(0);
    }
    const next = () =>{
        let j = 0;
        for(let i=8; i<profile.friend.length; i++){friendFor[j]=profile.friend[i];j++}
        setFriends(friendFor);
        setFPage(1);
    }

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
    let [list, setList] = useState([]);
    const[addOn, setAddOn] = React.useState(false);

    // 친구목록 불러오기
    useEffect(async () => {
        const list = await axios.get(`http://localhost:3001/main/friend/list?idx=${idx}`)
        setList(list.data)
    }, [addOn]);

    //친구추가 팝업
    const[addFriends, setAddF] = useState(null);
    
    const codeBtn = async() =>{
        let code = document.getElementById('codeInput')
        let findFriend = await axios.post("http://localhost:3001/main/friend?code=" + code.value + `&idx=${param}`)
        setAddF({info:findFriend.data.result1[0], flag:findFriend.data.flag})
    }
    const onAddFriend = async() => { //추가 버튼
        if(addFriends!==null&&addFriends.info!==undefined){
            let plusFriend = await axios.post("http://localhost:3001/main/insert_friend?fIdx="+addFriends.info.idx+"&idx="+param)
            console.log(plusFriend)
        }
        setAddF(null)
        setAddOn(!addOn);
    }
    const onAddFriend2 = async() => { //추가 취소 버튼
        setAddF(null)
        setAddOn(!addOn);
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
        console.log(imgFile);
         //팝업 창 띄울 시 body 스크롤
        if(postTxtOn==false){
            document.body.style.overflow = "hidden";
        }else if(postTxtOn==true){
            document.body.style.overflowY = "unset";
        }
    }

    // 게시물 등록 버튼 클릭 (axios 제출)
    const WriteBoard = async()=> {
        const content = contentInput.current.value;
        let formData = new FormData();

        for (const key of Object.keys(imgFile)) {
            formData.append('fileupload', imgFile[key]);
        }
        formData.append('memberIdx', param);
        formData.append('content', content);
        formData.append('hashTag', '');

        return await axios.post(`http://localhost:3001/post/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res)=>{
            alert('게시물이 등록되었습니다.');
            console.log(res);
            window.location.href = '/main/'+idx+'?idx=' + param;
        });
    }

    const Post2 = () => {
        return(
            <div className="post2_pop_container">
                <div className="post2_pop_box">
                    <div className="post2_pop_sec1">
                        <div><p className="wr_upload_txt">게시글 작성</p></div>
                        <div className="pop4_close">
                            <button className="pop4_close_btn" type="button" onClick={onOpenPost}><img src="/img/clear_black.png" alt="close"/></button>
                        </div>
                    </div>
                    <div className="post2_pop_sec2">
                        <div className="post_input_txt_box">
                            <textarea className="post_input_txt" id="upload_textbox" maxLength="5000" ref={contentInput}/>
                        </div>
                        <div className="post_txt_btn_box">
                            <button type="button" className="post_txt_btn" onClick={WriteBoard}>게시물 등록</button>
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
                                    <input type="file" id="files" multiple accept="image/jpg,impge/png,image/jpeg,image/gif" onChange={handleFileSelect}/>
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
                    <div className="add_friend_pop_sec1_box">
                        <img src="/img/person_add.png" style={{width: '3rem'}} alt="친구추가"/>
                        <input className="input_friend_code" type="text" id="codeInput"/>
                        <button type="button" className="select_friend_btn" onClick={codeBtn}>검색</button>
                    </div>
                    <div className="add_friend_pop_sec2">
                        {addFriends!==null?
                            addFriends.info===undefined?
                                <div className="code_notFind_box">
                                    <p className="code_notFind">해당 코드의 회원님을 찾을 수 없습니다.</p>
                                </div>
                            :
                                <div className="code_find_box">
                                    <div className="find_profile">
                                        <img className="find_profile_img" src={'/'+addFriends.info.img} alt="일치 프로필"/>
                                    </div>
                                    <div className="find_profile_name_box">
                                        <p className="find_profile_name">{addFriends.info.name}</p>
                                    </div>
                                    <div className="find_profile_m_box">
                                        <p className="find_profile_m">{addFriends.info.message!==null?addFriends.info.message:'-'}</p>
                                    </div>
                                </div>
                        :
                        <div className="code_notFind_box">
                            <p className="code_notFind">상단에 코드를 입력 후<br/>검색을 눌러주세요</p>
                        </div>
                        }
                    </div>
                    <div className="add_friend_pop_sec3">
                        <div className="ok_cancel_box">
                            {addFriends!==null&&addFriends.info!==undefined&&addFriends.info.idx!==profile.info.idx?
                                <div className="ok_box">
                                    <button className="ok_btn" type="submit" onClick={onAddFriend}>{addFriends.flag===true?'해제':'추가'}</button>
                                </div>:<></>
                            }
                            <div className="cancel_box">
                                <button className="cancel_btn" type="button" onClick={onAddFriend2}>취소</button>
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
                            {
                                param===idx ?
                                <div className="pop_sec1_add_image_box">
                                    <button className="person_add_btn" type="button" onClick={onAddFriend}>
                                        <img src="/img/person_add.png" alt="친구추가"/>
                                    </button>{addOn?<Add/>:""}
                                </div>
                                :
                                ''
                            }
                            <div className="pop_sec1_add_title_box">
                                <p className="pop_sec1_add_title">친구</p>
                            </div>
                        </div>
                        <div className="pop1_close">
                            <button className="pop1_close_btn" type="button" onClick={onOpenFriend}><img src="/img/clear_black.png" alt="close"/></button>
                        </div>
                    </div>
                    <div className="pop_sec2">
                        {list.length!==0?
                            list.map(listData=>(
                                <div className="pop_sec2_box" onClick={()=>{window.location.href=`/main/${listData.idx}?idx=${param}`}}>
                                    <div className="pop_sec2_friend_box">
                                        <div className="pop_sec2_friend_profileImg_box">
                                            <img className="pop_sec2_friend_profile_img" src={listData.img!==null?"/"+listData.img:'/img/admin/noneImg.png'} alt="프로필 이미지"/>
                                        </div>
                                        <div className="pop_sec2_friend_detail_box">
                                            <div className="pop_sec2_friend_detail_n"><p className="detail_n">{listData.name}</p></div>
                                            <div className="pop_sec2_friend_detail_m"><p className="detail_m">{listData.message!==null?listData.message:'-'}</p></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <div className="pop_no_friend_box">등록된 친구가 없습니다<br/>상단 버튼을 눌러 추가하세요</div>
                        }
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
                    <img className="profile_img" src={profile.info.img!==null?"/"+profile.info.img:'/img/blank_profile.png'} alt="profile"/>
                </div>
                <div className="profile_detail_box">
                    <div className="profile_layer1">
                        <div className="nikname_box">
                            <p>{email}</p>
                        </div>
                        {
                            idx===param ?
                            <>
                                <div className="option_box">
                                    <Link to={'/mypage?idx='+idx}><img src="/img/setting.png" alt="setting"/></Link>
                                </div>
                                <div className="posting_box">
                                    <button className="post_btn" type="button" onClick={onOpenPost}>게시물 올리기</button>{postOn?<Post1/>:""}
                                </div>
                            </>
                            :
                            ''
                        }
                    </div>
                    <div className="profile_layer2">
                        <div className="posting_cnt_box">
                            <div className="posting">
                                <p>게시물</p>
                            </div>
                            <div className="posting_cnt">
                                <p>{profile.postCnt}</p>
                            </div>
                        </div>
                        <div className="friend_cnt_box">
                            <div className="friend">
                                <button className="friend_btn" type="button" onClick={onOpenFriend}>친구 <span style={{fontWeight:'600',fontSize:'1.9rem'}}>{profile.friendCnt}</span></button>{friendOn?<Friend/>:""}
                            </div>
                        </div>
                    </div>
                    <div className="profile_layer3">
                        <div className="name">
                            <p>{profile.info.name}</p>
                        </div>
                    </div>
                    <div className="profile_layer4">
                        <div className="status_message">
                            <p>{profile.info.message!==null?profile.info.message:"등록된 소개가 없습니다."}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section2_container">
                <div className="section2_box">
                    {profile.friendCnt!==0?
                        friends.map(friendData=>(
                            <div className="usually_contect_box1 usually_contect">
                                <div className="phone_img">
                                    <span className="post_link">
                                        <img className="phone_profile" src={friendData.img!==null&&friendData.img!==''?"/"+friendData.img:"/img/blank_profile.png"} onClick={()=>{window.location.href=`/main/${friendData.idx}?idx=${param}`}}/>
                                    </span>
                                </div>
                                <div className="phone_name"><p>{friendData.name}</p></div>
                            </div>
                        )):<></>
                    }
                </div>
            </div>
            <div style={{position:"relative"}}>
                <div style={{position:"absolute" ,top:"-111px"}}> 
                <button type="button" className="arr_btn" style={btn===true||friendPage===0?{opacity: '0'}:{opacity: '1'}} id="prev" disabled={btn} onClick={prev}><img className="arr_img" src="/img/arr-left-circle.svg"/></button>
                </div>
                <div style={{position:"absolute" ,top:"-111px", right:0}}> 
                <button type="button" className="arr_btn" style={btn===true||friendPage===1?{opacity: '0'}:{opacity: '1'}} id="next" disabled={btn} onClick={next}><img className="arr_img" src="/img/arr-right-circle.svg"/></button>
                </div>
            </div>
            <div className="section3_box">
                <div className="sec_post_container">
                    <div className="sec_post_box">
                        <div className="sec_post_img">
                            <img className="sec3_img1" src="/img/post_img.png"/>
                        </div>
                        <div className="sec_post_title">
                            <p>게시물</p>
                        </div>
                    </div>
                </div>
                {
                    idx===param ?
                    <>
                        <div className="sec_chat_container">
                            <Link to={"/mainTalk?idx="+idx}>
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
                            <Link to={"/mainMap?idx="+idx}>
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
                    </>
                    :
                    ''
                }
            </div>
        </MainProfileWrap>
    );

    //이미지 업로드 js 
    function handleFileSelect(evt) {
        setImgFile(evt.target.files);
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