import { toast } from 'react-toastify';

const contentType = 'application/json';

// TODO: create abstraction layer to handle the fetch requests and error handling.
// Reuse repeated code.

const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.data);

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
const postReservation = async (values, callback) => {
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
const postUser = async (values, callback) => {
  try {
    const res = await fetch('/api/user', {
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
const updateUser = async (values, callback) => {
  const userId = values.id;
  const body = { ...values };
  delete body.id;
  try {
    const res = await fetch(`/api/user/${userId}`, {
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
const deleteUser = async (userId, callback) => {
  try {
    const res = await fetch(`/api/user/${userId}`, {
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
  fetcher,
  addReview,
  cancelReservation,
  postReservation,
  postUser,
  updateUser,
  deleteUser,
};
