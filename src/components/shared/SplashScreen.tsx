import React from 'react';

export default function SplashScreen() {
  return (
    <div 
      data-testid="splash-screen"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500"
    >
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">Habit Tracker</h1>
        <p className="text-xl">Track your daily habits</p>
      </div>
    </div>
  );
}