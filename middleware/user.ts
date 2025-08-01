export default defineNuxtRouteMiddleware(async (to) => {
  // const token = useCookie('token').value;
  // if (!token) return navigateTo('/login');

  // try {
  //   // Decode with expiration check
  //   const { jwtDecode } = await import('jwt-decode');
  //   const decoded = jwtDecode<{ 
  //     roles: string[], 
  //     exp: number 
  //   }>(token);

  //   // Check expiration
  //   const now = Date.now() / 1000; // Convert to seconds
  //   if (decoded.exp <= now) {
  //     useCookie('token').value = null;
  //     return navigateTo('/login');
  //   }

  //   // Role check
  //   if (!decoded.roles?.includes('ROLE_USER')) {
  //     return navigateTo('/unauthorized');
  //   }

  // } catch (error) {
  //   console.error('Token validation failed:', error);
  //   useCookie('token').value = null;
  //   return navigateTo('/login');
  // }
});
