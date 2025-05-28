import Navbar from '../components/Navbar';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import GameAchievementSystem from '../components/profile-components/GameAchivementSystem';
import Profile from '../components/profile-components/profileCard';

const ProfilePage = () => {
  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />

      <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Profile Card - Takes 2 columns on large screens */}
          <div className="col-span-1 lg:col-span-2 w-full">
            <Profile />
          </div>

          {/* Achievement Card - Takes 1 column, matches Profile height, hides vertical overflow */}
          <div className="col-span-1 w-full">
            <GameAchievementSystem />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
