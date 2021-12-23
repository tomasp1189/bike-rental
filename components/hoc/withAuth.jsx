/* eslint-disable react/function-component-definition */
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

function withAuth(WrappedComponent) {
  return props => {
    const { user } = useUser();
    // const router = useRouter();

    if (user?.['http://localhost:3000/roles'].includes('Manager'))
      return <WrappedComponent {...props} />;
    return <p>Unauthorized</p>;
  };
}

withAuth.propTypes = {};

export default withAuth;
