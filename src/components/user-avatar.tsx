import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {
  userId: number | undefined
  classname?: string
}

const UserAvatar = (props: UserAvatarProps) => {
  const { userId, classname } = props
  const colorVariant: { [key: number]: string } = {
    1: 'bg-green-500',
    2: 'bg-red-500',
    3: 'bg-blue-500',
    4: 'bg-yellow-500',
    5: 'bg-purple-500',
    6: 'bg-pink-500',
    7: 'bg-indigo-500',
    8: 'bg-teal-500',
    9: 'bg-orange-500',
    10: 'bg-gray-500',
  }
  const colorId = ((userId || 0) % 10) + 1

  return (
    <div className="relative mt-[6]">
      <div
        className={`w-10 h-10 ${colorVariant[colorId]} absolute rounded-full z-10 opacity-50 ${classname}`}
      ></div>
      <Avatar className={`${classname}`}>
        <AvatarImage src="/default-avatar.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar
