import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }
    return (
        <div className=" lg:w-full md:w-[450px] sm:w-[450px]">


            <div className="flex border border-green-500 h-[44px] items-center relative gap-5 rounded-md">
                <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-green-500 after:-right-[10px] ">
                    <select onChange={(e) => setCategory(e.target.value)} className="w-[140px] text-slate-600  bg-transparent px-1 font-semibold h-full outline-0 border-none" name="" id="">
                        <option value="">Select Category</option>
                        {
                            categorys.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)
                        }
                    </select>
                </div>
                <input className='w-full relative bg-transparent text-stone-500 outline-0 px-2 h-full ' onChange={(e) => setSearchValue(e.target.value)} type="text" name="" id="" placeholder="find your product..." required />
                <button onClick={search} className="bg-green-500 rounded-r-md text-white right-0 absolute px-5 h-full font-semibold ">Search</button>
            </div>



        </div>
    );
};

export default SearchBar;



