const findMyLocation = () => {
  const success = (position) => {
    // Convert object data to string
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(
          "Latitude: " +
            latitude +
            " " +
            "Longitude: " +
            longitude +
            " " +
            "City: " +
            data.city
        );
      });
  };

  const error = () => {
    alert("Unable to retrieve your location");
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

document
  .getElementById("loctationStatus")
  .addEventListener("click", findMyLocation);
