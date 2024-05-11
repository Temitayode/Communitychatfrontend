import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
    const handleClick = (e) => {
        // Prevent click propagation to parent
        e.stopPropagation();
    };

    return (
        <div className='border border-gray-300 rounded-lg w-[310px] sm:w-[360px]  p-4 flex flex-col' onClick={handleClick}>
            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
        </div>
    )
}

export default Sidebar