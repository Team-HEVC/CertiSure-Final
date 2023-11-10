/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Card from "../components/Dashboard/Card";
import { useState } from "react";
import DialogBox1 from "../components/DialogBox1";
import API from "../Axios";
import { FaPlus } from "react-icons/fa";

const Groups = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const myEmail = localStorage.getItem("user");
      const response = await API.get(`/get_user_groups/${myEmail}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex text-black flex-col px-5 lg:px-12 xl:px-16 2xl:px-20 pt-4 gap-4 bg-[#F0F2F5]">
      <div className=" h-28 rounded-lg items-end bg-white flex">
        <div className="w-[10%]] font-bold text-xl pl-5 pb-6">Groups</div>
        <div className="w-[100%] items-end justify-end pr-5 pb-6 flex">
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="px-3 py-1.5 gap-1 flex justify-center items-center text-sm text-white duration-150 bg-[#1677FF] font-medium pb-2 rounded-lg hover:bg-indigo-500 active:shadow-lg "
          >
            <FaPlus />
            Create Group
          </button>
        </div>
      </div>
      {/* <div className="bg-white pb-10 flex flex-wrap items-center gap-8 py-5 lg:py-9 px-5 lg:px-14 mb-6"> */}

      <div className="bg-white pb-10 flex flex-wrap items-center justify-normal gap-8 md:gap-10 xl:gap-14 lg:justify-center xl:justify-start p-5 lg:p-8 xl:p-12 2xl:py-9 2xl:px-14 mb-6">
        {data.map((item) => {
          return (
            <Card
              key={item._id}
              image={item.imagelink}
              title={item.group_name}
              id={item._id}
              refreshData={getData}
            />
          );
        })}
      </div>
      <DialogBox1 />
    </div>
  );
};

export default Groups;
