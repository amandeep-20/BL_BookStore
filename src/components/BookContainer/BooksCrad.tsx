import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";
import Books from "./Books";
import BookCover1 from "../../assets/images/BookCover1.png";
import BookCover2 from "../../assets/images/bookImage.png";
import BookCover3 from "../../assets/images/BookCover3.png";
import BookCover4 from "../../assets/images/BookCover4.png";
import BookCover5 from "../../assets/images/BookCover5.png";
import BookCover6 from "../../assets/images/BookCover6.png";
import BookCover7 from "../../assets/images/BookCover7.png";
import BookCover8 from "../../assets/images/BookCover8.png";
import BookCover9 from "../../assets/images/BookCover9.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/bookSlice';
import { RootState, AppDispatch } from '../../redux/store';  // Import AppDispatch
import Shimmer from './Shimmer'; 

const BooksCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerRow = 4;
  const rowsPerPage = 3;
  const booksPerPage = booksPerRow * rowsPerPage;

  const bookCovers = [
    BookCover1, BookCover2, BookCover3, BookCover4,
    BookCover5, BookCover6, BookCover7, BookCover8,
    BookCover9
  ];

  const dispatch = useDispatch<AppDispatch>();  // Add type to useDispatch
  const { allBooks: books, status, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const updatedBooks = books.map((book: any, index: number) => ({
    ...book,
    pic: bookCovers[index % bookCovers.length]
  }));

  const totalPages = Math.ceil(updatedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = updatedBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createPageButton = (page: number, isActive: boolean) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-1 mx-1 rounded ${
        isActive ? "bg-red-700 text-white" : "bg-gray-200"
      }`}
    >
      {page}
    </button>
  );

  const renderSimplePagination = (totalPages: number, currentPage: number) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(createPageButton(i, currentPage === i));
    }
    return pages;
  };

  const calculatePageRange = (
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number,
    ellipsisThreshold: number
  ) => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= ellipsisThreshold) {
      endPage = maxVisiblePages - 2;
    } else if (currentPage >= totalPages - ellipsisThreshold + 1) {
      startPage = totalPages - (maxVisiblePages - 3);
    }

    return { startPage, endPage };
  };

  const renderComplexPagination = (
    currentPage: number,
    totalPages: number,
    startPage: number,
    endPage: number
  ) => {
    const pages = [];
    pages.push(createPageButton(1, currentPage === 1));
    if (startPage > 2) {
      pages.push(<span key="start-ellipsis" className="mx-1">...</span>);
    }
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(createPageButton(i, currentPage === i));
      }
    }
    if (endPage < totalPages - 1) {
      pages.push(<span key="end-ellipsis" className="mx-1">...</span>);
    }
    pages.push(createPageButton(totalPages, currentPage === totalPages));
    return pages;
  };

  const renderPagination = () => {
    const maxVisiblePages = 8;
    const ellipsisThreshold = 5;

    if (totalPages <= maxVisiblePages) {
      return renderSimplePagination(totalPages, currentPage);
    }
    
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      maxVisiblePages,
      ellipsisThreshold
    );
    
    return renderComplexPagination(currentPage, totalPages, startPage, endPage);
  };

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(booksPerPage)
          .fill(0)
          .map((_, i) => (
            <div key={`shimmer-${uuidv4()}`} className="flex justify-center">
              <Shimmer />
            </div>
          ))}
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentBooks.length > 0 ? (
          currentBooks.map((book: any) => (
            <NavLink key={book._id} to={`/home/${book._id}`} state={{ book }}>
              <div key={book._id} className="flex justify-center">
                <Books book={book} />
              </div>
            </NavLink>
          ))
        ) : (
          <div>No books available</div>
        )}
      </div>

      {totalPages > 1 && updatedBooks.length > 0 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded bg-gray-200 disabled:opacity-50"
          >
            ←
          </button>
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded bg-gray-200 disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksCard;