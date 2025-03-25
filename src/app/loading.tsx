import React from 'react';

export default function Loading() {
  return (
    <main className="flex justify-center items-center w-full h-full bg-main-background">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </main>
  );
}
