import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { Rider, Shop, User } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();

    const { username, password, userRole } = credentials;

    let user;
    
    if (userRole === "Admin") {
      user = await User.findOne({ username });
    } else if (userRole === "Rider") {
      user = await Rider.findOne({ username });
    } else if (userRole === "Shop") {
      let store_name = username
      user = await Shop.findOne({ store_name });
    } else {
      throw new Error("Invalid role");
    }

    console.log(user)

    // const user = await User.findOne({ username: credentials.username });

    // if (!user || !user.isAdmin) throw new Error("Wrong credentials! Not admin");
    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
});

