import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import { socket } from './socket/socket' 
import Header from './components/Header'
import Footer from './components/Footer'
// import Loader from './components/Loader'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import GigFeed from './components/pages/GigFeed'
import PostGigForm from './components/PostGigForm'

function App() {
  const user:any = useAppSelector( state => state.auth.userData )

  useEffect(() => {
    if (user?._id) {
      socket.emit('join', user._id);

      socket.on('notification', (data: any) => {
        if (data.type === 'HIRED') {
          alert(`CONGRATULATIONS! ${data.message}`);
        }
      });

      return () => {
        socket.off('notification');
      };
    }
  }, [user]);

  // if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
          <Route 
            path="/dashboard" 
            element={user ? <GigFeed /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/post-job" 
            element={user ? <PostGigForm /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;