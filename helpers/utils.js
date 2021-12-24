const parseLocation = googleLocation => {
  if (googleLocation) {
    const { geometry } = googleLocation;
    const coordinates = [geometry?.location.lng(), geometry?.location.lat()];

    return { type: 'Point', coordinates };
  }
  return null;
};

export default { parseLocation };
