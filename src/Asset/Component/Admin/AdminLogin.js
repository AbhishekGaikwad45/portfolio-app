import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../../services/api';
import { usePortfolio } from '../../../context/PortfolioContext';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../Css/Admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setLoginSuccess } = usePortfolio();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      setLoginSuccess(data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="text-center mb-4">
          <div
            className="d-inline-flex justify-content-center align-items-center mb-3"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(13, 110, 253, 0.15)',
              color: '#0d6efd'
            }}
          >
            <LockOutlinedIcon style={{ fontSize: 32 }} />
          </div>
          <h3 className="text-white fw-bold">Admin Portal</h3>
          <p className="text-muted small">Sign in to manage your portfolio content</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top border-secondary text-center">
          <Link to="/" className="text-decoration-none text-info d-inline-flex align-items-center gap-1 small">
            <ArrowBackIcon fontSize="small" /> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
