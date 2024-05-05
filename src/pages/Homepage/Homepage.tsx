import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./style.css";

const Homepage = () => {
  const [data, setData] = useState<any[]>([]); // Initialize data as an empty array
  const [filteredData, setFilteredData] = useState<any[]>([]); // Initialize filtered data as an empty array

  const [loading, setLoading] = useState(false); // State to track loading status
  const [offset, setOffset] = useState(0);
  const [limit, setlimit] = useState(10);

  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    jobRole: "",
    minSalary: "",
  });

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchMinExp =
        !filters.minExperience ||
        item.minExp >= parseInt(filters.minExperience);
      const matchCompanyName =
        !filters.companyName ||
        item.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase());
      const matchJobRole =
        !filters.jobRole ||
        item.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase());
      const matchMinSalary =
        !filters.minSalary ||
        !item.minJdSalary ||
        (parseInt(item.minJdSalary) >= parseInt(filters.minSalary) &&
          parseInt(item.maxJdSalary) >= parseInt(filters.minSalary));

      return matchMinExp && matchCompanyName && matchJobRole && matchMinSalary;
    });

    setFilteredData(filtered);
  }, [data, filters]);

  useEffect(() => {
    const body = JSON.stringify({
      limit: limit,
      offset: offset,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );

        const jsonData = await response.json();
        setData(jsonData?.jdList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [limit]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      if (!loading) {
        setlimit((prevData) => prevData + 10);
      }
    }
  };

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Remove scroll event listener when component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run this effect only once when component mounts

  const handleReset = () => {
    setFilters({
      minExperience: "",
      companyName: "",
      jobRole: "",
      minSalary: "",
    });
  };
  return data ? (
    <div className="MainContainer">
      <div className="filterContainer">
        <input
          className="InputClass"
          type="text"
          placeholder="Minimum Experience"
          name="minExperience"
          value={filters.minExperience}
          onChange={handleFilterChange}
        />
        <input
          className="InputClass"
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleFilterChange}
        />
        <input
          className="InputClass"
          type="text"
          placeholder="Job Role"
          name="jobRole"
          value={filters.jobRole}
          onChange={handleFilterChange}
        />
        <input
          className="InputClass"
          type="text"
          placeholder="Minimum Salary"
          name="minSalary"
          value={filters.minSalary}
          onChange={handleFilterChange}
        />

        <button onClick={handleReset}>reset</button>
      </div>
      <div className="homepageMainContainer">
        {filteredData?.map((item: any) => (
          <CompanyCard data={item} />
          // Remember to return the JSX element
        ))}
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Homepage;
