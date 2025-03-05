import { getServerSession } from "next-auth";
import { getServerField } from "next/dist/server/lib/render-server";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  return NextResponse.json({ authenticated: !!session });
};
