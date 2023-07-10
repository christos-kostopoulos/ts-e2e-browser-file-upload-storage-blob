import React from 'react';

const Container = ({ children }: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{children}</div>
  );
};


export default Container;
