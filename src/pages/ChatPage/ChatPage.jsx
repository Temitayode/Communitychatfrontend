import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "./../../components/sidebar/sidebar";

const Home = () => {
  return (
    <div
      className="  flex gap-5 mt-32 rounded-lg overflow-hidden mx-auto max-w-6xl "
      style={{ height: "calc(100vh - 200px)" }}
    >
      <>
        <Sidebar className="absolute left-0 top-0 h-full" />
        <MessageContainer className="" />
      </>
    </div>
  );
};

export default Home;
