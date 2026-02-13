import NotesClient from '@/components/note-client';
import { connectDb } from '@/lib/db';
import Note from '@/models/note';

const fetchNotes = async () => {
  try {
    await connectDb();
    const notes = Note.find({}).sort({ createdAt: -1 }).lean();
    return (await notes).map((note) => ({
      ...note,
      _id: note._id.toString(),
    }));
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const notes = await fetchNotes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bodld mb-6">NOTES APP</h1>
      <NotesClient notes={notes!} />
    </div>
  );
}
