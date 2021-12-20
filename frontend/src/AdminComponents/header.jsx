import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderForm = styled.div`
    background-color: rgb(248, 250, 252);
    width: 100%;
    height: 7rem;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    margin-top: 0;
    box-shadow: 3px 3px 3px rgb(240,240,240);
    padding-top: 1rem;
    .main-logo {
        margin-left: 5%;
    }
    .logout-logo {
        margin-left: 83%;
    }
    .logo {
        width: 10rem;
    }
    .logo2 {
        width: 3.5rem;
    }
`;
const Header = () => {

    const logout = async () =>{
        await axios.get('http://localhost:3001/admin/logout')
        alert('로그아웃 되었습니다')
        window.location.href="/admin"
    }
    
    return (
        <HeaderForm>
            <Link to="/admin/main" className="main-logo">
                <img src="/img/admin/us_logo.png" className="logo"/>
            </Link>
            <div className="logout-logo">
                <img src="/img/admin/logout.png" className="logo2" onClick={logout}/>
            </div>  
        </HeaderForm>  
    );
}

export default Header;