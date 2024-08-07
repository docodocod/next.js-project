import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소 입력 요망"
        },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password
          })
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    }
  },

// 여기가 추가된 부분
  pages: {
    signIn: "/"
  }
// 여기가 추가된 부분
};