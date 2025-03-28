import React from "react";
import Header from "../components/Same/Header";
import Footer from "../components/Same/Footer";
import BookContainer from "../components/BookContainer/BookContainer";
import SearchProvider from '../context/SearchProvider';

const Home = ()=>{
    return(
        <div>
            <SearchProvider>
            <Header container = 'home' />
            <BookContainer />
            <Footer />
            </SearchProvider>
        </div>
    )
}

export default Home;