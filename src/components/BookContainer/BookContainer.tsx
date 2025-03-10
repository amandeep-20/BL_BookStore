import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import BooksCard from './BooksCrad';


const items: MenuProps['items'] = [
    {
        label: (
            <a href="#" target="_blank" rel="noopener noreferrer">
                First menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a href="#" target="_blank" rel="noopener noreferrer">
                sec menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: 'Third menu item',
        key: '3',
    },
];

const BookContainer = () => {
    return (
        <div className='max-w-6xl mx-auto p-4 md:p-8'>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center space-x-2'>
                    <p className='text-lg md:text-2xl font-semibold'>Books</p>
                    <p className='text-xs md:text-sm text-gray-400'>(123 items)</p>
                </div>
                <div className='cursor-pointer border-2 border-black-600 w-40 flex items-center justify-center py-1 px-2'>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className='flex justify-between items-center w-full'>
                                <p className='text-xs font-semibold'>Sort by relevance</p>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            <div className='mt-4 min-h-[70vh]'>
                <BooksCard />
            </div>
        </div>
    )
}

export default BookContainer