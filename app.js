// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Multer storage setup
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

const upload = multer({ storage: storage }).single('file');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// POST route to upload file
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send('Error uploading file.');
        }
        res.send(`<h2>File uploaded successfully!</h2>
                  <p>Share this link: <a href="/download/${req.file.filename}">${req.file.filename}</a></p>`);
    });
});

// GET route to download file
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
