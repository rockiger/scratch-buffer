import './App.css'

import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import React from 'react'
import { debounce } from 'lodash'

const localStorageKey = 'com.rockiger.scratch-buffer'

// eslint-disable-next-line
export default () => {
  const editor = useEditor({
    autofocus: true,
    onUpdate: debounce(() => {
      localStorage.setItem(localStorageKey, editor.getHTML())
    }, 1000),
    extensions: [
      StarterKit,
      Highlight,
      TaskItem.configure({ nested: true }),
      TaskList,
      ,
      Typography,
    ],
    editorProps: {
      attributes: {
        class: '',
      },
    },
    content: getContent(),
  })

  return <EditorContent editor={editor} />
}

function getContent() {
  const content = localStorage.getItem(localStorageKey)
  if (content == null) return getDefaultContent()
  return content
}

function getDefaultContent() {
  return `
    <p>
      Markdown shortcuts make it easy to format the text while typing.
    </p>
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
    </p>
    <p>
      Those conventions are called input rules in tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
    </p>
    <p>
      You can overwrite existing input rules or add your own to nodes, marks and extensions.
    </p>
    <p>
      For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
    </p>
    `
}
