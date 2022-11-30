import React, { Dispatch } from "react";
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

type RichTextEditor = {
  editor: Editor | null;
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
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
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9 18q-.825 0-1.412-.587Q7 16.825 7 16V6q0-.825.588-1.412Q8.175 4 9 4h3.5q1.7 0 2.975.975q1.275.975 1.275 2.675q0 1.2-.55 1.912q-.55.713-1.3 1.088v.2q1.1.375 1.725 1.175t.625 2.075q0 1.875-1.363 2.888Q14.525 18 12.65 18Zm.65-8.3h2.65q.825 0 1.363-.475q.537-.475.537-1.2t-.537-1.2q-.538-.475-1.363-.475H9.65Zm0 5.9h2.85q.975 0 1.538-.5q.562-.5.562-1.325t-.562-1.325q-.563-.5-1.538-.5H9.65Z"
          />
        </svg>
        {/* bold */}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={[styles.button, editor.isActive('italic') ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.5 20q-.625 0-1.062-.438Q5 19.125 5 18.5t.438-1.062Q5.875 17 6.5 17h1.875l4-10H10.5q-.625 0-1.062-.438Q9 6.125 9 5.5t.438-1.062Q9.875 4 10.5 4h7q.625 0 1.062.438Q19 4.875 19 5.5t-.438 1.062Q18.125 7 17.5 7h-1.875l-4 10H13.5q.625 0 1.062.438q.438.437.438 1.062t-.438 1.062Q14.125 20 13.5 20Z"
          />
        </svg>
        {/* italic */}
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={[styles.button, editor.isActive('strike') ? 'is-active' : ''].join(" ")}
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
        className={[styles.button, editor.isActive('code') ? 'is-active' : ''].join(" ")}
      >
        code
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={styles.button}
      >
        clear marks
      </button> */}
      {/* <button 
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={styles.button}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M4.5 1c.2 0 .38.12.46.303l2.884 6.731l-.753.754a.502.502 0 0 1-.05-.091L6.313 7H2.687L1.96 8.697a.5.5 0 0 1-.92-.394l3-7A.5.5 0 0 1 4.5 1Zm1.385 5L4.5 2.77L3.116 6h2.769Zm8.427.19c.002-.063.004-.128.004-.193c0-1.82-.957-2.997-2.428-2.997c-.795 0-1.499.392-1.816 1.015H10V1.5a.5.5 0 1 0-1 0v5.378l1-1v-.394c.149-1.032.762-1.651 1.673-1.651c.853 0 1.426.526 1.617 1.44c.17.102.33.227.478.373l.544.545Zm-1.252.164a1.5 1.5 0 0 0-2.12 0l-4.587 4.585a1.5 1.5 0 0 0 0 2.122l1.586 1.585A1.5 1.5 0 0 0 9.501 15H12.5a.5.5 0 0 0 0-1h-1.793l3.94-3.94a1.5 1.5 0 0 0 0-2.12L13.06 6.353ZM8 10.707L10.293 13l-.94.94a.5.5 0 0 1-.707 0l-1.585-1.586a.5.5 0 0 1 0-.708L8 10.707Z"
          />
        </svg>
        clear nodes
      </button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={[styles.button, editor.isActive('paragraph') ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10 20q-.425 0-.712-.288Q9 19.425 9 19v-5q-2.075 0-3.537-1.463Q4 11.075 4 9t1.463-3.537Q6.925 4 9 4h8q.425 0 .712.287Q18 4.575 18 5t-.288.713Q17.425 6 17 6h-1v13q0 .425-.287.712Q15.425 20 15 20t-.712-.288Q14 19.425 14 19V6h-3v13q0 .425-.287.712Q10.425 20 10 20Z"
          />
        </svg>
        {/* paragraph */}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 1 }) ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
            d="M6 8v32M25 8v32M6 24h19m9.226 0L39 19.017V40"
          />
        </svg>
        {/* h1 */}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 2 }) ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
            d="M6 8v32M24 8v32M7 24h16m9 1c0-3.167 2.667-5 5-5s5 1.833 5 5c0 5.7-10 9.933-10 15h10"
          />
        </svg>
        {/* h2 */}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 3 }) ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
            d="M6 8v32M24 8v32M7 24h16m9-4h10l-7 9c4 0 7 2 7 6s-3 5-5 5c-2.381 0-4-1-5-2.1"
          />
        </svg>
        {/* h3 */}
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 4 }) ? 'is-active' : ''].join(" ")}
      >
        h4
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 5 }) ? 'is-active' : ''].join(" ")}
      >
        h5
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={[styles.button, editor.isActive('heading', { level: 6 }) ? 'is-active' : ''].join(" ")}
      >
        h6
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={[styles.button, editor.isActive('bulletList') ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm3.75-1.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5zm0 5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5zm0 5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5zM3 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm-1 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"
          />
        </svg>
        {/* bullet list */}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={[styles.button, editor.isActive('orderedList') ? 'is-active' : ''].join(" ")}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2.003 2.5a.5.5 0 0 0-.723-.447l-1.003.5a.5.5 0 0 0 .446.895l.28-.14V6H.5a.5.5 0 0 0 0 1h2.006a.5.5 0 1 0 0-1h-.503V2.5zM5 3.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 5 3.25zm0 5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 5 8.25zm0 5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75zM.924 10.32l.003-.004a.851.851 0 0 1 .144-.153A.66.66 0 0 1 1.5 10c.195 0 .306.068.374.146a.57.57 0 0 1 .128.376c0 .453-.269.682-.8 1.078l-.035.025C.692 11.98 0 12.495 0 13.5a.5.5 0 0 0 .5.5h2.003a.5.5 0 0 0 0-1H1.146c.132-.197.351-.372.654-.597l.047-.035c.47-.35 1.156-.858 1.156-1.845c0-.365-.118-.744-.377-1.038c-.268-.303-.658-.484-1.126-.484c-.48 0-.84.202-1.068.392a1.858 1.858 0 0 0-.348.384l-.007.011l-.002.004l-.001.002l-.001.001a.5.5 0 0 0 .851.525zM.5 10.055l-.427-.26l.427.26z"
          />
        </svg>
        {/* ordered list */}
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={[styles.button, editor.isActive('codeBlock') ? 'is-active' : ''].join(" ")}
      >
        code block
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={[styles.button, editor.isActive('blockquote') ? 'is-active' : ''].join(" ")}
      >
        blockquote
      </button> */}
      {/* <button 
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={styles.button}
      >
        horizontal rule
      </button> */}
      {/* <button 
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={styles.button}
      >
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
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M8 19q-.425 0-.713-.288Q7 18.425 7 18t.287-.712Q7.575 17 8 17h6.1q1.575 0 2.737-1Q18 15 18 13.5T16.837 11q-1.162-1-2.737-1H7.8l1.9 1.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275L4.7 9.7q-.15-.15-.213-.325Q4.425 9.2 4.425 9t.062-.375Q4.55 8.45 4.7 8.3l3.6-3.6q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L7.8 8h6.3q2.425 0 4.163 1.575Q20 11.15 20 13.5q0 2.35-1.737 3.925Q16.525 19 14.1 19Z"
          />
        </svg>
        {/* undo */}
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
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.9 19q-2.425 0-4.162-1.575Q4 15.85 4 13.5q0-2.35 1.738-3.925Q7.475 8 9.9 8h6.3l-1.9-1.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.6 3.6q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-3.6 3.6q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l1.9-1.9H9.9q-1.575 0-2.737 1Q6 12 6 13.5T7.163 16q1.162 1 2.737 1H16q.425 0 .712.288q.288.287.288.712t-.288.712Q16.425 19 16 19Z"
          />
        </svg>
        {/* redo */}
      </button>
    </div>
  )
}

const SaveButton: React.FC<RichTextEditor> = ({ editor, content }) => {
  if (!editor) {
    return null
  }

  return (
    <div className={styles.saveButtonWrapper}>
      <button 
        onClick={() => {}}
        className={styles.saveButton}>
        Save
      </button>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: ""+content }}></div>
    </div>
  )
}

export const RichTextEditor: React.FC<RichTextEditor> = ({content, setContent}) => {
  //const [content, setContent] = React.useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
    <p>Add a comment...</p>
    `,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
    onSelectionUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })
  
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <SaveButton editor={editor} content={content} setContent={setContent} />
    </div>
  )
}

export default RichTextEditor;