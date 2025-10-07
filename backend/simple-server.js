// SIMPLE TEST SERVER - E-Manthana
const express = require('express');
const app = express();
const PORT = 3000;

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(express.json());

// Test route - SIMPLE
app.get('/api/test', (req, res) => {
    console.log('✅ Test route called');
    res.json({ message: 'Server is WORKING!', status: 'OK' });
});

// Events route - SIMPLE  
app.get('/api/events', (req, res) => {
    console.log('✅ Events route called');
    res.json([
        { name: 'IDEALAB', displayName: 'IDEALAB' },
        { name: 'FIXCUIT', displayName: 'FIXCUIT' }
    ]);
});

// Root route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>E-Manthana Server</title></head>
            <body style="font-family: Arial; padding: 20px;">
                <h1>✅ E-Manthana Server is Running!</h1>
                <p>Test these endpoints:</p>
                <ul>
                    <li><a href="/api/test">/api/test</a></li>
                    <li><a href="/api/events">/api/events</a></li>
                </ul>
                <p>If you can see this page, your server is working!</p>
            </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log('===================================');
    console.log('🚀 SERVER STARTED SUCCESSFULLY!');
    console.log('===================================');
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`🔗 Test URL: http://localhost:${PORT}/api/test`);
    console.log('===================================');
});

// Handle errors
app.on('error', (err) => {
    console.error('❌ Server error:', err);
});