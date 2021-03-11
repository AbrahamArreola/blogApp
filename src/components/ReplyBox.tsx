import axios from "axios";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { mutate } from "swr";
import { ForumContext } from "../App";
import { IReplyBox, IUrls } from "../helpers/interfaces";

export const ReplyBox = ({ data, hide, emailLogged }: IReplyBox) => {
    const { getUrl, postReplyUrl }: IUrls = useContext(ForumContext);

    const [reply, setReply] = useState("");
    const [error, setError] = useState("");

    const makeReply = async () => {
        if (reply === "") {
            setError("Reply is required");
        } else if (emailLogged === "") {
            setError("You need to login to reply this comment");
        } else {
            try {
                const newReply = {
                    user_email: emailLogged,
                    content: reply,
                    commentId: data.id,
                };

                await axios.post(postReplyUrl, newReply);

                mutate(getUrl);
                hide();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="reply-box">
            <div className="reply-shadow-screen"></div>
            <div className="reply-section">
                <p>Replying to: {data?.user_email}</p>
                <textarea
                    placeholder="Your reply"
                    value={reply}
                    onChange={(e) => {
                        setError("");
                        setReply(e.target.value);
                    }}
                ></textarea>
                <Button variant="primary" onClick={makeReply}>
                    Reply
                </Button>
                <Button variant="secondary" onClick={hide}>
                    Cancel
                </Button>
                {error !== "" ? <span>{error}</span> : ""}
            </div>
        </div>
    );
};
