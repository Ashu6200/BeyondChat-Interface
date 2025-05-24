'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import {
  ArrowDown,
  ArrowUp,
  Clock,
  CornerDownLeft,
  Edit3,
  FileText,
  ImageIcon,
  MessageSquare,
  MessageSquareText,
  Paperclip,
  Ticket,
} from 'lucide-react';
import { Input } from './ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDialogBox } from '@/context/features/layoutSlice';

const actions = [
  {
    id: 'write-note',
    icon: <Edit3 className='w-4 h-4' />,
    label: 'Write a note',
    shortcut: ['N'],
  },
  {
    id: 'use-macro',
    icon: <FileText className='w-4 h-4' />,
    label: 'Use macro',
    shortcut: ['M'],
  },
  {
    id: 'summarize',
    icon: <MessageSquare className='w-4 h-4' />,
    label: 'Summarize conversation',
    shortcut: ['S'],
  },
  {
    id: 'create-ticket',
    icon: <Ticket className='w-4 h-4' />,
    label: 'Create a back-office ticket',
    shortcut: ['⌘', '⇧', 'T'],
  },
  {
    id: 'snooze',
    icon: <Clock className='w-4 h-4' />,
    label: 'Snooze',
    shortcut: ['Z'],
  },
  {
    id: 'upload',
    icon: <Paperclip className='w-4 h-4' />,
    label: 'Upload attachment',
    shortcut: ['⌘', '⇧', 'A'],
  },
  {
    id: 'insert-gif',
    icon: <ImageIcon className='w-4 h-4' />,
    label: 'Insert gif',
    shortcut: ['⌘', '⇧', 'G'],
  },
];
const DialogModal = () => {
  const layout = useSelector((state) => state.layout);
  const { showDialogBox } = layout;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const dialogHandler = () => {
    dispatch(toggleDialogBox());
  };
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredActions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (filteredActions[selectedIndex]) {
        dialogHandler();
      }
    }
  };

  return (
    <Dialog open={showDialogBox} onOpenChange={dialogHandler}>
      <DialogTrigger asChild>
        <Button
          variant={'icon'}
          size={'lg'}
          className={`bg-blue-600 h-12 w-12 rounded-full text-white hover:bg-blue-600 cursor-pointer`}
        >
          <MessageSquareText className='w' size='50px' strokeWidth='2.25px' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px] p-5' onKeyDown={handleKeyDown}>
        <VisuallyHidden>
          <DialogTitle>Quick Actions Menu</DialogTitle>
        </VisuallyHidden>
        <div className='border-b border-gray-200'>
          <Input
            placeholder='Search actions'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='border-0 bg-transparent text-base placeholder:text-gray-400 focus-visible:ring-0 px-0'
            autoFocus
          />
        </div>
        <div className='py-2'>
          {filteredActions.map((action, index) => (
            <div
              key={action.id}
              className={`flex items-center justify-between py-3 cursor-pointer transition-colors ${
                index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={dialogHandler}
            >
              <div className='flex items-center gap-3'>
                <div className='text-gray-600'>{action.icon}</div>
                <span className='text-sm font-medium text-gray-900'>
                  {action.label}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                {action.shortcut && (
                  <>
                    {action.shortcut.map((shortcut, index) => (
                      <div
                        className='text-xs bg-gray-100 p-[2px] rounded font-mono'
                        key={index}
                      >
                        {shortcut}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='py-2 border-t border-gray-200 bg-gray-50/50'>
          <div className='flex items-center gap-4 text-xs text-gray-500'>
            <div className='flex items-center gap-1'>
              <ArrowUp className='w-3 h-3' />
              <ArrowDown className='w-3 h-3' />
              <span>to navigate</span>
            </div>
            <div className='flex items-center gap-1'>
              <CornerDownLeft className='w-3 h-3' />
              <span>to select</span>
            </div>
            <div className='flex items-center gap-1'>
              <span className='font-mono'>Esc</span>
              <span>to close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
