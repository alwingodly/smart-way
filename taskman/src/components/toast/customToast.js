import { toast } from 'react-hot-toast';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export const showCustomToast = (message, type = 'success') => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: type === 'error' ? <FiXCircle /> : <FiCheckCircle />,
      style: {
        background: type === 'error' ? '#E57373' : '#81C784', 
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
      },
      iconTheme: {
        primary: '#fff',
        secondary: type === 'error' ? '#E57373' : '#81C784',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
};
