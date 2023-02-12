import React, { useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPages = () => {
  const { id } = useParams();
  console.log({ id });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState(false);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(e) {
    e.preventDefault();

    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place, should be short.")}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />

        {preInput("Address", "Address of your place.")}

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />

        {preInput(
          "Photos",
          "Place to upload photos(url or direct from device)."
        )}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of your place.")}

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks", "Select all the perks of your place.")}

        <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* perks */}
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra info", "House rules, etc..")}

        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput("Check in and out times", "Add check in and out times.")}

        <div className="grid sm:grid-cols-3 gap-1">
          <div>
            <h3 className="mt-2 -mb-1 ">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Check out time</h3>

            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Max number of guests</h3>

            <input
              type="number"
              value={maxGuest}
              onChange={(e) => setMaxGuest(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPages;
