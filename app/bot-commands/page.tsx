import DevPoolDocs from "./devpool-docs";
import Navbar from "../components/Navbar";
import Cloud from "../components/dashboard-components/Cloud";
import SunGlareEffect from "../components/dashboard-components/SunGlareEffect";

const BotCommandsPage = () => {
  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />
      <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden">
        <DevPoolDocs />
      </div>
    </>
  );
};

export default BotCommandsPage;
