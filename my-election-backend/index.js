const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const writeFileAtomic = require('write-file-atomic');

const app = express();
const port = 10000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths
const usersFilePath = path.join(__dirname, 'users.json');
const votesFilePath = path.join(__dirname, 'votes.json');

// Utility: Read/Write Votes
const readVotes = () => {
  if (!fs.existsSync(votesFilePath)) return [];
  const data = fs.readFileSync(votesFilePath, 'utf8');
  return JSON.parse(data || '[]');
};

const writeVotes = (votes) => {
  writeFileAtomic.sync(votesFilePath, JSON.stringify(votes, null, 2));
};

// Utility: Read/Write Users
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data || '[]');
};

const writeUsers = (users) => {
  writeFileAtomic.sync(usersFilePath, JSON.stringify(users, null, 2));
};

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Election API!' });
});

// Register a new user
app.post('/users', (req, res) => {
  const { matricNumber, fullName, department, faculty, hallOfResidence, level, password } = req.body;

  if (!matricNumber || !fullName || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const users = readUsers();
  const userExists = users.some(user => user.matricNumber === matricNumber);

  if (userExists) {
    return res.status(400).json({ message: 'Matric Number already registered. Please login instead.' });
  }

  const newUser = { matricNumber, fullName, department, faculty, hallOfResidence, level, password };
  users.push(newUser);
  writeUsers(users);

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
});

// Login
app.post('/login', (req, res) => {
  const { matricNumber, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.matricNumber === matricNumber && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid matric number or password' });
  }

  const { password: _, ...userData } = user;
  res.status(200).json({ user: userData });
});

// Cast a vote
app.post('/vote', (req, res) => {
    const { userId, candidateId, position } = req.body;
  
    if (!userId || !candidateId || !position) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    let votes = readVotes();
  
    // Find if user already exists in vote list
    let userVoteEntry = votes.find(vote => vote.userId === userId);
  
    if (!userVoteEntry) {
      // If user has not voted at all yet, create new entry
      userVoteEntry = {
        userId,
        votes: {
          [position]: candidateId
        }
      };
      votes.push(userVoteEntry);
    } else {
      // If user has already voted for this position, block it
      if (userVoteEntry.votes[position]) {
        return res.status(400).json({ message: 'You have already voted for this position.' });
      }
  
      // Else, add this position's vote
      userVoteEntry.votes[position] = candidateId;
    }
  
    writeVotes(votes);
  
    console.log(`✅ Vote recorded for ${userId} -> ${position}: ${candidateId}`);
    res.status(200).json({ 
        message: 'Vote recorded successfully.',
        votes: userVoteEntry.votes 
      });
      
  });
  
  
 // GET all votes
app.get('/votes', (req, res) => {
    const votes = readVotes(); // This returns an array of { userId, votes }
    res.json({ votes });
  });
  
  

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
