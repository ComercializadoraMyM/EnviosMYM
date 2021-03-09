import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/images/avatars/express.png"
      {...props}
      width="90px"
    />
  );
};

export default Logo;
