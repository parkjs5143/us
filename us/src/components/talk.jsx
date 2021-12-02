import React, {useEffect, useRef} from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

const TalkWrap = styled.div`
    z-index: 100; 
    position:fixed; 
    left:0; 
    top:0; 
    width:100%; 
    height:100%; 
    background:rgba(0,0,0,0.3);

    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .talkBox { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #aee7e2; border:1px solid rgba(0,0,0,0.3s); width: 60rem; height: 70rem; }
    .talkHeader { display: flex; align-items: center; padding: 2rem; background-color: rgb(0 0 0 / 8%); }
    .recieverName { align-items: center; margin-left: 2rem; font-size: 2rem; font-weight: 600; color: rgba(54,54,54); }
    .talkToggle{ margin-left: auto; margin-right: 1rem; position: relative; }
    .talkToggle > img { width: 3rem; height: 2.7rem; cursor: pointer; }
    .talkToggle > img:first-child { margin-right:1rem; }
    .talkExitPop { position: absolute; width: max-content; top: 5rem; background-color: #fff; padding: .7rem 2.5rem; border:1px solid rgb(0 0 0 / 8%); cursor: pointer; display: none; }
    .talkExitPop:hover { background-color: rgb(236, 236, 236);}
    .talkProfileImg { width: 7rem; cursor: pointer; }
    .talkList { overflow-y: scroll; padding: 2rem; padding-bottom: 0; height: 47rem; }
    .reciverTalk { display: flex; align-items: flex-start; margin-bottom: 2rem; }
    .talkContents .talkProfileImg { width: 6.5rem; }
    .talkDetailWrap { margin-left: 1rem; max-width: 50%; margin-top: 1rem; }
    .talkProfileName { margin-bottom: .5rem; font-weight: 600; }
    .talkDetailList { margin-left: .5rem; background-color: #fff; padding: .7rem; border-radius: .5rem; word-break : break-all; line-height: 2.5rem; }
    .senderTalk { display: flex; flex-direction: row-reverse; margin-bottom: 2rem; }
    .talkSendWrap{ padding: 2rem; position: relative; background-color: #fff; }
    .talkTextInput { height: 10rem; width: 90%; font-family: "Nanum Gothic", sans-serif; }
    .talkSendBtn { display: inline-block; position: absolute; top: 2rem; right: 2rem; background-color: rgb(204, 204, 204); color: #fff; padding: .5rem .7rem; border: 1px solid rgb(0 0 0 / 10%); border-radius: 5px; cursor: pointer; }
    .talkSendBtn:hover { box-shadow: rgb(0 0 0 / 20%) 2px 2px 2px; }
    .talkSendBtn.active { color: #333; }
`;

const Talk = ({current})=>{
    const recieverName = '당근당근';
    const recieverImg = 'img/blank_profile.png';
    const {img, name, idx, memberIdx, title} = current;
    let socket;
    
    // 채팅창 팝업
    const[addOn, setAddOn] = React.useState(true);

    const searchElement = useRef(null); // DOM 요소를 searchElement에 할당

    useEffect(() => {
        if (searchElement.current) { // 할당한 DOM 요소가 불러지면 (마운트 되면)
            searchElement.current.focus(); // textarea에 focus 할당!

            connectToServer();  // 서버 연결
        }
    }, []);

    const sendMsg = (event)=>{
        const data = document.querySelector('.talkTextInput').value;
        const output = {memberIdx:memberIdx, sender:name, commend:'chat', type:'text', data:data, roomName : title};
        console.log(output);
        if(socket == undefined){
            alert('서버에 연결되지 않았습니다. 서버를 연결하세요');
            return;
        }
        socket.emit('message', output);
    }

    function connectToServer(){
        const url = `http://127.0.0.1:3001`;
        console.log(url)
        socket = io.connect(url);
        console.log('socket 객체 생성')
        socket.on('connect', function(){
            console.log('웹소켓 서버에 연결되었습니다.')
            socket.on('message', function(message){
                console.log(JSON.stringify(message));
                println(`${message.sender} ${message.data}`)
            })
        });
        socket.emit('joinRoom', idx);
        console.log(`방 ${title}입장`);
    }

    function println(data){
        document.querySelector('.talkContents').append(`<div className='reciverTalk'>
        <div className='talkProfileImgWrap'>
            <img className='talkProfileImg' src=${img} alt='프로필 사진'></img>
        </div>
        <div className='talkDetailWrap'>
            <div className='talkProfileName'>${name}</div>
            <div className='talkDetailList'>${data}</div>
        </div>
    </div>`);
    }

    const closePop = () => {
        setAddOn(false);
        document.body.style.overflowY = "unset";
    }

    return(
        <>
        {addOn ? (
            <TalkWrap>
            <div className="talkBox">
                <div className='talkHeader'>
                    <div className='talkProfileImgWrap'>
                        <img className='talkProfileImg' src={img} alt='프로필 사진'/>
                    </div>
                    <h2 className='recieverName'>{title}</h2>
                    <div className='talkToggle'>
                        <img src='img/talk_toggle.svg' alt='메뉴'></img>
                        <img src='img/close_icon.svg' alt='나가기' onClick={closePop}></img>
                        <div className='talkExitPop'>채팅방 나가기</div>
                    </div>
                </div>
                <div className='talkContents'>
                    <div className='talkList'>
                        <div className='reciverTalk'>
                            <div className='talkProfileImgWrap'>
                                <Link to="/main">
                                    <img className='talkProfileImg' src={img} alt='프로필 사진'></img>
                                </Link>
                            </div>
                            <div className='talkDetailWrap'>
                                <div className='talkProfileName'>{name}</div>
                                <div className='talkDetailList'>네모네모네모</div>
                            </div>
                        </div>
                        <div className='reciverTalk'>
                            <div className='talkProfileImgWrap'>
                                <Link to="/main">
                                <img className='talkProfileImg' src={img} alt='프로필 사진'></img>
                                </Link>
                            </div>
                            <div className='talkDetailWrap'>
                                <div className='talkProfileName'>{name}</div>
                                <div className='talkDetailList'>세모세모 네모네모 동글동글 뾰족뾰족 부들부들 보글보글 지글지글 자글자글 빠글빠글 야들야들 오들오들 시들시들 쭈글쭈글 미끌미끌</div>
                            </div>
                        </div>
                        <div className='reciverTalk'>
                            <div className='talkProfileImgWrap'>
                                <Link to="/main">
                                <img className='talkProfileImg' src={img} alt='프로필 사진'></img>
                                </Link>
                            </div>
                            <div className='talkDetailWrap'>
                                <div className='talkProfileName'>{name}</div>
                                <div className='talkDetailList'>세모세모 네모네모 동글동글 뾰족뾰족 부들부들 보글보글 지글지글 자글자글 빠글빠글 야들야들 오들오들 시들시들 쭈글쭈글 미끌미끌</div>
                            </div>
                        </div>
                        <div className='reciverTalk'>
                            <div className='talkProfileImgWrap'>
                                <Link to="/main">
                                <img className='talkProfileImg' src={img} alt='프로필 사진'></img>
                                </Link>
                            </div>
                            <div className='talkDetailWrap'>
                                <div className='talkProfileName'>{name}</div>
                                <div className='talkDetailList'>세모세모 네모네모 동글동글 뾰족뾰족 부들부들 보글보글 지글지글 자글자글 빠글빠글 야들야들 오들오들 시들시들 쭈글쭈글 미끌미끌</div>
                            </div>
                        </div>
                        <div className='senderTalk'>
                            <div className='talkDetailWrap'>
                                <div className='talkDetailList'>동그르아아아아아아아아아므이이이이이이이이이 동그리동동 동그리동동 동그리동동 동그리동동 동그리동동 동그리동동 동그리동동 동그리동동</div>
                            </div>
                        </div>
                        <div className='senderTalk'>
                            <div className='talkDetailWrap'>
                                <div className='talkDetailList'>붉은색 푸른색</div>
                            </div>
                        </div>
                        <div className='senderTalk'>
                            <div className='talkDetailWrap'>
                                <div className='talkDetailList'>구 사이 삼초 짤븐 시간</div>
                            </div>
                        </div>
                    </div>
                    <div className='talkSendWrap'>
                        <textarea ref={searchElement} className='talkTextInput'></textarea>
                        <button className='talkSendBtn' onClick={sendMsg}>전송</button>
                    </div>
                </div>
            </div>
        </TalkWrap>
        ) : null}
        </>
    )
}

export default Talk;