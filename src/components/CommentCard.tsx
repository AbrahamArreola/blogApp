import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { mutate } from "swr";
import { ForumContext } from "../App";
import { ICommentCard, IReply, IUrls } from "../helpers/interfaces";
import { ReplyCard } from "./ReplyCard";

export const CommentCard = ({ data, replyComment }: ICommentCard) => {
    const { getUrl, putUrl, deleteUrl }: IUrls = useContext(ForumContext);

    const [onEdit, setOnEdit] = useState(false);
    const [text, setText] = useState(data.content);

    const handleEdit = () => {
        if (onEdit) {
            setText(data.content);
        }
        setOnEdit(!onEdit);
    };

    const handleCancel = () => {
        setText(data.content);
        setOnEdit(false);
    };

    const updateComment = async () => {
        try {
            data.content = text;
            await axios.put(`${putUrl}${data.id}`, data);
            setOnEdit(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async () => {
        try {
            await axios.delete(`${deleteUrl}${data.id}`);
            mutate(getUrl);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className="comment-item animate__animated animate__fadeInLeft">
                <div className="comment-info">
                    <div className="user-info">
                        <i className="fas fa-user"></i>
                        <span> {data.user_email}</span>
                    </div>
                    <div className="comment-options">
                        <i
                            className="fas fa-reply"
                            data-tip
                            data-for="reply-tip"
                            onClick={() => replyComment(data)}
                        ></i>
                        <ReactTooltip id="reply-tip" place="top">
                            Reply
                        </ReactTooltip>

                        <i
                            className="fas fa-edit"
                            data-tip
                            data-for="update-tip"
                            onClick={handleEdit}
                        ></i>
                        <ReactTooltip id="update-tip" place="top">
                            Update
                        </ReactTooltip>

                        <i
                            className="fas fa-trash"
                            data-tip
                            data-for="delete-tip"
                            onClick={deleteComment}
                        ></i>
                        <ReactTooltip id="delete-tip" place="top">
                            Delete
                        </ReactTooltip>
                    </div>
                </div>
                {onEdit ? (
                    <div className="comment-edit">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <Button variant="primary" onClick={updateComment}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <p>{data.content}</p>
                )}
            </div>
            {data?.replies.map((reply: IReply) => (
                <ReplyCard key={reply.id} data={reply} />
            ))}
        </Fragment>
    );
};
