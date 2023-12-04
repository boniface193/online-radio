import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/modals";
import { Search } from "../assests/icons/icons";
import { Link } from "react-router-dom";
import { fetchSearch, incrementCurrentPage } from "../redux/reducers/searchSlice";

const RadioSearch = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { data, status, loading, rows } = useSelector((state: any) => state.searchSlice)
  const toLowerCases = searchValue.toLowerCase();

  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
  };

  const getValue = (e: any) => {
    e.preventDefault();
    const clearInput = document.querySelector('.searching') as HTMLFormElement | null;
    if (clearInput) {
      clearInput.reset();
    }
    dispatch(fetchSearch({ searchName: toLowerCases, limit: rows }));
  };

  const nextPage = () => {
    dispatch(fetchSearch({ searchName: toLowerCases, limit: rows }));
    dispatch(incrementCurrentPage());
  };

  return <Modal hight="h-[32rem]" title="Search">
    <form onSubmit={getValue} className="searching flex items-center px-8">
      <Search />
      <input type="search" role="search" name="searchvalue" placeholder="Search by name" onChange={handleChange} />
    </form>
    {
      loading ? <div className="w-12 h-12 mx-auto rounded-full animate-spin border-2 border-dashed border-blue-500 border-t-transparent"></div>
        : ''
    }
    <div className="px-8 mb-8 overflow-y-auto h-[21rem]">
      <p className="text-red-500 text-center my-8">{status}</p>

      <Link replace to={`/chapters/`}>
        <div className="bg-slate-200 space-x-4 flex cursor-pointer mb-4 dark:bg-slate-800 h-auto rounded-lg p-2 space-y-2 ">
          <img src="https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg" className="w-12" alt="search result pic" />
          <div>
            <p className="text-sm font-semibold capitalize">Nobis harum nam et.</p>
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-center my-5" onClick={nextPage}>
        <button className="shadow-lg drop-shadow-xl bg-slate-200 p-2 rounded-lg text-sm uppercase">Load More</button>
      </div>
    </div>
  </Modal>
}

export default RadioSearch;