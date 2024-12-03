import React from 'react';

const Loader = ({ visible }) => {
   if (!visible) return null;

   return (
      <div className="loader-overlay">
         <div className="loader">
            <img src="/images/loader.gif" alt="Studio Prive" width="150" height="150" />
         </div>
      </div>
   );
};

export default Loader;
