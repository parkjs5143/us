import React from "react";
import Header from "../components/header";
import MainProfile from "../components/mainProfile";
import MainMap from "../components/mainMap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainForm = styled.div`
    *{ text-decoration:none; }

    .container{ padding-top: 1.5rem; max-width: 100rem; margin: 0 auto; }
    
    .sec_location_box { border-top: 1.5px solid #222; }
`;

const MainMapPage = () =>{
    return (
        <>
        <Header/>
        <MainForm>
            <div className="container">
                <MainProfile/>
                <MainMap/>
            </div>
        </MainForm>
        </>
    );
} 

export default MainMapPage;