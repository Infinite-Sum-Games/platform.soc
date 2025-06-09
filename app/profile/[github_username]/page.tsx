'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Cloud from '../../components/dashboard-components/Cloud';
import SunGlareEffect from '../../components/dashboard-components/SunGlareEffect';
import GameAchievementSystem from '../../components/profile-components/GameAchivementSystem';
import Profile, {
  type ProfileResponse,
} from '../../components/profile-components/profileCard';
import { make_api_call } from '../../lib/api';
import { useAuthStore } from '../../store/useAuthStore';

const ProfilePage = () => {
  const router = useRouter();
  const { github_username } = useParams();
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Don't do anything until Zustand has hydrated
    if (!hydrated) return;

    // Redirect to login if not authenticated
    if (!user || !user.access_token) {
      console.log('Redirecting to home due to missing user or access_token');
      router.push('/');
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const result = await make_api_call<ProfileResponse>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile?user=${github_username}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${user.access_token}` },
        });

        if (result.success && result.data) {
          setProfile(result.data);
        } else {
          setProfile(null); // Trigger ErrorCard
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfile(null); // Trigger ErrorCard
      } finally {
        setLoading(false);
      }
    };

    if (github_username) {
      fetchProfile();
    } else {
      setLoading(false);
      setProfile(null); // Trigger ErrorCard if no username
    }
  }, [hydrated, user, github_username, router]);

  // Show loading state until hydrated
  if (!hydrated) {
    return (
      <>
        <SunGlareEffect />
        <Cloud />
        <Navbar />
        <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden">
          <div className="flex justify-center items-center min-h-64">
            <div>Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />
      <div className="w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="col-span-1 lg:col-span-2 w-full">
            <Profile
              profile={profile || null}
              loading={loading}
            />
          </div>
          <div className="col-span-1 w-full">
            <GameAchievementSystem badges={profile?.badges} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
