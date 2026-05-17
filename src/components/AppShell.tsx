import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-washi">
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Safe area support for notch/dynamic island */}
      <div className="h-safe-area-inset-bottom bg-washi" />
    </div>
  );
}
