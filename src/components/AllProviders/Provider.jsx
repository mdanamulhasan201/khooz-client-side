import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Providers from './Providers';
import { useDispatch, useSelector } from 'react-redux';
import { get_provider_details, get_provider_request } from '../../store/reducers/providerReducer';

const Provider = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const { sellerId } = useParams();
    const { sellers } = useSelector((state) => state.provider);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
    const filteredProviders = selectedCategories.length
        ? sellers.filter((seller) => selectedCategories.includes(seller.shopInfo.category))
        : sellers;

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
                                <div className="py-3 bg-white mb-10 px-3 rounded-md flex justify-between items-center border">
                                    <h2 className="text-lg font-semibold text-slate-600">{filteredProviders.length} Provider</h2>

                                    <select className="p-1 border outline-0 text-slate-600 font-semibold" name="" id="">
                                        <option value="">Sort By</option>
                                        <option value="">Low to High</option>
                                        <option value="">High to Low</option>
                                    </select>
                                </div>
                                <div className="pb-8">
                                    <Providers sellers={filteredProviders} />
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
