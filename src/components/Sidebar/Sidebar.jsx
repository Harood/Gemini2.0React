import React from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = React.useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`sidebar flex flex-col justify-between px-4 items-center
        bg-neutral-100 dark:bg-gray-800 
        transition-all duration-300 ease-in-out 
        ${extended ? "w-70" : "w-26"} h-full`}
    >
      {/* Top Section */}
      <div className="top">
        <img
          src={assets.menu_icon}
          alt=""
          className="menu h-16 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 p-4 dark:invert transition duration-300"
          onClick={() => setExtended((prev) => !prev)}
        />

        {/* New Chat Button */}
        <div
          className="new-chat inline-flex items-center justify-center gap-2 rounded-3xl px-6 py-4 
          bg-slate-100 dark:bg-gray-800 cursor-pointer mt-8 
          hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => newChat()}
        >
          <img src={assets.plus_icon} alt="" className="w-6 h-8 dark:invert transition duration-300" />
          {extended ? (
            <p className="text-2xl text-zinc-500 dark:text-white ml-2">New Chat</p>
          ) : null}
        </div>

        {/* Recent Prompts */}
        {extended ? (
          <div className="recent text-slate-500 dark:text-slate-300 flex flex-col max-h-[60vh] mt-6">
            <p className="recent-title mt-14 text-2xl font-semibold mb-6">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index}>
                <div
                  onClick={() => loadPrompt(item)}
                  className="recent-entry cursor-pointer rounded-3xl py-2 w-60 
                  bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                  inline-flex mt-2 animate-[fadeIn_1.5s] items-center px-3"
                >
                  <img src={assets.message_icon} alt="" className="w-10 h-10 dark:invert transition duration-300" />
                  <p className="text-xl dark:text-white ml-2">{item.slice(0, 25)} ...</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom Section */}
      <div className="bottom flex-col flex gap-4 mb-6">
        <div className="bottom-item-recent-entry inline-flex cursor-pointer rounded-2xl p-2 
        bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 items-center">
          <img src={assets.question_icon} alt="" className="h-6 w-6 dark:invert transition duration-300" />
          {extended ? <p className="text-2xl text-slate-600 dark:text-white pl-2">Help</p> : null}
        </div>

        <div className="bottom-item-recent-entry inline-flex cursor-pointer rounded-2xl p-2 
        bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 items-center">
          <img src={assets.history_icon} alt="" className="h-6 w-6 dark:invert transition duration-300" />
          {extended ? <p className="text-2xl text-slate-600 dark:text-white pl-2">Activity</p> : null}
        </div>

        <div className="bottom-item-recent-entry inline-flex cursor-pointer rounded-2xl p-2 
        bg-slate-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 items-center">
          <img src={assets.setting_icon} alt="" className="h-6 w-6 dark:invert transition duration-300" />
          {extended ? <p className="text-2xl text-slate-600 dark:text-white pl-2">Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
