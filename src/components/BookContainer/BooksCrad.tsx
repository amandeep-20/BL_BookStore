import React from "react";
import bookCover from '../../assets/images/bookImage.png'
import bookCover2 from '../../assets/images/bookImage2.png'
import { NavLink } from "react-router-dom";
import Books from "./Books";

const books = [
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover2
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover2
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover2
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover2
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    price: 1500,
    pic: bookCover
  },
]

const BooksCard = ()=>{
  return(
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
                books.map((book, index) => (
                    <NavLink to={`/home/${index}`}>
                        <div key={index} className='flex justify-center'>
                            <Books book={book} />
                        </div>
                    </NavLink>
                ))
            }
      </div>
  )
}
export default BooksCard;