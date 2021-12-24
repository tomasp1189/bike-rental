const fetcher = url =>
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(json => json.data);

const geocodeLatLng = async (lat, lng) => {
  const geocoder = window?.google && new window.google.maps.Geocoder();
  const latlng = {
    lat,
    lng,
  };
  try {
    const response = await geocoder.geocode({ location: latlng });

    if (response.results[0]) {
      return response.results[0];
    }
  } catch (e) {
    console.log(`Geocoder failed due to: ${e}`);
  }
  return 'No results found';
};

export default { fetcher, geocodeLatLng };
