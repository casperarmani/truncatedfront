import React from 'react';
import { useConversationManager } from '@/hooks/useConversationManager';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date';
import { Pencil, Trash2, MessageSquare } from 'lucide-react';

export function ConversationList() {
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createNewConversation,
    renameConversation,
    deleteConversation
  } = useConversationManager();

  const handleRename = async (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (!conversation) return;

    const newTitle = prompt('Enter new conversation title:', conversation.title);
    if (newTitle) {
      await renameConversation(id, newTitle);
    }
  };

  const handleDelete = async (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (!conversation) return;

    if (confirm(`Are you sure you want to delete "${conversation.title}"?`)) {
      await deleteConversation(id);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <Button 
        onClick={createNewConversation}
        className="w-full"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        New Conversation
      </Button>

      <div className="space-y-2">
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              conv.id === currentConversationId 
                ? 'bg-white/10' 
                : 'hover:bg-white/5'
            }`}
          >
            <div
              className="flex-1 cursor-pointer"
              onClick={() => setCurrentConversationId(conv.id)}
            >
              <div className="font-medium">{conv.title}</div>
              <div className="text-xs text-gray-400">
                {formatDate(conv.created_at)}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRename(conv.id)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(conv.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}