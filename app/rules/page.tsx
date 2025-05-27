import Navbar from '../components/Navbar';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import Rules from './Rules';

const RulesPage = () => {
  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />
      <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden">
        <Rules />
      </div>
    </>
  );
};

export default RulesPage;
