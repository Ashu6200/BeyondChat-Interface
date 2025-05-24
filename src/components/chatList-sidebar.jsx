"use client";

import React from "react";
import { useSelector } from "react-redux";
import { conversations } from "@/assets/mockData";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ChatListSidebar = () => {
  const layout = useSelector((state) => state.layout);
  const { showLeftSidebar } = layout;
  return (
    <aside
      className={`
    fixed inset-y-0 left-0 z-20 bg-background w-[85%] max-w-[300px]
    transform transition-transform duration-300 ease-in-out
    ${showLeftSidebar ? "translate-x-0 " : "-translate-x-full"}
    md:translate-x-0 md:static md:w-[300px] md:border-r md:shadow-none
  `}
    >
      <div className="px-4 py-3 border-b h-[50px] max-h-[50px]">
        <h2 className="text-xl font-semibold">Your inbox</h2>
      </div>
      <div className="flex items-center justify-between gap-2 py-2 pr-2 ml-2">
        <Select defaultValue="open" className="text-white">
          <SelectTrigger
            size="sm"
            className="w-auto !h-max p-[6px] text-xs font-semibold placeholder:text-xs placeholder:font-semibold value:text-sm value:font-semibold"
          >
            <SelectValue
              placeholder="open"
              className={
                "text-sm font-semibold placeholder:text-xs placeholder:font-semibold value:text-sm value:font-semibold"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open" className={"text-xs font-semibold"}>
              5 open
            </SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="waiting" className="text-white">
          <SelectTrigger
            size="sm"
            className="w-auto   !h-max p-[6px] text-xs font-semibold placeholder:text-xs placeholder:font-semibold value:text-sm value:font-semibold"
          >
            <SelectValue
              placeholder="waiting"
              className={
                "text-sm font-semibold placeholder:text-xs placeholder:font-semibold value:text-sm value:font-semibold"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="waiting" className={"text-xs font-semibold"}>
              Waiting longest
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-y-auto h-[calc(100%-70px)] ml-2">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className={`p-3 cursor-pointer rounded-sm transition-all duration-300 ease-in-out 
  hover:bg-blue-100  ${index === 1 ? "bg-gray-50" : ""}`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <div
                  className={`h-full w-full rounded-full flex items-center justify-center text-white ${conversation.avatarBg}`}
                >
                  {conversation.initial}
                </div>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {conversation.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {conversation.source}
                    </span>
                  </div>
                  {conversation.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 h-5 text-[10px]"
                    >
                      {conversation.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs truncate font-medium">{conversation.preview}</p>
                  <div className="text-xs text-gray-500">
                    {conversation.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatListSidebar;
