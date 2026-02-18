import { connectDb } from '@/lib/db';
import Note from '@/models/note';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDb();
    const { id } = await params;
    const note = await Note.findByIdAndDelete(id);
    if (!note)
      return NextResponse.json(
        {
          success: false,
          message: 'Note not founc',
        },
        { status: 404 },
      );
    return NextResponse.json(
      {
        success: true,
        data: {},
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? `Internal server error ${error.message}` : `Internal Server error `;

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}
