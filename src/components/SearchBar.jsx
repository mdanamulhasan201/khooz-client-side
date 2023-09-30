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
        <div className=" w-full  ">
            <div className=" items-center gap-6">
                <div className="">
                    <div className="flex border border-red-400 h-[50px] items-center relative gap-5">
                        <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-red-400 after:-right-[15px] ">
                            <select onChange={(e) => setCategory(e.target.value)} className="w-[157px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none" name="" id="">
                                <option value="">Select Category</option>
                                {
                                    categorys.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)
                                }
                            </select>
                        </div>
                        <input className='w-full relative bg-transparent text-stone-500 outline-0 px-3 h-full ' onChange={(e) => setSearchValue(e.target.value)} type="text" name="" id="" placeholder="Find your Product" required/>
                        <button onClick={search} className="bg-red-400 text-white right-0 absolute px-5 h-full font-semibold uppercase">Search</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SearchBar;



