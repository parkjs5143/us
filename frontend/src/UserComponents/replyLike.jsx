import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const ReplyLike = ({replyIdx, memberIdx})=>{
    const [isLike, setIsLike] = useState('0');

    useEffect(async () => {
        const getAxios = await axios.get(`http://localhost:3001/reply/like/exist?replyIdx=${replyIdx}&memberIdx=${memberIdx}`);
        console.log(getAxios);
        setIsLike(getAxios.data[0].success);
    }, [isLike]);

    const handleClick = async ()=>{
        axios.get(`http://localhost:3001/reply/like?replyIdx=${replyIdx}&memberIdx=${memberIdx}`).then((res)=>{
            console.log(res.data);
            res.data ? setIsLike('1') : setIsLike('0');
        });
    }

    return(
        isLike===1 ? 
            <div className="like_box">
                <button type="button" className="like_btn">
                    <img className="like_img" src="/img/heart.png" alt="좋아요비활성화" onClick={handleClick}/>
                </button>
            </div>
        :
        <div className="like_box">
            <button type="button" className="like_btn">
                <img className="like_img" src="/img/smile.png" alt="좋아요활성화" onClick={handleClick}/>
            </button>
        </div>
    )
}

export default ReplyLike;