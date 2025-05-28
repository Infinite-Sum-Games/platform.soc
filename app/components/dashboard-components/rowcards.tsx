'use client';
import { GitPullRequest } from 'lucide-react';
import Image from 'next/image';
import { Card } from '../ui/card';

export interface RowcardsProps {
  index: number;
  avatar_url?: string;
  fullName: string;
  username: string;
  PRmerged: number;
  bounty: number;
}

const Rowcards = (props: RowcardsProps) => {
  return (
    <Card
      className="mx-2 my-3 flex h-14 items-center border-none bg-cover p-4 sm:h-22"
      style={{ backgroundImage: "url('cardBackground.png')" }}
    >
      <div className="flex w-full items-center">
        <p className="w-[10%] font-semibold text-[#f2f2f3] text-base sm:pl-2 sm:text-lg">
          {props.index}
        </p>

        <div className="flex w-[70%] items-center">
          <Image
            src={props.avatar_url || '/default-avatar.png'}
            alt="profile"
            width={64}
            height={64}
            className="h-10 w-10 rounded-full sm:h-14 sm:w-14"
          />
          <div className="flex flex-col items-start pl-4">
            <p className=" max-h-10 max-w-20 overflow-hidden text-ellipsis whitespace-pre text-[#f2f2f3] text-sm sm:text-base md:text-lg lg:max-w-32 lg:text-lg min-1280px:max-w-[250px] min-1680px:max-w-[400px] min-800px:max-w-20 min-400px:max-w-40 min-[480px]:max-w-[16rem] min-900px:max-w-28">
              {props.fullName}
            </p>
            <p className="hidden text-gray-200 text-sm md:block min-800px:text-xs min-900px:text-sm">
              @{props.username}
            </p>
          </div>
        </div>

        <div className="hidden w-[20%] justify-center sm:flex">
          <GitPullRequest
            className="rounded-full bg-slate-600 p-1"
            color="rgb(94 234 212)"
          />
          <p className="pl-2 font-semibold text-[#f2f2f3] text-sm sm:text-base">
            {props.PRmerged}
          </p>
        </div>

        <div className="flex w-[40%] items-center justify-end sm:w-[20%]">
          <p className="font-bold text-[#FFD700] text-base sm:text-2xl">
            {props.bounty}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Rowcards;
