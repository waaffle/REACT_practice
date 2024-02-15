import React, { useMemo, useRef, useState } from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/classCounter';
import './styles/App.css'
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';

function App() {

  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) =>{
    setPosts([...posts, newPost])
    setModal(false)
  }

  // async function fetchPosts(){
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //   console.log(response.data)
  // }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
        {/* <button onClick={fetchPosts}>GET POSTS</button> */}
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

        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про js"/>
            
        
    </div>
  );
}

export default App;
