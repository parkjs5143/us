# us
### Us 웹 소셜 플랫폼 (React, Node.js)

```
1. 기간 : 2021.11.08 ~ 2022.01.08
2. 환경 : Node.js, Chrome 브라우저
3. 주제 : 소셜 채팅 플랫폼
4. 개발툴 : Visual Studio Code, MySQL Workbench
5. 사용 언어 : Node Express, React, MySQL
6. 사용 기술 : Ajax, Open API(카카오), Mail API, soket.io
7. 인원 : 프론트엔드 - 박정순(나), 김미정, 진서영, 박소민, 이재성 / 백엔드 - 소윤정, 정영범
```

### 프로젝트 개요

최대한 SPA를 지향하기 위해, 모바일 어플리케이션인 비트윈과 인스타그램을 벤치마킹하였습니다.
비트윈은 커플들을 위한 1:1 채팅 어플입니다. 오로지 연결된 사람하고만 채팅을 하고 콘텐츠를 주고 받을 수 있는 점을 가치있게 판단하여 이를 모티브 삼았습니다.
여기에 인스타그램의 기능인 게시물을 올리고, 좋아요와 댓글 기능까지 추가하기 위해 인스타그램의 SNS 기능을 더했습니다. 따라서 콘텐츠를 불특정 다수에게 노출하지 않고, 특정한 인물들만 한정해 공개하는 폐쇄형 SNS로 만들었습니다.

### 맡은 역할 (기여도 15%)
+ 지도(kakao map 이용하여 지도 노출 & 내위치 및 친구 위치표시) - 프론트 작업
+ 채팅(socket.io 를 이용한 소켓 통신) - 프론트 작업
+ 마이페이지(문의하기, 신고하기, 프로필 수정, 비밀번호 변경) - 프론트 작업
+ 게시물 업로드(multipart-formData 이용해 이미지들과 글 내용 form 타입으로 묶어 전송) - 프론트 작업
+ 게시물 수정, 삭제 - 프론트 작업
+ 댓글(좋아요) 대댓글, 삭제 - 프론트 작업

### ERD
![erd](https://user-images.githubusercontent.com/75155418/147924496-f23517bb-a120-42fb-99bd-3d58fecb7567.png)

### 구동 화면
##### 로그인/회원가입
+ 유효성 검사
![join](https://user-images.githubusercontent.com/75155418/147923649-53450fe3-6a37-4a93-96ec-9c1a2802d7c8.gif)

##### 아이디/비밀번호 찾기
+ 아이디 찾기 시 일부 아이디 노출
+ 비밀번호 변경 시 임시 비밀번호 이메일로 발송
![findEmailPw](https://user-images.githubusercontent.com/75155418/147923514-a4b0655e-47fd-4a3b-90c5-53b574eebfcb.gif)

##### 메인 게시물(업로드&수정&삭제)
* 게시물 등록(이미지-최대6개, 글)
![postEdit](https://user-images.githubusercontent.com/75155418/147921380-207e53d2-35a6-4081-8197-6a6600192b72.gif)

##### 게시물 디테일(댓글&대댓글&좋아요&삭제)
* 댓글달기, 대댓글, 좋아요, 삭제
![postReply](https://user-images.githubusercontent.com/75155418/147920700-bb4737da-f1ce-4075-98f2-c6413c8fda1f.gif)

##### 메인 채팅
* 친구와 1:1 채팅 기능 (socket.io 이용)
![main_chat](https://user-images.githubusercontent.com/75155418/146749862-fa85f101-d265-4edf-93d7-3a68684bd034.gif)

##### 메인 위치
+ 친구 위치 및 내 위치 표시(카카오 API이용)
![mainpage_map](https://user-images.githubusercontent.com/75155418/146751025-34bc2a93-6d10-41bc-aa95-9d8a58d4d3dc.gif)

##### 친구추가(팝업)
* 개인 코드를 통해 친구 등록 및 해지 (회원가입 시 생성되는 코드이용)
![friends](https://user-images.githubusercontent.com/75155418/146752451-9ea2a8d5-e184-4b55-889c-c44fa6a7f89c.gif)

##### 마이페이지
* 마이페이지로 프로필 수정 및 탈퇴
![mypage](https://user-images.githubusercontent.com/75155418/145069673-abfc1f3f-bb50-44e9-9a22-01ae606635a3.png)

##### 마이페이지(문의하기)
* 마이페이지에서 문의하기 가능(일반문의/신고)
![mypageQnA](https://user-images.githubusercontent.com/75155418/145070591-a3fdabc1-f77e-46d6-b05e-538c3dfffcfe.png)

##### 관리자
![admin](https://user-images.githubusercontent.com/75155418/145069519-1c291401-f7ed-43c8-9f0c-66e72e68be77.png)

##### 관리자(회원)
+ 가입한 회원의 정보 및 회원의 게시물, 채팅방 목록, 상세내용 등을 확인 가능
![admin_member](https://user-images.githubusercontent.com/75155418/146754218-9c9b7bea-a06a-4814-a76d-cea89f7ca6bb.gif)

##### 관리자(게시물)
+ 회원들이 생성한 채팅방 및 게시물, 댓글, 상세 내용 확인 가능
![admin_post](https://user-images.githubusercontent.com/75155418/146757209-044e5e9a-ff4f-4920-a022-97869abf2e74.gif)

##### 관리자(채팅)
+ 조건 검색을 통한 특정 게시물 및 채팅방, 회원, 문의 검색
![admin_chat](https://user-images.githubusercontent.com/75155418/146757581-f4177159-1d3f-4f21-a8a8-984aa13d5ffe.gif)

#### 관리자(문의)
+ 회원들의 문의 내용 확인 및 답변 등록 및 수정
![admin_qna](https://user-images.githubusercontent.com/75155418/146758802-30ca64a7-a431-49c9-b4ae-5dcaa192aaf1.png)

---
### 프로젝트 회고
국비 과정이 끝나고 지도자 없이 같은 조였던 팀원들끼리 공부하고 작업한 프로젝트라 어려운 점이 많았지만, 많이 소통하고 서로 배려하고 부족한 점을 채워주려고 노력했던 덕분에 성공적으로 프로젝트를 마칠 수 있었다.
아무런 도움 없이 각자 혼자 공부하고 작업한 프로젝트라 많이 부족했겠지만, 그래도 혼자서 프레임워크를 공부하고 실전까지 사용해 볼 수 있는 값진 경험을 얻게 되었다.
