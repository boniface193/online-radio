import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children: ReactNode,
  title: string,
  hight: string,
}

const Modal: React.FC<ModalProps> = ({ hight, title, children }) => {
  const navigate = useNavigate();
  function toggleModal() {
    navigate(-1)
  }
  return <section>
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center ">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <div className={`${hight} inline-block align-center dark:text-slate-400 text-slate-800 bg-white dark:bg-slate-900 drop-shadow-2xl shadow-2xl rounded-lg text-left overflow-hidden transform transition-all my-8 align-middle max-w-lg w-full`} role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="flex justify-between items-center">
            <h1 className="mx-auto font-medium text-lg">{title}</h1>
            <h1 onClick={toggleModal} className="font-sans text-2xl font-medium p-5 cursor-pointer hover:text-red-500">X</h1>
          </div>
          <div className="mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
};

export default Modal;
