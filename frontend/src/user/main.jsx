import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import MainProfile from "../UserComponents/mainProfile";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const MainForm = styled.div`
    *{text-decoration:none;}
    .container{padding-top: 1.5rem; max-width:100rem; margin: 0 auto;}
    .sec_post_box { border-top: 1.5px solid #222; }
    .social_box{display:flex; flex-wrap: wrap; }
    .social1_img{width:31.5rem; height:31.5rem; cursor:pointer;}
    .social_layer{padding-bottom: 8rem;}
    .slide_box{ position: absolute; cursor:pointer; top: 1rem; right: 1rem; }
    .fa-copy{ font-size:2.2rem; color:#59f9ff; }
    .box, .last_box{ margin-bottom: 2rem; position: relative; }
    .box{ margin-right: 2.75rem; }
    .last_box{ margin: 0 }
`;


const MainPage = () =>{
    const param = window.location.search.split('=')[1]  // 로그인한 memberIdx
    const {idx} = useParams();  // 프로필페이지의 memberIdx

    const [post, setPost] = useState([]);

    useEffect(async () => {
        const cookie = document.cookie; // 받아온 id값 저장

        const post = await axios.get(`http://localhost:3001/main/post?idx=${idx}`)
        console.log(post)
        setPost(post.data)
    }, []);

    return (
        <>
        <Header idx={param}/>
        <MainForm>
            <div className="container">
                <MainProfile idx={idx} param={param}/>
                <div className="section4_box">
                    <div className="social_layer">
                        <div className="social_box">
                            {post.length!==0 ? 
                                post.map((postData, index)=>(
                                    <div className={(index+1)%3===0?'last_box':'box'}>
                                        <Link to={`/detail/${postData.postIdx}?idx=${param}`}>
                                            <div className="social1">
                                                <img className="social1_img" src={'/uploads/'+postData.imgName}/>
                                            </div>
                                            {postData.cnt>1 ?
                                            <div className="slide_box"><i className="far fa-copy"></i></div> : <></>
                                            }
                                        </Link>
                                    </div>
                                )):<></>
                            }
                        </div>
                        {post.length===0 ? 
                            <div style={{textAlign: "center", fontSize: "1.5rem", padding: "10rem", color: "Gray"}}>업로드된 게시물이 없습니다. 게시물을 올려보세요.</div>
                            : <></>
                        }
                    </div>
                </div>
            </div>
        </MainForm>
        </>
    );
} 

export default MainPage;