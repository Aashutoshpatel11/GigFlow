import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { socket } from './socket/socket'; 
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const user:any = useAppSelector((state) => state.auth.userData);

  useEffect(() => {
    if (user?._id) {
      socket.connect(); 
      socket.emit('join', user._id);
      
      const handleNotification = (data: any) => {
        console.log("NOTIFICATION::", data);
        
        if (data.type === 'HIRED' && data.recipientId == user._id) {
          toast.success(data.message, {
            position:'top-right',
            duration: 9000
          } )
        }else if(data.type === 'BID_RECEIVED' && data.recipientId == user._id  ){
          toast(data.message, {
            position:'top-right',
            duration: 9000
          } )
        }else{
          toast(data.message, {
            position:'top-right',
            duration: 9000
          } )
        }
        
      };

      socket.on('notification', handleNotification);

      return () => {
        socket.off('notification', handleNotification);
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black text-gray-100">
      <Header />
      <Toaster />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet/>
      </main>

      <Footer />
    </div>
  );
}

export default App;