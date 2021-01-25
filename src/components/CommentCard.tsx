import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { mutate } from "swr";
import { ForumContext } from "../App";

export const CommentCard = ({ data }: any) => {
    const { getUrl, putUrl, deleteUrl }: any = useContext(ForumContext);

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
            console.log(data);
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
        <div className="comment-item animate__animated animate__fadeInLeft">
            <div className="comment-info">
                <div className="user-info">
                    <i className="fas fa-user"></i>
                    <span> {data.user_email}</span>
                </div>
                <div className="comment-options">
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="update-tooltip">
                                Update comment
                            </Tooltip>
                        }
                    >
                        <i className="fas fa-edit" onClick={handleEdit}></i>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="update-tooltip">
                                Delete comment
                            </Tooltip>
                        }
                    >
                        <i className="fas fa-trash" onClick={deleteComment}></i>
                    </OverlayTrigger>
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
    );
};
