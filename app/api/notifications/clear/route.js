import connectedDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";

export async function DELETE() {
  await connectedDB();
  const user = await getSessionUser();
  

  if (!user?._id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await Notification.deleteMany({ user: user._id });
  return NextResponse.json({ success: true });
}


