import axios from "axios";
import React, { KeyboardEvent, useContext, useState } from "react";
import useSWR, { mutate } from "swr";
import { CommentCard } from "./CommentCard";
import { ForumContext } from "../App";
import { LoadingScreen } from "./LoadingScreen";

const ENTER = "Enter";

export const Forum = () => {
    const {getUrl, postUrl} : any = useContext(ForumContext);

    const { error, data } = useSWR(getUrl);

    const [logged, setLogged] = useState(false);
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [fieldError, setFieldError] = useState("");
    const [updatingComments, setUpdatingComments] = useState(false);

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === ENTER && !e.shiftKey) {
            e.preventDefault();
            makeComment();
        }
    };

    const handleButton = () => {
        if (!logged) {
            if (email === "") {
                setFieldError("Email is required");
            } else {
                setLogged(true);
            }
        } else {
            makeComment();
        }
    };

    const makeComment = async () => {
        if (comment === "") {
            setFieldError("Comment is required");
        } else {
            try {
                setUpdatingComments(true);

                const newComment = {
                    user_email: email,
                    content: comment,
                };

                await axios.post(postUrl, newComment);

                mutate(getUrl);
                setComment("");
                setUpdatingComments(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (error) return <h1>Something went wrong!</h1>;

    return (
        <div>
            {data ? "" : <LoadingScreen />}
            {updatingComments ? <LoadingScreen /> : ""}
            <div className="forum-app">
                <div className="comment-board">
                    <h1>{!logged ? "Login the forum" : "Post your comment"}</h1>
                    <div className="data-forms">
                        {!logged ? (
                            <input
                                type="text"
                                placeholder="Type your email"
                                onChange={(e) => {
                                    setFieldError("");
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                        ) : (
                            <textarea
                                placeholder="Write whatever you're thinking"
                                onChange={(e) => {
                                    setFieldError("");
                                    setComment(e.target.value);
                                }}
                                onKeyDown={handleEnter}
                                value={comment}
                            ></textarea>
                        )}
                    </div>
                    {fieldError !== "" ? <p>{fieldError}</p> : ""}
                    <button onClick={handleButton}>
                        {!logged ? "Enter" : "Comment"}
                    </button>
                </div>
                <div className="comments-display">
                    {data?.comments?.map((comment: any) => (
                        <CommentCard key={comment.id} data={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};
