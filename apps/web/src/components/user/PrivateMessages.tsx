import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock,
  Search,
  Plus,
  MoreVertical,
  Trash2,
  Archive,
  Star,
  Reply
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
}

interface PrivateMessagesProps {
  currentUserId?: string;
  conversations?: Conversation[];
  messages?: Message[];
  onSendMessage?: (message: Message) => void;
  onSelectConversation?: (conversationId: string) => void;
}

const PrivateMessages = ({ 
  currentUserId = 'user-1',
  conversations = [],
  messages = [],
  onSendMessage,
  onSelectConversation
}: PrivateMessagesProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');

  // Datos de ejemplo si no se proporcionan
  const [conversationsData, setConversationsData] = useState<Conversation[]>(conversations);
  const [messagesData, setMessagesData] = useState<Message[]>(messages);

  useEffect(() => {
    if (conversations.length === 0) {
      const sampleConversations: Conversation[] = [
        {
          id: 'conv-1',
          participantId: 'user-2',
          participantName: 'María García',
          participantAvatar: '',
          lastMessage: {
            id: 'msg-1',
            senderId: 'user-2',
            receiverId: 'user-1',
            senderName: 'María García',
            content: 'Hola! ¿Has probado la nueva funcionalidad de mapas?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
            isRead: false,
            isStarred: false,
            isArchived: false
          },
          unreadCount: 2,
          isOnline: true
        },
        {
          id: 'conv-2',
          participantId: 'user-3',
          participantName: 'Carlos López',
          participantAvatar: '',
          lastMessage: {
            id: 'msg-2',
            senderId: 'user-1',
            receiverId: 'user-3',
            senderName: 'Tú',
            content: 'Gracias por la información sobre supervivencia!',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
            isRead: true,
            isStarred: false,
            isArchived: false
          },
          unreadCount: 0,
          isOnline: false
        },
        {
          id: 'conv-3',
          participantId: 'admin-1',
          participantName: 'Administrador',
          participantAvatar: '',
          lastMessage: {
            id: 'msg-3',
            senderId: 'admin-1',
            receiverId: 'user-1',
            senderName: 'Administrador',
            content: 'Tu cuenta ha sido verificada exitosamente.',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
            isRead: true,
            isStarred: true,
            isArchived: false
          },
          unreadCount: 0,
          isOnline: true
        }
      ];
      setConversationsData(sampleConversations);
    }
  }, [conversations]);

  useEffect(() => {
    if (messages.length === 0 && selectedConversation) {
      const sampleMessages: Message[] = [
        {
          id: 'msg-1',
          senderId: 'user-2',
          receiverId: 'user-1',
          senderName: 'María García',
          content: 'Hola! ¿Has probado la nueva funcionalidad de mapas?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: false,
          isStarred: false,
          isArchived: false
        },
        {
          id: 'msg-2',
          senderId: 'user-1',
          receiverId: 'user-2',
          senderName: 'Tú',
          content: 'Sí, está increíble! Los mapas offline funcionan perfectamente.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          isRead: true,
          isStarred: false,
          isArchived: false
        },
        {
          id: 'msg-3',
          senderId: 'user-2',
          receiverId: 'user-1',
          senderName: 'María García',
          content: 'Me alegra que te guste! ¿Has probado también la función de compartir ubicación?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isRead: false,
          isStarred: false,
          isArchived: false
        }
      ];
      setMessagesData(sampleMessages);
    }
  }, [messages, selectedConversation]);

  const filteredConversations = conversationsData.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'unread':
        return matchesSearch && conv.unreadCount > 0;
      case 'starred':
        return matchesSearch && conv.lastMessage.isStarred;
      case 'archived':
        return matchesSearch && conv.lastMessage.isArchived;
      default:
        return matchesSearch && !conv.lastMessage.isArchived;
    }
  });

  const selectedConv = conversationsData.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      receiverId: selectedConv?.participantId || '',
      senderName: 'Tú',
      content: newMessage,
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      isArchived: false
    };

    setMessagesData(prev => [...prev, message]);
    onSendMessage?.(message);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'Ahora';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="h-[600px] flex border border-border rounded-sm overflow-hidden">
      {/* Lista de conversaciones */}
      <div className="w-1/3 border-r border-border bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-terminal text-primary">
              Mensajes
            </h2>
            <Button size="sm" className="font-terminal">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversaciones..."
              className="pl-10 font-terminal"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {[
            { id: 'all', label: 'Todos', count: conversationsData.filter(c => !c.lastMessage.isArchived).length },
            { id: 'unread', label: 'No leídos', count: conversationsData.filter(c => c.unreadCount > 0).length },
            { id: 'starred', label: 'Destacados', count: conversationsData.filter(c => c.lastMessage.isStarred).length },
            { id: 'archived', label: 'Archivados', count: conversationsData.filter(c => c.lastMessage.isArchived).length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 p-2 text-xs font-terminal border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Lista de conversaciones */}
        <div className="overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation.id);
                onSelectConversation?.(conversation.id);
              }}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.participantAvatar} />
                    <AvatarFallback className="text-xs font-terminal bg-primary/20">
                      {getInitials(conversation.participantName)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium font-terminal text-primary truncate">
                      {conversation.participantName}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground font-terminal">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                      {conversation.lastMessage.isStarred && (
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-terminal truncate">
                    {conversation.lastMessage.content}
                  </p>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge variant="default" className="mt-1 text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header del chat */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedConv?.participantAvatar} />
                    <AvatarFallback className="text-xs font-terminal bg-primary/20">
                      {selectedConv && getInitials(selectedConv.participantName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium font-terminal text-primary">
                      {selectedConv?.participantName}
                    </h3>
                    <p className="text-xs text-muted-foreground font-terminal">
                      {selectedConv?.isOnline ? 'En línea' : 'Desconectado'}
                    </p>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="font-terminal">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesData.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.senderId === currentUserId ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-lg font-terminal ${
                        message.senderId === currentUserId
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`flex items-center mt-1 space-x-1 ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-muted-foreground font-terminal">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.isStarred && (
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 font-terminal resize-none"
                  rows={1}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="font-terminal">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold font-terminal text-primary mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-muted-foreground font-terminal">
                Elige una conversación para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateMessages;
