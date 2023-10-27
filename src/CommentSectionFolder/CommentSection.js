import React from 'react'
import MainCommentBox from './MainCommentBox'
import MyContext from './ContexAPI'

export default function CommentSection() {
    return (
        <MyContext>
            <MainCommentBox />
        </MyContext>
    )
}
