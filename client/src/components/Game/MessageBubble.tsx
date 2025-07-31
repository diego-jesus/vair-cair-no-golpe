import { GameMessage } from "../../data/messages";

interface MessageBubbleProps {
  message: GameMessage;
  gameMode: string;
}

const MessageBubble = ({ message, gameMode }: MessageBubbleProps) => {
  // Different styles based on game mode
  const getBubbleStyle = () => {
    switch (gameMode) {
      case 'tiozao':
        return 'bg-green-100 border-2 border-green-300';
      case 'empresa':
        return 'bg-blue-50 border-2 border-blue-200';
      case 'aprendiz':
        return 'bg-yellow-50 border-2 border-yellow-200';
      default:
        return 'bg-white border-2 border-gray-200';
    }
  };

  const getHeaderStyle = () => {
    switch (message.tipo) {
      case 'whatsapp':
        return 'bg-green-600 text-white';
      case 'email':
        return 'bg-blue-600 text-white';
      case 'sms':
        return 'bg-purple-600 text-white';
      case 'site':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getIcon = () => {
    switch (message.tipo) {
      case 'whatsapp':
        return '📱';
      case 'email':
        return '📧';
      case 'sms':
        return '💬';
      case 'site':
        return '🌐';
      default:
        return '📄';
    }
  };

  return (
    <div className={`max-w-lg mx-auto rounded-lg shadow-lg ${getBubbleStyle()}`}>
      {/* Header */}
      <div className={`px-4 py-3 rounded-t-lg ${getHeaderStyle()}`}>
        <div className="flex items-center">
          <span className="text-lg mr-2">{getIcon()}</span>
          <div>
            <p className="font-semibold capitalize">{message.tipo}</p>
            {message.remetente && (
              <p className="text-sm opacity-90">{message.remetente}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {message.assunto && (
          <div className="mb-3">
            <p className="font-semibold text-gray-800">{message.assunto}</p>
          </div>
        )}
        
        <div className="text-gray-700 leading-relaxed">
          {message.texto.split('\n').map((linha, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
              {linha}
            </p>
          ))}
        </div>

        {/* Link or Button if present */}
        {message.link && (
          <div className="mt-4 p-3 bg-gray-100 rounded border-l-4 border-blue-500">
            <p className="text-sm text-blue-600 break-all">{message.link}</p>
          </div>
        )}

        {/* Urgency indicator */}
        {message.urgencia && (
          <div className="mt-3 flex items-center text-red-600">
            <span className="text-sm font-semibold">⚠️ URGENTE</span>
          </div>
        )}
      </div>

      {/* Footer with metadata */}
      <div className="px-4 py-2 bg-gray-50 rounded-b-lg border-t">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Recebido hoje</span>
          <span className="capitalize">{message.categoria}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
