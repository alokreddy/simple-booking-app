import { useState, useCallback } from "react";
import "./App.css";
import FlightIcon from "./assets/flight-icon.png";

function FlightBooking() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [when, setWhen] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSourceFieldChange = useCallback(
    (e) => {
      setSource(e.target.value);
    },
    [source]
  );

  const handleDestinationFieldChange = useCallback(
    (e) => {
      setDestination(e.target.value);
    },
    [destination]
  );

  const handleWhenFieldChange = useCallback(
    (e) => {
      setWhen(e.target.value);
    },
    [when]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      fetch("/flights")
        .then((res) => res.json())
        .then(setFlightData);
    },
    [source, destination, when]
  );

  function FlightSearchResults({ apiData }) {
    return (
      <div className="container">
        {apiData.map((data, index) => (
          <div className="search-list" key={index}>
            <div className="search-flight">
              <img className="icon" src={FlightIcon} alt="Brand Icon" />
              <div className="details">
                <h1>{data.arrival}</h1>
                <p>{data.company}</p>
              </div>
              <div className="duration">
                <h1>{data.duration}</h1>
                <p>
                  {data.source.key}-{data.destination.key}
                </p>
              </div>
              <div className="price">
                <h1>{data.price}</h1>
                <button onClick={toggleModal}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const MyModel = (props) => {
    return showModal ? (
      showConfirmation ? (
        <div className="booknow-frm">
          <div className="container">
            <p>Booking Confirmed!</p>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      ) : (
        <div className="booknow-frm">
          <div className="container">
            <label htmlFor="name">
              <input id="name" type="text" placeholder="Your Name" />
            </label>
            <label htmlFor="email">
              <input id="email" type="text" placeholder="Your Email" />
            </label>
            <button onClick={openConfirmation}>Confirm Booking</button>
            <button onClick={toggleModal}>Cancel</button>
          </div>
        </div>
      )
    ) : (
      <div style={{ display: "none" }}></div>
    );
  };

  return (
    <div className="container">
      <h2>Flight Booking</h2>
      <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="source">
            Source
            <input
              id="source"
              name="source"
              value={source}
              onChange={handleSourceFieldChange}
              type="text"
              placeholder="Source"
            />
          </label>
          <label htmlFor="destination">
            Destination
            <input
              id="destination"
              name="destination"
              value={destination}
              onChange={handleDestinationFieldChange}
              type="text"
              placeholder="Destination"
            />
          </label>
          <label htmlFor="when">
            When
            <input
              id="when"
              name="when"
              value={when}
              onChange={handleWhenFieldChange}
              type="text"
              placeholder="When"
            />
          </label>
          <label htmlFor="button">
            <button>Search Flight</button>
          </label>
        </form>
      </div>
      {flightData ? <FlightSearchResults apiData={flightData} /> : null}
      <MyModel />
    </div>
  );
}

export default FlightBooking;
