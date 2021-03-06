import React from "react";
import { IReplyCard } from "../helpers/interfaces";

export const ReplyCard = ({data} : IReplyCard) => {
    return (
        <div className="reply-item comment-item animate__animated animate__fadeInLeft">
            <div className="comment-info">
                <div className="user-info">
                    <i className="fas fa-user"></i>
                    <span> {data.user_email}</span>
                </div>
            </div>
            <p>{data.content}</p>
        </div>
    );
};
