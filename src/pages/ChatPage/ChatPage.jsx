import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/sidebar";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-24">
        <TiMessages
          className="text-3xl cursor-pointer block lg:hidden"
          onClick={() => toggleSidebar()}
        />
      </div>
      <div
        className="flex  lg:max-w-6xl mx-auto gap-5 mt-2 lg:mt-32  rounded-lg  max-w-6xl "
        style={{ height: "calc(100vh - 200px)" }}
      >
        {/* Sidebar */}
        <div
          className={`w-full !h-full  ${
            isSidebarOpen ? "" : "hidden lg:block"
          } `}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
        {/* Message Container */}
        <div
          className={`w-full !h-full  ${
            isSidebarOpen ? "hidden lg:block" : ""
          }`}
        >
          <MessageContainer onMenuClick={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Home;
