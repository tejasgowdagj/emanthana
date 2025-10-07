// Simple Test Server for E-Manthana
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Serve static files from frontend folder
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

// Test route - to check if server is working
app.get('/api/test', (req, res) => {
    res.json({ 
        message: '✅ Backend server is working!', 
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// In-memory storage (no database needed for testing)
let registrations = [];
let results = [];

// Get all events
app.get('/api/events', (req, res) => {
    const events = [
        { name: 'IDEALAB', displayName: 'IDEALAB' },
        { name: 'FIXCUIT', displayName: 'FIXCUIT' },
        { name: 'CODE_QUEST', displayName: 'CODE QUEST' },
        { name: 'PROTOSPARK', displayName: 'PROTOSPARK' },
        { name: 'VEIL_OF_SECRETS', displayName: 'Veil of Secrets' },
        { name: 'MICDROP', displayName: 'MICDROP' },
        { name: 'IQ_INFINITY', displayName: 'IQ INFINITY' }
    ];
    res.json(events);
});

// Register for an event
app.post('/api/register', (req, res) => {
    try {
        const { eventName, studentName, email, phone, college, department, year, teamMembers } = req.body;
        
        // Validate required fields
        if (!eventName || !studentName || !email || !phone || !college || !department || !year) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const registration = {
            id: Date.now(),
            eventName,
            studentName,
            email,
            phone,
            college,
            department,
            year,
            teamMembers: teamMembers || [],
            registrationTime: new Date()
        };

        registrations.push(registration);
        
        console.log('📝 New registration:', registration);
        
        res.status(201).json({ 
            message: '✅ Registration successful!', 
            registration 
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get registrations for a specific event
app.get('/api/registrations/:eventName', (req, res) => {
    const eventRegistrations = registrations.filter(reg => 
        reg.eventName === req.params.eventName
    );
    res.json(eventRegistrations);
});

// Get all registrations (for testing)
app.get('/api/registrations', (req, res) => {
    res.json(registrations);
});

// Results endpoints
app.get('/api/results/:eventName', (req, res) => {
    const eventResults = results.filter(result => 
        result.eventName === req.params.eventName
    ).sort((a, b) => a.position - b.position);
    
    res.json(eventResults);
});

app.post('/api/results', (req, res) => {
    try {
        const { eventName, position, teamName, members, score } = req.body;
        
        // Remove existing result for same event and position
        results = results.filter(r => 
            !(r.eventName === eventName && r.position === position)
        );
        
        const result = { 
            eventName, 
            position, 
            teamName, 
            members, 
            score: score || 0,
            updatedAt: new Date() 
        };
        
        results.push(result);
        
        console.log('🏆 Result updated:', result);
        
        res.json({ 
            message: '✅ Result updated successfully', 
            result 
        });
        
    } catch (error) {
        console.error('Result update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 E-Manthana Test Server started!');
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🔗 API Test: http://localhost:${PORT}/api/test`);
    console.log(`📊 Events API: http://localhost:${PORT}/api/events`);
    console.log('');
    console.log('✅ Server is ready to accept requests!');
    console.log('✅ No database required - using in-memory storage');
    console.log('✅ CORS is enabled for all origins');
});