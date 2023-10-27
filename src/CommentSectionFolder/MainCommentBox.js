"use client"
import React, { useContext } from 'react'
import CommentInput from './CommentInput';
import FetchData from './FetchData';
import { MyContext } from "./ContexAPI";
import "./comment_style.css";
import Loader from './Loader';

export default function CommentSec() {

	const user = useContext(MyContext)
	const { OpenReplyIndexName, isLoading } = user;

	return (
		<section id="comment_sec_part">

			{/* <!-- ==================Outer Box================== --> */}
			<div className="comment_sec_outer_box">

				{/* <!-- ===============Comment Input================== --> */}
				<CommentInput />

				{/* <!-- =================Headi=================== --> */}
				<div className="comment_sec_heading">
					<p>{OpenReplyIndexName}</p>
				</div>

				{/* <!-- ==============comments section============== --> */}
				{(isLoading) ? <Loader /> : ""}
				<FetchData />

			</div>

		</section>
	)
}
