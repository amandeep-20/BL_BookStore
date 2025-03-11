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

function MyOrder() {
    return (
        <div>
            <Header container='home' />
            <div className='min-h-[83.75vh] max-w-6xl p-5 mx-auto flex flex-col gap-2 mt-2'>
                <Breadcrumbs container='myOrder'/>
                {
                    order.map((order, index) => {
                        return (
                            <div key={index} className='py-2'>
                                <OrderConatiner order={order} container='myOrder' />
                            </div>
                        )

                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default MyOrder