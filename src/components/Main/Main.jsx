import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useContext } from "react";
import ThemeToggle from "../Main/Themetoggle";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    resultData,
    loading,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main flex-1 flex-col h-screen bg-gray-50 dark:bg-gray-900">

      {/* Navbar */}
      <nav className="flex p-2 justify-between">
        <div className="flex gap-4 ml-2">
          <p className="text-slate-600 dark:text-white text-2xl md:text-4xl mt-2">Gemini</p>
          <ThemeToggle />
        </div>
        
        
        <div className="flex items-center gap-4 py-2">
          
          <div className="flex items-center gap-2 bg-slate-200 px-6 py-2 rounded-2xl cursor-pointer hover:bg-slate-300 transition-all duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 ">
            <img src={assets.gemini_icon} className="h-10 w-10" />
            <p className="font-semibold text-blue-900 text-lg dark:text-white">Upgrade</p>
          </div>
          <img
            src={assets.download}
            alt="User"
            className="rounded-full w-14 h-14 mr-5 mt-1 "
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-10 w-full">
        {!showResult ? (
          <>
            {/* Greeting Section */}
            <div className="greeting text-left text-7xl text-slate-300 mt-10 ml-50">
              <p>
                <span className="bg-linear-65 from-purple-500 to-pink-500 inline-block text-transparent bg-clip-text mb-3">
                  Hello, Haris
                </span>
              </p>
              <p className="text-slate-400">How can I help You?</p>
            </div>

            {/* Prompt Cards Section */}
            <div className="cards flex justify-between w-3/4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 mx-auto mb-45 mt-20 ">
              {/* Card 1 */}
              <div className="card relative w-60 h-40 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-200 font-semibold cursor-pointer text-slate-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ">
                <p className="mb-4">
                  Write a short story about a robot who learns to dream.
                </p>
                <img
                  src={assets.compass_icon}
                  alt="card"
                  className="w-8 absolute bottom-4 right-4 dark:invert transition duration-300"
                />
              </div>

              {/* Card 2 */}
              <div className="card relative w-60 h-40 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-200 font-semibold cursor-pointer text-slate-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <p className="mb-4">
                  Explain recursion to a 10-year-old with a real-life example.
                </p>
                <img
                  src={assets.bulb_icon}
                  alt="card"
                  className="w-8 absolute bottom-4 right-4 dark:invert transition duration-300"
                />
              </div>

              {/* Card 3 */}
              <div className="card relative w-60 h-40 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-200 font-semibold cursor-pointer text-slate-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <p className="mb-4">
                  Create a SQL query to find the top 5 best-selling products last month
                </p>
                <img
                  src={assets.message_icon}
                  alt="card"
                  className="w-8 absolute bottom-4 right-4 dark:invert transition duration-300"
                />
              </div>

              {/* Card 4 */}
              <div className="card relative w-60 h-40 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-200 font-semibold cursor-pointer text-slate-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <p className="mb-4">
                  Generate a React component that displays a weather card using Tailwind CSS
                </p>
                <img
                  src={assets.code_icon}
                  alt="card"
                  className="w-8 absolute bottom-4 right-4 dark:invert transition duration-300"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Prompt Header */}
            <div className="result inline-flex px-4 h-14 ml-55 mt-4 bg-blue-200 rounded-3xl rounded-tl-none bg-gradient-to-r from-purple-200 to-blue-300 dark:from-purple-900 dark:to-blue-800">
              <div className="result-title flex items-center gap-4">
                <img src={assets.download} alt="" className="rounded-full w-12" />
                <p className="truncate max-w-full text-ellipsis text-2xl dark:text-white ">
                  {recentPrompt}
                </p>
              </div>
            </div>

            {/* Result Section */}
            <div className="scroll-box max-h-135 mx-auto flex mt-4 w-3/4">
              <div className="result-data gap-4 overflow-y-auto scrollbar-hide px-4 mx-auto flex w-full bg-white dark:bg-gray-900 rounded-xl py-4">
                <img src={assets.gemini_icon} alt="" className="h-15 mb-130" />
                {loading ? (
                  <div className="loader flex flex-col gap-2 w-full max-w-[700px] mt-10">
                    <hr className="rounded-md h-5 border-0 bg-gradient-to-r from-[#a78bfa] via-[#d8b4fe] to-[#7dd3fc] dark:from-purple-900 dark:via-indigo-800 dark:to-sky-700 bg-[length:800px_50px] animate-pulse" />
                    <hr className="rounded-md h-5 border-0 bg-gradient-to-r from-[#a78bfa] via-[#d8b4fe] to-[#7dd3fc] dark:from-purple-900 dark:via-indigo-800 dark:to-sky-700 bg-[length:800px_50px] animate-pulse" />
                    <hr className="rounded-md h-5 border-0 bg-gradient-to-r from-[#a78bfa] via-[#d8b4fe] to-[#7dd3fc] dark:from-purple-900 dark:via-indigo-800 dark:to-sky-700 bg-[length:800px_50px] animate-pulse" />
                  </div>
                ) : (
                  <div className="pr-2 max-h-[calc(100vh-250px)] px-2 py-10">
                    <p
                      dangerouslySetInnerHTML={{ __html: resultData }}
                      className="text-xl whitespace-pre-wrap dark:text-white"
                    ></p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="main-bottom flex-col bg-white px-4 py-5 max-w-[950px] w-full mx-auto  dark:bg-gray-900">
        <div className="search flex items-center justify-between bg-gray-200 px-5 py-5 rounded-4xl dark:bg-gray-700">
          <input
            type="text"
            placeholder="Enter prompt.."
            className="w-full focus:outline-none focus:border-none ml-2 text-xl bg-transparent text-black dark:text-white"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div className="flex items-center gap-4 px-2">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-6 cursor-pointer hover:bg-gray-300 rounded-3xl dark:invert transition duration-300"
            />
            <img
              src={assets.mic_icon}
              alt=""
              className="w-6 cursor-pointer hover:bg-gray-300 rounded-3xl dark:invert transition duration-300"
            />
            <img
              onClick={() => onSent()}
              src={assets.send_icon}
              alt=""
              className="w-6 cursor-pointer hover:bg-gray-300 rounded-3xl dark:invert transition duration-300"
            />
            
          </div>
        </div>
        <p className="bottom-info mt-5 text-slate-500 dark:text-slate-300 text-center">
          Gemini may display inaccurate info, including about people so double-check its responses. Your Privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
