import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], comment:[], canUpvote: false})
    const {canUpvote} = articleInfo
    const {articleId} = useParams()

    const {user, isLoading} = useUser()

    useEffect((articleId) => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken()  
            const headers = token ? {authToken:token}:{}
            const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`, {
                headers
            })
            const newArticleInfo = response.data 
            setArticleInfo(newArticleInfo)
        }
        if (!isLoading){
            loadArticleInfo()
        }
    }, [isLoading, user])

    const article = articles.find(article => article.name === articleId)
    
    const addUpVote = async () => {
        const token = user && await user.getIdToken()  
        const headers = token ? {authToken:token}:{}
        const {data} = await axios.put(`http://localhost:8000/api/articles/${articleId}/upvote`, null, {headers})
        console.log(data);
        setArticleInfo(data)
    }


    if (!article){
        return (<NotFoundPage/>)
    }
    return (
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            {user ? <button onClick={addUpVote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button> : <button>Login to Upvote</button>}
        
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        {user ? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/> : <button>Log In to add Comment</button>}
        
        <CommentsList comments={articleInfo.comment} />
        </>
    );
}

export default ArticlePage

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import articles from "./article-content";
// import NotFoundPage from "./NotFoundPage";
// import axios from "axios";

// const ArticlePage = () => {
//   const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
//   const { articleId } = useParams();

//   useEffect(() => {
//     const loadArticleInfo = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
//         const newArticleInfo = response.data;
//         console.log('Fetched article info:', newArticleInfo);
//         setArticleInfo(newArticleInfo);
//       } catch (error) {
//         console.error("Error fetching article info", error);
//       }
//     };

//     loadArticleInfo();
//   }, [articleId]); // Effect runs only when articleId changes

//   const article = articles.find(article => article.name === articleId);

//   if (!article) {
//     return <NotFoundPage />;
//   }

//   return (
//     <>
//       <h1>{article.title}</h1>
//       <p>This article has {articleInfo.upvotes} upvote(s)</p>
//       <br />
//       {article.content}
//     </>
//   );
// };

// export default ArticlePage;
