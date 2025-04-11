import React, { useState } from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";

const blockVillageData = {
  Nuh: [
    "Untka",
    "Adbar",
    "Akera",
    "Alawal Pur",
    "Babupur",
    "Bai",
    "Bajhera",
    "Barka Alimudin",
    "Bar Oji",
    "Bhapawali",
    "Bibipur",
    "Binwa",
    "Birsika",
    "Chandeni",
    "Devlanangli",
    "Dhanduka",
    "Dihana",
    "Firozepur Namak",
    "Ghasera",
    "Husainpur",
    "Kalinjar",
    "Kherla",
    "Kotla",
    "Malab",
    "Marora",
    "Meoli",
    "Muradbas",
    "Nalhar",
    "Palla",
    "Rai Puri",
    "Ranika",
    "Rehna",
    "Rithora",
    "Sahpur Nangli",
    "Salaheri",
    "Salamba",
    "Sangail",
    "Shadai",
    "Sonkh",
    "Tain",
    "Tapkan",
    "Ujina",
  ],
  Punahana: [
    "Aminabad",
    "Andhaki",
    "Badli",
    "Bandholi",
    "Bhuriyaki",
    "Bichhor",
    "Bisru",
    "Chandanki",
    "Dudoli",
    "Fardari",
    "Gheeda",
    "Godhola",
    "Gubradi",
    "Gulalta",
    "Hathangaon",
    "Hazipur",
    "Indana",
    "Jadoli",
    "Jaiwant",
    "Jakhokar",
    "Jamalgarh",
    "Jehtana",
    "Jharokari",
    "Kherla Punhana",
    "Lafoori",
    "Leharwari",
    "Luhinga Kalan",
    "Madhiyaki",
    "Mubarikpur",
    "Naharpur",
    "Naheda",
    "Nai",
    "Neemka",
    "Newana",
    "Pemakhera",
    "Piproli",
    "Raipur",
    "Rajpur",
    "Samsabad Khurd",
    "Sihiri Singal Heri",
    "Singar",
    "Siroli",
    "Sunheda",
    "Thek",
    "Tirwara",
    "Tundlaka",
    "Tusaini",
    "Rahida",
    "Shikrawa",
    "Falendi",
    "Khori Shah Choka",
    "Badka",
    "Samsabad",
  ],
  Pingwan: [
    "Akbarpur",
    "Anchwari",
    "Aoutha",
    "Baded",
    "Basai Khanzada",
    "Bazidpur",
    "Bubalheri",
    "Chandraka",
    "Dhadolikalan",
    "Dhana",
    "Dondal",
    "Dungeja",
    "Dungra Shahazadpur",
    "Firozpur Meo",
    "Flendi",
    "Gangwani",
    "Gokalpur",
    "Hinganpur",
    "Jalika",
    "Jharpuri",
    "Jhimrawat",
    "Khanpur Ghati",
    "Khawajli Kalan",
    "Khedli Kalan",
    "Khori Shah Chokha",
    "Lahabas",
    "Malhaka",
    "Mamlika",
    "Manota",
    "Mohd. Pur Ter",
    "Mohlaka",
    "Mundheta",
    "Neemkhera",
    "Papra",
    "Pinagwan",
    "Raniyalapatakpur",
    "Rehpura",
    "Rithad",
    "Sikrawa",
    "Sultanpur Punhana",
    "Ter",
  ],
  Tauru: [
    "Bawla",
    "Beri Nisfi",
    "Bhajlaka",
    "Bhangoh",
    "Bissarakbarpur",
    "Buraka Tauru",
    "Chahalka",
    "Cheela",
    "Chharora",
    "Chilawali",
    "Dadu",
    "Dalawas",
    "Dhulawat",
    "Didhara",
    "Dingerheri",
    "Fatehpur",
    "Gogjaka",
    "Goyla",
    "Gudhi",
    "Gwarka",
    "Hasanpur",
    "Jafrab...",
    "Jalalpur Sohna",
    "Jaurasi",
    "Jhamuwas",
    "Kalarpuri",
    "Kaliyaka",
    "Kalwari",
    "Kharkhari",
    "Khori Kalan",
    "Khori Khurd",
    "Kota Khandewla",
    "M.P.Ahir",
    "Malhaka",
    "Mandarka",
    "Nizampur",
    "Pachgaon",
    "Padheni",
    "Para",
    "Raheri",
    "Rangala",
    "Raniyaki",
    "Rathwas",
    "Sabras",
    "Sahsola",
    "Salhaka",
    "Sarai",
    "Sewka",
    "Sheelkho",
    "Shikarpur",
    "Subaseri",
    "Sunari",
    "Sundh",
    "Uton",
  ],
  "Ferozepur Jhirka": [
    "Agon",
    "Ahmedbass",
    "Akhnaka",
    "Alipur Tigra",
    "Baghola",
    "Baikhera",
    "Basai Meo",
    "Bhakroj",
    "Bhond",
    "Biwan",
    "Chitora",
    "Dhamala",
    "Doha",
    "F. Jhirka",
    "Ghata Samsabad",
    "Gujar Nangla",
    "Hamjapur",
    "Hasanpur Bilonda",
    "Hirwari Bawanteri",
    "Ibrahimbass",
    "Kameda",
    "Kherla Khurd",
    "Kolgaon",
    "Luhinga Khurd",
    "Madapur",
    "Maholi",
    "Mahun",
    "Mohd. Bass (Buchaka)",
    "Mohd. Bass (Pol)",
    "Nasirbass",
    "Nawli",
    "Padla Shahpuri",
    "Patan Udaypuri",
    "Pathrali",
    "Patkhori",
    "Ranyala Ferozpur",
    "Ranyali",
    "Rawa",
    "Rawli",
    "Reegarh",
    "Sahapur",
    "Saimeerbass",
    "Sakarpuri",
    "Sakras",
    "Shekhpur",
    "Sidhrawat",
    "Sulela",
    "Tigaon",
  ],
  Nagina: [
    "Aklimpur",
    "Aklimpur Nuh",
    "Aterna Samsabad",
    "Badarpur",
    "Balai",
    "Banarsi",
    "Bhadas",
    "Bukharaka",
    "Ganduri",
    "Ghagas",
    "Gohana",
    "Gumat Bihari",
    "Hasanpur Nuh",
    "Imam Nagar",
    "Jaitaka",
    "Jalalpur Firozpur",
    "Jalalpur Nuh",
    "Kansali",
    "Karheda",
    "Karhedi",
    "Khan Mohammadpur",
    "Khedli Khurd",
    "Khedli Nuh",
    "Khushpuri",
    "Kultajpur Kalan",
    "Madhi",
    "Mandi Kheda",
    "Maroda",
    "Mohammad Nagar",
    "Moolthan",
    "Nagina",
    "Nai Nangla",
    "Nangal Mubarikpur",
    "Notki",
    "Rajaka",
    "Ranika",
    "Sadipur",
    "Santhawari",
    "Siswana Jatka",
    "Sukhpuri",
    "Sultanpur Nuh",
    "Uleta",
    "Umra",
    "Umri",
    "Basai",
  ],
  Indri: [
    "Alduka",
    "Atta",
    "Bainsi",
    "Bajarka",
    "Barota",
    "Basai",
    "Bhirawati",
    "Chhachera",
    "Chhapera",
    "Dhenkli",
    "Dubalu",
    "Gajarpur",
    "Gangoli",
    "Golpuri",
    "Hasanpur Sohana",
    "Hilalpur",
    "Hirmathla",
    "Indri",
    "Jai Singh Pur",
    "Kairaka",
    "Kaliyaka",
    "Kanwarsika",
    "Khanpur",
    "Khera Khalilpur",
    "Kheri Kankar",
    "Kherli Dosa",
    "Kira",
    "Kiranj",
    "Kiranj Patti Jattan",
    "Kontlaka",
    "Kurthala",
    "Kutubgarh",
    "Mahrola",
    "Manuwas",
    "Naushera",
    "Rahuka",
    "Rewasan",
    "Rozkameo",
    "Sudaka",
    "Udaka",
    "Uleta",
  ],
};

const Tugofwars = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    players: [],
    block: "",
    village: "",
    wardNo: "",
    entryForm: null,
    sarpanchPerforma: null,
  });

  const [newPlayer, setNewPlayer] = useState({
    playerName: "",
    fatherName: "",
    mobile: "",
  });

  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/de3vcuioj/upload";
  const UPLOAD_PRESET = "PDF_Hai";
  const MAX_FILE_SIZE = 300 * 1024; // 300KB

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setError(
            `${
              name === "entryForm" ? "Entry Form" : "Sarpanch Performa"
            } must be below 300KB`
          );
          return;
        }
        setFormData({ ...formData, [name]: file });
        setError(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePlayerInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const mobileValue = value.replace(/\D/g, "").slice(0, 10);
      setNewPlayer({ ...newPlayer, [name]: mobileValue });
      if (mobileValue.length > 0 && mobileValue.length !== 10) {
        setError("Mobile number must be exactly 10 digits");
      } else {
        setError(null);
      }
    } else {
      setNewPlayer({ ...newPlayer, [name]: value });
    }
  };

  const addPlayer = () => {
    if (
      newPlayer.playerName.trim() &&
      newPlayer.fatherName.trim() &&
      newPlayer.mobile.match(/^\d{10}$/)
    ) {
      setFormData({
        ...formData,
        players: [...formData.players, { ...newPlayer }],
      });
      setNewPlayer({
        playerName: "",
        fatherName: "",
        mobile: "", // Reset mobile field
      });
      setError(null);
    } else {
      setError(
        "Please provide valid player details: Name, Father's Name, and 10-digit Mobile"
      );
    }
  };

  const removePlayer = (index) => {
    const updatedPlayers = formData.players.filter((_, i) => i !== index);
    setFormData({ ...formData, players: updatedPlayers });
  };

  const handleBlockChange = (e) => {
    const selectedBlock = e.target.value;
    setFormData({ ...formData, block: selectedBlock, village: "" });
    setVillages(blockVillageData[selectedBlock] || []);
  };

  const uploadToCloudinary = async (file, fileType) => {
    if (!file) {
      throw new Error(`No ${fileType} file provided`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`${fileType} file must be below 300KB`);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!data.secure_url) {
        throw new Error(
          `Cloudinary upload failed for ${fileType}: ${
            data.error?.message || "Unknown error"
          }`
        );
      }
      console.log(`${fileType} uploaded successfully: ${data.secure_url}`);
      return data.secure_url;
    } catch (err) {
      console.error(`Cloudinary upload error for ${fileType}:`, err);
      throw new Error(`Failed to upload ${fileType}: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (
        !formData.teamName.trim() ||
        formData.players.length === 0 ||
        !formData.block ||
        !formData.village ||
        !formData.entryForm ||
        !formData.sarpanchPerforma
      ) {
        throw new Error(
          "Please fill all required fields: Team Name, at least one Player, Block, Village, Entry Form, and Sarpanch Performa"
        );
      }

      // Validate player mobile numbers
      const invalidPlayers = formData.players.filter(
        (player) => !player.mobile.match(/^\d{10}$/)
      );
      if (invalidPlayers.length > 0) {
        throw new Error("All players must have a valid 10-digit mobile number");
      }

      // Upload files to Cloudinary
      const entryFormUrl = await uploadToCloudinary(formData.entryForm, "Entry Form");
      const sarpanchPerformaUrl = await uploadToCloudinary(
        formData.sarpanchPerforma,
        "Sarpanch Performa"
      );

      // Prepare data for Firebase
      const registrationData = {
        teamName: formData.teamName,
        players: formData.players,
        numPlayers: formData.players.length,
        block: formData.block,
        village: formData.village,
        wardNo: formData.wardNo,
        entryFormUrl,
        sarpanchPerformaUrl,
        timestamp: new Date().toISOString(),
      };

      console.log("Data to be sent to Firebase:", registrationData);

      // Save to Firebase
      const tugofwarRef = ref(db, "tugofwarRegistrations");
      const newRegistrationRef = push(tugofwarRef);

      try {
        await set(newRegistrationRef, registrationData);
        console.log("Data successfully written to Firebase with key:", newRegistrationRef.key);
      } catch (firebaseError) {
        console.error("Firebase write error:", firebaseError);
        throw new Error(`Failed to save to Firebase: ${firebaseError.message}`);
      }

      setSuccess(true);
      setFormData({
        teamName: "",
        players: [],
        block: "",
        village: "",
        wardNo: "",
        entryForm: null,
        sarpanchPerforma: null,
      });
      setNewPlayer({
        playerName: "",
        fatherName: "",
        mobile: "",
      });
      setVillages([]);
    } catch (err) {
      setError(err.message);
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#F5F6F5] pb-10 lg:pb-20 md:pt-12 mt-10"
      id="participate-now"
    >
      <Helmet>
        <title>Apply for Tug of War - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Apply for Tug of War</span>}
        />

        <FadeInAnimation>
          <div className="flex justify-center items-center md:mb-10 mb-5">
            <Link to={"/"}>
              <img
                className="w-40 md:w-48"
                src={logo}
                alt="Khelo Mewat Logo"
                loading="lazy"
              />
            </Link>
          </div>
        </FadeInAnimation>

        <FadeInAnimation>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-[#39A935] mb-4">
              Tug of War Registration Form
            </h2>
            <p className="text-red-600 text-lg font-bold mt-4">
              Last Date to Apply: 15 April 2025
            </p>

            <br />

            {success && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                Registration submitted successfully!
              </div>
            )}
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Team Name</label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Team Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold">
                  Players List ({formData.players.length} added)
                </label>

                {formData.players.length > 0 && (
                  <div className="mt-2 mb-4">
                    {formData.players.map((player, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2"
                      >
                        <span>
                          {index + 1}. {player.playerName} (Father: {player.fatherName}, Mobile: {player.mobile})
                        </span>
                        <button
                          type="button"
                          onClick={() => removePlayer(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border p-4 rounded-lg">
                  <div className="mb-2">
                    <label className="block text-gray-700">Player Name</label>
                    <input
                      type="text"
                      name="playerName"
                      value={newPlayer.playerName}
                      onChange={handlePlayerInputChange}
                      className="w-full p-2 border rounded-lg bg-white text-black"
                      placeholder="Enter Player's Name"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-gray-700">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={newPlayer.fatherName}
                      onChange={handlePlayerInputChange}
                      className="w-full p-2 border rounded-lg bg-white text-black"
                      placeholder="Enter Father's Name"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={newPlayer.mobile}
                      onChange={handlePlayerInputChange}
                      className="w-full p-2 border rounded-lg bg-white text-black"
                      placeholder="Enter 10-digit Mobile Number"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addPlayer}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Add Player
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Block</label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleBlockChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  required
                >
                  <option value="">Select Block</option>
                  {Object.keys(blockVillageData).map((blockName) => (
                    <option key={blockName} value={blockName}>
                      {blockName}
                    </option>
                  ))}
                </select>
              </div>

              {formData.block && (
                <div className="mb-4">
                  <label className="block text-gray-700">Village</label>
                  <select
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg bg-white text-black"
                    required
                  >
                    <option value="">Select Village</option>
                    {villages.map((villageName) => (
                      <option key={villageName} value={villageName}>
                        {villageName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700">Ward No (Optional)</label>
                <input
                  type="text"
                  name="wardNo"
                  value={formData.wardNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Ward No"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Entry Form (PDF, JPG, JPEG, max 300KB)
                </label>
                <input
                  type="file"
                  name="entryForm"
                  accept="application/pdf,image/jpeg,image/jpg"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Sarpanch Performa (PDF, JPG, JPEG, max 300KB)
                </label>
                <input
                  type="file"
                  name="sarpanchPerforma"
                  accept="application/pdf,image/jpeg,image/jpg"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#E87722] text-white px-4 py-2 rounded-lg w-full hover:bg-[#39A935] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default Tugofwars;