import { defineStore } from 'pinia';
import { http } from '@/utils/apiService.js';

const id = 'users-store';
export const useUsersStore = defineStore(id, {
	state: () => {
		return {
			usersList: [],
      isAuthStatus: false,
		}
	},
	getters: {
		getUsersData: (state) => state.usersList,
    getIsAuthStatus: (state) => state.isAuthStatus
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
    async checkUserIsAuth(resource, tokenValue) {// проверка, живет ли токен.
      try {
        const responce = await fetch(`https://1ff6007222bdc06f.mokky.dev${resource}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        })
        const data = await responce.json();
        if(data.statusCode) {
          this.isAuthStatus = false;
          return
        }
        this.isAuthStatus = true;
      } catch (error) {
          console.log(error);
      }
    },
    async setIsAuthStatus(value) {
      this.isAuthStatus = value;
    }
	}
})

