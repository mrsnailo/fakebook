import { useEffect, useState } from "react";
import ModalHeader from "../../../UI/Modal/ModalHeader";
import { FaLocationDot } from "react-icons/fa6";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setLocation } from "../../../../store/UI/Post/postSlice";

const suggestedLocations = [
  {
    place: "Chattogram",
    location: "Chattogram, Chattogram Division, Bangladesh",
  },
  { place: "Rajshahi", location: "Rajshahi, Rajshahi Division, Bangladesh" },
  { place: "Sylhet", location: "Sylhet, Sylhet Division, Bangladesh" },
  { place: "Barisal", location: "Barisal, Barisal Division, Bangladesh" },
];

const LocationList = ({ heading, locations, onSelect, dispatch }) => (
  <>
    <p className="heading text-xl font-bold">{heading}</p>
    <div className="list h-[300px] overflow-y-auto">
      {locations.map((loc) => (
        <div
          onClick={() => {
            dispatch(setLocation(loc.place));
            onSelect();
          }}
          key={loc.place}
          className="flex items-center gap-3 my-3 hover:bg-hover px-2 py-3 rounded-md cursor-pointer"
        >
          <div className="icon p-4 bg-bg rounded-full">
            <FaLocationDot />
          </div>
          <div className="details">
            <p className="font-semibold">{loc.place}</p>
            <p className="text-sm text-gray-600">{loc.location}</p>
          </div>
        </div>
      ))}
    </div>
  </>
);

const SearchBar = ({ value, onChange }) => (
  <div className="w-full p-3 min-w-[200px] my-2">
    <div className="relative flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute w-5 h-5 top-2 left-2.5 text-text"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
        />
      </svg>

      <input
        onChange={onChange}
        value={value}
        className="w-full bg-hover placeholder:text-gray-400 text-text text-sm  rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Chuadanga, Bangladesh"
      />
    </div>
  </div>
);

const Location = ({ onBack }) => {
  const dispatch = useDispatch();
  const [heading, setHeading] = useState("Suggested");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

  useEffect(() => {
    const query = searchQuery.trim();

    // Immediately show loading spinner when typing starts
    if (query !== "") {
      setIsLoading(true);
    } else {
      setResults(null);
      setHeading("Suggested");
      setIsLoading(false);
    }

    const delayDebounce = setTimeout(() => {
      if (query === "") return;

      fetch(`${NOMINATIM_URL}?q=${query}&format=json&addressdetails=1`)
        .then((res) => res.json())
        .then((data) => {
          const locations = data.map((obj) => ({
            place: obj.name,
            location: `${
              obj.address.city ||
              obj.address.town ||
              obj.address.village ||
              "Unknown"
            }, ${obj.address.state || "Unknown"}, ${obj.address.country}`,
          }));
          setHeading("Results");
          setResults(locations);
        })
        .catch((err) => {
          console.error("Fetching failed:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <>
      <ModalHeader onClickBack={onBack} title={"Search for location"} />
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading && (
        <div className=" flex justify-center items-center h-52">
          <InfinitySpin
            visible={true}
            width="100"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      )}
      {!isLoading && (
        <LocationList
          heading={heading}
          onSelect={onBack}
          dispatch={dispatch}
          locations={results ?? suggestedLocations}
        />
      )}
    </>
  );
};

export default Location;
