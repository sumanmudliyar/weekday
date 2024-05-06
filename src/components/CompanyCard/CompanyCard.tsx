import "./style.css";
import { GiSandsOfTime } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import kotak from "../../assets/kotak.png";

interface props {
  data: any;
}
const CompanyCard = ({ data }: props) => {
  return (
    <div className="mainContainer">
      <div className="postedDate">
        <div>
          <GiSandsOfTime className="sandglass" />
        </div>
        <div>Posted 10 days ago</div>
      </div>

      <div className="companyDetailSalaryDiv">
        <div className="companyDetailMainDiv">
          <div className="companyIconMainDiv">
            <img src={data?.logoUrl} />
          </div>
          <div className="companyDetialDiv">
            <div className="companyName">{data.companyName}</div>
            <div className="roleName">{data.jobRole}</div>
            <div className="location">{data.location}</div>
          </div>
        </div>

        <div className="salaryRange">
          Estimated salary: {data.minJdSalary}LPA - {data.maxJdSalary}
          LPA
        </div>
      </div>

      <div className="aboutCompanyMainDiv">
        <div className="aboutCompanyHeader">About company</div>
        <div className="aboutUs">About us</div>
        <div className="aboutUsContent">{data.jobDetailsFromCompany}</div>
      </div>
      <div className="viewButton">View job</div>

      <div className="experienceDiv">
        <div className="experienceHeader">Minimum Experience</div>
        <div className="experienceCount">{data.minExp || 0}</div>
      </div>

      <div className="ButtonContainerDiv">
        <button className="easyApplyButton">
          <AiFillThunderbolt className="thunder" />
          Easy apply
        </button>
        <button className="raferralButton">
          <img src={kotak} className="referralImage" />
          <img src={kotak} className="referralImage" />
          Unlock referral asks
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
