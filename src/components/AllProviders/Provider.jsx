import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Providers from './Providers';
import { useDispatch, useSelector } from 'react-redux';
import { get_provider_details, get_provider_request } from '../../store/reducers/providerReducer';
import { RiErrorWarningLine } from "react-icons/ri";

const Provider = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const { sellerId } = useParams();
    const { sellers } = useSelector((state) => state.provider);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);


    useEffect(() => {
        dispatch(
            get_provider_request({
                searchValue,
            })
        );
    }, [searchValue]);

    useEffect(() => {
        dispatch(get_provider_details(sellerId));
    }, [sellerId]);

    useEffect(() => {
        // Filter providers based on selected categories and search query
        let filtered = sellers;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((seller) =>
                selectedCategories.includes(seller.shopInfo.category)
            );
        }

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter((seller) => {
                // Check if any of the conditions match
                const nameMatch = seller.name.toLowerCase().includes(searchQuery.toLowerCase());
                const categoryMatch = seller.shopInfo.category.toLowerCase().includes(searchQuery.toLowerCase());
                const districtMatch = seller.shopInfo.district.toLowerCase().includes(searchQuery.toLowerCase());
                const thanaMatch = seller.shopInfo.thana.toLowerCase().includes(searchQuery.toLowerCase());
                const villageMatch = seller.shopInfo.village.toLowerCase().includes(searchQuery.toLowerCase());

                // Return true if any condition matches
                return nameMatch || categoryMatch || districtMatch || thanaMatch || villageMatch;
            });
        }

        setFilteredProviders(filtered);
    }, [sellers, selectedCategories, searchQuery]);


    const categorys = [
        'Electrician',
        'Painter',
        'Plumber',
        'AC Repair',
        'Freeze Repair',
        'CCTV Repair',
        'Laborer',
        'Home Maid',
        'Photography',
        'Home Tutor',
    ];

    // Function to toggle category selection
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Filter providers based on selected categories
    // const filteredProviders = selectedCategories.length
    //     ? sellers.filter((seller) => selectedCategories.includes(seller.shopInfo.category))
    //     : sellers;

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProviders.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="py-20">
            <div className="container mx-auto">
                <section className="flex items-center justify-center text-2xl h-full w-full gap-2">
                    <Link to="/" className="hover:text-red-500">
                        Home
                    </Link>
                    <span className="pt-2">
                        <MdOutlineKeyboardArrowRight />
                    </span>
                    <span>Providers</span>
                </section>

                <section className="py-16">
                    <div className="w-full flex flex-wrap">
                        <div className="md:w-2/12 w-full ps-2">
                            <h2 className="text-3xl font-bold mb-3 text-slate-600">Category</h2>
                            <div className="py-2">
                                {categorys.map((c, i) => (
                                    <div className="flex justify-start items-center gap-2 py-1" key={i}>
                                        <input
                                            type="checkbox"
                                            id={c}
                                            checked={selectedCategories.includes(c)}
                                            onChange={() => toggleCategory(c)}
                                        />
                                        <label className="text-slate-600 block cursor-pointer" htmlFor={c}>
                                            {c}
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="w-10/12">
                            <div className="pl-8">


                                <div className='py-3 bg-white mb-10 px-3 rounded-md flex flex-col md:flex-row gap-6 justify-between items-center border'>
                                    <h2 className='text-lg font-semibold  text-slate-600 '>{filteredProviders.length} Provider</h2>




                                    <div className='bg-red-50 px-2 py-1 flex items-center'>
                                        <RiErrorWarningLine className='text-green-500'></RiErrorWarningLine>
                                        <h2 className='ms-1 text-gray-500 text-sm'> You can search with provider name, category, district, thana & village</h2>
                                    </div>
                                    <div className='flex'>
                                        <input
                                            className='w-full border py-2 relative bg-transparent text-stone-500 outline-0 px-3 h-full'
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Find provider"
                                            required
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button className='outline-none bg-red-400 text-white hover:bg-red-500  px-6  font-semibold uppercase'>Search</button>
                                    </div>


                                    {/* <select className='p-1 border outline-0 text-slate-600 font-semibold' name='' id=''>
                                        <option value="">Sort By</option>
                                        <option value="low-high">Low to High</option>
                                        <option value="high-low">High to Low </option>
                                    </select> */}


                                </div>
                                <div className="pb-8">
                                    <Providers sellers={filteredProviders} />
                                </div>
                                {/* Pagination */}
                                <div className="flex justify-center mt-4">
                                    <ul className="flex space-x-2">
                                        {Array.from({ length: Math.ceil(filteredProviders.length / itemsPerPage) }).map((_, page) => (
                                            <li
                                                key={page}
                                                onClick={() => handlePageChange(page + 1)}
                                                className={`cursor-pointer px-2 py-1 rounded-full ${currentPage === page + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'
                                                    }`}
                                            >
                                                {page + 1}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Provider;
