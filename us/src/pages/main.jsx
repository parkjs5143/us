import React from "react";
import Header from "../components/header";
import MainProfile from "../components/mainProfile";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainForm = styled.div`

    *{text-decoration:none;}
    .container{padding-top: 1.5rem; max-width:100rem; margin: 0 auto;}
    .sec_post_box { border-top: 1.5px solid #222; }
    .social_box{display:flex; justify-content: space-between;}
    .social1_img{width:31.5rem; height:31.5rem; cursor:pointer;}
    .social_layer{padding-bottom: 8rem;}
    .slide_box{transform: translate(28.7rem,-31rem); cursor:pointer;}
    .sec4_slide{width:1.8rem;}
`;


const MainPage = () =>{

    return (
        <>
        <Header/>
        <MainForm>
            <div className="container">
                <MainProfile/>
                <div className="section4_box">
                    <div className="social_layer">
                        <div className="social_box">
                            <div>
                                <div className="social1">
                                    <img className="social1_img" src="/img/social1.jpg" alt="소셜이미지1"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                            <div>
                                <div className="social2">
                                    <img className="social1_img" src="/img/social2.jpg" alt="소셜이미지2"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                            <div>
                                <div className="social3">
                                    <img className="social1_img" src="/img/social3.jpg" alt="소셜이미지3"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                        </div>
                        <div className="social_box">
                            <div>
                                <div className="social1">
                                    <img className="social1_img" src="/img/social1.jpg" alt="소셜이미지1"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                            <div>
                                <div className="social2">
                                    <img className="social1_img" src="/img/social2.jpg" alt="소셜이미지2"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                            <div>
                                <div className="social3">
                                    <img className="social1_img" src="/img/social3.jpg" alt="소셜이미지3"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                        </div>
                        <div className="social_box">
                            <div>
                                <div className="social1">
                                    <img className="social1_img" src="/img/social1.jpg" alt="소셜이미지1"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                            <div>
                                <div className="social2">
                                    <img className="social1_img" src="/img/social2.jpg" alt="소셜이미지2"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                            <div>
                                <div className="social3">
                                    <img className="social1_img" src="/img/social3.jpg" alt="소셜이미지3"/>
                                </div>
                                <div className="slide_box">
                                    <img className="sec4_slide" src="/img/slide.png" alt="slide"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainForm>
        </>
    );
} 

export default MainPage;