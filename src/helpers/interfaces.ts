export interface IUrls {
    [key: string]: string;
}

export interface IReply {
    id: number;
    user_email: string;
    content: string;
}

export interface IComment {
    id: number;
    user_email: string;
    content: string;
    replies: IReply[];
}

export interface ICommentCard {
    data: IComment;
    replyComment(data: any): void;
}

export interface IReplyCard {
    data: IReply;
}

export interface IReplyBox {
    data: IReply;
    hide(): void;
    emailLogged: string;
}
