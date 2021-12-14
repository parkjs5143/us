import React, {useEffect, useRef, useState} from "react";
import Header from "../components/header";
import TalkList from "../components/talkList";
import MainProfile from "../components/mainProfile";
import Talk from "../components/talk";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';


const MainForm = styled.div`
    * { text-decoration:none; }
    .container{ padding-top: 1.5rem; max-width:100rem; margin: 0 auto; }
    .sec_chat_box { border-top: 1.5px solid #222; }
`;

const MainTalkPage = () =>{
    const param = window.location.search.split('=')[1];

    return (
        <>
        <Header/>
        <MainForm>
            <div className="container">
                <MainProfile idx={param}/>
                <TalkList idx={param}/>
            </div>
        </MainForm>
        </>
    );
}

export default MainTalkPage;