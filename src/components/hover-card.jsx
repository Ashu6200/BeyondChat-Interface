'use client';
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Button } from './ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAiSendMessageValue } from '@/context/features/valueSlice';

const HoverCardComponent = ({ item, children }) => {
  const dispatch = useDispatch();
  const deepClone = (obj) =>
    typeof structuredClone === 'function'
      ? structuredClone(obj)
      : JSON.parse(JSON.stringify(obj));

  const handleComposer = () => {
    const text = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: item,
            },
          ],
        },
      ],
    };
    dispatch(setAiSendMessageValue(deepClone(text)));
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex flex-col justify-between space-x-1'>
          <div>
            <h2 className='text-sm font-bold text-gray-800 mb-1'>
              Getting a refund
            </h2>
            <p className='text-gray-500 text-xs mb-4'>
              Public article • Amy Adams • 1d ago
            </p>
          </div>

          <p className='text-xs border-l-3 pl-4 text-black font-normal'>
            {item}
          </p>
          <Button
            variant='outline'
            onClick={handleComposer}
            className='w-full flex items-center text-xs justify-center gap-2 text-black mt-4'
          >
            <SquareArrowOutUpRight />
            Add to composer
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
