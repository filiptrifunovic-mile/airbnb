import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState([]);
  const [checkOut, setCheckOut] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  let numberOfDays = 0;

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              className="fixed bottom-10 flex gap-2  py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
              onClick={() => setShowAllPhotos(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <div className="flex gap-2 my-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        <a
          href={"https://maps.google.com/?q=" + place.address}
          target="_blank"
          className="block font-semibold underline"
        >
          {place.address}
        </a>
      </div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt="photo"
                  className="aspect-square object-cover"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
                alt="photo"
                className="aspect-square object-cover"
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                  alt="photo"
                  className="aspect-square object-cover relative top-2"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          onClick={() => setShowAllPhotos(true)}
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <b>Check in:</b> {place.checkIn}h <br />
          <b>Check Out:</b> {place.checkOut}h <br />
          <b>Max number of guests:</b> {place.maxGuests} <br />
        </div>
        <div>
          <div className="bg-gray-200 p-4 rounded-2xl shadow">
            <div className="text-2xl text-center">
              Price: {place.price} € / per night
            </div>
            <div className="border py-4 px-4 rounded-2xl">
              <label>Check in:</label> <br />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="border py-4 px-4 rounded-2xl">
              <label>Check out:</label> <br />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="border py-4 px-4 rounded-2xl w-28">
              <label>Nymber of guests:</label> <br />
              <input
                type="number"
                placeholder="1"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
            <button className="primary">
              Book this place
              {numberOfDays > 0 && <span> €{numberOfDays * place.price}</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-8 px-8 py-8">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
