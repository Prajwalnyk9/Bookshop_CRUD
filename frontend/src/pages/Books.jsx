import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

export const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchAllBooks();
  }, [])


  const HandleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <h1>Prajwal's Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src = {book.cover} alt='' />}
            <h2>Title : {book.title}</h2>
            <p>Description : {book.desc}</p>
            <span>Price : ${book.price}</span>
            <button className='delete' onClick={()=>HandleDelete(book.id)}>Delete</button>
            <button className='update'><Link to ={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books