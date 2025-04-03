import React, { useState } from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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

const Cricket = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    playerName: "",
    numPlayers: 1,
    fatherName: "",
    gender: "",
    dob: "",
    block: "",
    village: "",
    wardNo: "",
    aadhaar: "",
    mobile: "",
    entryForm: null,
    sarpanchPerforma: null,
  });
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/de3vcuioj/upload";
  const UPLOAD_PRESET = "PDF_Hai";
  const MAX_FILE_SIZE = 300 * 1024; // 300KB in bytes

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "aadhaar") {
      const aadhaarValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData({ ...formData, [name]: aadhaarValue });
    } else if (name === "mobile") {
      const mobileValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: mobileValue });
    } else if (files) {
      const file = files[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setError("Please upload a form below 300KB");
          return;
        }
        setFormData({ ...formData, [name]: file });
        setError(null); // Clear error when a valid file is selected
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlockChange = (e) => {
    const selectedBlock = e.target.value;
    setFormData({ ...formData, block: selectedBlock, village: "" });
    setVillages(blockVillageData[selectedBlock] || []);
  };

  const uploadToCloudinary = async (file, fileType) => {
    if (!file) {
      throw new Error("Please upload a form below 300KB");
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
      throw new Error(
        `Cloudinary upload failed for ${fileType}: ${err.message}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required files
      if (!formData.entryForm || !formData.sarpanchPerforma) {
        throw new Error("Please upload a form below 300KB");
      }

      // Upload files to Cloudinary
      const entryFormUrl = await uploadToCloudinary(
        formData.entryForm,
        "Entry Form"
      );
      const sarpanchPerformaUrl = await uploadToCloudinary(
        formData.sarpanchPerforma,
        "Sarpanch Performa"
      );

      // Prepare data for Firebase
      const registrationData = {
        teamName: formData.teamName,
        playerName: formData.playerName,
        numPlayers: formData.numPlayers,
        fatherName: formData.fatherName,
        gender: formData.gender,
        dob: formData.dob,
        block: formData.block,
        village: formData.village,
        wardNo: formData.wardNo,
        aadhaar: formData.aadhaar,
        mobile: formData.mobile,
        entryFormUrl: entryFormUrl,
        sarpanchPerformaUrl: sarpanchPerformaUrl,
        timestamp: new Date().toISOString(),
      };

      console.log("Data to be sent to Firebase:", registrationData);

      const cricketRef = ref(db, "cricketRegistrations");
      const newRegistrationRef = push(cricketRef);

      await set(newRegistrationRef, registrationData);

      setSuccess(true);
      setFormData({
        teamName: "",
        playerName: "",
        numPlayers: 1,
        fatherName: "",
        gender: "",
        dob: "",
        block: "",
        village: "",
        wardNo: "",
        aadhaar: "",
        mobile: "",
        entryForm: null,
        sarpanchPerforma: null,
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
        <title>Apply for Cricket - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Apply for Cricket</span>}
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
              Cricket Registration Form
            </h2>
            <p className="text-red-600 text-lg font-bold mt-4">
              Last Date to Apply: 15 April 2025
            </p>

            <br></br>

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
                <label className="block text-gray-700">Name of Player</label>
                <input
                  type="text"
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Player's Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Number of Players</label>
                <input
                  type="number"
                  name="numPlayers"
                  value={formData.numPlayers}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  min="1"
                  max="15"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Father's Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  required
                />
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
                <label className="block text-gray-700">Ward No</label>
                <input
                  type="text"
                  name="wardNo"
                  value={formData.wardNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Ward No"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Captain Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Aadhaar Number"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Captain Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Entry Form (PDF, JPG, JPEG)
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
                  Sarpanch Performa (PDF, JPG, JPEG)
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
                disabled={loading || error !== null}
                className={`bg-[#E87722] text-white px-4 py-2 rounded-lg w-full hover:bg-[#39A935] ${
                  loading || error !== null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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

export default Cricket;
