import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import AuthService from '../services/AuthService';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = AuthService.getCurrentUser();
    let location = useLocation();
  
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }