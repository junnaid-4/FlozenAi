'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, ButtonVariant, ButtonSize } from './Button';

interface CheckoutButtonProps {
  productId: string;
  title: string;
  price: number;
  isCourse?: boolean;
  className?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function CheckoutButton({ 
  productId, 
  title, 
  price, 
  isCourse = false, 
  className, 
  label = 'Buy Automation', 
  variant = 'primary', 
  size = 'lg' 
}: CheckoutButtonProps) {
  const router = useRouter();

  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/contact');
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      label={label} 
      className={className}
      onClick={handleCheckout}
    />
  );
}
