
import './app.css';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// 관리자
import AdMainPage from './admin/mainPage';
import MemberPage from './admin/memberPage';
import QuestionPage from './admin/questionPage';
import PostPage from './admin/postPage';
import ChatPage from './admin/chatPage';
import Login from './admin/loginPage';
import PostDetailPage from './admin/postDetailPage';
import QuestionDetailPage from './admin/questionDetailPage';
import MemberDetailPage from './admin/memberDetailPage';
import MemberPostPage from './admin/memberPostPage';
import MemberChatPage from './admin/memberChatPage';
import ChatDetailPage from './admin/chatDetailPage';

// 사용자
import MainPage from './user/main';
import MainTalkPage from './user/mainTalkPage';
import MainMapPage from './user/mainMapPage';

import SignInPage from './user/SignInPage';
import RegistPage from './user/RegistPage';
import FindIdPage from './user/FindIdPage';
import FinishIdPage from './user/FinishIdPage';
import FindPwPage from './user/FindPwPage';
import FinishPwPage from './user/FinishPwPage';

import Mypage from './user/mypage';
import MypagePw from './user/mypagePw';
import MypageLogin from './user/mypageLogin';
import MypageQnA from './user/mypageQnA';

import DetailPage from './user/detailPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* 관리자 */}
        <Route exact path={"/admin/main"} element={<AdMainPage/>} />
        <Route path={"/admin/member"} element={<MemberPage/>} />
        <Route path={"/admin/chat"} element={<ChatPage/>} />
        <Route path={"/admin/post"} element={<PostPage/>} />
        <Route path={"/admin"} element={<Login/>} />
        <Route path={"/admin/question"} element={<QuestionPage/>} />
        <Route path={"/admin/question/detail/:idx"} element={<QuestionDetailPage/>} />
        <Route path={"/admin/post/detail/:idx"} element={<PostDetailPage/>} />
        <Route path={"/admin/member/detail/:idx"} element={<MemberDetailPage/>} />
        <Route path={"/admin/member/post/:idx"} element={<MemberPostPage/>} />
        <Route path={"/admin/member/chat/:idx"} element={<MemberChatPage/>} />
        <Route path={"/admin/chat/detail/:idx"} element={<ChatDetailPage/>} />

        {/* 사용자 */}
        <Route path={"/main/:idx"} element={<MainPage/>}/>
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
        
        <Route path={"/detail/:idx"} element={<DetailPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
