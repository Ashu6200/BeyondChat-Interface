"use client";
import AiPanel from "@/components/ai-panel";
import ChatListSidebar from "@/components/chatList-sidebar";
import ConversationArea from "@/components/conversation-area";
import { closeAllPanels } from "@/context/features/layoutSlice";

import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const showLeftSidebar = useSelector((state) => state.layout.showLeftSidebar);
  const showRightPanel = useSelector((state) => state.layout.showRightPanel);

  const handleBackdrop = () => {
    dispatch(closeAllPanels());
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden">
      {(showLeftSidebar || showRightPanel) && (
        <div
          className="fixed inset-0 bg-black/20 z-5 md:hidden"
          onClick={handleBackdrop}
        />
      )}
      <ChatListSidebar />
      <ConversationArea />
      <AiPanel/>
    </main>
  );
};

export default Home;
