import { toast } from 'react-toastify';

const contentType = 'application/json';

// TODO: create abstraction layer to handle the fetch requests and error handling.
// Reuse repeated code.

const cancelReservation = async (reservationId, callback) => {
  try {
    const res = await fetch(`/api/reservation/${reservationId}/cancel`, {
      method: 'PUT',
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
const createReservation = async (values, callback) => {
  try {
    const res = await fetch('/api/reservation', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(values),
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
  cancelReservation,
  createReservation,
};
