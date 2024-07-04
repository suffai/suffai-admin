export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
        token.userRole = user.userRole;
        token.isAdmin = user.isAdmin;
        if (token.userRole === "Shop") {
          token._id = user._id
          token.username = user.store_name;
        }else if (token.userRole === "Rider") {
          token._id = user._id
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.userRole = token.userRole;
        session.user.isAdmin = token.isAdmin;
        if (token._id) {
          session.user._id = token._id
        }
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      const userRole = auth?.user.userRole;
      const allowedPages = getAllowedPagesForUserRole(userRole);

      if (isOnDashboard) {
        if (isLoggedIn) {
          const requestedPage = request.nextUrl.pathname;
          if (userRole === "Admin") {
            if (requestedPage === "/dashboard/profile") {
              return false;
            } else if (requestedPage === "/dashboard/services/add") {
              return false;
            }
            return true;
          } else if (userRole === "Shop" && requestedPage.startsWith("/dashboard/services/")) {
            return true;
          } else if (userRole === "Shop" && requestedPage.startsWith("/dashboard/orders/")) {
            return true;
          } else if (!allowedPages.includes(requestedPage)) {
            return false;
          }
          
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true; 
    },
  },
};

const getAllowedPagesForUserRole = (userRole) => {
  switch (userRole) {
    case "Admin":
      return [];
    case "Rider":
      return [
        "/dashboard", 
        "/dashboard/profile", 
        "/dashboard/orders", 
        "/dashboard/settings", 
        "/dashboard/help"];
    case "Shop":
      return [
      "/dashboard", 
      "/dashboard/services",
      "/dashboard/profile", 
      "/dashboard/orders", 
      "/dashboard/transactions", 
      "/dashboard/settings", 
      "/dashboard/help"];
    default:
      return [];
  }
};
