import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const userID = useGetUserID();
  const [cookies, ] = useCookies(["access_token"]);
  const [user, setUser] = useState({
    major: "",
    minor: "",
    gradYear: "",
    borough: "",
    userOwner: userID,
  });

  const majors = [
    "Undeclare", "Accounting", "Adolescent Literacy", "Adult Nurse Practitioner", "Africana & Puerto Rican / Latino Studies", 
    "Ancient Greek", "Animal Behavior Conservation", "Anthropology", "Applied Behavior Analysis", "Arabic", "Archaeology, Interdepartmental", 
    "Art History", "Arts Management and Leadership", "Asian American Studies", "Audiology", "Behavioral Neurobiology", "Biochemistry", 
    "Bioinformatics (Quantitative Biology)", "Biology", "Biology Adolescent Education", "Biomedical Laboratory Management", "Biophysics", 
    "Biopsychology and Behavioral Neuroscience", "Biological Sciences with Specialization in Biotechnology", "Business Studies", "Chemistry", 
    "Chemistry Adolescent Education", "Childhood Education (QUEST)", "Childhood Literacy", "Chinese", "Chinese Adolescent Education", 
    "Classical Studies", "Clinical Nurse Leader™", "Community / Public Health Nursing", "Comparative Literature", "Computer Science", 
    "Counseling", "Creative Writing (for BA, a concentration in the English Major)", "Curatorial Studies", "Cytotechnology", "Dance", 
    "Dance Education", "Early Childhood Education", "Earth Science Adolescent Education", "Economics", "Educational Psychology", 
    "English Adolescent Education", "English MA program in Literature, Language, and Theory", "English Language Arts (concentration in English BA)", 
    "Environmental Studies", "Family Nurse Practitioner", "Film", "French", "French Adolescent Education", "Geographic Information Science", 
    "Geography", "German", "German Adolescent Education", "Gerontological / Adult Nurse Practitioner", "Hebrew", "Hebrew Adolescent Education", 
    "History", "Human Biology", "Human Rights", "Instructional Leadership", "Integrated Media Arts", "Italian", "Italian Adolescent Education", 
    "Japanese", "Jewish Studies", "Latin", "Latin Adolescent Education", "Latin American and Caribbean Studies", "Latin and Greek", "Linguistics", 
    "Linguistics and Rhetoric (concentration in English major)", "Literatures, Language and Criticism (concentration in English major)", 
    "Mathematics", "Mathematics Adolescent Education", "Media Studies", "Medical Laboratory Sciences", "Medical Laboratory Technology", 
    "Music", "Music Education", "Nursing, Accelerated Second-Degree Pathway", "Nursing Administration / Urban Policy and Leadership", 
    "Nursing Education", "Nursing, Generic Pathway", "Nursing, RN Pathway", "Nutrition", "Nutrition and Food Sciences", "Nutrition and Wellness", 
    "Philosophy", "Philosophy, Politics and Society (concentration in philosophy major)", "Physical Therapy", "Physics", "Physics Adolescent Education", 
    "Playwriting", "Political Science", "Psychiatric Mental Health Nursing Practitioner", "Psychiatric Nurse Practitioner", "Psychology", 
    "Psychology with Neuroscience Concentration", "Public Health", "Public Policy", "Pure Mathematics", "Religion", "Romance Languages", "Russian", 
    "Russian Adolescent Education", "School Administration and Supervision", "Social Research", "Social Studies Adolescent Education", "Social Welfare", 
    "Social Work", "Social Work Administration", "Social Work/Divinity", "Sociology", "Sociology and Social Research", "Spanish", "Spanish Adolescent Education", 
    "Spanish and Latin American Literature", "Spanish←→English Translation and Interpretation", "Special Education", "Speech-Language Pathology", "Statistics", 
    "Statistics and Applied Mathematics", "Studio Art", "Teaching English to Speakers of Other Languages (TESOL)", "Theatre", 
    "Therapy (Family, Individual, or Adoption)", "Urban Policy and Leadership", "Urban Planning", "Urban Studies", "Visual Arts Education", 
    "Women and Gender Studies", "Other"
  ];

  const boroughs = [
    "Bronx (Bronx County)",
    "Brooklyn (Kings County)",
    "Manhattan (New York County)",
    "Queens (Queens County)",
    "Staten Island (Richmond County)",
    "Other"
  ];

  const currentYear = new Date().getFullYear();
  const gradYearOptions = Array.from({ length: 8 }, (_, index) => currentYear + index);

  const [submitForm, setSubmitForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log("change",user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit",user);
    try {
      await axios.put(
        "http://localhost:5001/auth/mate",
        { ...user },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      setSubmitForm(true);
      
      alert("User updated");
    } catch (error) {
      console.error(error);
    }
  };


  const [matchMajor, setMatchMajor] = useState([]);
  const [matchMinor, setMatchMinor] = useState([]);
  const [matchGradYear, setMatchGradYear] = useState([]);
  const [matchBorough, setMatchBorough] = useState([]);

  useEffect(() => {
 
    const searchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/auth/mate/search",
          {
            params: { ...user },
            headers: { authorization: cookies.access_token },
          }
        );
        
        console.log("response",response.data)

        setMatchMajor(response.data.matchMajor);
        setMatchMinor(response.data.matchMinor);
        setMatchGradYear(response.data.matchGradYear);
        setMatchBorough(response.data.matchBorough);

        setSubmitForm(false);

      } catch (error) {
        console.error(error);
      }
    };

    if (submitForm) {
      searchUsers();
    }
    
  }, [user, cookies.access_token, submitForm]);
  

  


  return (
    <div className="home">
      <h2>Home</h2>
      <h2>Find your mate</h2>
      <form 
      onSubmit={(e) => {
        handleSubmit(e);
      }}>
        <label htmlFor="major">Major</label>
        <select
          id="major"
          name="major"
          value={user.major}
          onChange={handleChange}
        >
          <option value="">Select Major</option>
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>

        <label htmlFor="minor">Minor</label>
        <select
          id="minor"
          name="minor"
          value={user.minor}
          onChange={handleChange}
        >
          <option value="">Select Minor</option>
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>

        <label htmlFor="gradYear">Graduation Year</label>
        <select
          id="gradYear"
          name="gradYear"
          value={user.gradYear}
          onChange={handleChange}
        >
          <option value="">Select Graduation Year</option>
          {gradYearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label htmlFor="borough">Borough</label>
        <select
          id="borough"
          name="borough"
          value={user.borough}
          onChange={handleChange}
        >
          <option value="">Select Borough</option>
          {boroughs.map((borough) => (
            <option key={borough} value={borough}>
              {borough}
            </option>
          ))}
        </select>
        
        <button type="submit">Search</button>
      </form>
 

      <div>
        {matchMajor.length > 0 && (
          <div>
            <h4>Results for Major:</h4>
            <ul>
              {matchMajor.map((result) => (
                <li key={result._id}>
                  {result.username} <br /> {result.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {matchMinor.length > 0 && (
          <div>
            <h4>Results for Minor:</h4>
            <ul>
              {matchMinor.map((result) => (
                <li key={result._id}>
                  {result.username} <br /> {result.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {matchGradYear.length > 0 && (
          <div>
            <h4>Results for Graduation Year:</h4>
            <ul>
              {matchGradYear.map((result) => (
                <li key={result._id}>
                  {result.username} <br /> {result.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {matchBorough.length > 0 && (
          <div>
            <h4>Results for Borough:</h4>
            <ul>
              {matchBorough.map((result) => (
                <li key={result._id}>
                  {result.username} <br /> {result.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      
      


    </div>
  );
};
