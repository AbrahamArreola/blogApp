import React, { createContext } from "react";
import { SWRConfig } from "swr";
import { Forum } from "./components/Forum";
import { IUrls } from "./helpers/interfaces";
import "./scss/styles.scss";

const fetcher = (
    ...args: [input: RequestInfo, init?: RequestInit | undefined]
) => fetch(...args).then((response) => response.json());

const urls : IUrls = {
    getUrl: "http://localhost:8000/comments",
    postUrl: "http://localhost:8000/comments/create",
    postReplyUrl: "http://localhost:8000/replies/create",
    putUrl: "http://localhost:8000/comments/update/",
    deleteUrl: "http://localhost:8000/comments/delete/",
};

export const ForumContext = createContext({});

function App() {
    return (
        <ForumContext.Provider value={urls}>
            <SWRConfig value={{ fetcher }}>
                <Forum />
            </SWRConfig>
        </ForumContext.Provider>
    );
}

export default App;
