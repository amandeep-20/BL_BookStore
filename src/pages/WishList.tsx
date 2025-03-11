import React from 'react'
import Header from '../components/Same/Header'
import Footer from '../components/Same/Footer'
import Breadcrumbs from '../components/Same/Breadcrumbs'
import bookCover from '../assets/images/bookImage.png'
import bookCover2 from '../assets/images/bookImage2.png'
import OrderConatiner from '../components/Same/OrderConatiner'

const order = [
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
]

function WishList() {
    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2'>
                <Breadcrumbs container='wishlist'/>
                <div className=' mt-5 '>
                    <div className=' p-4 bg-[#F5F5F5] border-2 border-[#E4E4E4] '>
                        <p className='font-bold' >My Wishlist</p>
                    </div>
                    {
                        order.map((order, index) => {
                            return (
                                <div key={index}>
                                    <OrderConatiner order={order} container='wishlist' />
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default WishList