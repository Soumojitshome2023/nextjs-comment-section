import React, { useContext, useEffect } from 'react'
import { MyContext } from "./ContexAPI";
import { database, ref, get } from "./firebase";

export default function FetchData() {

    const user = useContext(MyContext)
    const { udbname, commentinput, setbcode, comments, setcomments, replies, setreplies, openReplyIndex, setOpenReplyIndex, replyCounts, setReplyCounts, setOpenReplyIndexName, setisLoading } = user;

    useEffect(() => {
        fetchData();
    }, [commentinput])

    const fetchData = async () => {

        const dataRef = ref(database, udbname);
        try {
            const snapshot = await get(dataRef);
            let comment_data = [];
            let reply_data = [];
            // let replyCountsData = Array(5).fill(false);
            let replyCountsData = {};

            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    let userData = childSnapshot.val();
                    // console.log('Fetched Data:',  userData);
                    if (userData.bcode == -1) {
                        comment_data.push(userData);
                    }
                    else {
                        reply_data.push(userData);
                        replyCountsData[userData.bcode] = (replyCountsData[userData.bcode] || 0) + 1;
                    }

                })
                // console.log(comment_data)
                setcomments(comment_data);
                setreplies(reply_data);
                setReplyCounts(replyCountsData);
                setisLoading(false);
                // const fetchedData = snapshot.val();
                // console.log('Fetched Data:',  fetchedData);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const click_on_reply = (index, senderName) => {
        setbcode(index)
        if (openReplyIndex === index) {
            setOpenReplyIndex(null); // Close the current reply box
            setbcode(-1);
            setOpenReplyIndexName("Comment your thoughts");
        } else {
            setOpenReplyIndex(index); // Open the clicked reply box
            setOpenReplyIndexName(`Replies to ${senderName} Comment`);
        }
    };


    return (
        <div className="comment_sec_comments_sec">
            <div className="comment_sec_all_comments">

                {comments.map((data, index) => {
                    // console.log(data.sender_picurl)
                    return (
                        <div key={index} className="comment_sec_comment">
                            <div className="comment_sec_sndr_name">
                                <img src={data.sender_picurl} alt="pic" />{data.sender_name}&emsp;{data.date_time}
                            </div>
                            <span className="comment_sec_comment_message">{data.comment}</span>
                            <button className="comment_sec_reply_btn" onClick={() => { click_on_reply(index, data.sender_name) }}>
                                {openReplyIndex === index ? "Hide Reply" : `Show Reply (${replyCounts[index] ? replyCounts[index] : 0})`}
                            </button>

                            {openReplyIndex === index && (
                                <div className="comment_sec_reply_box">
                                    {
                                        replies.map((reply_data, reply_index) => {
                                            if (reply_data.bcode == index) {
                                                return (
                                                    <div key={reply_index} className="comment_sec_reply_msg">
                                                        <div className="comment_sec_sndr_name"><img src={reply_data.sender_picurl} alt="pic" />{reply_data.sender_name}&emsp;{reply_data.date_time}
                                                        </div>
                                                        <span className="comment_sec_comment_message replymsg">{reply_data.comment}</span>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}