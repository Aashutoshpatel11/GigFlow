
import React, { useEffect, useState } from 'react';
import { getUserNotifications, markAsRead } from '../api/notification.api';

interface Notification {
  _id: string;
  type: "GIG_POSTED" | "BID_RECEIVED" | "HIRED";
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsProps {
  setDisplayNotification: (display: boolean) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ setDisplayNotification }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await getUserNotifications();
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) => 
        prev.map((n) => n._id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error("Error marking as read");
    }
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-screen bg-black/70 transition-transform duration-900 ease-in-out ' >
        <div className='relative h-screen w-screen sm:max-w-sm bg-black' >

            <button
                className=" absolute right-1 top-8 btn btn-secondary"
                onClick={() => setDisplayNotification(false)}
            >X</button>

            <div>
                <h2 className="text-white text-xl font-bold p-4 pt-8">Notifications</h2>
            </div>

            <div className='flex-1 overflow-y-auto p-4 space-y-3'>
          {loading ? (
            <p className="text-center text-gray-500 mt-10">Loading updates...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No new notifications</p>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif._id} 
                onClick={() => !notif.read && handleMarkRead(notif._id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  notif.read 
                    ? 'bg-gray-100 border-gray-200 opacity-60' 
                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    notif.type === 'HIRED' ? 'bg-green-200 text-green-800' :
                    notif.type === 'BID_RECEIVED' ? 'bg-purple-200 text-purple-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {notif.type.replace('_', ' ')}
                  </span>
                  {!notif.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            ))
          )}
        </div>
    </div>
    </div>
  );
}

export default Notifications;