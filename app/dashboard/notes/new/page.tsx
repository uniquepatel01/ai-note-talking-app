"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NoteEditor } from "@/components/note-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewNotePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to create note");
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      alert("An error occurred while creating the note");
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
          <CardTitle>Create New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteEditor
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
