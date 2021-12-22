import { getSession } from '@auth0/nextjs-auth0';

const Index = () => null;

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps(req, res) {
  /* find all the data in our database */
  try {
    const { user } = await getSession(req, res);
    // or use context.resolvedUrl for conditional redirect
    // if(context.resolvedUrl == "/")

    if (!user['http://localhost:3000/roles'].includes('Manager')) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      };
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/bike',
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
