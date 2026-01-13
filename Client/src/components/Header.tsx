import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostGigForm from './PostGigForm';
import { getCurrentUser } from '../api/user.api';
import { login, logout } from '../store/authSlice';
import { socket } from '../socket/socket';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Notifications from './Notifications';

export default function Header() {
  const [displayPostGigForm, setDisplayPostGigForm] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  

  const user:any = useAppSelector(state => state.auth.userData)
  const getCurrentUserMutation = useMutation({
    mutationKey: ['Current User'],
    mutationFn: getCurrentUser
  })

  if( getCurrentUserMutation.isSuccess ){
    dispatch( login(getCurrentUserMutation.data.data) )
    socket.connect()
  }
  if(getCurrentUserMutation.isError){
    dispatch( logout() )
    navigate('/login')
  }

  useEffect( () => {
    setTimeout( () => {
      getCurrentUserMutation.mutate()
    }, 1000 )
  }, [] )


  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(logout());
        navigate('/login');
      }
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <header className="fixed top-0 w-full z-20 border-b border-white/10 backdrop-blur-3xl">
      {displayPostGigForm && <PostGigForm setDisplayPostGigForm= {setDisplayPostGigForm} />}
      { displayNotification && <Notifications setDisplayNotification={setDisplayNotification} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <button
            onClick={ () => setDisplayNotification(true) }
            >🔔</button>
            <button 
            onClick={() => navigate('/')}
            className="font-bold text-xl tracking-tight text-white">
              Gig Flow
            </button>
          </div>

          <div className="md:flex items-center space-x-4">
            <button onClick={() => setDisplayPostGigForm(true)} className="btn btn-primary">
              + Add 
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
            <button onClick={() => navigate(`/profile/${user?._id}`)} className="bg-black p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z"/>
                <path d="M12 14c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </header>
  );
}
