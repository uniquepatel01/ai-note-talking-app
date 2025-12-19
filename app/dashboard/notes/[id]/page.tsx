"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { NoteEditor } from "@/components/note-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [note, setNote] = useState<{
    title: string;
    content: string;
    tags: string[];
  } | null>(null);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const response = await fetch(`/api/notes/${resolvedParams.id}`);
      const data = await response.json();

      if (response.ok) {
        setNote(data.note);
      } else {
        alert("Note not found");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to fetch note:", error);
      alert("An error occurred while loading the note");
      router.push("/dashboard");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/notes/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to update note");
      }
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("An error occurred while updating the note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAISummary = async (text: string) => {
    try {
      const response = await fetch("/api/ai/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Summary:\n\n${data.summary}`);
      }
    } catch (error) {
      console.error("Failed to generate summary:", error);
    }
  };

  const handleAIImprove = async (text: string) => {
    try {
      const response = await fetch("/api/ai/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Improved Text:\n\n${data.improvedText}`);
      }
    } catch (error) {
      console.error("Failed to improve text:", error);
    }
  };

  const handleAITags = async (text: string) => {
    try {
      const response = await fetch("/api/ai/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Suggested Tags:\n\n${data.tags.join(", ")}`);
      }
    } catch (error) {
      console.error("Failed to generate tags:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteEditor
            initialData={note}
            onSubmit={handleSubmit}
            onAISummary={handleAISummary}
            onAIImprove={handleAIImprove}
            onAITags={handleAITags}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
