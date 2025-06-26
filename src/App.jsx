import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {
  
  return (
    <>
      <div className="flex w-full h-screen overflow-hidden">  {/* <-- key change here */}
      <Sidebar />
      <Main />
    </div>
      
    </>
  );
}

export default App;
