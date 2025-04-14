import { useState } from "react";
import ModalHeader from "../../../UI/Modal/ModalHeader";
const suggestedLocations = [
  { label: "New York, USA", value: "New York" },
  { label: "London, UK", value: "London" },
  { label: "Tokyo, Japan", value: "Tokyo" },
  { label: "Dhaka, Bangladesh", value: "Dhaka" },
];

const SuggestedLocationList = () => {
  return <></>;
};
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [results, setResult] = useState(null);
  const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
  console.table(results);
  console.log(results);
  const searchHandler = async () => {
    if (!searchQuery) {
      return;
    }

    try {
      const res = await fetch(
        `${NOMINATIM_URL}?q=${searchQuery}&format=json&addressdetails=1`
      );
      const data = await res.json();
      const locations = data.map((obj) => ({
        place: obj.name,
        location: `${obj.address.city}, ${obj.address.state}, ${obj.address.country}`,
      }));
      setResult(locations);
    } catch (error) {
      console.error("faetching failed: " + error);
    }
  };

  return (
    <div class="w-full p-3 min-w-[200px] my-2">
      <div class="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-5 h-5 top-2 left-2.5 text-text"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          />
        </svg>

        <input
          onBlur={searchHandler}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="w-full bg-hover placeholder:text-text text-text text-sm  rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Chuadanga, Bangladesh"
        />
      </div>
    </div>
  );
};

const Location = ({ onBack }) => {
  return (
    <>
      <ModalHeader onClickBack={onBack} title={"Search for location"} />
      <SearchBar />
      <SuggestedLocationList />
    </>
  );
};

export default Location;
