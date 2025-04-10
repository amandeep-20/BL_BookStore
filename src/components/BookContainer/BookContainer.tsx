import  { useContext, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import BooksCard from './BooksCrad';
import { SearchContext } from '../../context/SearchProvider';

const BookContainer = () => {
    const { searchQuery, sortQuery, setSortQuery }: any = useContext(SearchContext);
    const [sortOrder, setSortOrder] = useState<string>('relevance');

    // Mock book list (replace with your actual data source)
    const bookList = [
        { id: 1, title: 'Book A', price: 20 },
        { id: 2, title: 'Book B', price: 15 },
        { id: 3, title: 'Book C', price: 25 },
    ];

    // Sorting logic
    const sortedBooks = [...bookList].sort((a, b) => {
        if (sortQuery === 'highToLow') return b.price - a.price;
        if (sortQuery === 'lowToHigh') return a.price - b.price;
        return 0; // Default: relevance (no change)
    });

    // Filtering logic based on search query
    const filteredBooks = sortedBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const items: MenuProps['items'] = [
        {
            label: 'Sort by relevance',
            key: 'relevance',
            onClick: () => handleSort('relevance'),
        },
        {
            label: 'Price: High to Low',
            key: 'highToLow',
            onClick: () => handleSort('highToLow'),
        },
        {
            label: 'Price: Low to High',
            key: 'lowToHigh',
            onClick: () => handleSort('lowToHigh'),
        },
    ];

    const handleSort = (sortKey: string) => {
        setSortOrder(sortKey);
        setSortQuery(sortKey);
    };

    return (
        <div className='max-w-6xl mx-auto p-4 md:p-8'>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center space-x-2'>
                    <p className='text-lg md:text-2xl font-semibold'>Books</p>
                    <p className='text-xs md:text-sm text-gray-400'>({filteredBooks.length} items)</p>
                </div>
                <div className='cursor-pointer border-2 border-black-600 w-40 flex items-center justify-center py-1 px-2'>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className='flex justify-between items-center w-full'>
                                <p className='text-xs font-semibold'>
                                    {sortOrder === 'highToLow'
                                        ? 'Price: High to Low'
                                        : sortOrder === 'lowToHigh'
                                        ? 'Price: Low to High'
                                        : 'Sort by relevance'}
                                </p>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            <div className='mt-4 min-h-[70vh]'>
                <BooksCard  /> {/* Pass filtered books to BooksCard */}
            </div>
        </div>
    );
};

export default BookContainer;