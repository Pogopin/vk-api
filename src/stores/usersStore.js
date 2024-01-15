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
		}
	}
})

