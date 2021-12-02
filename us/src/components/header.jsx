import React from "react";
import styled from "styled-components"; //css 사용할 때 import시켜줘야 함
import {Link} from 'react-router-dom';

const HeaderForm = styled.div`
    .header_container{border-bottom: 1px solid #8080803b; background-color: rgb(255, 255, 255); width: 100%; height: 5rem; display: flex; justify-content: space-evenly;}
    .header_box{display: flex;}
    .logo_img{vertical-align: middle; width: 5rem;}
    .logo_box{margin-right: 400px; vertical-align: middle; padding-top: 1rem;}
    .logout_box{margin-left: 40rem; vertical-align: middle; padding-top: 1rem;}
    .logout_tag{width: 7rem;}
`;

const Header = () =>{
    return (
        <HeaderForm>
            <div className="header_container">
                <div className="header_box">
                    <div className="logo_box">
                        <Link to="/main"><img className="logo_img" alt="logo" src="/img/us_logo.png"/></Link>
                    </div>
                    <div className="logout_box">
                        <Link to="/"><img className="logout_tag" alt="logout" src="/img/logout_img.png"/></Link>
                    </div>
                </div>
            </div>
        </HeaderForm>
    );
} 

export default Header;