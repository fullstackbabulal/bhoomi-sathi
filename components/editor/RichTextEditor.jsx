"use client";

// ======================================================
// File: components/common/RichTextEditor.jsx
// Description: TinyMCE Rich Text Editor
// ======================================================

import dynamic from "next/dynamic";

// ======================================================
// CLIENT ONLY IMPORT
// ======================================================
const Editor = dynamic(
  async () => {
    const mod = await import("@tinymce/tinymce-react");

    return mod.Editor;
  },
  {
    ssr: false,
  },
);

// ======================================================
// COMPONENT
// ======================================================
const RichTextEditor = ({ value = "", onChange, height = 300 }) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value}
      init={{
        height,
        menubar: false,

        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],

        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | " +
          "removeformat | help",
      }}
      onEditorChange={onChange}
    />
  );
};

export default RichTextEditor;
