import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { socket } from './socket/socket'; 
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const user:any = useAppSelector((state) => state.auth.userData);

  useEffect(() => {
    if (user?._id) {
      socket.emit('join', user._id);
      
      const handleNotification = (data: any) => {
        if (data.type === 'HIRED') {
          alert(`🎉 CONGRATULATIONS! ${data.message}`);
        }
      };

      socket.on('notification', handleNotification);

      return () => {
        socket.off('notification', handleNotification);
      };
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black text-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet/>
      </main>

      <Footer />
    </div>
  );
}

export default App;