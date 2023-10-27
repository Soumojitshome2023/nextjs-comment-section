"use client"
import React, { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export function allData() {
    const udbname = 'comments_test';

    const [commentinput, setcommentinput] = useState('');
    const [userdata, setuserdata] = useState('');
    const [bcode, setbcode] = useState(-1);

    const [comments, setcomments] = useState([]);
    const [replies, setreplies] = useState([]);
    const [openReplyIndex, setOpenReplyIndex] = useState(null);
    const [OpenReplyIndexName, setOpenReplyIndexName] = useState("Comment your thoughts");

    const initialCommentCount = comments.length;
    const initialCounts = Array(initialCommentCount).fill(0);
    const [replyCounts, setReplyCounts] = useState(initialCounts);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            setuserdata({
                user_uid: localStorage.getItem("user_uid"),
                user_name: localStorage.getItem("user_name"),
                user_email: localStorage.getItem("user_email"),
                user_photoURL: localStorage.getItem("user_photoURL"),
            })
        }
    }, [])

    return {
        udbname, commentinput, setcommentinput, userdata, setuserdata, bcode, setbcode, comments, setcomments, replies, setreplies, openReplyIndex, setOpenReplyIndex, replyCounts, setReplyCounts, OpenReplyIndexName, setOpenReplyIndexName, isLoading, setisLoading
    };
}

const Context = ({ children }) => {
    const data = allData();
    return (
        <div>
            <MyContext.Provider value={data}>
                {children}
            </MyContext.Provider>
        </div>
    )
}

export default Context;