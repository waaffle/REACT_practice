import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import Pagination from '../components/UI/pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import '../styles/App.css';
import { getPageCount } from '../utils/pages';

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading,  postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {fetchPosts(limit, page)}, [])

  const createPost = (newPost) =>{
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }


  return (
    <div className="App">
        <button onClick={fetchPosts}>GET POSTS</button>
        <MyButton 
          style={{marginTop: '30px'}}
          onClick={() => setModal(true)} 
        >
          Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        

        <hr style={{margin: '15px 0'}}/>

        <PostFilter 
        filter={filter}
        setFilter={setFilter}
        />
        {postError &&
          <h1>Произошла ошибка ${postError}</h1>
        }
        
        {isPostsLoading 
          ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
          : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про js"/>
        }

        <Pagination page={page} changePage={changePage} totalPages={totalPages} />   
        
    </div>
  );
}

export default Posts;