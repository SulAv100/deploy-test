import React, { useEffect, useState } from "react";
import "./HIstoryPage.css";
import { useAuth } from "../../../hook/Context";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const { username, adminStatus, checkAdminStatus } = useAuth();
  const [testRecords, setTestRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/showHistory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
            credentials:'include'
          },

          
        );

        const data = await response.json();

        if (response.ok) {
          setTestRecords(data.userHistory);
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (username) {
      fetchHistory();
    }
  }, [username]);

  useEffect(() => {
    if (adminStatus) {
      navigate("/adminLanding");
    } else {
      console.log("");
    }
  }, [checkAdminStatus]);

  return (
    <div className="container">
      <h1 className="heading">Previous Tests</h1>
      <p className="description">
        Below are the records of your previous tests, including the date taken,
        correct answers, and total images shown.
      </p>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Test Date</th>
            <th className="th">Correct Answers</th>
            <th className="th">Total Images Shown</th>
          </tr>
        </thead>
        <tbody>
          {testRecords.map((record, index) => (
            <tr key={index}>
              <td className="td">{record.date}</td>
              <td className="td">{record.correctValue}</td>
              <td className="td">{record.totalImage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;