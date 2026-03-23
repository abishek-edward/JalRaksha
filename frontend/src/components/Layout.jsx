import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Map as MapIcon } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50">
      <nav className="w-full bg-blue-600 text-white shadow-md rounded-b-lg mb-8" style={{ maxWidth: '1200px' }}>
        <div className="px-4 py-4 w-full mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-200" />
            <span className="text-xl font-bold tracking-tight">JalRaksha</span>
          </div>
          <div className="flex space-x-4 font-medium">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md transition-colors ${location.pathname === '/' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-500'}`}
            >
              ASHA Field Form
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 flex items-center gap-2 rounded-md transition-colors ${location.pathname === '/dashboard' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-500'}`}
            >
              <MapIcon className="w-4 h-4"/>
              DHO Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full flex flex-col px-4 pb-12" style={{ maxWidth: '1200px' }}>
        <Outlet />
      </main>
    </div>
  );
}
