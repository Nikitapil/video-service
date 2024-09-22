import {LikeType} from "../../../gql/graphql.ts";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

interface PostState {
  likedPosts: LikeType[]
  likePost: (like: LikeType) => void
  removeLike: (postId: number) => void
}

export const usePostStore = create<PostState>()(
  devtools(
    persist((set) => ({
      likedPosts: [],
      likePost: (like: LikeType) => set((state) => ({ likedPosts: [...state.likedPosts, like] })),
      removeLike: (postId: number) => set((state) => ({ likedPosts: state.likedPosts.filter(like => like.postId !== postId) }))
    }), {name: 'postStore'})
)
)