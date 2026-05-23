import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const name = ref('John Doe')
  const plan = ref('Pro Plan')
  const avatar = ref('https://i.pinimg.com/1200x/8e/a3/45/8ea3456bf08ae3596c85ee6c7e302fa4.jpg')

  /* const fetchUser = async () => {

  } */

  return {
    name,
    plan,
    avatar,
  }
})