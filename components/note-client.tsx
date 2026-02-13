'use client';

import { useState } from 'react';
import { toast } from 'sonner';
type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

interface NotesClientProps {
  notes: Note[];
}
const NotesClient = ({ notes }: NotesClientProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(notes);
  const createNote = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      setIsLoading(true);
      const response = await fetch('/api/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Created Note');
        setData([...data, result.data]);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error?.message);
    } finally {
      setTitle('');
      setContent('');
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-background">Create New Note</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outine-none focus:ring-2 focus:ring-blue-500 text-background"
            required
          />
          <textarea
            placeholder="note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outine-none focus:ring-2 focus:ring-blue-500 text-background"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'creating...' : 'create note'}
          </button>
        </div>
      </form>

      <div className="space-y-4 text-background bg-white p-4 rounded-md">
        <h2 className="text-xl font-semibold text-background ">
          Your Notes {data ? data.length : ''}
        </h2>
        {data.length > 0 && (
          <div className="space-y-4 ">
            {data.map((note) => (
              <div key={note._id} className="shadow-md border-b border-b-gray- p-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 ">{note.title}</h3>
                  <div className="flex gap-2 items-center">
                    <button className="font-medium bg-blue-500 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-md ">
                      Edit
                    </button>
                    <button className="font-medium bg-red-500 hover:bg-red-700 text-white p-2 rounded-md cursor-pointer ">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 mb-2">{note.content}</p>
                <p className="text-sm text-gray500">
                  CreatedAt: {new Date(note.createdAt).toLocaleDateString()}
                </p>
                {note.updatedAt !== note.createdAt && (
                  <p className="text-gray-500 text-sm">
                    UpdatedAt: {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesClient;
