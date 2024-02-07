import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/modals";
import { fetchChannels, incrementCurrentPage } from "../redux/reducers/channelSlice";

const Channels = () => {
  const dispatch = useDispatch()
  const { data, status, loading, rows } = useSelector((state: any) => state.channelSlice)

  useEffect(() => {
    dispatch(fetchChannels(rows));
  }, [dispatch, rows]);

  const nextPage = () => {
    dispatch(incrementCurrentPage());
  }

  if (loading) {
    return <Modal hight="h-[32rem]" title="Channel">
      <div className="w-12 h-12 mx-auto mt-20 rounded-full animate-spin border-2 border-dashed border-blue-500 border-t-transparent"></div>
    </Modal>
  }

  return <Modal hight="h-[32rem]" title="Channel">
    <div className="px-8 mb-8 overflow-y-auto h-[25rem]">
      <p className="text-red-500 text-center my-8">{status}</p>
      {data.map((item: any, index: number) => (
        <Link key={index} replace to={`/`}>
          <div className="bg-slate-200 space-x-4 flex cursor-pointer mb-4 dark:bg-slate-800 h-auto rounded-lg p-2 space-y-2 ">
            <img src={item.favicon} className="w-12" alt="studio pictures" />
            <div>
              <p className="text-sm font-semibold capitalize">{item.name}</p>
              <p className="text-sm">{item.country}</p>
            </div>
          </div>
        </Link>
      ))}

      {
        status === '' ? <div className="flex justify-center my-5" onClick={nextPage}>
          <button className="shadow-lg drop-shadow-xl bg-slate-200 p-2 rounded-lg text-sm uppercase">Load More</button>
        </div> : ''
      }

    </div>
  </Modal>
};

export default Channels