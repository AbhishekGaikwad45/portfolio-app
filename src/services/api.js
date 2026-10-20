const API_BASE = process.env.REACT_APP_API_URL || (window.location.port === '3000' ? 'http://localhost:5000' : '');

export const getAuthToken = () => {
  return localStorage.getItem('portfolio_admin_token');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('portfolio_admin_token', token);
  } else {
    localStorage.removeItem('portfolio_admin_token');
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem('portfolio_admin_token');
  localStorage.removeItem('portfolio_admin_user');
};

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const resolveAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    return `${API_BASE}${url}`;
  }
  return url;
};

// Fetch full portfolio data
export const getPortfolio = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio`);
    if (!res.ok) throw new Error('Failed to fetch portfolio data');
    return await res.json();
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    throw err;
  }
};

// Admin Login
export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  setAuthToken(data.token);
  if (data.user) {
    localStorage.setItem('portfolio_admin_user', JSON.stringify(data.user));
  }
  return data;
};

// Verify Auth Token
export const verifyAuth = async () => {
  const token = getAuthToken();
  if (!token) return { valid: false };

  try {
    const res = await fetch(`${API_BASE}/api/auth/verify`, {
      method: 'GET',
      headers: getHeaders(true)
    });
    if (!res.ok) {
      clearAuthToken();
      return { valid: false };
    }
    const data = await res.json();
    return { valid: true, user: data.user };
  } catch (err) {
    clearAuthToken();
    return { valid: false };
  }
};

// Change Password
export const changePassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${API_BASE}/api/auth/change-password`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({ currentPassword, newPassword })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to change password');
  }
  return data;
};

// Update Portfolio Section or Full Data
export const updatePortfolio = async (updates) => {
  const res = await fetch(`${API_BASE}/api/portfolio`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(updates)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update portfolio');
  }
  return data;
};

// Upload Profile Photo
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);

  const res = await fetch(`${API_BASE}/api/upload/photo`, {
    method: 'POST',
    headers: getHeaders(false),
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to upload photo');
  }
  return data;
};

// Upload Resume PDF
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const res = await fetch(`${API_BASE}/api/upload/resume`, {
    method: 'POST',
    headers: getHeaders(false),
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to upload resume');
  }
  return data;
};

// Upload About Image
export const uploadAboutImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/api/upload/about-image`, {
    method: 'POST',
    headers: getHeaders(false),
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to upload about image');
  }
  return data;
};

// Upload Project Screenshot
export const uploadProjectImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/api/upload/project-image`, {
    method: 'POST',
    headers: getHeaders(false),
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to upload project image');
  }
  return data;
};

// Add Project
export const addProject = async (project) => {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(project)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create project');
  }
  return data;
};

// Update Project
export const updateProject = async (id, project) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(project)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update project');
  }
  return data;
};

// Delete Project
export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete project');
  }
  return data;
};
