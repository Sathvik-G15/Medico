import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../CSS/VerifyUID.css';

const VerifyUid = () => {
  const { setUidContext, login, role } = useContext(AuthContext);
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uid.trim()) {
      setLoading(true);
      setUidContext(uid);
      login(role, uid); // Set role and UID in context/localStorage
      
      // Small delay for better UX
      setTimeout(() => {
        if (role === 'admin') {
          navigate(`/dashboard/${uid}`);
        } else {
          navigate(`/user-dashboard/${uid}`);
        }
        setLoading(false);
      }, 800);
    }
  };

  const MedicalIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const KeyIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );

  const InfoIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="verify-uid-container">
      <div className="verify-uid-content">
        <div className="verify-uid-card">
          <div className="medical-icon">
            <div className="icon-wrapper">
              <MedicalIcon />
            </div>
          </div>
          
          <div className="verify-uid-header">
            <h1 className="verify-uid-title">Patient Verification</h1>
            <p className="verify-uid-subtitle">
              Enter the Patient UID to access the portal
            </p>
            <div className="role-badge">
              <UserIcon />
              {role === 'admin' ? 'Healthcare Provider' : 'Patient'} Access
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="verify-uid-form">
            <div className="form-group">
              <label className="form-label">
                <KeyIcon />
                PATIENT UID
              </label>
              <input
                type="text"
                className="form-input"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Enter patient's UID (e.g., PAT-001)"
                required
                disabled={loading}
                pattern="[A-Za-z0-9-]+"
                title="Please enter a valid Patient UID"
              />
              <div className="uid-format-helper">
                Format: Letters, numbers, and hyphens only
              </div>
            </div>
            
            <button 
              type="submit" 
              className="verify-button"
              disabled={loading || !uid.trim()}
            >
              {loading ? 'Verifying...' : `Continue to ${role === 'admin' ? 'Admin' : 'Patient'} Dashboard`}
            </button>
          </form>

          <div className="uid-info">
            <h3 className="uid-info-title">
              <InfoIcon />
              About Patient UID
            </h3>
            <ul className="uid-info-list">
              <li>The Patient UID is a unique identifier for each patient</li>
              <li>It ensures secure access to medical records</li>
              <li>Only authorized personnel can access patient data</li>
              <li>Contact support if you don't know the Patient UID</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUid;