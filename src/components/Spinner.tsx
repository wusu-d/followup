import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const LoadingSpinner = ({
  size = 'lg',
  variant = 'primary',
  className = '',
}: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  const variantClasses = {
    primary: 'text-primary-green',
    secondary: 'text-gray-600',
    white: 'text-white',
  };

  return (
    <Loader2
      fontSize={40}
      className={`
        animate-spin
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
};

export default LoadingSpinner;
