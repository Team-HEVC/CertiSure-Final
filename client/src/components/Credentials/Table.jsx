import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../Axios";

const Table = ({ id, refreshData, tableData, loading }) => {
  const [areAllChecked, setAllChecked] = useState(false);
  const [checkboxItems, setCheckboxItems] = useState({});
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const exportCSV = () => {
    const columns = ["Username", "Email", "Groupname", "CertificateID", "Date"];
    const formattedData = tableData.map((row) => ({
      Username: row.username,
      Email: row.email,
      Groupname: row.group_name,
      CertificateID: row._id,
      Date: row.data,
    }));
    const csvContent = `${columns.join(" , ")}\n${formattedData
      .map((row) => columns.map((col) => row[col]).join(" , "))
      .join("\n")}`;
    const csvDataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvContent
    )}`;
    window.open(csvDataUrl, "_blank");
  };

  useEffect(() => {
    setTableItems(tableData);
  }, [tableData]);

  const deleteCertificate = async (username, cid) => {
    try {
      const response = await API.delete(`/delete_cert/${cid}`, {
        headers: { Authorization: localStorage.getItem("access_token") },
      });
      if (response.data.success === true) {
        toast.success(
          `Certificate of ${username} has been Successfully deleted`
        );
        refreshData(id);
      }
    } catch (err) {
      toast.error(err.response?.data?.error);
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
    <div className="max-w-screen-2xl px-6 m-auto">
      <div className="items-start justify-between flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 mt-4 md:ml-0 md:mt-0 text-md font-bold sm:text-2xl">
            Certified Members
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => {
              exportCSV();
            }}
            className="inline-block px-4 py-2 text-black duration-150 font-medium bg-slate-100 outline-1 rounded-lg md:text-sm"
          >
            Export
          </button>
        </div>
      </div>
      <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
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
            {loading ? (
              <tr>
                <td className="text-center py-4" colSpan="5">
                  <span className="loading loading-ring loading-lg"></span>
                </td>
              </tr>
            ) : tableData.length > 0 ? (
              tableItems.map((item, idx) => (
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
                          `${import.meta.env.VITE_FRONTEND_URL}/credential/${
                            item._id
                          }`,
                          "_blank"
                        );
                      }}
                      className="py-2 leading-none px-3 font-medium bg-blue-100 text-blue-600 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-md"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        deleteCertificate(item.username, item._id);
                      }}
                      className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-400 font-medium"
                >
                  No certificate yet issued
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
