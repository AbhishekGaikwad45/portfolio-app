const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'abhishek-portfolio-super-secret-jwt-key-2026';

const DATA_FILE = path.join(__dirname, 'data', 'portfolioData.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper functions for reading/writing persistent data
const getRawData = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data file:', err);
    return null;
  }
};

const saveData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data file:', err);
    return false;
  }
};

// Filter out sensitive data for public consumption
const sanitizeForPublic = (data) => {
  if (!data) return {};
  const { admin, ...publicData } = data;
  return publicData;
};

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Token expired or invalid' });
  }
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `${Date.now()}-${basename}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    // allow images and pdfs
    const allowedMime = [
      'image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif', 'image/avif',
      'application/pdf'
    ];
    if (allowedMime.includes(file.mimetype) || file.originalname.match(/\.(jpg|jpeg|png|webp|gif|avif|pdf)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'), false);
    }
  }
});

// ========================
// PUBLIC ROUTES
// ========================

// 1. Get entire public portfolio data
app.get('/api/portfolio', (req, res) => {
  const data = getRawData();
  if (!data) {
    return res.status(500).json({ message: 'Failed to retrieve portfolio data' });
  }
  res.json(sanitizeForPublic(data));
});

// 2. Admin Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const data = getRawData();
  if (!data || !data.admin) {
    return res.status(500).json({ message: 'Server configuration error' });
  }

  if (username !== data.admin.username) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, data.admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: data.admin.username, email: data.admin.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      username: data.admin.username,
      email: data.admin.email
    }
  });
});

// ========================
// PROTECTED ADMIN ROUTES
// ========================

// Verify token
app.get('/api/auth/verify', authenticateAdmin, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Change Admin Password
app.post('/api/auth/change-password', authenticateAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required' });
  }

  const data = getRawData();
  const isMatch = await bcrypt.compare(currentPassword, data.admin.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  data.admin.passwordHash = await bcrypt.hash(newPassword, 10);
  saveData(data);

  res.json({ message: 'Password updated successfully' });
});

// Update portfolio content (profile, about, skills, experience, education, certifications, projects)
app.put('/api/portfolio', authenticateAdmin, (req, res) => {
  const data = getRawData();
  const updates = req.body;

  if (updates.profile) {
    data.profile = { ...data.profile, ...updates.profile };
  }
  if (updates.about) {
    data.about = { ...data.about, ...updates.about };
  }
  if (updates.skills) {
    data.skills = { ...data.skills, ...updates.skills };
  }
  if (updates.experience) {
    data.experience = updates.experience;
  }
  if (updates.education) {
    data.education = updates.education;
  }
  if (updates.certifications) {
    data.certifications = updates.certifications;
  }
  if (updates.projects) {
    data.projects = updates.projects;
  }

  if (saveData(data)) {
    res.json({ message: 'Portfolio updated successfully', portfolio: sanitizeForPublic(data) });
  } else {
    res.status(500).json({ message: 'Failed to save changes' });
  }
});

// Upload profile photo
app.post('/api/upload/photo', authenticateAdmin, upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No photo uploaded' });
  }

  const data = getRawData();
  const photoUrl = `/uploads/${req.file.filename}`;
  data.profile.profilePhotoUrl = photoUrl;
  saveData(data);

  res.json({
    message: 'Profile photo updated successfully',
    photoUrl,
    portfolio: sanitizeForPublic(data)
  });
});

// Upload resume PDF
app.post('/api/upload/resume', authenticateAdmin, upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No resume file uploaded' });
  }

  const data = getRawData();
  const resumeUrl = `/uploads/${req.file.filename}`;
  data.profile.resumeUrl = resumeUrl;
  saveData(data);

  res.json({
    message: 'Resume updated successfully',
    resumeUrl,
    portfolio: sanitizeForPublic(data)
  });
});

// Upload About section image
app.post('/api/upload/about-image', authenticateAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  const data = getRawData();
  const imageUrl = `/uploads/${req.file.filename}`;
  data.about.imageUrl = imageUrl;
  saveData(data);

  res.json({
    message: 'About image updated successfully',
    imageUrl,
    portfolio: sanitizeForPublic(data)
  });
});

// Upload project screenshot/image
app.post('/api/upload/project-image', authenticateAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No project image uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'Project image uploaded successfully',
    imageUrl
  });
});

// Add project
app.post('/api/projects', authenticateAdmin, (req, res) => {
  const data = getRawData();
  const newProject = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'New Project',
    description: req.body.description || '',
    liveLink: req.body.liveLink || '',
    screenshots: req.body.screenshots || []
  };

  data.projects.push(newProject);
  saveData(data);

  res.json({
    message: 'Project created successfully',
    project: newProject,
    portfolio: sanitizeForPublic(data)
  });
});

// Update project
app.put('/api/projects/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const data = getRawData();

  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  data.projects[index] = {
    ...data.projects[index],
    ...req.body
  };
  saveData(data);

  res.json({
    message: 'Project updated successfully',
    project: data.projects[index],
    portfolio: sanitizeForPublic(data)
  });
});

// Delete project
app.delete('/api/projects/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const data = getRawData();

  const initialLength = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id);

  if (data.projects.length === initialLength) {
    return res.status(404).json({ message: 'Project not found' });
  }

  saveData(data);
  res.json({
    message: 'Project deleted successfully',
    portfolio: sanitizeForPublic(data)
  });
});

// Serve React production build if available (e.g., on Render or production deployment)
const buildPath = path.join(__dirname, '..', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Portfolio backend server running on http://localhost:${PORT}`);
});
