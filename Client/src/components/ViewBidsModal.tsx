import React, { useEffect, useState } from 'react';
import { getBidsForGig, hireFreelancer } from '../api/bid.api';
import type { Bid, Gig } from '../types';

interface ViewBidsModalProps {
  gig: Gig;
  onClose: () => void;
  onHireSuccess: () => void;
}

const ViewBidsModal: React.FC<ViewBidsModalProps> = ({ gig, onClose, onHireSuccess }) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadBids();
  }, [gig._id]);

  const loadBids = async () => {
    try {
      const data = await getBidsForGig(gig._id);
      setBids(data.data);
    } catch (error) {
      console.error("Failed to load bids");
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (bid: Bid) => {
    if (!window.confirm(`Are you sure you want to hire ${bid.freelancerId.name} for $${bid.price}?`)) return;
    
    setActionLoading(bid._id);
    try {
      await hireFreelancer(bid._id);
      alert(`Successfully hired ${bid.freelancerId.name}!`);
      onHireSuccess()
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Hiring failed. Someone else might have just hired them.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xl bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-gray-900 rounded-lg p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Applicants for: {gig.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
        </div>

        {loading ? (
          <p className="text-center py-4">Loading bids...</p>
        ) : bids.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No bids yet.</p>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <div key={bid._id} className={` bg-black border border-gray-900 rounded-lg p-4 ${bid.status === 'hired' ? 'bg-green-50 border-green-200' : ''}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{bid.freelancerId.name} <span className="text-sm font-normal text-gray-500">({bid.freelancerId.email})</span></h4>
                    <p className="text-blue-600 font-semibold mt-1">Bid Price: ${bid.price}</p>
                    <p className="text-gray-400 mt-2 bg-black p-2 rounded border border-gray-900 text-sm">{bid.message}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`text-xs px-2 py-1 rounded font-bold mb-2 ${
                        bid.status === 'hired' ? 'bg-green-200 text-green-800' :
                        bid.status === 'rejected' ? 'bg-red-200 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bid.status.toUpperCase()}
                    </span>

                    {gig.status === 'open' && bid.status === 'pending' && (
                      <button
                        onClick={() => handleHire(bid)}
                        disabled={actionLoading !== null}
                        className="btn btn-primary"
                      >
                        {actionLoading === bid._id ? 'Processing...' : 'Hire'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBidsModal;