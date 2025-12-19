"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { NoteCard } from "@/components/note-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
    } else {
      handleSearch(searchQuery);
    }
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      if (response.ok) {
        setNotes(data.notes);
        setFilteredNotes(data.notes);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setFilteredNotes(notes);
      return;
    }

    try {
      const response = await fetch(`/api/notes/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (response.ok) {
        setFilteredNotes(data.notes);
      }
    } catch (error) {
      console.error("Failed to search notes:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Notes</h2>
          <p className="text-muted-foreground">
            {notes.length} {notes.length === 1 ? "note" : "notes"} total
          </p>
        </div>
        <Link href="/dashboard/notes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </Link>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "No notes found matching your search" : "No notes yet. Create your first note!"}
          </p>
          {!searchQuery && (
            <Link href="/dashboard/notes/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
