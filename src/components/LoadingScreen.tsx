import React from "react";

export const LoadingScreen = () => {
    return (
        <div className="comments-loading">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
