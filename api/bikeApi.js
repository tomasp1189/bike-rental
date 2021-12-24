import { toast } from 'react-toastify';
import utils from '../helpers/utils';

const contentType = 'application/json';

// TODO: create abstraction layer to handle the fetch requests and error handling.
// Reuse repeated code.

const addReview = async (values, callback) => {
  try {
    const res = await fetch(`/api/bike/${values.id}/review`, {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify({
        review: {
          rate: values.rating,
        },
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || res.statusText);
    }

    if (callback && typeof callback === 'function') callback();
  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
  }
};
const createBike = async (values, callback) => {
  try {
    const body = { ...values };

    if (values.location) {
      body.location = utils.parseLocation(values.location);
    }
    const res = await fetch('/api/bike', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(body),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || res.statusText);
    }

    if (callback && typeof callback === 'function') callback();
  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
  }
};
const updateBike = async (values, callback) => {
  const bikeId = values.id;
  const body = { ...values };
  delete body.id;
  if (values.location) {
    body.location = utils.parseLocation(values.location);
  }
  try {
    const res = await fetch(`/api/bike/${bikeId}`, {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(body),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || res.statusText);
    }

    if (callback && typeof callback === 'function') callback();
  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
  }
};
const deleteBike = async (bikeId, callback) => {
  try {
    const res = await fetch(`/api/bike/${bikeId}`, {
      method: 'DELETE',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || res.statusText);
    }

    if (callback && typeof callback === 'function') callback();
  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
  }
};

export default {
  addReview,
  createBike,
  updateBike,
  deleteBike,
};
