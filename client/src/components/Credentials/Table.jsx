import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../Axios";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Table = ({ id, refreshData, tableData }) => {
  const [areAllChecked, setAllChecked] = useState(false);
  const [checkboxItems, setCheckboxItems] = useState({});
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableItems(tableData);
  }, [tableData]);

  const deleteCertificate = async (username, cid) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await API.delete(`/delete_cert/${cid}`);

      toast.success(
        `Certificate of ${username} has been Successfully deleted`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        }
      );
      refreshData();
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(err);
    }
  };
  const handleCheckboxItems = () => {
    setAllChecked(!areAllChecked);
    const updatedCheckboxItems = {};
    tableItems.forEach((_, idx) => {
      updatedCheckboxItems[`checkbox${idx}`] = !areAllChecked;
    });
    setCheckboxItems(updatedCheckboxItems);
  };

  const handleCheckboxChange = (e, idx) => {
    setAllChecked(false);
    setCheckboxItems({
      ...checkboxItems,
      [`checkbox${idx}`]: e.target.checked,
    });
  };

  return (
    <div className="max-w-screen-xl w-[1300px] px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Certified Members
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <a
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-black duration-150 font-medium bg-slate-100 outline-1 rounded-lg md:text-sm"
          >
            Export
          </a>
        </div>
      </div>
      <div className="mt-10 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 flex items-center gap-x-4">
                <div>
                  <input
                    type="checkbox"
                    id="checkbox-all-items"
                    className="checkbox-item peer hidden"
                    checked={areAllChecked}
                    onChange={handleCheckboxItems}
                  />
                  <label
                    htmlFor="checkbox-all-items"
                    className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                  ></label>
                </div>
                Name
              </th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Group Name</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "even:bg-gray-50" : "odd:bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${idx}`}
                      name={`checkbox-${idx}`}
                      className="checkbox-item peer hidden"
                      checked={checkboxItems[`checkbox${idx}`]}
                      onChange={(e) => handleCheckboxChange(e, idx)}
                    />
                    <label
                      htmlFor={`checkbox-${idx}`}
                      className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    ></label>
                  </div>
                  {item.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.group_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.data}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_FRONTEND_URL}/credential/${item._id}`,
                        "_blank"
                      );
                    }}
                    href="javascript:void()"
                    className="py-2 leading-none px-3 font-medium bg-blue-100 text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-md"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      deleteCertificate(item.username, item._id);
                    }}
                    href="javascript:void()"
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
