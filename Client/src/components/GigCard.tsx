import React from "react";
import type { Gig } from "../types";
import { useAppSelector } from "../store/hooks";

interface GigCardProps {
  gig: Gig;
  onBidClick: (gig: Gig) => void
  onViewBidsClick: (gig: Gig) => void
}

const GigCard: React.FC<GigCardProps> = ({ gig, onBidClick, onViewBidsClick }) => {
  const user:any = useAppSelector((state) => state.auth.userData)
  
  // Robust check for owner ownership (handles populated object or plain ID string)
  const isOwner = user?._id === (typeof gig.ownerId === 'string' ? gig.ownerId : gig.ownerId._id);

  return (
    <div className="backdrop-blur-xl p-6 rounded-lg shadow-md border border-gray-900 hover:shadow-lg transition-shadow mb-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-100 mb-2">{gig.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
            gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            {gig.status.toUpperCase()}
        </span>
      </div>
      
      <p className="text-gray-400 mb-4 line-clamp-3">{gig.description}</p>
      
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <span className="text-md font-thin text-white/50">
            Budget: <span className="text-green-600 font-semibold" >{gig.budget}</span>
        </span>
        
        <div className="space-x-2">
            {isOwner ? (
                <button 
                    onClick={() => onViewBidsClick(gig)}
                    className="btn btn-primary"
                >
                    View Bids / Hire
                </button>
            ) : (
                gig.status === 'open' && (
                    <button 
                        onClick={() => onBidClick(gig)}
                        className="btn btn-secondary"
                    >
                        Place Bid
                    </button>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default GigCard;