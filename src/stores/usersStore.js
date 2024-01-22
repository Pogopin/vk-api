import { defineStore } from 'pinia'
import { http } from '@/utils/apiService.js'

const id = 'users-store'
export const useUsersStore = defineStore(id, {
	state: () => {
		return {
			usersList: []
		}
	},
	getters: {
		getUsersData: (state) => state.usersList
	},
	actions: {
		async getUsers() {
			try {
				const data = await http.get('/users');
				this.usersList = (data);
			} catch (error) {
				console.log(error);
			}
		},
		async checkUsers(value) {
			return this.usersList.some(el => {
				return el.email === (value)
			})
		},
    async checkUserIsAuth(resource, tokenValue) {
      try {
        const responce = await fetch(`https://1ff6007222bdc06f.mokky.dev${resource}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        })
        const data = await responce.json();
        if(data.statusCode) return data.statusCode;
        else return data

      } catch (error) {
          console.log(error)
      }
    }
	}
})

