const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const geobuf = require('geobuf');
const Pbf = require('pbf');

const app = express();
const port = 3000;

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create necessary directories
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Keep original filename, add timestamp to prevent conflicts
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, `${basename}_${timestamp}${ext}`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check file type
        if (file.mimetype === 'application/json' || 
            file.originalname.endsWith('.geojson') || 
            file.originalname.endsWith('.json') ||
            file.originalname.endsWith('.pbf')) {
            cb(null, true);
        } else {
            cb(new Error('Only .json, .geojson, .pbf file formats are supported!'), false);
        }
    }
});

/**
 * Compress GeoJSON to GeoBuf
 * @param {string} inputPath - Input file path
 * @param {string} outputPath - Output file path
 * @returns {Promise}
 */
function compressGeoJSON(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(inputPath, 'utf8', function (err, data) {
            if (err) {
                reject(new Error(`Failed to read file: ${err.message}`));
                return;
            }

            try {
                const geojsonObj = JSON.parse(data.trim());
                let buffer = geobuf.encode(geojsonObj, new Pbf());

                fs.writeFile(outputPath, buffer, function (error) {
                    if (error) {
                        reject(new Error(`Failed to write compressed file: ${error.message}`));
                    } else {
                        resolve(outputPath);
                    }
                });
            } catch (parseError) {
                reject(new Error(`JSON parsing failed: ${parseError.message}`));
            }
        });
    });
}

/**
 * Decompress GeoBuf to GeoJSON
 * @param {string} inputPath - Input file path
 * @param {string} outputPath - Output file path
 * @returns {Promise}
 */
function decompressGeoBuf(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(inputPath, function (err, buffer) {
            if (err) {
                reject(new Error(`Failed to read file: ${err.message}`));
                return;
            }

            try {
                const geojson = geobuf.decode(new Pbf(buffer));
                const jsonString = JSON.stringify(geojson, null, 2);

                fs.writeFile(outputPath, jsonString, 'utf8', function (error) {
                    if (error) {
                        reject(new Error(`Failed to write decompressed file: ${error.message}`));
                    } else {
                        resolve(outputPath);
                    }
                });
            } catch (decodeError) {
                reject(new Error(`GeoBuf decoding failed: ${decodeError.message}`));
            }
        });
    });
}

/**
 * Get file size in MB
 */
function getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: require('./package.json').version,
  });
});

// Compress GeoJSON to GeoBuf
app.post('/api/compress', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a file to compress' });
        }

        const inputPath = req.file.path;
        const outputFileName = path.basename(req.file.filename, path.extname(req.file.filename)) + '.pbf';
        const outputPath = path.join(outputDir, outputFileName);

        const originalSize = getFileSizeMB(inputPath);
        
        await compressGeoJSON(inputPath, outputPath);
        
        const compressedSize = getFileSizeMB(outputPath);
        const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        res.json({
            success: true,
            message: 'Compression successful',
            originalSize: `${originalSize} MB`,
            compressedSize: `${compressedSize} MB`,
            compressionRatio: `${compressionRatio}%`,
            downloadUrl: `/api/download/${outputFileName}`
        });

        // Clean up uploaded temporary file
        fs.unlinkSync(inputPath);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Decompress GeoBuf to GeoJSON
app.post('/api/decompress', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a file to decompress' });
        }

        const inputPath = req.file.path;
        const outputFileName = path.basename(req.file.filename, path.extname(req.file.filename)) + '.geojson';
        const outputPath = path.join(outputDir, outputFileName);

        const originalSize = getFileSizeMB(inputPath);
        
        await decompressGeoBuf(inputPath, outputPath);
        
        const decompressedSize = getFileSizeMB(outputPath);

        res.json({
            success: true,
            message: 'Decompression successful',
            originalSize: `${originalSize} MB`,
            decompressedSize: `${decompressedSize} MB`,
            downloadUrl: `/api/download/${outputFileName}`
        });

        // Clean up uploaded temporary file
        fs.unlinkSync(inputPath);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Download file
app.get('/api/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(outputDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Set correct Content-Type
    if (filename.endsWith('.pbf')) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('Download error:', err);
        } else {
            // Delete file after download
            setTimeout(() => {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }, 60000); // Delete after 1 minute
        }
    });
});

// Get raw pbf file data (for frontend fetch)
app.get('/api/pbf/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(outputDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Set correct response headers
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Send binary data directly
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }
        res.send(data);
    });
});

// Get file information
app.post('/api/info', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a file' });
        }

        const filePath = req.file.path;
        const fileSize = getFileSizeMB(filePath);
        const fileExt = path.extname(req.file.originalname).toLowerCase();

        let info = {
            filename: req.file.originalname,
            size: `${fileSize} MB`,
            type: fileExt === '.pbf' ? 'GeoBuf' : 'GeoJSON'
        };

        // If it's a GeoJSON file, try to parse for more information
        if (fileExt === '.json' || fileExt === '.geojson') {
            try {
                const data = fs.readFileSync(filePath, 'utf8');
                const geojson = JSON.parse(data);
                
                info.features = geojson.features ? geojson.features.length : 0;
                info.type = geojson.type || 'GeoJSON';
            } catch (e) {
                // Ignore parsing errors
            }
        }

        res.json(info);
        
        // Clean up temporary file
        fs.unlinkSync(filePath);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Features:');
    console.log('- Upload GeoJSON files for compression to GeoBuf format');
    console.log('- Upload GeoBuf files for decompression to GeoJSON format');
    console.log('- View file information and compression ratios');
}); 