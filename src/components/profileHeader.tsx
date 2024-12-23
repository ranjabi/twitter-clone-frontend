import { ProfileHeader } from '@/interfaces/interfaces'
import UserAvatar from './user-avatar'

const ProfileHeaderSection = (props: ProfileHeader) => {
  return (
    <>
      <div className="flex flex-col pb-8">
        <div className="bg-gray-500 h-56"></div>

        <UserAvatar userId={props.id} classname="h-32 w-32 -mt-16 ml-4" />
        <div className="px-4 mt-4">
          <p className="text-xl font-extrabold">{props.fullName}</p>
          <p className="text-sm">@{props.username}</p>
          <div className="flex gap-x-8 mt-2">
            <p>
              <span className="font-bold">{props.followingCount}&nbsp;</span>
              Following
            </p>
            <p>
              <span className="font-bold">{props.followerCount}&nbsp;</span>
              Followers
            </p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <p className="text-xl font-extrabold underline decoration-cyan-600 decoration-4 underline-offset-[16px] mb-[13px]">
          &nbsp;&nbsp;Posts&nbsp;&nbsp;
        </p>
      </div>
    </>
  )
}

export default ProfileHeaderSection
