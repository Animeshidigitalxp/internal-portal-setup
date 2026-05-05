
export function clearListCookies() {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
      const d = window.location.hostname.split(".");
      while (d.length > 0) {
        const cookieBase =
          encodeURIComponent(c.split(";")[0].split("=")[0]) +
          "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
          d.join(".") +
          " ;path=";
        const p = window.location.pathname.split("/");
        document.cookie = cookieBase + "/";
        while (p.length > 0) {
          document.cookie = cookieBase + p.join("/");
          p.pop();
        }
        d.shift();
      }
    }
  }
}

export function deleteCookiesBasedOnDomains() {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ");

    cookies.forEach((cookie) => {
      const cookieName = encodeURIComponent(cookie.split("=")[0]);

      // Try deleting the cookie for the root domain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.dev.sabchalo.com; path=/; Secure`;

      // Try deleting the cookie for the subdomain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=www.dev.sabchalo.com; path=/; Secure`;

      // Try deleting the cookie without specifying a domain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
    });
  }
}

export const validatePassword = (password: string): boolean => {
  const minLength = /.{8,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSymbol = /[!@#$%^&*()_\-+=\[\]{}]/;

  return (
    minLength.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasNumber.test(password) &&
    hasSymbol.test(password)
  );
};


export const getDuration = (startedAt: any, endedAt:any) => {
  if (!endedAt) return null;

  const diff = new Date(endedAt).getTime() - new Date(startedAt).getTime();

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60));

  return `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
};