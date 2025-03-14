// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import Books from "./Books";
// import { getAllBooks } from "../../utils/API.js";
// import BookCover1 from "../../assets/images/BookCover1.png";
// import BookCover2 from "../../assets/images/bookImage.png";
// import BookCover3 from "../../assets/images/BookCover3.png";
// import BookCover4 from "../../assets/images/BookCover4.png";
// import BookCover5 from "../../assets/images/BookCover5.png";
// import BookCover6 from "../../assets/images/BookCover6.png";
// import BookCover7 from "../../assets/images/BookCover7.png";
// import BookCover8 from "../../assets/images/BookCover8.png";
// import BookCover9 from "../../assets/images/BookCover9.png";

// const BooksCard = () => {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const booksPerRow = 4; // Based on lg:grid-cols-4
//   const rowsPerPage = 3; // You want 3 rows
//   const booksPerPage = booksPerRow * rowsPerPage; // 4 * 3 = 12 books per page

//   const bookCovers = [
//     BookCover1, BookCover2, BookCover3, BookCover4,
//     BookCover5, BookCover6, BookCover7, BookCover8,
//     BookCover9
//   ];

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const results = await getAllBooks();

//         const updatedBooks = results.map((book: any, index: number) => ({
//           ...book,
//           pic: bookCovers[index % bookCovers.length]
//         }));

//         setBooks(updatedBooks);
//       } catch (error) {
//         // Error already logged in the API file
//       }
//     };

//     fetchBooks();
//   }, []);

//   // Calculate total pages
//   const totalPages = Math.ceil(books.length / booksPerPage);

//   // Get books for the current page
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const endIndex = startIndex + booksPerPage;
//   const currentBooks = books.slice(startIndex, endIndex);

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Generate pagination buttons
//   const renderPagination = () => {
//     const pages = [];
//     const maxVisiblePages = 8; // Adjust based on your preference
//     const ellipsisThreshold = 5;

//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(
//           <button
//             key={i}
//             onClick={() => handlePageChange(i)}
//             className={`px-3 py-1 mx-1 rounded ${
//               currentPage === i ? "bg-red-700 text-white" : "bg-gray-200"
//             }`}
//           >
//             {i}
//           </button>
//         );
//       }
//     } else {
//       let startPage = Math.max(1, currentPage - 2);
//       let endPage = Math.min(totalPages, currentPage + 2);

//       if (currentPage <= ellipsisThreshold) {
//         endPage = maxVisiblePages - 2;
//       } else if (currentPage >= totalPages - ellipsisThreshold + 1) {
//         startPage = totalPages - (maxVisiblePages - 3);
//       }

//       // Add first page
//       pages.push(
//         <button
//           key={1}
//           onClick={() => handlePageChange(1)}
//           className={`px-3 py-1 mx-1 rounded ${
//             currentPage === 1 ? "bg-red-700 text-white" : "bg-gray-200"
//           }`}
//         >
//           1
//         </button>
//       );

//       // Add ellipsis if needed
//       if (startPage > 2) {
//         pages.push(<span key="start-ellipsis" className="mx-1">...</span>);
//       }

//       // Add middle pages
//       for (let i = startPage; i <= endPage; i++) {
//         if (i !== 1 && i !== totalPages) {
//           pages.push(
//             <button
//               key={i}
//               onClick={() => handlePageChange(i)}
//               className={`px-3 py-1 mx-1 rounded ${
//                 currentPage === i ? "bg-red-700 text-white" : "bg-gray-200"
//               }`}
//             >
//               {i}
//             </button>
//           );
//         }
//       }

//       // Add ellipsis if needed
//       if (endPage < totalPages - 1) {
//         pages.push(<span key="end-ellipsis" className="mx-1">...</span>);
//       }

//       // Add last page
//       pages.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className={`px-3 py-1 mx-1 rounded ${
//             currentPage === totalPages ? "bg-red-700 text-white" : "bg-gray-200"
//           }`}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {currentBooks.map((book: any, index: number) => (
//           <NavLink key={index} to={`/home/${book._id}`} state={{ book }}>
//             <div className="flex justify-center">
//               <Books book={book} />
//             </div>
//           </NavLink>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-6">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-2 mx-1 rounded-4xl bg-gray-200 disabled:opacity-50"
//           >
//             &larr;
//           </button>
//           {renderPagination()}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-2 mx-1 rounded-4xl bg-gray-200 disabled:opacity-50"
//           >
//             &rarr;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BooksCard;


import React, { useEffect, useState } from "react";
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
import { RootState } from '../../redux/store';

const BooksCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerRow = 4; // Based on lg:grid-cols-4
  const rowsPerPage = 3; // You want 3 rows
  const booksPerPage = booksPerRow * rowsPerPage; // 4 * 3 = 12 books per page

  const bookCovers = [
    BookCover1, BookCover2, BookCover3, BookCover4,
    BookCover5, BookCover6, BookCover7, BookCover8,
    BookCover9
  ];

  // Use Redux hooks to access state and dispatch actions
  const dispatch = useDispatch();
  const { allBooks: books, status, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
    console.log("Fetched books:", books); // Log books to debug
  }, [status, dispatch, books]);

  // Map books with local covers
  const updatedBooks = books.map((book: any, index: number) => ({
    ...book,
    pic: bookCovers[index % bookCovers.length]
  }));

  // Calculate total pages
  const totalPages = Math.ceil(updatedBooks.length / booksPerPage);

  // Get books for the current page
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = updatedBooks.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 8;
    const ellipsisThreshold = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i ? "bg-red-700 text-white" : "bg-gray-200"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= ellipsisThreshold) {
        endPage = maxVisiblePages - 2;
      } else if (currentPage >= totalPages - ellipsisThreshold + 1) {
        startPage = totalPages - (maxVisiblePages - 3);
      }

      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === 1 ? "bg-red-700 text-white" : "bg-gray-200"
          }`}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="mx-1">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i ? "bg-red-700 text-white" : "bg-gray-200"
              }`}
            >
              {i}
            </button>
          );
        }
      }

      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="mx-1">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === totalPages ? "bg-red-700 text-white" : "bg-gray-200"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // Handle loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    console.log("Fetch error:", error); // Log the error
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentBooks.length > 0 ? (
          currentBooks.map((book: any, index: number) => (
            <NavLink key={index} to={`/home/${book._id}`} state={{ book }}>
              <div className="flex justify-center">
                <Books book={book} />
              </div>
            </NavLink>
          ))
        ) : (
          <div>No books available</div> // Fallback if no books
        )}
      </div>

      {/* Pagination */}
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