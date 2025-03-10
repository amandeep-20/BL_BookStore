import React from "react";
import Header from "../components/Same/Header";
import Footer from "../components/Same/Footer";
import BookContainer from "../components/BookContainer/BookContainer";

const Home = ()=>{
    return(
        <div>
            <Header container = 'home' />
            <BookContainer />
            <Footer />
        </div>
    )
}

export default Home;