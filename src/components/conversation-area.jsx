'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Menu, MessageSquare, MoreHorizontal, Reply, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLeftSidebar,
  hideRightPanel,
  showLeftSidebar,
  showRightPanel,
} from '@/context/features/layoutSlice';
import { Avatar } from './ui/avatar';
import TextareaComponent from './text-area';
const ConversationArea = () => {
  const dispatch = useDispatch();
  const conversationMessage = useSelector(
    (state) => state.conversation.customerConversations
  );

  const handleToggleSidebar = () => {
    dispatch(showLeftSidebar());
    dispatch(hideRightPanel());
  };
  const handleTogglePanel = () => {
    dispatch(showRightPanel());
    dispatch(hideLeftSidebar());
  };
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [conversationMessage, conversationMessage.length]);
  const textRefs = useRef(new Map());
  const [askAiCopilot, setAskAiCopilot] = useState(false);
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const selectedText = selection.toString();
      setAskAiCopilot(true);
      console.log('Selected text:', selectedText);
    }
  };

  return (
    <section className='flex flex-col h-lvh flex-1 w-lvw'>
      <div className='px-4 py-3 border-b w-full flex items-center justify-between h-[50px] max-h-[50px]'>
        <div className='flex items-center'>
          <Button
            variant='ghost'
            size='icon'
            className='mr-2 block md:hidden'
            onClick={handleToggleSidebar}
          >
            <Menu className='h-4 w-4' />
          </Button>
          <h2 className='text-xl font-semibold'>Luis Sin</h2>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            size='xs'
            className={
              'bg-gray-200 text-black hover:bg-gray-200  !h-max p-[6px]'
            }
          >
            <MoreHorizontal className='h-5 w-5' />
          </Button>
          <Button
            className={
              'bg-black hover:bg-black hover:text-white cursor-pointer  text-white  !h-max p-[6px]'
            }
            size='xs'
          >
            <X className='h-4 w-4 mr-1' />
            Close
          </Button>
          <Button
            size='xs'
            className={
              'block lg:hidden bg-gray-200 text-black hover:bg-gray-200  !h-max p-[6px]'
            }
            onClick={handleTogglePanel}
          >
            <MessageSquare className='h-5 w-5' />
          </Button>
        </div>
      </div>
      <div
        className='flex flex-col h-full overflow-y-auto scrollbar-zero '
        ref={scrollRef}
      >
        <div className='flex-1 m-4 flex flex-col gap-3 '>
          {conversationMessage.map((conversation, index) => (
            <div
              key={index}
              className={`flex ${
                conversation.sender === 'agent' ? 'justify-end' : ''
              }`}
            >
              <div className='max-w-[80%] flex items-end gap-2'>
                {conversation.sender === 'customer' && (
                  <Avatar className='h-8 w-8 flex-shrink-0'>
                    <div className='h-full w-full rounded-full flex items-center justify-center text-white bg-purple-500'>
                      {conversation.sender === 'customer' ? 'C' : 'A'}
                    </div>
                  </Avatar>
                )}

                <div
                  className={`rounded-lg p-3 ${
                    conversation.sender === 'agent'
                      ? 'bg-blue-100 items-end'
                      : 'bg-gray-100'
                  } flex flex-col items-start`}
                >
                  {conversation.message.content.map((block, i) => {
                    const renderText = (node) => {
                      let content = node.text;
                      if (node.marks) {
                        node.marks.forEach((mark) => {
                          if (mark.type === 'bold') {
                            content = (
                              <>
                                <strong>{content}</strong>
                              </>
                            );
                          } else if (mark.type === 'italic') {
                            content = <em>{content}</em>;
                          } else if (mark.type === 'underline') {
                            content = <u>{content}</u>;
                          }
                        });
                      }

                      return <span key={index}>{content}</span>;
                    };

                    const renderContent = (node) => {
                      if (node.type === 'text') return renderText(node);
                      if (node.type === 'hardBreak') return <br />;
                      return null;
                    };

                    if (block.type === 'paragraph') {
                      return (
                        <div
                          key={i}
                          className='text-xs text-gray-800 font-medium'
                        >
                          {block.content?.map((node, j) => (
                            <div key={j} className='relative'>
                              {renderContent(node)}
                            </div>
                          ))}
                        </div>
                      );
                    }

                    if (block.type === 'heading') {
                      const Tag = `h${block.attrs.level}`;
                      return (
                        <Tag
                          key={i}
                          className='text-sm font-semibold text-gray-800'
                        >
                          {block.content?.map((node, j) => (
                            <div key={j}>{renderContent(node)}</div>
                          ))}
                        </Tag>
                      );
                    }

                    return null;
                  })}

                  {conversation.sender === 'customer' && (
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-xs text-black hover:text-black hover:bg-transparent'
                    >
                      <Reply className='h-4 w-4' />
                      Reply
                    </Button>
                  )}
                </div>

                {conversation.sender === 'agent' && (
                  <Avatar className='h-8 w-8 flex-shrink-0'>
                    <div className='h-full w-full rounded-full flex items-center justify-center text-white bg-purple-500'>
                      {conversation.sender === 'customer' ? 'C' : 'A'}
                    </div>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TextareaComponent />
    </section>
  );
};

export default ConversationArea;
