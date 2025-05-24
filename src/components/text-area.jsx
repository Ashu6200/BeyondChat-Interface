'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Bold,
  Bookmark,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Italic,
  MessageSquareText,
  SmilePlus,
  Zap,
  Underline as UnderlineIcon,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { aiDropdownMenu, customerMessage } from '@/assets/mockData';
import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerConversation } from '@/context/features/conversationSlice';

const TextareaComponent = () => {
  const dispatch = useDispatch();
  const [textAreaFocus, setTextAreaFocus] = useState(false);
  const conversationMessageText = useSelector(
    (state) => state.messageInput.sendMessageValue
  );
  const aiConversationsMessageText = useSelector(
    (state) => state.messageInput.aiSendMessageValue
  );
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      Heading.configure({ levels: [1, 2] }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Type your notes here...',
      }),
    ],
    content: '',
    immediatelyRender: false,
    autofocus: false,
    editable: true,
    injectCSS: true,
    editorProps: {
      attributes: {
        class: 'prose-sm focus:outline-none min-h-[50px] text-xs',
      },
    },
  });
  useEffect(() => {
    if (conversationMessageText && editor) {
      editor.commands.setContent(conversationMessageText);
    }
    if (aiConversationsMessageText && editor) {
      editor.commands.setContent(aiConversationsMessageText);
    }
  }, [conversationMessageText, aiConversationsMessageText]);

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };
  function convertNodeToObject(node) {
    const result = {};

    if (node.type) result.type = node.type;
    if (node.attrs) result.attrs = node.attrs;

    if (node.text) {
      result.text = node.text;

      if (node.marks) {
        result.marks = node.marks.map((mark) => ({ type: mark.type }));
      }
    }

    if (node.content) {
      result.content = node.content.map((child) => convertNodeToObject(child));
    }

    return result;
  }
  const handleSend = (e) => {
    e.preventDefault();
    const text = editor.getJSON();
    const message = convertNodeToObject(text);
    const output = {
      sender: 'agent',
      message: message,
    };
    dispatch(addCustomerConversation(output));
    setTimeout(() => {
      const output = {
        sender: 'customer',
        message: customerMessage,
      };
      dispatch(addCustomerConversation(output));
    }, 5000);
  };
  return (
    <div className='p-3 sticky bottom-0 bg-background'>
      <div
        className={`flex flex-col items-start relative w-full border rounded-lg transition-shadow ${
          textAreaFocus ? 'shadow-xl' : ''
        }`}
      >
        <Select defaultValue='chat'>
          <SelectTrigger className='w-max bg-transparent border-none text-xs font-semibold text-black shadow-none focus:outline-none focus:ring-0'>
            <SelectValue placeholder='chat' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='chat' className='text-xs font-semibold'>
              <div className='flex items-center gap-2'>
                <MessageSquareText className='h-4 w-4 text-black' />
                <span>Chat</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className='z-50 flex items-center gap-1 bg-white border shadow-lg p-2 rounded-lg'
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='hover:bg-gray-200 rounded h-max p-1  border-blue-400 bg-blue-100'
                  title='AI'
                >
                  <span className='bg-blue-500 text-white p-[2px] px-1 text-xs font-semibold rounded'>
                    AI
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-max'>
                {aiDropdownMenu.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={'text-xs font-normal hover:bg-gray-200 '}
                  >
                    {item.menu}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className='w-[5px] h-[15px] border-r-2 border-gray-600'></div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-gray-200' : ''}
            >
              <Bold size={14} />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-gray-200' : ''}
            >
              <Italic size={14} />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'bg-gray-200' : ''}
            >
              <UnderlineIcon size={14} />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              // onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'bg-gray-200' : ''}
            >
              <Code size={14} />
            </Button>

            <div className='w-[5px] h-[15px] border-r-2 border-gray-600'></div>

            <Button
              variant='ghost'
              size='icon'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
              }
            >
              <Heading1 size={14} />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
              }
            >
              <Heading2 size={14} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              // onClick={setLink}
              className={editor.isActive('link') ? 'bg-gray-200' : ''}
            >
              <LinkIcon size={14} />
            </Button>
          </BubbleMenu>
        )}
        <div className='max-h-[200px] min-h-[50px] w-full overflow-auto text-sm leading-relaxed'>
          <EditorContent
            editor={editor}
            placeholder='Type your notes here...'
            onFocus={() => setTextAreaFocus(true)}
            onBlur={() => setTextAreaFocus(false)}
            className='prose prose-sm w-full h-full focus:outline-none p-2  text-sm outline-none border-none ProseMirror'
          />
        </div>
        <div className='flex items-center justify-between px-4 py-2 w-full'>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 rounded-full'
            >
              <Zap className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 rounded-full'
            >
              <Bookmark className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 rounded-full'
            >
              <SmilePlus className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex items-center gap-1 relative'>
            <Button
              variant='ghost'
              onClick={handleSend}
              className='w-max flex items-center justify-center text-black text-xs outline-none border-none mr-2'
            >
              Send
            </Button>
            <ChevronDown className='w-4 h-4 text-black absolute right-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextareaComponent;
