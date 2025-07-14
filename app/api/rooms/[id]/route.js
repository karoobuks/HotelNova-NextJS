import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import Room from '@/models/Room';
import { getSessionUser } from '@/utils/getSessionUser';

// PATCH = Edit room
export async function PATCH(req, { params }) {
  await connectedDB();
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const updates = await req.json();

  const room = await Room.findByIdAndUpdate(id, updates, { new: true });
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, room });
}

// DELETE = Delete room
export async function DELETE(req, { params }) {
  await connectedDB();
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const deleted = await Room.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Room deleted successfully' });
}

export async function GET(req, { params }) {
  await connectedDB();
  const { id } = params;

  const room = await Room.findById(id);
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ room }, { status: 200 });
}
