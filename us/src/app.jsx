
import './app.css';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; //a태그 기능
import MainPage from './pages/main';
import MainTalkPage from './pages/mainTalkPage';
import MainMapPage from './pages/mainMapPage';

import SignInPage from './pages/SignInPage';
import RegistPage from './pages/RegistPage';
import FindIdPage from './pages/FindIdPage';
import FinishIdPage from './pages/FinishIdPage';
import FindPwPage from './pages/FindPwPage';
import FinishPwPage from './pages/FinishPwPage';

import Mypage from './pages/mypage';
import MypagePw from './pages/mypagePw';
import MypageLogin from './pages/mypageLogin';
import MypageQnA from './pages/mypageQnA';

import UploadPage from './pages/uploadPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path={"/main"} element={<MainPage/>}/>
        <Route path={"/maintalk"} element={<MainTalkPage/>}/>
        <Route path={"/mainmap"} element={<MainMapPage/>}/>
        
        <Route path={"/Regist1"} element={<RegistPage/>}/>
        <Route path={"/"} element={<SignInPage/>}/>
        <Route path={"/FindIdPw"} element={<FindIdPage/>}/>
        <Route path={"/SuckFindId"} element={<FinishIdPage/>}/>
        <Route path={"/FindIdPw2"} element={<FindPwPage/>}/>
        <Route path={"/FinFindidpw"} element={<FinishPwPage/>}/>

        <Route path={"/mypage"} element={<Mypage/>}/>
        <Route path={"/mypagePw"} element={<MypagePw/>}/>
        <Route path={"/mypageLogin"} element={<MypageLogin/>}/>
        <Route path={"/mypageQnA"} element={<MypageQnA/>}/>
        
        <Route path={"/uploadpage"} element={<UploadPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
