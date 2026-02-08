'use client';

import React from 'react';
import { useNavData } from '@/lib/ui/nav-context';

/**
 * Directory-Based Registry Component Example
 * Path: modules/my-module/src/registry/nav-main/10-my-item.tsx
 * 
 * Rules:
 * 1. Must include 'use client';
 * 2. Filename must start with {order}-
 */
export default function MyNavItem() {
  const { context } = useNavData();
  
  return (
    <div className="nav-item">
      <span>My Item for {context.user?.name}</span>
    </div>
  );
}
