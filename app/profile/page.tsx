'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import GameAchievementSystem from '../components/profile-components/GameAchivementSystem';
import Profile, {
  type ProfileResponse,
} from '../components/profile-components/profileCard';
import { make_api_call } from '../lib/api';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(!user);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const result = await make_api_call<ProfileResponse>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        console.log(`Result: ${JSON.stringify(result)}`);
        if (result.success && result.data) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />

      <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Profile Card - Takes 2 columns on large screens */}
          <div className="col-span-1 lg:col-span-2 w-full">
            <Profile
              profile={profile || null}
              loading={loading}
            />
          </div>

          {/* Achievement Card - Takes 1 column, matches Profile height, hides vertical overflow */}
          <div className="col-span-1 w-full">
            <GameAchievementSystem badges={profile?.badges} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
