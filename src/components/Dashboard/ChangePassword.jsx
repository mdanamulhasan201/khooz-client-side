import React from 'react';

const ChangePassword = () => {
    return (
        <div className='p-4 border'>
            <h2 className='text-xl text-center text-slate-600 pb-5'>Change Password</h2>
            <form action="">

                <div className='flex flex-col md:flex-row justify-center items-center gap-2 mb-2'>
                    <div className='w-4/12 text-start md:text-end '>
                        <label htmlFor="old_password">Old Password: </label>
                    </div>
                    <div>
                        <input className='px-3 py-2 outline-0 border focus:border-green-400 md:w-[350px] w-full rounded' type="password" id='old_password' name='old_password' placeholder='Old Password' />
                    </div>
                </div>


                <div className='flex flex-col md:flex-row justify-center items-center gap-2 mb-2'>
                    <div className='w-4/12 text-start md:text-end '>
                        <label htmlFor="new_password">New Password: </label>
                    </div>
                    <div>
                        <input className='px-3 py-2 outline-0 border focus:border-green-400 md:w-[350px] w-full rounded' type="password" id='new_password' name='old_password' placeholder='New Password' />
                    </div>

                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-2 mb-2'>
                    <div className='w-4/12 text-start md:text-end '>
                        <label htmlFor="confirm_password">Confirm Password: </label>
                    </div>
                    <div>
                        <input className='px-3 py-2 outline-0 border focus:border-green-400 md:w-[350px] w-full rounded' type="password" id='confirm_password' name='old_password' placeholder='Confirm Password' />
                    </div>
                </div>
                <div className='flex justify-center my-10 items-center'>
                    <button className='px-8 py-2 bg-red-400 text-white shadow-lg hover:shadow-red-400/40 rounded'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;