import React, { useContext } from 'react'
import SubmitData from './SubmitData'
import SignInWithGoogle from './SignInWithGoogle';
import { MyContext } from "./ContexAPI";


export default function CommentInput() {
    const user = useContext(MyContext)
    const { commentinput, setcommentinput, userdata } = user;

    return (
        <div className="comment_sec_comment_input">

            {
                (userdata.user_name == null && userdata.user_photoURL == null) ?
                    <SignInWithGoogle/> :

                    <textarea id="comment_sec_cmnt" name="message" rows="4" cols="50" placeholder="Write your comment here"
                        maxLength="150" value={commentinput} onChange={(e) => { setcommentinput(e.target.value.replace(/\s+/g, ' ')) }}>
                    </textarea>
            }

            {
                userdata.user_name !== '' && userdata.user_photoURL !== '' && commentinput && commentinput.trim() !== '' && (
                    <SubmitData />
                )
            }
        </div>
    )
}
