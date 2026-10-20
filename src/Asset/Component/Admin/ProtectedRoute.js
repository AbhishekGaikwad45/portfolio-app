import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePortfolio } from '../../../context/PortfolioContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkingAuth } = usePortfolio();

  if (checkingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
