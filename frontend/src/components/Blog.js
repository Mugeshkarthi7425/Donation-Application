import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import './Blog.css';
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState('');
  
  useEffect(() => {
    fetchPosts();
  }, []);
 
  const fetchPosts = async () => {
    try {
      const response=await axios.get('http://127.0.0.1:3000/posts');
      setPosts(response.data);
         } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('http://127.0.0.1:3000/posts', { title, content, amount });
      fetchPosts();
      setTitle('');
      setContent('');
      setAmount('');
      alert('Application created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create Application');
    }
  };
  
  const handleEditPost = async (postId) => {
    try {
      const response=await axios.get(`http://127.0.0.1:3000/posts/${postId}`);
      let {title,content,amount}=response.data;
      setTitle(title);
      setContent(content);
      setAmount(amount);
    } catch (error) {
      console.error(error);
      alert('Failed to edit Application');
    }
  };
  const handleUpdatePost = async (postId) => {
    try {
      await axios.put(`http://127.0.0.1:3000/posts/${postId}`,{ title, content, amount });
      fetchPosts();
      setTitle('');
      setContent('');
      setAmount('');
      alert('Application was updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update Application');
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/posts/${postId}`);
      fetchPosts();
      alert('Application deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete Application');
    }
  };
  return (
    <div>
      <h3><center>DONATION APPLICATION</center></h3> 
      <form>
      <div className="mb-3">
        <label className="form-label">Donater Name</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} /><br></br>
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input type="number" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} /><br></br>
      </div>
      <div className="mb-3">
        <label className="form-label"> Amount</label>
        <input type="number"className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)}></input><br></br>
        <center><Button variant="primary" onClick={handleCreatePost}>CREATE APPLICATION</Button></center>
      </div>
      </form>
      <div >
      <Table striped bordered hover variant="danger" className="table" >
      <thead>
        <tr>
          <th>DONATER NAME</th>
          <th>PHONE NUMBER</th>
          <th>AMOUNT</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.content}</td>
            <td>{post.amount}</td>
            <td>
              <button  onClick={() => handleEditPost(post.id)}>Edit</button>
              <button  onClick={() => handleUpdatePost(post.id)}>Update</button>
              <button  onClick={() => handleDeletePost(post.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
</div>

    
        


    </div>
  )
}
