import React, { useState } from 'react'
import { createGig } from '../api/gig.api'
import { useNavigate } from 'react-router-dom'

interface ChildProps {
  setDisplayPostGigForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostGigForm= ({setDisplayPostGigForm}:ChildProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await createGig({ title, description, budget: Number(budget) });
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black/90 backdrop-blur-2xl z-30" >
            <div className=" w-full h-full overflow-y-scroll bg-transparent z-50 flex justify-center items-center" >
                <div className="w-full max-w-sm space-y-4 p-6 relative">
                    <div className=" mb-4">
                        <h2 className="text-2xl font-semibold text-white">{"Create Task"}</h2>
                    </div>


                    <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="e.g. Build a React Website"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input h-32 resize-none"
                placeholder="Describe the project details, requirements, and deliverables..."
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="input"
                placeholder="e.g. 500"
                min="1"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Posting...' : 'Post Gig'}
            </button>
          </form>
          </div>

          <div className=" absolute top-5 right-10 flex justify-start items-center gap-3 pt-4">
              <button 
              onClick={() => setDisplayPostGigForm(false)}
              type='button'
              className="btn w-1/2">X</button>
          </div>
                    
            </div>
        </div>
  );
};

export default PostGigForm;


{/*  */}