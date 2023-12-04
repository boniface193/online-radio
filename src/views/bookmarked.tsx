import React from "react";
import Modal from "../components/modals";
import { Link } from "react-router-dom";

const Bookmarked = () => {
  return <Modal hight="h-[32rem]" title="Book Marked">
    <div className="px-8 mb-8 overflow-y-auto h-[21rem]">
      <Link replace to={`/chapters/`}>
        <div className="bg-slate-200 flex items-center justify-between cursor-pointer mb-4 dark:bg-slate-800 h-auto rounded-lg p-2 space-y-2 ">
          <img src="https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg" className="w-12 mr-4" alt="search result pic" />
          <div>
            <p className="text-sm font-semibold capitalize">Nobis harum nam et.</p>
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
          <p className="bg-red-500 text-xl rounded-xl w-5 h-5 ml-auto cursor-pointer flex items-center justify-center p-0 m-0 text-white "></p>
        </div>
      </Link>
    </div>
  </Modal>
};

export default Bookmarked;