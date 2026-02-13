import { connectDb } from '@/lib/db';
import Note from '@/models/note';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    await connectDb();
    const notes = Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        message: notes,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? `Internal server error ${error.message}` : 'Internal server error';
    return NextResponse.json(
      {
        status: false,
        message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: `body is required`,
        },
        {
          status: 400,
        },
      );
    }
    const note = await Note.create(body);
    return NextResponse.json(
      {
        success: true,
        data: note,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? `Internal server error ${error?.message}` : 'Internal server error';
    return NextResponse.json(
      {
        success: false,
        message: message,
      },
      {
        status: 500,
      },
    );
  }
}
