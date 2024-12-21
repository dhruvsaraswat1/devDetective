import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [github, setgithub] = useState("");
  const [data2, setdata2] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);
  const [loading, setLoading] = useState(true);
  

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleChange = (event) => {
    setgithub(event.target.value);
    // console.log('Value is:', event.target.value);
  };

  async function crossHandler() {
    setLoading(true);
    setgithub("");
    setData({});
    setdata2({});
    
  }

  async function fetchDetails() {
    try {
      const response = await fetch(`https://api.github.com/users/${github}`);
      setData(await response.json());
      setLoading(false);
      console.log(data);
      const response2 = await fetch(data.repos_url);
      setdata2(await response2.json());
    } catch (err) {
      console.log("Error in fetching data...");
    }
  }
  return (
    <div className={`${darkTheme ? "dark" : ""}`}>
      <div
        className={`bg-[#f6f8ff] dark:bg-[#141D2F] text-sm w-[100%] relative h-[100vh]`}
      >
        <div className="wrapper w-full h-full flex flex-col items-center justify-center gap-3">
          {/* <!-- header and theme --> */}
          <div className="header w-[450px] gap-9 flex items-center justify-between">
            <h2 className="icon text-[#4b6a9b] dark:text-white font-black text-2xl">
              DevDetective
            </h2>
            <div className="flex gap-4 justify-between items-center">
              <div className="rounded-full bg-[#f6f8ff] dark:bg-[#141d2f] cursor-pointer">
                <img
                  src="./assets/light-download.svg"
                  alt=""
                  className="flex"
                  width="24px"
                />
              </div>
              <div className="theme flex justify-between items-center w-[75px] tracking-[2.5px] font-bold decoration-[#4b6a9b] dark:decoration-white hover:cursor-pointer">
                <button
                  className="text-[#4b6a9b] dark:text-white theme-name"
                  onClick={toggleTheme}
                >
                  <p>{darkTheme ? "Light" : "Dark"}</p>
                </button>
                <p className="text-[#4b6a9b] dark:text-white">
                  <img
                    src="./assets/sun.svg"
                    alt=""
                    className="theme-icon"
                    width="24px"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* <!-- search bar --> */}

          <div className="search-container w-600px relative bg-[#fefefe] dark:bg-[#1E2A47] rounded-[15px] h-[50px] flex items-center w-[450px] top-4 p-[6px] justify-between">
            <div className="flex">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#0079ff"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </p>
              <input
                type="text"
                placeholder="Github Username..."
                id="entry-field"
                required
                value={github}
                onChange={handleChange}
                className="w-[250px] outline-none bg-none text-[#4b6a9b] dark:text-white pl-[5px] placeholder:text-[#4b6a9b] dark:placeholder:dark:text-white dark:bg-[#1e2a47] placeholder:-tracking-[0.5px] placeholder:text-sm"
              />
            </div>
            {/* <!-- <div class="error">
              <p id="no-results">no search results</p>
          </div> --> */}
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#4b6a9b"
                viewBox="0 0 256 256"
                className={github?"":"hidden"}
                onClick={crossHandler}
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </p>
            <button
              title="search"
              className="search-button w-[84px] pr-10px bg-[#0079ff] text-white font-bold text-sm h-[30px] rounded-md hover:cursor-pointer hover:bg-[#60abff]"
              onClick={fetchDetails}
            >
              Search
            </button>
          </div>

          {/* <!-- profile card --> */}
          {loading ? <div></div>
           :
           <div
            className={`profile-container bg-[#fefefe] dark:bg-[#1E2A47] rounded-2xl w-[450px] mt-[25px] p-[24px] ${
              data ? "flex" : "hidden"
            } gap-6`}
          >
            <div className="w-100px">
              <img
                src={data.avatar_url}
                alt="profile-image"
                className="min-w-[90px] rounded-[90px]"
              />
            </div>
            <div>
              <div className="flex justify-between w-[300px] items-center tracking-tighter font-bold">
                <p className="name text-3xl text-[#2b3442] dark:text-white">
                  {data.name}
                </p>
                <p className="date text-gray-500 opacity-70">
                  {new Date(data.created_at).toDateString()}
                </p>
              </div>

              <p className="username text-[#0079ff] tracking-tighter underline font-semibold mt-[6px]">
                @{data.login}
              </p>
              <p className="info mt-[6px] mb-[30px] text-[#4b6a9b] dark:text-white">
                {data.bio}
              </p>
              <div>
                <div className="flex justify-between h-[100px] bg-[#f6f8ff] dark:bg-[#141D2F] rounded-[20px] pt-[30px] pb-[30px] pl-[20px] pr-[20px] mb-[20px]">
                  <div className="flex flex-col items-center justify-between gap-2">
                    <p className="text-gray-500 tracking-tighter">Repos</p>
                    <p className="repo font-extrabold dark:text-white">
                      {data2.length}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2">
                    <p className="text-gray-500 tracking-tighter">Followers</p>
                    <p className="followers font-extrabold dark:text-white">
                      {data.followers}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2">
                    <p className="text-gray-500 tracking-tighter">Following</p>
                    <p className="following font-extrabold dark:text-white">
                      {data.following}
                    </p>
                  </div>
                </div>
              </div>
              <div className="social-media flex flex-wrap items-center justify-between gap-2">
                <div className="location flex items-center justify-between gap-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#4b6a9b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                  </svg>
                  <p className="location-para">
                    {data.location ? data.location : "Not Available"}
                  </p>
                </div>
                <div className="link flex items-center justify-between gap-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#4b6a9b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M137.54,186.36a8,8,0,0,1,0,11.31l-9.94,10A56,56,0,0,1,48.38,128.4L72.5,104.28A56,56,0,0,1,149.31,102a8,8,0,1,1-10.64,12,40,40,0,0,0-54.85,1.63L59.7,139.72a40,40,0,0,0,56.58,56.58l9.94-9.94A8,8,0,0,1,137.54,186.36Zm70.08-138a56.08,56.08,0,0,0-79.22,0l-9.94,9.95a8,8,0,0,0,11.32,11.31l9.94-9.94a40,40,0,0,1,56.58,56.58L172.18,140.4A40,40,0,0,1,117.33,142,8,8,0,1,0,106.69,154a56,56,0,0,0,76.81-2.26l24.12-24.12A56.08,56.08,0,0,0,207.62,48.38Z"></path>
                  </svg>
                  <a className="link-para" href={data?.blog}>
                    {data.blog ? data.blog : "Not Available"}
                  </a>
                </div>
                <div className="twitter flex items-center justify-between gap-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#4b6a9b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path>
                  </svg>
                  <a className="twitter-para" href={data?.twitter_username}>
                    {data.twitter_username
                      ? data.twitter_username
                      : "Not Available"}
                  </a>
                </div>
                <div className="email flex items-center justify-between gap-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#4b6a9b"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
                  </svg>
                  <a className="email-para" href={data?.email}>
                    {data.email ? data.email : "Not Available"}
                  </a>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
