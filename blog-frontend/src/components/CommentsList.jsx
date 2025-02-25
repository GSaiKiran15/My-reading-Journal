// import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => (
    <>
    <h3>Comments:</h3>
    {comments.map((comment, index) => (
        <div className="comment" key={index}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.text}</p>
        </div>
    ))}
    </>
);

// CommentsList.propTypes = {
//     comments: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         text: PropTypes.string.isRequired,
//         postedBy: PropTypes.string.isRequired
//       })
//     ).isRequired
//   };

export default CommentsList;