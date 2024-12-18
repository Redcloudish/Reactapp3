import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateTweet() {
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        if (!content.trim() || !authorId.trim()) {
            setError('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/create-tweet.php`,
                {
                    content,
                    author_id: authorId,
                }
            );
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Failed to create tweet. Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create a New Tweet</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Tweet Content
                    </label>
                    <textarea
                        className="form-control"
                        id="content"
                        onChange={(e) => setContent(e.target.value)}
                        required
                        maxLength="280"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="authorId" className="form-label">
                        Author ID
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="authorId"
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                        <span>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Creating Tweet...
                        </span>
                    ) : (
                        'Create Tweet'
                    )}
                </button>
            </form>
        </div>
    );
}

export default CreateTweet;
