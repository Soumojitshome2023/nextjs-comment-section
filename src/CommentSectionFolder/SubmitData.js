import { database, ref, set } from "./firebase";
import React, { useContext } from 'react'
import { MyContext } from "./ContexAPI";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


export default function SubmitData() {
    const user = useContext(MyContext)
    const { udbname, commentinput, setcommentinput, bcode } = user;

    const SubmitData = () => {

        if (typeof localStorage !== 'undefined') {

            let current_time = new Date().getTime();
            let userid = localStorage.getItem("user_uid");

            let random_id = `${userid}_${current_time}`
            const dataRef = ref(database, udbname + '/' + random_id);

            let name = localStorage.getItem("user_name");
            let email = localStorage.getItem("user_email");
            let picurl = localStorage.getItem("user_photoURL");
            let date_time = new Date().toString().slice(0, 21);

            let dataToSet = {
                sender_name: name,
                sender_uid: userid,
                sender_email: email,
                sender_picurl: picurl,

                bcode: bcode,
                comment: commentinput,
                date_time: date_time,
                current_time: current_time,
            };

            // Set the data at the specified path
            set(dataRef, dataToSet);
            setcommentinput('');
            // fetchData();
            console.log("Data Set Done");
        }
    }

    return (
        <button onClick={SubmitData} className="comment_sec_btn" id="comment_sec_submit-btn">
            <FontAwesomeIcon icon={faPaperPlane} />Send</button>
    )
}