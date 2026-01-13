import { cookies } from "next/headers";
import prismaclient from "./services/prisma";
import { verifyToken } from "./services/jwt";

export async function getUserFromCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return null;
    }

    const user = await prismaclient.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        company: true,
      },
      omit: {
        password: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user from cookies:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getUserFromCookies();
  return user !== null;
}
