import React from "react";
import { useDispatch } from "react-redux"
import { ArrowLeft, ArrowRight } from "../assests/icons/icons";

interface PaginationProps {
  currentPage: number,
  totalPage: any,
  incrementCurrentPage: any,
  decreaseCurrentPage: any,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, incrementCurrentPage, decreaseCurrentPage }) => {
  const dispatch = useDispatch()
  const nextPage = () => {
    dispatch(incrementCurrentPage());
  }
  const previous = () => {
    dispatch(decreaseCurrentPage())
  }
  return <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
    <p onClick={previous} className="cursor-pointer flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" title="Previous Page">
      <span className="sr-only">Previous Page</span>
      <ArrowLeft />
    </p>

    {totalPage.map((item: any, index: number) => (
      <p key={index} className={`${currentPage === index + 1 ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-black'} cursor-pointer hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border hover:border-gray-300`} title={`Page ${item}`}>
        {item}
      </p>
    ))}

    <p onClick={nextPage} className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300" title="Next Page">
      <span className="sr-only">Next Page</span>
      <ArrowRight />
    </p>
  </nav>
};
export default Pagination;