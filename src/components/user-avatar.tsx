import { getColorFromUserId } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {
  userId: number | undefined
  classname?: string
}

const UserAvatar = (props: UserAvatarProps) => {
  const { userId, classname } = props
  return (
    <div className="relative mt-[6]">
      <div
        className={`w-10 h-10 ${getColorFromUserId(userId || 0)} absolute rounded-full z-10 opacity-50 ${classname}`}
      ></div>
      <Avatar className={`${classname}`}>
        <AvatarImage src="/default-avatar.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar
