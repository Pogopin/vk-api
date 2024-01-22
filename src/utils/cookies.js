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
export const deleteTokenInCookies = () => {
  const expires = `expires=${new Date(-1).toUTCString()}`;
  document.cookie = `token=${''}; ${expires}; path=/;`;
}
export const getTokenInCookies = () => {
  const cookieName = 'token';
  const cookiesArray = document.cookie.split(';');

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(cookieName + '=') === 0) {
      // Найдено нужное cookie, извлекаем значение
      let tokenValue = cookie.substring(cookieName.length + 1);
      // console.log('Значение токена:', tokenValue);
      return tokenValue;
      // break;
    }
  }


}
