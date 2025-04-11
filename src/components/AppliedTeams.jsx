import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue, off, remove } from "firebase/database";
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

    const isTeamSport = ["cricketRegistrations", "volleyballRegistrations", "tugofwarRegistrations"].includes(tableFilter);
    
    let exportData;
    const headerStyle = {
      font: { bold: true },
      fill: { patternType: "solid", fgColor: { rgb: "D3D3D3" } },
      alignment: { horizontal: "center" },
    };

    if (isTeamSport) {
      exportData = filteredRegistrations.map((reg) => ({
        "Team Name": reg.teamName || "N/A",
        "Players Count": reg.numPlayers || "N/A",
        "Players Details": reg.players?.map(p => 
          `${p.playerName} (Father: ${p.fatherName}, Mobile: ${p.mobile})`).join("\n") || "N/A",
        "Block": reg.block || "N/A",
        "Village": reg.village || "N/A",
        "Ward No": reg.wardNo || "N/A",
        "Sarpanch Doc": reg.sarpanchPerformaUrl ? { f: `HYPERLINK("${reg.sarpanchPerformaUrl}", "View")` } : "N/A",
        "Entry Form": reg.entryFormUrl ? { f: `HYPERLINK("${reg.entryFormUrl}", "View")` } : "N/A",
        "Registered At": reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A",
      }));
    } else {
      exportData = filteredRegistrations.map((reg) => ({
        "Player Name": reg.playerName || "N/A",
        "Team Name": reg.teamName || "N/A",
        ...(tableFilter === "wrestlingRegistrations" && { "Weight (kg)": reg.weight || "N/A" }),
        ...(tableFilter === "raceRegistrations" && {
          "Event Type": reg.eventType || "N/A",
          "Event Category": reg.eventCategory || "N/A",
        }),
        "Father's Name": reg.fatherName || "N/A",
        "Gender": reg.gender || "N/A",
        "Mobile": reg.mobile || "N/A",
        "Block": reg.block || "N/A",
        "Village": reg.village || "N/A",
        "Ward No": reg.wardNo || "N/A",
        "Sarpanch Doc": reg.sarpanchPerformaUrl ? { f: `HYPERLINK("${reg.sarpanchPerformaUrl}", "View")` } : "N/A",
        "Entry Form": reg.entryFormUrl ? { f: `HYPERLINK("${reg.entryFormUrl}", "View")` } : "N/A",
        "Registered At": reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A",
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    
    // Add header styling
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      if (worksheet[headerCell]) {
        worksheet[headerCell].s = headerStyle;
      }
    }

    // Set column widths
    worksheet["!cols"] = isTeamSport
      ? [
          { wch: 20 }, // Team Name
          { wch: 15 }, // Players Count
          { wch: 40 }, // Players Details
          { wch: 15 }, // Block
          { wch: 20 }, // Village
          { wch: 10 }, // Ward No
          { wch: 20 }, // Sarpanch Doc
          { wch: 20 }, // Entry Form
          { wch: 25 }, // Registered At
        ]
      : [
          { wch: 20 }, // Player Name
          { wch: 20 }, // Team Name
          ...(tableFilter === "wrestlingRegistrations" ? [{ wch: 15 }] : []), // Weight
          ...(tableFilter === "raceRegistrations" ? [{ wch: 20 }, { wch: 20 }] : []), // Event Type, Category
          { wch: 20 }, // Father's Name
          { wch: 10 }, // Gender
          { wch: 15 }, // Mobile
          { wch: 15 }, // Block
          { wch: 20 }, // Village
          { wch: 10 }, // Ward No
          { wch: 20 }, // Sarpanch Doc
          { wch: 20 }, // Entry Form
          { wch: 25 }, // Registered At
        ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, `${tableFilter}_report_${downloadDate}.xlsx`);
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
                {["cricketRegistrations", "volleyballRegistrations", "tugofwarRegistrations"].includes(tableFilter) ? (
                  <>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-left">Players</th>
                    <th className="p-3 text-left">Details</th>
                  </>
                ) : (
                  <th className="p-3 text-left">Player</th>
                )}
                {tableFilter === "wrestlingRegistrations" && (
                  <th className="p-3 text-left">Weight</th>
                )}
                {tableFilter === "raceRegistrations" && (
                  <>
                    <th className="p-3 text-left">Event Type</th>
                    <th className="p-3 text-left">Category</th>
                  </>
                )}
                <th className="p-3 text-left">Father</th>
                {tableFilter !== "cricketRegistrations" && tableFilter !== "volleyballRegistrations" && tableFilter !== "tugofwarRegistrations" && (
                  <th className="p-3 text-left">Gender</th>
                )}
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Block</th>
                <th className="p-3 text-left">Village</th>
                <th className="p-3 text-left">Ward</th>
                <th className="p-3 text-left">Sarpanch Doc</th>
                <th className="p-3 text-left">Entry Form</th>
                <th className="p-3 text-left">Registered</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b hover:bg-gray-50">
                  {["cricketRegistrations", "volleyballRegistrations", "tugofwarRegistrations"].includes(tableFilter) ? (
                    <>
                      <td className="p-3">{reg.teamName || "N/A"}</td>
                      <td className="p-3">{reg.numPlayers || "N/A"}</td>
                      <td className="p-3">
                        {reg.players?.map((player, idx) => (
                          <div key={idx} className="mb-2">
                            <p className="font-medium">{player.playerName}</p>
                            <p className="text-sm">Father: {player.fatherName}</p>
                            <p className="text-sm">Mobile: {player.mobile}</p>
                          </div>
                        )) || "N/A"}
                      </td>
                    </>
                  ) : (
                    <td className="p-3">{reg.playerName || "N/A"}</td>
                  )}
                  {tableFilter === "wrestlingRegistrations" && (
                    <td className="p-3">{reg.weight ? `${reg.weight} kg` : "N/A"}</td>
                  )}
                  {tableFilter === "raceRegistrations" && (
                    <>
                      <td className="p-3">{reg.eventType || "N/A"}</td>
                      <td className="p-3">{reg.eventCategory || "N/A"}</td>
                    </>
                  )}
                  <td className="p-3">{reg.fatherName || (reg.players && reg.players[0]?.fatherName) || "N/A"}</td>
                  {tableFilter !== "cricketRegistrations" && tableFilter !== "volleyballRegistrations" && tableFilter !== "tugofwarRegistrations" && (
                    <td className="p-3">{reg.gender || "N/A"}</td>
                  )}
                  <td className="p-3">{reg.mobile || (reg.players && reg.players[0]?.mobile) || "N/A"}</td>
                  <td className="p-3">{reg.block || "N/A"}</td>
                  <td className="p-3">{reg.village || "N/A"}</td>
                  <td className="p-3">{reg.wardNo || "N/A"}</td>
                  <td className="p-3">
                    {reg.sarpanchPerformaUrl ? (
                      <a
                        href={reg.sarpanchPerformaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : "N/A"}
                  </td>
                  <td className="p-3">
                    {reg.entryFormUrl ? (
                      <a
                        href={reg.entryFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : "N/A"}
                  </td>
                  <td className="p-3">{reg.timestamp ? new Date(reg.timestamp).toLocaleString() : "N/A"}</td>
                  <td className="p-3">
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