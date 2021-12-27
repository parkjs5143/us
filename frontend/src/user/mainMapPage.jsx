import React from "react";
import Header from "../UserComponents/header";
import MainProfile from "../UserComponents/mainProfile";
import MainMap from "../UserComponents/mainMap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainForm = styled.div`
    *{ text-decoration:none; }

    .container{ padding-top: 1.5rem; max-width: 100rem; margin: 0 auto; }
    
    .sec_location_box { border-top: 1.5px solid #222; }
`;

const MainMapPage = () =>{
    const param = window.location.search.split('=')[1]

    return (
        <>
        <Header idx={param} param={param}/>
        <MainForm>
            <div className="container">
                <MainProfile idx={param} param={param}/>
                <MainMap idx={param}/>
            </div>
        </MainForm>
        </>
    );
} 

export default MainMapPage;