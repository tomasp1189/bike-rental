import { getSession } from '@auth0/nextjs-auth0';

const Index = () => null;

export async function getServerSideProps({ req, res }) {
  /* find all the data in our database */

  const session = await getSession(req, res);
  // or use context.resolvedUrl for conditional redirect
  // if(context.resolvedUrl == "/")

  if (
    session &&
    session.user['http://localhost:3000/roles'].includes('Manager')
  ) {
    return {
      redirect: {
        destination: '/admin/user',
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: '/bike',
      permanent: false,
    },
  };
}

export default Index;
