import React from 'react';

import { AuthProvider } from './useAuth';
import { ToastProvider } from './useToast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
