import { authConfig } from "~/app/lib/auth";
import NextAuth from "next-auth";

/* eslint-disable-next-line */
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
