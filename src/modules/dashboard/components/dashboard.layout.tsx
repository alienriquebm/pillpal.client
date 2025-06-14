import type React from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-min-screen">{children}</div>;
}
