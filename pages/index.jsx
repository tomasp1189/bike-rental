/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

import dbConnect from '../lib/dbConnect';
import Bike from '../server/Bike/Bike';

const Index = ({ bikes = [] }) => (
  <>
    {/* Create a card for each pet */}
    {bikes.map(bike => {
      console.log(bike);
      return (
        <div key={bike._id}>
          <div className="card">
            {/* <Image src={bike.image_url} /> */}
            <h5 className="pet-name">{bike.model}</h5>
            <div className="main-content">
              <p className="pet-name">{bike.color}</p>
              <p className="owner">Owner: {bike.owner_name}</p>
              <div className="btn-container">
                <Link href="/[id]/edit" as={`/${bike._id}/edit`}>
                  <button type="button" className="btn edit">
                    Edit
                  </button>
                </Link>
                <Link href="/[id]" as={`/${bike._id}`}>
                  <button type="button" className="btn view">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  /* find all the data in our database */
  await dbConnect();
  const result = await Bike.find({});
  const bikes = result.map(doc => {
    const bike = JSON.parse(JSON.stringify(doc));
    //  doc.toObject();
    bike._id = bike._id.toString();
    return bike;
  });

  return { props: { bikes } };
}

Index.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.object),
};

export default Index;
