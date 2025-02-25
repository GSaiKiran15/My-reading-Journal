import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName, onArticleUpdated}) => {

    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("")
    const {user} = useUser()

    const addComment = async() => {
        const token = user && await user.getIdToken()  
        const headers = token ? {authToken:token}:{}
        const response = await axios.post(`http://localhost:8000/api/articles/${articleName}/comment`, {
            postedBy: name,
            text: commentText
        }, {headers})
        const updatedArticle = response.data
        onArticleUpdated(updatedArticle)
        setName('')
        setCommentText('')
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p>}<br></br>
            <label>
                <textarea rows="4" cols="50" value={commentText} onChange={e => setCommentText(e.target.value)}/>
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;