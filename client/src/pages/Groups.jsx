import React, { useCallback, useEffect } from "react";
import Card from "../components/Dashboard/Card";
import { useState } from "react";
import DialogBox1 from "../components/Dashboard/DialogBox1";
import API from "../Axios";
import { FaPlus } from "react-icons/fa";
import PlaceholderImage from "../assets/credential-placeholder.png";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Dashboard/Pagination";

const Groups = () => {
  const navigator = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const getData = async (page = 1) => {
    try {
      setLoading(true);
      const myEmail = localStorage.getItem("user");
      const response = await API.get(
        `/get_user_groups/${myEmail}?page=${page}&per_page=${9}`
      );
      setData(response.data.groups);
      setTotalPageCount(response.data.total_pages);
      setLoading(false);
    } catch (err) {
      navigator("/404");
    }
  };
  const changePage = useCallback((page) => {
    setCurrentPage(page);
  }, []);
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const deleteGroup = useCallback(async (id, resp) => {
    try {
      const data = { flag: resp };
      const response = await API.delete(`/delete_group/${id}`, {
        data,
      });
      toast.success(`Successfully deleted`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      refreshData();
    } catch (err) {
      toast.error(err?.response?.data?.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  }, []);

  return (
    <div className="flex text-black flex-col px-5 lg:px-12 xl:px-16 2xl:px-20 pt-4 gap-4 bg-[#F0F2F5]">
      <div className="h-28 rounded-lg items-end bg-white flex">
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
      <div className="bg-white mb-6">
        <div className=" pb-10 flex flex-wrap items-center justify-normal gap-8 md:gap-10 xl:gap-14 lg:justify-center xl:justify-start p-5 lg:p-8 xl:p-12 2xl:py-9 2xl:px-14 mb-0">
          {loading ? (
            <div className="m-auto my-44">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => {
              return (
                <Card
                  key={item._id}
                  image={item.imagelink}
                  title={item.group_name}
                  id={item._id}
                  deleteGroup={deleteGroup}
                />
              );
            })
          ) : (
            <div className="w-full mt-16 mb-4 flex flex-col justify-center items-center text-center">
              <img
                src={PlaceholderImage}
                alt="Placeholder"
                className="h-40 md:h-52"
              />
              <h1 className="text-xl font-semibold md:text-2xl">
                You have no groups yet
              </h1>
              <p className="mt-4 mb-8 text-sm md:text-base dark:text-gray-400">
                Groups are used to segregate your recipients. You can create a
                separate group for each of the events you conduct.
              </p>
            </div>
          )}
        </div>
        <Pagination
          onPageChange={changePage}
          pageIndex={currentPage - 1}
          totalPageCount={totalPageCount}
        />
      </div>
      <DialogBox1 />
    </div>
  );
};

export default Groups;
