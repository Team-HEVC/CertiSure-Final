/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { HiViewList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../Axios";
import DeleteCard from "./DeleteCard";

const Card = ({ image, title, id, refreshData }) => {
  const navigate = useNavigate();
  console.log(id);
  const deleteGroup = async (id, resp) => {
    try {
      const data = { flag: resp };
      const response = await API.delete(`/delete_group/${id}`, {
        data,
      });
      console.log(response);
      toast.success(`Group ${title} has been Successfully deleted`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      refreshData();
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };
  return (
    <div className="rounded-lg min-w-[250px] sm:w-[47%] lg:w-[47%] xl:w-[30%]  border-2 ">
      <figure className="bg-[#F0F0F0] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[300px] 3xl:h-[450px] ">
        <img
          className="sm:hover:scale-110 duration-200 p-5 lg:p-7 2xl:p-8 w-full h-full object-fill"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="flex flex-col justify-center">
        <div className="flex justify-start items-center">
          <h2 className=" font-semibold pl-4 py-4 text-xl text-left">
            {title.toUpperCase()}
          </h2>
        </div>
        <div className="flex text-sm py-1 text-[#000000D9] bg-[#FAFAFA]">
          <div
            onClick={() => {
              navigate("/dashboard/credentials/", { state: id });
            }}
            className="flex py-1 cursor-pointer justify-center items-center w-[50%]"
          >
            <HiViewList />
            <p>View Credentials</p>
          </div>
          <div
            onClick={() => {
              document.getElementById(`${id}`).showModal();
            }}
            className="flex justify-center items-center w-[50%] cursor-pointer"
          >
            <AiFillDelete />
            <p>Delete</p>
          </div>
          <DeleteCard
            key={id}
            title={title}
            deleteGroup={deleteGroup}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
