const request = require('supertest');
const fs = require('fs');
const path = require('path');

// Import the app
const app = require('../index');

describe('GeoJSON to GeoBuf Converter API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0); // Use random port for testing
  });

  afterAll(done => {
    server.close(done);
  });

  describe('GET /', () => {
    it('should serve the main page', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('GeoJSON to GeoBuf Converter');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        version: expect.any(String),
      });
    });
  });

  describe('POST /api/compress', () => {
    it('should compress a valid GeoJSON file', async () => {
      const testGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: { name: 'Test Point' },
          },
        ],
      };

      const response = await request(app)
        .post('/api/compress')
        .attach('file', Buffer.from(JSON.stringify(testGeoJSON)), {
          filename: 'test.geojson',
          contentType: 'application/json',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('originalSize');
      expect(response.body).toHaveProperty('compressedSize');
      expect(response.body).toHaveProperty('compressionRatio');
      expect(response.body).toHaveProperty('downloadUrl');
    });

    it('should reject invalid GeoJSON file', async () => {
      const response = await request(app)
        .post('/api/compress')
        .attach('file', Buffer.from('invalid json'), {
          filename: 'invalid.json',
          contentType: 'application/json',
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });

    it('should reject missing file', async () => {
      const response = await request(app).post('/api/compress');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/decompress', () => {
    it('should decompress a valid GeoBuf file', async () => {
      // First create a compressed file
      const testGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: { name: 'Test Point' },
          },
        ],
      };

      const compressResponse = await request(app)
        .post('/api/compress')
        .attach('file', Buffer.from(JSON.stringify(testGeoJSON)), {
          filename: 'test.geojson',
          contentType: 'application/json',
        });

      expect(compressResponse.status).toBe(200);

      // Now decompress the file
      const downloadUrl = compressResponse.body.downloadUrl;
      const filename = downloadUrl.split('/').pop();
      const filePath = path.join(__dirname, '..', 'output', filename);

      // Wait a moment for file to be written
      await new Promise(resolve => setTimeout(resolve, 100));

      const fileBuffer = fs.readFileSync(filePath);

      const response = await request(app)
        .post('/api/decompress')
        .attach('file', fileBuffer, {
          filename: 'test.pbf',
          contentType: 'application/octet-stream',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('downloadUrl');
    });

    it('should reject invalid GeoBuf file', async () => {
      // Create a buffer that will definitely fail pbf decoding
      const invalidBuffer = Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff]);

      const response = await request(app)
        .post('/api/decompress')
        .attach('file', invalidBuffer, {
          filename: 'invalid.pbf',
          contentType: 'application/octet-stream',
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/info', () => {
    it('should return file information for GeoJSON', async () => {
      const testGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: { name: 'Test Point' },
          },
        ],
      };

      const response = await request(app)
        .post('/api/info')
        .attach('file', Buffer.from(JSON.stringify(testGeoJSON)), {
          filename: 'test.geojson',
          contentType: 'application/json',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('filename');
      expect(response.body).toHaveProperty('size');
      expect(response.body).toHaveProperty('type');
      expect(response.body).toHaveProperty('features');
    });

    it('should return file information for GeoBuf', async () => {
      // First create a compressed file
      const testGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: { name: 'Test Point' },
          },
        ],
      };

      const compressResponse = await request(app)
        .post('/api/compress')
        .attach('file', Buffer.from(JSON.stringify(testGeoJSON)), {
          filename: 'test.geojson',
          contentType: 'application/json',
        });

      expect(compressResponse.status).toBe(200);

      // Now get info for the compressed file
      const downloadUrl = compressResponse.body.downloadUrl;
      const filename = downloadUrl.split('/').pop();
      const filePath = path.join(__dirname, '..', 'output', filename);

      // Wait a moment for file to be written
      await new Promise(resolve => setTimeout(resolve, 100));

      const fileBuffer = fs.readFileSync(filePath);

      const response = await request(app)
        .post('/api/info')
        .attach('file', fileBuffer, {
          filename: 'test.pbf',
          contentType: 'application/octet-stream',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('filename');
      expect(response.body).toHaveProperty('size');
      expect(response.body).toHaveProperty('type');
    });
  });

  describe('GET /api/download/:filename', () => {
    it('should download a file', async () => {
      // First create a file to download
      const testGeoJSON = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: { name: 'Test Point' },
          },
        ],
      };

      const compressResponse = await request(app)
        .post('/api/compress')
        .attach('file', Buffer.from(JSON.stringify(testGeoJSON)), {
          filename: 'test.geojson',
          contentType: 'application/json',
        });

      expect(compressResponse.status).toBe(200);

      const downloadUrl = compressResponse.body.downloadUrl;
      const filename = downloadUrl.split('/').pop();

      const response = await request(app).get(`/api/download/${filename}`);
      expect(response.status).toBe(200);
      expect(response.headers['content-disposition']).toContain('attachment');
    });

    it('should return 404 for non-existent file', async () => {
      const response = await request(app).get('/api/download/nonexistent.pbf');
      expect(response.status).toBe(404);
    });
  });
});
