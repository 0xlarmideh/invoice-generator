import React from 'react'
import { Icon } from "@iconify/react";

const Sidebar = ({closeMenu}) => {

  return (
    <div className="bg-slate-700 h-[100vh] fixed w-[300px] top-0 right-0  px-[2rem] py-[1rem] ">
      <div className='flex justify-end'>
        <Icon icon="ph:x-bold" color='white' width='32' onClick={closeMenu} />
      </div>
    </div>
  );
}

export default Sidebar