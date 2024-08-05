import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "./UserDisplay.css";
import { useAuth } from "../../../hook/Context";

function UserDisplay() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const usersPerPage = 5;

  const { adminStatus, checkAdminStatus } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.endUsers);
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/user/delete/${userId}`,
        {
          method: "POST",
          credentials:'include'
        }
      );
      const data = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className="user-data-container">
      <div className="user-data">
        <h2>Users</h2>
      </div>
      {currentUsers?.map((user, index) => (
        <div key={index} className="single-user-data">
          <span>{user.username}</span>
          <input type="text" value={user._id} hidden readOnly />
          <div className="operation-button">
            <button  onClick={() => deleteUser(user._id)} className="delete-button">
              <i className="fa-solid fa-trash fa-flip"></i>
              <p>Delete</p>
            </button>
          </div>
        </div>
      ))}
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(users.length / usersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default UserDisplay;
