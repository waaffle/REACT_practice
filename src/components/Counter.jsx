import React, { useState } from 'react';

const Counter = () => {

    const [likes, setCount] = useState(0);

    function increment(){
        setCount(likes + 1);
      }
    
      function decrement(){
        setCount(likes - 1);
      }
    return (
        <div>
            <h1>{likes}</h1>

            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;