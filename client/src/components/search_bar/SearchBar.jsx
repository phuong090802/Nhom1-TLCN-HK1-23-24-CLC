import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { removeAccents } from '../../utils/string';

const SearchBar = ({ params, setParams }) => {
    const [searchKey, setSearchKey] = useState('')

    const handleSearch = () => {
        if (!params?.value && searchKey === '') return
        else if (params?.value && searchKey === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'value')))
        } else {
            setParams({
                ...params,
                value: removeAccents(searchKey),
                page: 0
            })
        }
    }

    return (
        <div className='relative w-fit'>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                className="border p-2 rounded-md"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)} />
            <SearchIcon
                className='absolute right-2 top-2 text-gray-400 cursor-pointer'
                onClick={() => handleSearch()}
                onBlur={() => handleSearch()}>
            </SearchIcon>
        </div>
    )
}

export default SearchBar