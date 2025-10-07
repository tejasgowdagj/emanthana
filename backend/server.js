const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to E-Manthana Backend API' });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

app.get('/api/events', (req, res) => {
  const events = [
    {
      id: 'idealab',
      name: 'IDEALAB',
      description: 'Where innovation finds its each',
      date: '2025-10-24',
      time: '09:00',
      location: 'BGS Block I',
      registrationLink: 'register-hardware.html',
      rulesLink: 'rules-hardware.pdf'
    },
    {
      id: 'fixcuit',
      name: 'FIXCUIT',
      description: 'Think fast, fix faster',
      date: '2025-10-24',
      time: '14:00',
      location: 'BGS Block I',
      registrationLink: 'register-software.html',
      rulesLink: 'rules-fixcuit.pdf'
    },
    {
      id: 'codequest',
      name: 'CODE QUEST',
      description: 'Journey through debugging, testing and presenting',
      date: '2025-10-27',
      time: '09:00',
      location: 'BGS Block I',
      registrationLink: 'register-ideathon.html',
      rulesLink: 'rules-codequest.pdf'
    },
    {
      id: 'protospark',
      name: 'PROTOSPARK',
      description: 'Ignite ideas from prototypes to presenting',
      date: '2025-10-27',
      time: '09:00',
      location: 'BGS Block I',
      registrationLink: 'register-fault-circuit.html',
      rulesLink: 'rules-protospark.pdf'
    },
    {
      id: 'veil-of-secrets',
      name: 'VEIL OF SECRETS',
      description: 'Hidden truths, twisted paths, one winner',
      date: '2025-10-27',
      time: '14:00',
      location: 'BGS Block I',
      registrationLink: 'register-mystery-box.html',
      rulesLink: 'rules-veil-of-secrets.pdf'
    },
    {
      id: 'micdrop',
      name: 'MICDROP',
      description: 'Mic on, minds on fire',
      date: '2025-10-27',
      time: '15:30',
      location: 'BGS Block I',
      registrationLink: 'register-paper-presentation.html',
      rulesLink: 'rules-micdrop.pdf'
    },
    {
      id: 'iq-infinity',
      name: 'IQ INFINITY',
      description: 'Where infinite knowledge meets sharp minds',
      date: '2025-10-31',
      time: '10:00',
      location: 'BGS Block I',
      registrationLink: 'register-ai-challenge.html',
      rulesLink: 'rules-iq-infinity.pdf'
    }
  ];

  res.json({
    success: true,
    events: events,
    total: events.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
