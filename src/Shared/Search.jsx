

const Search = ({ setSearchValue , searchValue}) => {

    return (
        <input 
            onChange={(e)=>setSearchValue(e.target.value)}
            value={searchValue}
            className='px-4 py-2 focus:border-gray-700 outline-none bg-transparent border border-slate-400 rounded-md'
            type="text"
            placeholder='Search'
        />
    );
};

export default Search;