import React, { useEffect, useState } from 'react';
// import { useAppSelector } from '../../store/hooks';
import GigCard from '../GigCard';
import BidModal from '../BidModal';
import { getAllGigs } from '../../api/gig.api';
import type { Gig } from '../../types';

const GigFeed: React.FC = () => {
  // const user = useAppSelector((state) => state.auth.userData);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  const fetchGigs = async () => {
    try {
      const data = await getAllGigs(search)
      setGigs(data.data); 
    } catch (error) {
      console.error("Failed to fetch gigs", error);
    }
  };

  useEffect(() => {
    fetchGigs()
  }, [search])

  const handleBidClick = (gig: Gig) => {
    setSelectedGig(gig);
    setIsBidModalOpen(true);
  };

  const handleViewBidsClick = (gig: Gig) => {
    console.log(`View bids for gig: ${gig._id}`); 
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="md:flex  justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white mb-4">Gig Feed</h1>
        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input md:max-w-72 "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <GigCard 
            key={gig._id} 
            gig={gig} 
            onBidClick={handleBidClick}
            onViewBidsClick={handleViewBidsClick}
          />
        ))}
        {gigs.length === 0 && (
          <p className="text-gray-500 text-center col-span-3">No gigs found matching your search.</p>
        )}
      </div>

      {isBidModalOpen && selectedGig && (
        <BidModal
          gig={selectedGig}
          onClose={() => setIsBidModalOpen(false)}
          onSuccess={() => {
             fetchGigs();
          }}
        />
      )}
    </div>
  );
};

export default GigFeed;