import Upper from './upper';
import ChatHistory from './chatHistory';
import SendMessage from './input.sendMessage';
import LeftSideBar from './bar.leftSideBar';

export default function Chat() {
  return (
    <>
      <Upper />
      <div className="flex flex-row justify-between h-full w-full">
        <div className="flex flex-col w-full h-full">
          <ChatHistory />
          <SendMessage />
        </div>
        <LeftSideBar />
      </div>
    </>
  );
}
