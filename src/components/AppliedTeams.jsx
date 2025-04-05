import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue, off, update, remove } from "firebase/database";
import Container from "../components/Container/Container";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";

const AppliedTeams = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableFilter, setTableFilter] = useState("cricketRegistrations");

  const sportOptions = [
    { value: "cricketRegistrations", label: "Cricket" },
    { value: "wrestlingRegistrations", label: "Wrestling" },
    { value: "raceRegistrations", label: "Race" },
    { value: "tugofwarRegistrations", label: "Tug of War" },
    { value: "volleyballRegistrations", label: "Volleyball" },
  ];

  const collectionRefs = {
    cricketRegistrations: ref(db, "cricketRegistrations"),
    wrestlingRegistrations: ref(db, "wrestlingRegistrations"),
    raceRegistrations: ref(db, "raceRegistrations"),
    tugofwarRegistrations: ref(db, "tugofwarRegistrations"),
    volleyballRegistrations: ref(db, "volleyballRegistrations"),
  };

  useEffect(() => {
    if (!Cookies.get("auth")) {
      window.location.href = "/adminlogin";
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribeFunctions = [];

    const fetchData = (tableName, dbRef) => {
      return new Promise((resolve) => {
        const unsubscribe = onValue(
          dbRef,
          (snapshot) => {
            const data = snapshot.val();
            const registrationsArray = data
              ? Object.keys(data).map((key) => ({
                  id: key,
                  tableName,
                  ...data[key],
                }))
              : [];
            resolve(registrationsArray);
          },
          (err) => {
            setError(`Error fetching ${tableName}: ${err.message}`);
            resolve([]);
          }
        );
        unsubscribeFunctions.push(() => off(dbRef, "value", unsubscribe));
      });
    };

    const fetchAllData = async () => {
      try {
        const promises = Object.entries(collectionRefs).map(
          ([tableName, dbRef]) => fetchData(tableName, dbRef)
        );
        const results = await Promise.all(promises);
        const allRegistrations = results.flat();

        setRegistrations(allRegistrations);
        filterRegistrations(allRegistrations, startDate, endDate, tableFilter);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      }
    };

    fetchAllData();

    return () => unsubscribeFunctions.forEach((fn) => fn());
  }, [startDate, endDate, tableFilter]);

  const filterRegistrations = (data, start, end, table) => {
    let filtered = data.filter((reg) => reg.tableName === table);

    if (start || end) {
      filtered = filtered.filter((reg) => {
        const regDate = new Date(reg.timestamp);
        const startDateObj = start ? new Date(start) : null;
        const endDateObj = end ? new Date(end + "T23:59:59") : null;

        return (
          (!startDateObj || regDate >= startDateObj) &&
          (!endDateObj || regDate <= endDateObj)
        );
      });
    }

    setFilteredRegistrations(filtered);
  };

  const handleDownloadExcel = () => {
    const downloadDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const isTeamSport = ["cricketRegistrations", "volleyballRegistrations"].includes(tableFilter);
    
    let exportData;
    if (isTeamSport) {
      exportData = filteredRegistrations.map((reg) => ({
        "Team Name": reg.teamName || "N/A",
        "Number of Players": reg.numPlayers || "N/A",
        "Players": reg.players ? reg.players.map(p => `${p.playerName} (Father: ${p.fatherName}, Mobile: ${p.mobile}, Aadhaar: ${p.aadhaar})`).join("; ") : "N/A",
        "Captain Father's Name": reg.captainFatherName || reg.fatherName || "N/A",
        "Captain Gender": reg.captainGender || reg.gender || "N/A",
        "Captain DOB": reg.captainDob || reg.dob || "N/A",
        "Block": reg.block || "N/A",
        "Village": reg.village || "N/A",
        "Ward No": reg.wardNo || "N/A",
        "Captain Aadhaar": reg.captainAadhaar || reg.aadhaar || "N/A",
        "Captain Mobile": reg.captainMobile || reg.mobile || "N/A",
        "Registered At": reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A",
      }));
    } else {
      exportData = filteredRegistrations.map((reg) => ({
        "Team Name": reg.teamName || "N/A",
        "Player Name": reg.playerName || "N/A",
        ...(tableFilter === "wrestlingRegistrations" && { "Weight (kg)": reg.weight || "N/A" }),
        ...(tableFilter === "tugofwarRegistrations" && { "Number of Players": reg.numPlayers || "N/A" }),
        ...(tableFilter === "raceRegistrations" && {
          "Event Type": reg.eventType || "N/A",
          "Event Category": reg.eventCategory || "N/A",
        }),
        "Father's Name": reg.fatherName || "N/A",
        "Gender": reg.gender || "N/A",
        "DOB": reg.dob || "N/A",
        "Block": reg.block || "N/A",
        "Village": reg.village || "N/A",
        "Ward No": reg.wardNo || "N/A",
        "Aadhaar": reg.aadhaar || "N/A",
        "Mobile": reg.mobile || "N/A",
        "Registered At": reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A",
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Style the worksheet
    worksheet["!cols"] = [
      { wch: 20 }, // Team Name
      ...(isTeamSport ? [
        { wch: 15 }, // Number of Players
        { wch: 50 }, // Players
      ] : [
        { wch: 20 }, // Player Name
        ...(tableFilter === "wrestlingRegistrations" ? [{ wch: 15 }] : []),
        ...(tableFilter === "tugofwarRegistrations" ? [{ wch: 15 }] : []),
        ...(tableFilter === "raceRegistrations" ? [{ wch: 20 }, { wch: 20 }] : []),
      ]),
      { wch: 20 }, // Father's Name
      { wch: 10 }, // Gender
      { wch: 15 }, // DOB
      { wch: 20 }, // Block
      { wch: 20 }, // Village
      { wch: 10 }, // Ward No
      { wch: 25 }, // Aadhaar
      { wch: 15 }, // Mobile
      { wch: 25 }, // Registered At
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    
    XLSX.writeFile(workbook, `${tableFilter}_report_${downloadDate}.xlsx`);
  };

  const handleEdit = (registration) => {
    // Edit functionality would need adjustment based on sport type
    // For simplicity, we'll skip editing for now as it needs more UI changes
  };

  const handleDelete = async (id, tableName) => {
    if (window.confirm("Delete this registration permanently?")) {
      try {
        await remove(ref(db, `${tableName}/${id}`));
      } catch (error) {
        setError("Delete failed: " + error.message);
      }
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <Container>
        <SectionHeader heading="Applied Teams/Players Management" />

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
          <div>
            <label className="block mb-2 font-medium">Sport Category</label>
            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <button
            onClick={handleDownloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Export to Excel
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Team</th>
                {["cricketRegistrations", "volleyballRegistrations"].includes(tableFilter) ? (
                  <>
                    <th className="p-3 text-left">Players Count</th>
                    <th className="p-3 text-left">Players</th>
                  </>
                ) : (
                  <th className="p-3 text-left">Player</th>
                )}
                {tableFilter === "wrestlingRegistrations" && (
                  <th className="p-3 text-left">Weight</th>
                )}
                {tableFilter === "tugofwarRegistrations" && (
                  <th className="p-3 text-left">Players Count</th>
                )}
                {tableFilter === "raceRegistrations" && (
                  <>
                    <th className="p-3 text-left">Event Type</th>
                    <th className="p-3 text-left">Event Category</th>
                  </>
                )}
                <th className="p-3 text-left">Father</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Ward</th>
                <th className="p-3 text-left">Block</th>
                <th className="p-3 text-left">Village</th>
                <th className="p-3 text-left">Aadhaar</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Registered</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{reg.teamName || "N/A"}</td>
                  {["cricketRegistrations", "volleyballRegistrations"].includes(tableFilter) ? (
                    <>
                      <td className="p-3">{reg.numPlayers || "N/A"}</td>
                      <td className="p-3">
                        {reg.players && reg.players.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {reg.players.map((player, idx) => (
                              <li key={idx}>
                                {player.playerName} (Father: {player.fatherName}, Mobile: {player.mobile}, Aadhaar: {player.aadhaar})
                              </li>
                            ))}
                          </ul>
                        ) : "N/A"}
                      </td>
                    </>
                  ) : (
                    <td className="p-3">{reg.playerName || "N/A"}</td>
                  )}
                  {tableFilter === "wrestlingRegistrations" && (
                    <td className="p-3">{reg.weight ? `${reg.weight} kg` : "N/A"}</td>
                  )}
                  {tableFilter === "tugofwarRegistrations" && (
                    <td className="p-3">{reg.numPlayers || "N/A"}</td>
                  )}
                  {tableFilter === "raceRegistrations" && (
                    <>
                      <td className="p-3">{reg.eventType || "N/A"}</td>
                      <td className="p-3">{reg.eventCategory || "N/A"}</td>
                    </>
                  )}
                  <td className="p-3">{reg.captainFatherName || reg.fatherName || "N/A"}</td>
                  <td className="p-3">{reg.captainGender || reg.gender || "N/A"}</td>
                  <td className="p-3">{reg.captainDob || reg.dob || "N/A"}</td>
                  <td className="p-3">{reg.wardNo || "N/A"}</td>
                  <td className="p-3">{reg.block || "N/A"}</td>
                  <td className="p-3">{reg.village || "N/A"}</td>
                  <td className="p-3">{reg.captainAadhaar || reg.aadhaar || "N/A"}</td>
                  <td className="p-3">{reg.captainMobile || reg.mobile || "N/A"}</td>
                  <td className="p-3">{new Date(reg.timestamp).toLocaleString()}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleDelete(reg.id, reg.tableName)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRegistrations.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No registrations found for selected criteria
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AppliedTeams;