import { ProfileHeader } from '@/interfaces/interfaces'
import UserAvatar from './user-avatar'
import { Button } from './ui/button'
import { useState } from 'react'
import { apiInstance } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

const ProfileHeaderSection = (props: ProfileHeader) => {
  console.log('props.isFollowed:', props.isFollowed)

  const [followBtnVariant, setFollowBtnVariant] = useState<
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
  >(!props.isFollowed ? 'default' : 'outline')
  const [followBtnText, setFollowBtnText] = useState(
    !props.isFollowed ? 'Follow' : 'Following',
  )

  const follow = async () => {
    try {
      const res = await apiInstance.post(`/users/${props.id}/follow`)
      toast({
        description: res.data.message,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
    }
  }

  const unfollow = async () => {
    try {
      const res = await apiInstance.post(`/users/${props.id}/unfollow`)
      toast({
        description: res.data.message,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response?.data.message,
        })
      }
    }
  }

  const followMutation = useMutation({
    mutationFn: follow,
    onSettled: async () => {
      return await props.queryClient.invalidateQueries({
        queryKey: ['profile', props.username],
      })
    },
    onSuccess: () => {
      setFollowBtnText('Following')
      setFollowBtnVariant('outline')
    },
  })

  const unfollowMutation = useMutation({
    mutationFn: unfollow,
    onSettled: async () => {
      return await props.queryClient.invalidateQueries({
        queryKey: ['profile', props.username],
      })
    },
    onSuccess: () => {
      setFollowBtnText('Follow')
      setFollowBtnVariant('default')
    },
  })

  return (
    <>
      <div className="flex flex-col pb-8">
        <div className="bg-gray-500 h-56"></div>
        <div className="flex justify-between px-5">
          <UserAvatar userId={props.id} classname="h-32 w-32 -mt-[4.5rem]" />
          <Button
            variant={followBtnVariant}
            onClick={() => {
              if (followBtnText === 'Follow') {
                followMutation.mutate()
              } else if (followBtnText === 'Unfollow') {
                unfollowMutation.mutate()
              }
            }}
            onMouseEnter={() => {
              if (followBtnText === 'Following') {
                setFollowBtnText('Unfollow')
                setFollowBtnVariant('destructive')
              }
            }}
            // onMouseOver={() => {
            //   if (followBtnText === 'Following') {
            //     setFollowBtnText('Unfollow')
            //     setFollowBtnVariant('destructive')
            //   }
            // }}
            onMouseLeave={() => {
              if (followBtnText === 'Unfollow') {
                setFollowBtnText('Following')
                setFollowBtnVariant('outline')
              }
            }}
            className="mt-4 font-bold rounded-full px-5 py-5 text-lg"
          >
            {followBtnText}
          </Button>
        </div>
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
        <p className="text-xl font-extrabold underline decoration-sky-500 decoration-4 underline-offset-[15px] mb-[13px]">
          &nbsp;&nbsp;Posts&nbsp;&nbsp;
        </p>
      </div>
    </>
  )
}

export default ProfileHeaderSection
