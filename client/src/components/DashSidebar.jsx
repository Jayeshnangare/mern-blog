import React from 'react'
import {Sidebar, SidebarItems} from 'flowbite-react'
import {HiArrowSmRight, HiDocumentText, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user); // there is diff between currentUser and  {currentUser}

    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      // console.log(tabFromUrl);
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    },[location.search]);

    const handleSignout = async (e) => {
      try{
          const res = await fetch('/api/user/signout',{
              method: 'POST',
          });
          const data = await  res.json();
          if(!res.ok){
              console.log(data.message)
          } else{
              dispatch(signoutSuccess());
          }
      }catch(err){
          console.log(data.message);
      }
  }
  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item 
                active={tab === 'profile'} 
                icon={HiUser} 
                label={currentUser.isAdmin? 'Admin' : 'User'}
                labelColor='dark'
                as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                {(currentUser.isAdmin)
                    &&  
                        <Link to='/dashboard?tab=posts'>
                          <Sidebar.Item
                            active={tab === 'posts'}
                            icon={HiDocumentText}
                            as='div'
                          >
                            Posts
                          </Sidebar.Item>
                        </Link>
                      
                }
                <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}
