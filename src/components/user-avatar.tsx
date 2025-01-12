import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {
  classname?: string
  path?: string
}

const UserAvatar = (props: UserAvatarProps) => {
  const { classname, path } = props

  return (
    <div className="relative mt-[6]">
      <Avatar className={`${classname}`}>
        <AvatarImage
          src={`${process.env.NODE_ENV === 'development' ? '' : path}`}
        />
        <AvatarFallback>
          <Image
            width={40}
            height={40}
            src="/default-avatar.png"
            alt="avatar"
          />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar
