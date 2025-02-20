import { useMemo } from 'react';
import { TMessage } from '../types.ts';

interface MessageProps {
  message: TMessage;
}

const Message = ({ message }: MessageProps) => {
  const classes = useMemo(() => {
    const base = 'w-56 rounded-xl p-2 ';
    if (message.isMyMessage) {
      return base + 'bg-purple-400 self-end';
    }

    return base + 'bg-blue-400';
  }, [message.isMyMessage]);

  return (
    <div
      className={classes}
      data-testid="message"
    >
      <h5 className="mb-1 border-b border-b-black pb-1 text-xs font-semibold">{message.author.fullname}</h5>

      <p className="text-sm">{message.text}</p>
    </div>
  );
};

export default Message;
