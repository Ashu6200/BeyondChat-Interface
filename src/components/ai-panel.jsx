'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import {
  BookOpenText,
  Brain,
  ChevronDown,
  LayoutGrid,
  MessageSquareText,
  MoveUp,
  PanelLeft,
  Plus,
  Users,
} from 'lucide-react';
import { hideRightPanel, showRightPanel } from '@/context/features/layoutSlice';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import HoverCardComponent from './hover-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { detailsContent } from '@/assets/mockData';
import { setSendMessageValue } from '@/context/features/valueSlice';
import DialogModal from './dialog-modal';

const AiPanel = () => {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);
  const { showRightPanel: panel } = layout;
  const aiMockConversations = useSelector(
    (state) => state.conversation.aiConversations
  );

  const handlerPanel = () => {
    if (panel) dispatch(hideRightPanel());
    else dispatch(showRightPanel());
  };
  const [active, setActive] = useState('Copilot');
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [aiMockConversations, active]);
  const deepClone = (obj) =>
    typeof structuredClone === 'function'
      ? structuredClone(obj)
      : JSON.parse(JSON.stringify(obj));

  const handleComposer = (chat) => {
    dispatch(setSendMessageValue(deepClone(chat)));
  };
  return (
    <aside
      className={`
    fixed inset-y-0 right-0 z-20 bg-background  md:w-[450px] w-[85%] max-[480px]:max-w-[300px] 
    transform transition-transform duration-300 ease-in-out
    ${panel ? 'translate-x-0 ' : 'translate-x-full'}
    lg:translate-x-0 lg:static md:w-[300px] md:border-l md:shadow-none
  `}
    >
      <Tabs
        // defaultValue={active}
        className='w-full h-full relative'
        value={active}
        onValueChange={(value) => setActive(value)}
      >
        <div className={'blurSpot1'}></div>
        <div className={'blurSpot2'}></div>
        <div className='flex items-center justify-between px-4 pt-2 h-[50px] max-h-[50px] border-b'>
          <TabsList className='grid grid-cols-2 bg-transparent transition-all duration-300 ease-in-out  gap-4'>
            <TabsTrigger
              value='Copilot'
              className={
                'px-0 py-2 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-600 relative data-[state=active]:after:absolute data-[state=active]:after:bottom-[-4px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 rounded-none text-black font-medium text-xs'
              }
            >
              <Brain /> Copilot
            </TabsTrigger>
            <TabsTrigger
              value='Details'
              className={
                'px-0 py-2 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-600 relative data-[state=active]:after:absolute data-[state=active]:after:bottom-[-4px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 rounded-none text-black font-medium text-xs'
              }
            >
              Details
            </TabsTrigger>
          </TabsList>
          <div>
            <Button
              size={'xs'}
              onClick={handlerPanel}
              className={
                'sm:hidden md:block bg-gray-200 text-black hover:bg-gray-200 !h-max p-[6px]'
              }
            >
              <PanelLeft />
            </Button>
          </div>
        </div>
        <TabsContent value='Copilot' className='flex flex-col h-full'>
          <div className='flex flex-col h-full'>
            <div
              ref={scrollRef}
              className='flex-1 overflow-y-auto px-6 pb-24 flex flex-col gap-3 scrollbar-zero '
            >
              {!aiMockConversations && aiMockConversations.length === 0 ? (
                <div className='flex flex-col gap-2 items-center justify-center'>
                  <Avatar className='h-8 w-8 flex-shrink-0 rounded'>
                    <div className='h-full w-full text-xs rounded flex items-center justify-center text-white bg-black'>
                      Fin
                    </div>
                  </Avatar>
                  <h1> Hi, I'm Fin Ai Copilot</h1>
                  <p>Ask me anything about the conversation</p>
                </div>
              ) : (
                <>
                  {aiMockConversations?.map((chat, index) => {
                    const isAgent = chat.sender === 'agent';
                    let messageIndex = 0;
                    const messageBlocks = chat.message.content.map(
                      (block, blockIndex) => {
                        if (block.type === 'paragraph') {
                          messageIndex++;
                          return (
                            <div
                              key={`paragraph-${index}-${blockIndex}`}
                              className=' text-xs text-gray-800 font-medium'
                            >
                              {block.content.map((item, itemIndex) => (
                                <p key={itemIndex}>
                                  {item.text}
                                  {!isAgent && (
                                    <HoverCardComponent item={item.text}>
                                      <span className='inline-flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full text-white text-xs font-medium ml-1 cursor-pointer'>
                                        {messageIndex}
                                      </span>
                                    </HoverCardComponent>
                                  )}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        if (block.type === 'hardBreak') {
                          return <br key={`break-${index}-${blockIndex}`} />;
                        }
                      }
                    );

                    return (
                      <div
                        key={index}
                        className='w-full flex items-start gap-2 mt-4'
                      >
                        <Avatar
                          className={`h-8 w-8 flex-shrink-0 ${
                            isAgent ? 'rounded-full' : 'rounded'
                          } `}
                        >
                          <div
                            className={`h-full w-full text-xs flex items-center justify-center text-white ${
                              isAgent ? 'rounded-full' : 'rounded'
                            }  ${isAgent ? 'bg-purple-500' : 'bg-black'}`}
                          >
                            {!isAgent ? 'Fin' : 'You'}
                          </div>
                        </Avatar>
                        <div className='w-full'>
                          <p className='text-xs text-gray-800 font-semibold mb-2'>
                            {!isAgent ? 'Fin' : 'You'}
                          </p>
                          <div className={`${isAgent ? 'flex flex-col' : ''}`}>
                            <div
                              className={`w-full text-xs whitespace-pre-wrap text-gray-800 font-medium ${
                                !isAgent
                                  ? 'bg-gradient-to-tr from-blue-200 to-pink-200 rounded-lg p-3 w-full'
                                  : ''
                              }`}
                            >
                              {messageBlocks}
                              {!isAgent && (
                                <Button
                                  variant='outline'
                                  className='w-full flex items-center justify-center text-black text-xs relative mt-2'
                                  onClick={() => handleComposer(chat.message)}
                                >
                                  Add to composer
                                  <ChevronDown className='absolute right-2 pl-1' />
                                </Button>
                              )}
                            </div>

                            {!isAgent && chat.resources && (
                              <div className='mt-4'>
                                <p className='text-xs text-gray-600 font-normal mt-3'>
                                  {chat.resources.content.number} relevant
                                  source found
                                </p>

                                <div className='mt-2 ml-1'>
                                  {chat.resources.content.list.map(
                                    (resource, i) => (
                                      <div
                                        key={i}
                                        className='flex items-center gap-2 mb-2 font-medium'
                                      >
                                        {i === 0 ? (
                                          <BookOpenText
                                            size='20px'
                                            color='black'
                                            strokeWidth='2px'
                                            className='text-black bg-blue-200 p-1 rounded-full'
                                          />
                                        ) : (
                                          <MessageSquareText
                                            size='20px'
                                            color='blue'
                                            strokeWidth='2px'
                                            className='text-white bg-blue-200 p-1 rounded-full'
                                          />
                                        )}
                                        <p className='text-xs text-gray-600 font-normal'>
                                          {resource.title}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>

                                <p className='text-xs text-black underline cursor-pointer font-medium'>
                                  See all {'->'}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className='sticky bottom-0 bg-transparent p-2'>
              <div className='flex items-center gap-2 w-full relative bg-background rounded-lg '>
                <Input
                  type='text'
                  placeholder='Search'
                  className='flex-1 border-none focus:ring-0 text-xs font-normal outline-none placeholder:font-normal placeholder:text-xs text-black placeholder:text-black'
                />
                <div className='absolute right-2 flex items-center gap-1'>
                  <MoveUp className='w-4 h-4 text-black cursor-pointer ' />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='Details' className='relative h-full'>
          <div className='flex-1 overflow-y-auto overflow-hidden flex flex-col gap-3 h-full'>
            <div className='p-4'>
              <table className='w-full border-separate border-spacing-y-2'>
                <tbody>
                  <tr>
                    <td>
                      <p className='text-xs font-medium text-gray-500'>
                        Assignee
                      </p>
                    </td>
                    <td>
                      <div className='flex items-center gap-2 text-xs font-medium'>
                        <Avatar className='h-4 w-4'>
                          <AvatarFallback className='bg-purple-500 text-white text-[10px]'>
                            LS
                          </AvatarFallback>
                        </Avatar>
                        Ashutosh
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className='text-xs font-medium text-gray-500'>Team</p>
                    </td>
                    <td>
                      <div className='flex items-center gap-2 text-xs font-medium'>
                        <Avatar className='h-4 w-4'>
                          <AvatarFallback className='bg-purple-500 text-white'>
                            <Users className='h-3 w-3' />
                          </AvatarFallback>
                        </Avatar>
                        Unassigned
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Accordion type='single' collapsible className='w-full border-t'>
              {detailsContent.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className='w-full py-1 px-2'
                >
                  <AccordionTrigger className='hover:no-underline [&>*]:no-underline cursor-pointer p-2 px-4'>
                    <p className='text-sm font-medium'>{item.title}</p>
                  </AccordionTrigger>
                  <AccordionContent className={'px-4'}>
                    {item.subItems && item.subItems.length > 0 && (
                      <>
                        {item.subItems.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className='flex items-center justify-between mb-2'
                          >
                            <div className='flex items-center gap-2'>
                              {subItem.icon}
                              <p className='text-xs font-medium'>
                                {subItem.title}
                              </p>
                            </div>
                            <Button
                              variant={'ghost'}
                              size={'sm'}
                              className={'bg-gray-200 p-2'}
                            >
                              <Plus />
                            </Button>
                          </div>
                        ))}
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className='sticky bottom-1 p-2 bg-transparent'>
            <div className='flex items-center justify-between'>
              <Button
                variant={'ghost'}
                className={
                  'text-black text-xs font-bold outline-none border-none hover:bg-transparent cursor-pointer'
                }
              >
                <LayoutGrid strokeWidth={'2px'} />
                Edit App
              </Button>
              <DialogModal />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default AiPanel;
