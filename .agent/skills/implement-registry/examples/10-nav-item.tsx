'use client';

import React from 'react';
import { useNavData } from '@/lib/ui/nav-context';
import { useShellStore } from '@/lib/store/shell';

/**
 * Metadata Overrides (Optional)
 * These values override the filename-based discovery.
 */
export const order = 10;
export const name = 'my-nav-item';

/**
 * Directory-Based Registry Component Example
 * Path: modules/my-module/src/registry/nav-main/10-my-item.tsx
 * 
 * Rules:
 * 1. Must include 'use client';
 * 2. Use Semantic Class Names for theming.
 * 3. Consume Shell context via standard hooks.
 */
export default function MyNavItem() {
  const { context } = useNavData();
  const { setDetailPanel } = useShellStore();
  
  return (
    <div 
      className="nav-item-container" 
      onClick={() => setDetailPanel('my-module-panel')}
    >
      <span className="nav-item-label">
        My Item for {context.user?.name ?? 'Guest'}
      </span>
    </div>
  );
}