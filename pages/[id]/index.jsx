import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

/* Allows you to view pet card info and delete pet card */
const BikePage = ({ bike }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const petID = router.query.id;

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'Delete',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the pet.');
    }
  };

  return (
    <div key={bike._id}>
      <div className="card">
        <h5 className="pet-name">{bike.name}</h5>
        <div className="main-content">
          <p className="pet-name">{bike.name}</p>
          <p className="owner">Owner: {bike.owner_name}</p>

          {/* Extra Pet Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {bike.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {bike.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${bike._id}/edit`}>
              <button type="button" className="btn edit">
                Edit
              </button>
            </Link>
            <button type="button" className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const pet = await Pet.findById(params.id).lean();
  pet._id = pet._id.toString();

  return { props: { pet } };
}

export default BikePage;
