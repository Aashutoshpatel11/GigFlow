import React, { useState } from 'react'
import { submitBid } from '../api/bid.api'
import type { Gig } from '../types'


interface BidModalProps {
  gig: Gig
  onClose: () => void
  onSuccess: () => void
}

const BidModal: React.FC<BidModalProps> = ({ gig, onClose, onSuccess }) => {
  const [message, setMessage] = useState('')
  const [price, setPrice] = useState<number>(gig.budget)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitBid({ gigId: gig._id, message, price });
      alert('Bid submitted successfully!');
      onSuccess(); // Refresh feed or close
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4">
      <div className=" rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Bid on: {gig.title}</h2>
        
        {error && <div className=" text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Your Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="input"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pitch / Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              placeholder="Why are you the best fit?"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Submitting...' : 'Submit Bid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidModal;