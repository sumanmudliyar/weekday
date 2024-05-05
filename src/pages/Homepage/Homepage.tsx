import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./style.css";
const Homepage = () => {
  const [data, setData] = useState<any[]>([]); // Initialize data as an empty array

  useEffect(() => {
    const body = JSON.stringify({
      limit: 10,
      offset: 0,
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
  }, []);

  return data ? (
    <div className="homepageMainContainer">
      {data?.map((item: any) => (
        <CompanyCard data={item} />
        // Remember to return the JSX element
      ))}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Homepage;
