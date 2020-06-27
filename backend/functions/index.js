const functions = require('firebase-functions');
const app = require('./app');  

app.use((req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
});

exports.firebaseapp = functions.https.onRequest(app);
