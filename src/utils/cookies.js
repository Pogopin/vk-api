export const saveTokenToCookies = (token) => {	
	const expirationDays = 1; //время жизни - сутки
	const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
	const expires = `expires=${currentDate.toUTCString()}`;

	document.cookie = `token=${token}; ${expires}; path=/;`;
}
export const updateTokenInCookies = (newToken) => {
	document.cookie = `token=${newToken}; path=/;`;
}