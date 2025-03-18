"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface NotificationContextType {
  showNotification: (type: 'success' | 'error', message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => {
      const notification = document.getElementById(`notification-${id}`);
      if (notification) {
        notification.classList.add('removing');
      }
      return prev.filter(n => n.id !== id);
    });
  }, []);

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeNotification(id), 3000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="notifications-container">
        {notifications.map(({ id, type, message }) => (
          <div
            key={id}
            id={`notification-${id}`}
            className={`notification ${type}`}
          >
            <span className="notification-icon">
              {type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
            </span>
            <div className="notification-content">
              <p className="notification-message">{message}</p>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}