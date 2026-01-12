import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { socket } from './socket/socket'; 
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import GigFeed from './components/pages/GigFeed'; // Ensure this matches your file name
import PostGigForm from './components/PostGigForm';

function App() {
  const user:any = useAppSelector((state) => state.auth.userData);

  // Bonus 2: Real-time Notification Logic
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} 
          />

          {/* Private Routes (GigFlow) */}
          <Route 
            path="/dashboard" 
            element={user ? <GigFeed /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/post-job" 
            element={user ? <PostGigForm /> : <Navigate to="/login" />} 
          />
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;