'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/_state/store';

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
