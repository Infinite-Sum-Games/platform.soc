'use client';
import { useAuthStore } from '@/app/store/useAuthStore';
import { LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const github_username = user?.github_username || '';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'AUTH_SUCCESS'
      ) {
        // Refresh the page to update the UI
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      clearUser();
      router.push('/');
    }
  };

  return (
    <div className="fixed top-0 left-0 mt-4 flex w-full justify-center z-10">
      <nav className="w-11/12 rounded-2xl border-[#A7E6FF] border-b bg-white/90 shadow-sm backdrop-blur-sm z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div
              className="shrink-0"
              aria-label="Home"
            >
              <Link
                href="/"
                aria-label="Home"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-600 to-blue-400 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg sm:h-12 sm:w-12">
                  <Image
                    src="/acmlogonew.webp"
                    alt="ACM Logo"
                    width={48}
                    height={48}
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="flex space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/rules">Rules</NavLink>
                <NavLink href="/repo">Repositories</NavLink>
                <NavLink href="/bot-commands">Bot Commands</NavLink>
                {/* <NavLink href="/announcements">Announcements</NavLink> */}
                <NavLink href="/request-for-code">Request for Code</NavLink>
                <NavLink href="/resources">Resources</NavLink>
                <NavLink href="/team">Team</NavLink>
                <NavLink href="/past-editions">Past Editions</NavLink>
              </div>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center">
              {user && (
                <>
                  <button
                    type="button"
                    onClick={() => router.push(`/profile/${github_username}`)}
                    className="cursor-pointer flex items-center gap-2 rounded-l-full bg-white px-2 py-1 text-base font-semibold text-gray-800 shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <img
                      src={`https://github.com/${user.github_username}.png`}
                      alt={user.github_username}
                      className="h-8 w-8 rounded-full border border-gray-200"
                    />
                    <span className="font-semibold lg:block hidden">
                      {user.github_username}
                    </span>
                  </button>
                  <div className="cursor-pointer flex items-center justify-center bg-red-200 rounded-r-full px-2 py-3 transition-all duration-200 ease-in-out hover:shadow-md">
                    <LogOut
                      color="red"
                      onClick={handleLogout}
                      className="h-4 w-4"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden rounded-xl border-gray-200 border-t bg-white transition-all duration-400 ease-in-out md:hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/rules">Rules</MobileNavLink>
            <MobileNavLink href="/repo">Repositories</MobileNavLink>
            <MobileNavLink href="/bot-commands">Bot Commands</MobileNavLink>
            {/* <MobileNavLink href="/announcements">Announcements</MobileNavLink> */}
            <MobileNavLink href="/request-for-code">
              Request for Code
            </MobileNavLink>
            <MobileNavLink href="/resources">Resources</MobileNavLink>
            <MobileNavLink href="/team">Team</MobileNavLink>
            <MobileNavLink href="/past-editions">Past Editions</MobileNavLink>
            <div className="flex md:hidden items-center">
              {user && (
                <>
                  <button
                    type="button"
                    onClick={() => router.push(`/profile/${github_username}`)}
                    className="cursor-pointer flex items-center gap-2 rounded-l-full bg-white px-2 py-1 text-base font-semibold text-gray-800 shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                  >
                    <img
                      src={`https://github.com/${user.github_username}.png`}
                      alt={user.github_username}
                      className="h-8 w-8 rounded-full border border-gray-200"
                    />
                    <span className="font-semibold">
                      {user.github_username}
                    </span>
                  </button>
                  <div className="cursor-pointer flex items-center justify-center bg-red-200 rounded-r-full px-2 py-3 transition-all duration-200 ease-in-out hover:shadow-md">
                    <LogOut
                      color="red"
                      onClick={handleLogout}
                      className="h-4 w-4"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

// Reusable NavLink component
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="whitespace-nowrap rounded-lg px-2 py-1 font-medium text-gray-700 text-md transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500"
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500"
  >
    {children}
  </Link>
);

export default Navbar;
