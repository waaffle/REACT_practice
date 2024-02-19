import React from 'react';
import { useParams } from 'react-router-dom';

const PostIdPage = () => {
    const params = useParams();
    console.log(params)
    return (
        <div>
            <h1>Вы перешли на страницу поста</h1>
        </div>
    );
};

export default PostIdPage;