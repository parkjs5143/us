# us
### Us 웹 소셜 플랫폼 (React, Node.js)

```
1. 기간 : 2021.11.08 ~ (ing)
2. 환경 : Node.js, Chrome 브라우저
3. 주제 : 소셜 채팅 플랫폼
4. 개발 : Visual Studio Code, MySQL
5. 사용 언어 : Node.js, React, MySQL SQL, HTML5, CSS3, Javascript(ES6)
6. 사용 기술 : axios, Ajax, Open API(다음카카오), Mail API, soket.io
```

### 프로젝트 상세내용
**주제**
* 소셜 플랫폼 ( 게시물 업로드, 친구 추가, 1:1 실시간 채팅 기능 )

### 구현 목표
**사용자**
* 회원가입/로그인, 아이디 찾기/비밀번호 찾기 가능(유효성검사)
* 게시물 등록(이미지-최대6개, 글)
* 게시물 수정/삭제
* 게시물에 댓글 달 수 있음(대댓글에 대댓글 달 수 있음)
* 본인이 단 댓글 삭제 가능
* 댓글에 좋아요/취소 가능
* 개인 코드를 통해 친구 등록 및 해지 (회원가입 시 코드생성)
* 친구와 1:1 채팅 기능 (socket.io 이용)
* 마이페이지로 프로필 수정 및 탈퇴
* 마이페이지로 비밀번호 수정(이전 비밀번호, 새 비밀번호, 비밀번호 확인)
* 마이페이지에서 문의하기 가능(일반문의/신고)

**관리자**
+ 가입한 회원의 정보 및 회원의 게시물, 채팅방 목록, 상세내용 등을 확인 가능
+ 회원들이 생성한 채팅방 및 게시물, 댓글, 상세 내용 확인 가능
+ 회원들의 문의 내용 확인 및 답변 등록 및 수정
+ 조건 검색을 통한 특정 게시물 및 채팅방, 회원, 문의 검색
+ 회원 문의 삭제 기능
+ 로그인/로그아웃 기능

**맡은 역할 (프론트엔드 사용자 페이지)**
+ 채팅(socket.io 를 이용한 소켓통신)
+ 위치(카카오 API이용하여 친구 위치 및 내 위치 표시)
+ 마이페이지(문의하기, 신고하기, 프로필 수정, 비밀번호 변경)
+ 게시물 업로드(multipart-formData 이용해 이미지 여러장 업로드, 글 내용과 함께 form 타입으로 묶어 전송)
+ 댓글(좋아요)

### 구동 화면
##### 로그인
![loginpage](https://user-images.githubusercontent.com/75155418/146747126-be0c1e0a-a5ed-4161-8087-fad02c7b8370.png)

##### 회원가입
![joinpage](https://user-images.githubusercontent.com/75155418/146747714-ca0e9ebc-e456-4e9e-b9d6-ebda58627940.png)

##### 메인(게시물)
![main](https://user-images.githubusercontent.com/75155418/145069016-ee490278-32c1-47e8-8f77-cdbf1229c6ec.png)

##### 게시물(업로드&수정&삭제)
![postEdit](https://user-images.githubusercontent.com/75155418/147921380-207e53d2-35a6-4081-8197-6a6600192b72.gif)

##### 게시물(댓글&대댓글&삭제)
![postReply](https://user-images.githubusercontent.com/75155418/147920700-bb4737da-f1ce-4075-98f2-c6413c8fda1f.gif)

##### 메인(채팅)
![main_chat](https://user-images.githubusercontent.com/75155418/146749862-fa85f101-d265-4edf-93d7-3a68684bd034.gif)

##### 메인(내위치/친구위치)
![mainpage_map](https://user-images.githubusercontent.com/75155418/146751025-34bc2a93-6d10-41bc-aa95-9d8a58d4d3dc.gif)

##### 친구추가(팝업)
![friends](https://user-images.githubusercontent.com/75155418/146752451-9ea2a8d5-e184-4b55-889c-c44fa6a7f89c.gif)

##### 마이페이지
![mypage](https://user-images.githubusercontent.com/75155418/145069673-abfc1f3f-bb50-44e9-9a22-01ae606635a3.png)

##### 마이페이지(문의하기)
![mypageQnA](https://user-images.githubusercontent.com/75155418/145070591-a3fdabc1-f77e-46d6-b05e-538c3dfffcfe.png)

##### 관리자
![admin](https://user-images.githubusercontent.com/75155418/145069519-1c291401-f7ed-43c8-9f0c-66e72e68be77.png)

##### 관리자(회원)
![admin_member](https://user-images.githubusercontent.com/75155418/146754218-9c9b7bea-a06a-4814-a76d-cea89f7ca6bb.gif)

##### 관리자(게시물)
![admin_post](https://user-images.githubusercontent.com/75155418/146757209-044e5e9a-ff4f-4920-a022-97869abf2e74.gif)

##### 관리자(채팅)
![admin_chat](https://user-images.githubusercontent.com/75155418/146757581-f4177159-1d3f-4f21-a8a8-984aa13d5ffe.gif)

#### 관리자(문의)
![admin_qna](https://user-images.githubusercontent.com/75155418/146758802-30ca64a7-a431-49c9-b4ae-5dcaa192aaf1.png)
