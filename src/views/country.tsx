import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/modals";
import { Search } from "../assests/icons/icons";
import { fetchCountry, getFormValue } from "../redux/reducers/countrySlice";
import { Link } from "react-router-dom";

const Country = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { searchedCountry, status, loading } = useSelector((state: any) => state.countrySlice)

  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
  };

  const getValue = (e: any) => {
    e.preventDefault();
    const toLowerCases = searchValue.toLowerCase();
    const clearInput = document.querySelector('.country') as HTMLFormElement | null;
    if (clearInput) {
      clearInput.reset();
    }
    dispatch(getFormValue(toLowerCases));
    setSearchValue("");
  };

  if (loading) {
    return <Modal hight="h-[32rem]" title="Search Country">
      <div className="w-12 h-12 mx-auto mt-20 rounded-full animate-spin border-2 border-dashed border-blue-500 border-t-transparent"></div>
    </Modal>
  }

  return <Modal hight="h-[32rem]" title="Search Country">
    <form onSubmit={getValue} className="country flex items-center px-8">
      <Search />
      <input type="search" role="search" name="searchvalue" placeholder="Search for Country or Cities" autoComplete="off" onChange={handleChange} />
    </form>

    <div className="px-8 py-5 overflow-y-auto h-[25rem]">
      <p className="text-red-500 text-center my-8">{status}</p>
      {
        searchedCountry.map((item: any, index: number) => (
          <Link key={index} replace to={`/`}>
            <div className="bg-slate-200 space-x-4 flex cursor-pointer mb-4 dark:bg-slate-800 h-auto rounded-lg p-2 space-y-2 ">
              <div>
                <p className="text-sm font-semibold capitalize">{item.name}</p>
                <p className="text-sm">has {item.stationcount} station count</p>
              </div>
            </div>
          </Link>
        ))
      }

    </div>
  </Modal>
}

export default Country;