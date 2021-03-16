import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  console.log("this is props of register", props);
  const history = useHistory();
  const getLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      const location = {
        x: position.coords.latitude,
        y: position.coords.longitude,
      };

      axios
        .get(
          `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${location.y}%2C${location.x}`
        )
        .then((response) => {
          const location = {};
          console.log(response.data.address);
          location.address = response.data.address.ShortLabel;
          location.num = response.data.address.AddNum;
          location.city = response.data.address.City;
          location.country = response.data.address.CountryCode;
          location.region = response.data.address.region;
          location.postal =
            response.data.address.Postal +
            " " +
            response.data.address.PostalExt;
          console.log(location);
          props.setLocation(location);
        });
    });
  };
  const registration = (event) => {
    event.preventDefault();
    console.log("tt", event);
  };
  return (
    <>
      <h1>I am Register</h1>
      {props.user && props.user.register ? (
        <form method="POST" action="/api/register">
          <div>
            <label>
              Full Name:
              <input type="text" name="name" value={props.user.name} />
            </label>
            <label>
              Email:
              <input type="text" name="name" value={props.user.email} />
            </label>
          </div>
          <div>
            <input type="checkbox" id="service" name="service"></input>
            <label for="service">Do you wish to provide services ?</label>
          </div>
          <div>
            <button onClick={getLocation}>Get my current location</button>
          </div>
          <div>
            <label>
              Address
              <input
                type="text"
                name="full_address"
                value={props.location && props.location.address}
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                value={props.location && props.location.city}
              />
            </label>
          </div>
          <div>
            <label>
              Postal code
              <input
                type="text"
                name="postal_code"
                value={props.location && props.location.postal}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                name="country"
                value={props.location && props.location.country}
              />
            </label>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      ) : (
        history.push("/home")
      )}
      {/* <h2>{props.user.email}</h2>
  <h2>{props.user.full_name}</h2> */}
    </>
  );
}
