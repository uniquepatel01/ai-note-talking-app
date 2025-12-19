import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  tags: string[];
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema<INote> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [200, "Title cannot be more than 200 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    tags: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
NoteSchema.index({ title: "text", content: "text" });
NoteSchema.index({ userId: 1, createdAt: -1 });

const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;
