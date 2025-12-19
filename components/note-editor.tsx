"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteEditorProps {
  initialData?: {
    title: string;
    content: string;
    tags?: string[];
  };
  onSubmit: (data: NoteFormData & { tags: string[] }) => void;
  onAISummary?: (text: string) => void;
  onAIImprove?: (text: string) => void;
  onAITags?: (text: string) => void;
  isLoading?: boolean;
}

export function NoteEditor({
  initialData,
  onSubmit,
  onAISummary,
  onAIImprove,
  onAITags,
  isLoading = false,
}: NoteEditorProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
    },
  });

  const content = watch("content");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFormSubmit = (data: NoteFormData) => {
    onSubmit({ ...data, tags });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter note title..."
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Content</Label>
          {onAISummary && onAIImprove && (
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onAISummary(content)}
                disabled={!content || content.length < 10}
              >
                AI Summary
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onAIImprove(content)}
                disabled={!content || content.length < 10}
              >
                AI Improve
              </Button>
            </div>
          )}
        </div>
        <Textarea
          id="content"
          placeholder="Write your note content..."
          rows={10}
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="tags">Tags</Label>
          {onAITags && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onAITags(content)}
              disabled={!content || content.length < 10}
            >
              Generate Tags
            </Button>
          )}
        </div>
        <Input
          id="tags"
          placeholder="Press Enter to add tags..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save Note"}
      </Button>
    </form>
  );
}
