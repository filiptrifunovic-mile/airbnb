import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";

const PlacesPages = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);

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

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });

    setPhotoLink("");
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
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

            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="add using a link from web"
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
              >
                Add photo
              </button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, index) => (
                  <div key={index}>
                    <img
                      src={"http://localhost:4000/uploads/" + link}
                      alt="photo"
                      className="rounded-2xl"
                    />
                  </div>
                ))}
              <button className="mt-10 flex items-center gap-1 justify-center border-2 bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </button>
            </div>
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
      )}
    </div>
  );
};

export default PlacesPages;
