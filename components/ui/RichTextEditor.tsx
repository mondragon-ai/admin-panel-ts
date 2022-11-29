import React from "react";
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from "../../styles/RichText.module.css";
// import "../../styles/RichText.module.css"

// const RichTextEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//     ],
//     content: '<p>Hello World!</p>',
//   })

//   return (
//     <EditorContent editor={editor} />
//   )
// }

// export default RichTextEditor;

type Props = {
  editor: Editor | null;
}

const MenuBar: React.FC<Props> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className={styles.richTextEditorWrapper}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={[styles.button, editor.isActive('bold') ? 'is-active' : ''].join(" ")}
      >
        bold
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button> */}
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={styles.button}
      >
        clear marks
      </button>
      {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={[styles.button, editor.isActive('paragraph') ? 'is-active' : ''].join(" ")}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 1 }) ? 'is-active' : ''].join(" ")}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 2 }) ? 'is-active' : ''].join(" ")}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 3 }) ? 'is-active' : ''].join(" ")}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 4 }) ? 'is-active' : ''].join(" ")}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 5 }) ? 'is-active' : ''].join(" ")}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 6 }) ? 'is-active' : ''].join(" ")}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={[styles.button, editor.isActive('bulletList') ? 'is-active' : ''].join(" ")}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={[styles.button, editor.isActive('orderedList') ? 'is-active' : ''].join(" ")}
      >
        ordered list
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button> */}
      {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button> */}
      {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={styles.button}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={styles.button}
      >
        redo
      </button>
    </div>
  )
}

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <p>Add a comment...</p>
    `,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}