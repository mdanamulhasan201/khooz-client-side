import React from 'react';

const ChangePassword = () => {
    return (
        <div className='p-4'>
            <h2 className='text-xl text-slate-600 pb-5'>Change Password</h2>
            <form action="">
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="old_password">Old Password</label>
                    <input className='px-3 py-2 outline-0 border focus:border-green-400 md:w-[350px] w-full rounded' type="password" id='old_password' name='old_password' placeholder='Old Password' />

                </div>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="new_password">New Password</label>
                    <input className='px-3 py-2 outline-0 border focus:border-green-400 md:w-[350px] w-full rounded' type="password" id='new_password' name='old_password' placeholder='New Password' />

                </div>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input className='px-3 py-2 outline-0 border focus:border-green-400 md:w-[350px] w-full rounded' type="password" id='confirm_password' name='old_password' placeholder='Confirm Password' />
                </div>
                <div>
                    <button className='px-8 py-2 bg-red-400 text-white shadow-lg hover:shadow-red-400/40 rounded'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;