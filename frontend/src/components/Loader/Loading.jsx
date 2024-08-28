import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <HashLoader size={80} color='#0067FF' />
    </div>
  );
};

export default Loading;