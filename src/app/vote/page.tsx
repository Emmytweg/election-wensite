'use client';

import React, { useEffect, useState } from 'react';
import StoreCandidates from './StoredCandidates';
// import { candidates } from '@/info';
interface Candidate {
  id: string;
  fullName: string;
  position: string;
  department: string;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://election-website-hgha.onrender.com';

const Vote = () => {
  const [groupedCandidates, setGroupedCandidates] = useState<Record<string, Candidate[]>>({});
  const [positions, setPositions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const candidates: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');
    const groups: Record<string, Candidate[]> = {};
    candidates.forEach(c => {
      if (!groups[c.position]) groups[c.position] = [];
      groups[c.position].push(c);
    });
    setGroupedCandidates(groups);
    setPositions(Object.keys(groups));

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      fetch(`${API_URL}/votes/${user.matricNumber}`)
        .then(res => res.json())
        .then(v => {
          setVotes(v);
          localStorage.setItem('sessionVotes', JSON.stringify(v));
        })
        .catch(console.error);
    }
  }, []);

  const handleVote = async (position: string, candidateId: string) => {
    if (votes[position]) return alert(`You already voted for ${position}`);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return alert('Please log in to vote');

    try {
      const res = await fetch(`${API_URL}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.matricNumber, position, candidateId })
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      const updatedVotes = { ...votes, [position]: candidateId };
      setVotes(updatedVotes);
      localStorage.setItem('sessionVotes', JSON.stringify(updatedVotes));
      
      alert(`Vote recorded for ${position}`);
    } catch (err) {
      console.error('Vote error:', err);
      alert('Something went wrong. Try again.');
    }
  };

  const currentPosition = positions[currentIndex] || '';
  const candidates = groupedCandidates[currentPosition] || [];

  const handleNext = () => {
    if (!votes[currentPosition]) {
      return alert(`Please vote for ${currentPosition} first.`);
    }
    if (currentIndex < positions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      alert('✅ Voting complete!');
      window.location.href = '/result';
    }
  };

  return (
    <div className="p-6">
      <StoreCandidates />
      <h1 className="text-2xl font-bold mb-4">Vote for {currentPosition}</h1>

      {candidates && candidates.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {candidates.map(c => (
      <div key={c.id} className={`border p-4 rounded ${votes[currentPosition] === c.id ? 'bg-green-100' : ''}`}>
        <img src={c.image} alt={c.fullName} className="w-full h-40 object-cover mb-2 rounded" />
        <h2 className="text-lg font-semibold">{c.fullName}</h2>
        <p className="text-sm">{c.department}</p>
        <button
          onClick={() => handleVote(currentPosition, c.id)}
          disabled={!!votes[currentPosition]}
          className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {votes[currentPosition] === c.id ? 'Voted' : 'Vote'}
        </button>
      </div>
    ))}
  </div>
) : (
  <p className="text-red-500">No candidates found for this position.</p>
)}


      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!votes[currentPosition]}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {currentIndex < positions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Vote;
