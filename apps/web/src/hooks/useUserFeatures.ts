import { useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  joinDate: string;
  lastActive: string;
  isVerified: boolean;
  isOnline: boolean;
  preferences: UserPreferences;
  stats: UserStats;
  badges: UserBadge[];
  achievements: UserAchievement[];
  socialLinks: SocialLink[];
  privacy: PrivacySettings;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
  display: DisplaySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  mentions: boolean;
  messages: boolean;
  achievements: boolean;
  community: boolean;
}

export interface DisplaySettings {
  showEmail: boolean;
  showLocation: boolean;
  showJoinDate: boolean;
  showLastActive: boolean;
  showStats: boolean;
}

export interface UserStats {
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
  donationsGiven: number;
  donationsReceived: number;
  badgesEarned: number;
  achievementsUnlocked: number;
  reputation: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'community' | 'donation' | 'achievement' | 'special';
  earnedAt: string;
  isDisplayed: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'social' | 'content' | 'donation' | 'community' | 'special';
  points: number;
  unlockedAt: string;
  isSecret: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'discord' | 'website';
  url: string;
  isPublic: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showOnlineStatus: boolean;
  allowMessages: 'everyone' | 'friends' | 'none';
  showActivity: boolean;
  showDonations: boolean;
}

export interface PrivateMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  subject: string;
  content: string;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'file' | 'link';
  url: string;
  size?: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'post_created' | 'comment_made' | 'donation_given' | 'badge_earned' | 'achievement_unlocked' | 'profile_updated' | 'message_sent';
  title: string;
  description: string;
  metadata?: any;
  timestamp: string;
  isPublic: boolean;
}

export interface UserFollow {
  id: string;
  followerId: string;
  followingId: string;
  followedAt: string;
  isMutual: boolean;
}

export interface UserRelationship {
  userId: string;
  followers: number;
  following: number;
  mutual: number;
  isFollowing: boolean;
  isFollowedBy: boolean;
  isMutual: boolean;
}

export const useUserFeatures = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [follows, setFollows] = useState<UserFollow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock user profiles
    const mockProfiles: UserProfile[] = [
      {
        id: 'user_001',
        username: 'planetazuzu',
        email: 'planetazuzu@gmail.com',
        name: 'Plane Tazuzu',
        bio: 'Desarrollador apasionado por la tecnología retro y la innovación. Creador de Athena Retro Site.',
        avatar: 'https://via.placeholder.com/150/00ff00/000000?text=PT',
        location: 'España',
        website: 'https://github.com/planetazuzu',
        joinDate: '2024-01-15T00:00:00Z',
        lastActive: new Date().toISOString(),
        isVerified: true,
        isOnline: true,
        preferences: {
          theme: 'dark',
          language: 'es',
          notifications: {
            email: true,
            push: true,
            mentions: true,
            messages: true,
            achievements: true,
            community: true
          },
          display: {
            showEmail: false,
            showLocation: true,
            showJoinDate: true,
            showLastActive: true,
            showStats: true
          }
        },
        stats: {
          postsCount: 25,
          commentsCount: 156,
          likesReceived: 342,
          donationsGiven: 1250,
          donationsReceived: 0,
          badgesEarned: 8,
          achievementsUnlocked: 12,
          reputation: 1250,
          level: 15,
          experience: 8750,
          experienceToNextLevel: 1250
        },
        badges: [
          {
            id: 'badge_001',
            name: 'Fundador',
            description: 'Creador de Athena Retro Site',
            icon: '👑',
            color: 'gold',
            rarity: 'legendary',
            category: 'special',
            earnedAt: '2024-01-15T00:00:00Z',
            isDisplayed: true
          },
          {
            id: 'badge_002',
            name: 'Desarrollador Activo',
            description: 'Ha creado más de 20 posts',
            icon: '💻',
            color: 'blue',
            rarity: 'rare',
            category: 'community',
            earnedAt: '2024-02-10T00:00:00Z',
            isDisplayed: true
          }
        ],
        achievements: [
          {
            id: 'achievement_001',
            title: 'Primer Post',
            description: 'Publicaste tu primer post en la comunidad',
            icon: '📝',
            category: 'content',
            points: 10,
            unlockedAt: '2024-01-20T00:00:00Z',
            isSecret: false
          },
          {
            id: 'achievement_002',
            title: 'Donante Generoso',
            description: 'Has donado más de €1000',
            icon: '💰',
            category: 'donation',
            points: 50,
            unlockedAt: '2024-03-15T00:00:00Z',
            isSecret: false
          }
        ],
        socialLinks: [
          {
            platform: 'github',
            url: 'https://github.com/planetazuzu',
            isPublic: true
          }
        ],
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: 'everyone',
          showActivity: true,
          showDonations: true
        }
      },
      {
        id: 'user_002',
        username: 'retrodev',
        email: 'retrodev@example.com',
        name: 'Retro Developer',
        bio: 'Amante de la programación retro y los sistemas vintage.',
        avatar: 'https://via.placeholder.com/150/ff00ff/ffffff?text=RD',
        location: 'México',
        joinDate: '2024-02-01T00:00:00Z',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isVerified: false,
        isOnline: false,
        preferences: {
          theme: 'dark',
          language: 'es',
          notifications: {
            email: true,
            push: false,
            mentions: true,
            messages: true,
            achievements: true,
            community: false
          },
          display: {
            showEmail: false,
            showLocation: true,
            showJoinDate: true,
            showLastActive: false,
            showStats: true
          }
        },
        stats: {
          postsCount: 12,
          commentsCount: 89,
          likesReceived: 156,
          donationsGiven: 450,
          donationsReceived: 0,
          badgesEarned: 4,
          achievementsUnlocked: 7,
          reputation: 650,
          level: 8,
          experience: 3200,
          experienceToNextLevel: 800
        },
        badges: [
          {
            id: 'badge_003',
            name: 'Comentarista Activo',
            description: 'Ha comentado más de 50 veces',
            icon: '💬',
            color: 'green',
            rarity: 'common',
            category: 'community',
            earnedAt: '2024-02-15T00:00:00Z',
            isDisplayed: true
          }
        ],
        achievements: [
          {
            id: 'achievement_003',
            title: 'Primer Comentario',
            description: 'Dejaste tu primer comentario',
            icon: '💭',
            category: 'social',
            points: 5,
            unlockedAt: '2024-02-05T00:00:00Z',
            isSecret: false
          }
        ],
        socialLinks: [],
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: 'friends',
          showActivity: true,
          showDonations: false
        }
      }
    ];

    // Mock private messages
    const mockMessages: PrivateMessage[] = [
      {
        id: 'msg_001',
        senderId: 'user_002',
        senderName: 'Retro Developer',
        senderAvatar: 'https://via.placeholder.com/40/ff00ff/ffffff?text=RD',
        recipientId: 'user_001',
        subject: '¡Excelente trabajo con Athena!',
        content: 'Hola! He estado siguiendo el desarrollo de Athena Retro Site y me parece increíble. ¿Podrías darme algunos consejos sobre cómo implementar el tema retro?',
        isRead: false,
        sentAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        attachments: []
      },
      {
        id: 'msg_002',
        senderId: 'user_001',
        senderName: 'Plane Tazuzu',
        senderAvatar: 'https://via.placeholder.com/40/00ff00/000000?text=PT',
        recipientId: 'user_002',
        subject: 'Re: ¡Excelente trabajo con Athena!',
        content: '¡Gracias! Me alegra que te guste. Para el tema retro, te recomiendo usar colores neón, fuentes monospace y efectos de glow. ¿Te interesa que te comparta algunos recursos?',
        isRead: true,
        sentAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        readAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        attachments: []
      }
    ];

    // Mock user activities
    const mockActivities: UserActivity[] = [
      {
        id: 'activity_001',
        userId: 'user_001',
        type: 'post_created',
        title: 'Nuevo Post Creado',
        description: 'Publicó "Sistema de Donaciones Avanzado - Nueva Funcionalidad"',
        metadata: { postId: 'post_001', postTitle: 'Sistema de Donaciones Avanzado - Nueva Funcionalidad' },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isPublic: true
      },
      {
        id: 'activity_002',
        userId: 'user_001',
        type: 'badge_earned',
        title: 'Badge Desbloqueado',
        description: 'Desbloqueó el badge "Fundador"',
        metadata: { badgeId: 'badge_001', badgeName: 'Fundador' },
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isPublic: true
      },
      {
        id: 'activity_003',
        userId: 'user_002',
        type: 'comment_made',
        title: 'Comentario Realizado',
        description: 'Comentó en "Sistema de Donaciones Avanzado"',
        metadata: { postId: 'post_001', commentId: 'comment_001' },
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        isPublic: true
      }
    ];

    // Mock user follows
    const mockFollows: UserFollow[] = [
      {
        id: 'follow_001',
        followerId: 'user_002',
        followingId: 'user_001',
        followedAt: '2024-02-10T00:00:00Z',
        isMutual: false
      }
    ];

    setProfiles(mockProfiles);
    setMessages(mockMessages);
    setActivities(mockActivities);
    setFollows(mockFollows);
    setIsLoading(false);
  };

  // Obtener perfil de usuario
  const getUserProfile = (userId: string): UserProfile | null => {
    return profiles.find(p => p.id === userId) || null;
  };

  // Actualizar perfil de usuario
  const updateUserProfile = async (
    userId: string, 
    updates: Partial<UserProfile>
  ): Promise<{ success: boolean; profile?: UserProfile; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setProfiles(prev => 
          prev.map(profile => 
            profile.id === userId 
              ? { ...profile, ...updates, lastActive: new Date().toISOString() }
              : profile
          )
        );
        
        const updatedProfile = profiles.find(p => p.id === userId);
        resolve({ success: true, profile: updatedProfile });
      }, 1000);
    });
  };

  // Enviar mensaje privado
  const sendPrivateMessage = async (
    senderId: string,
    recipientId: string,
    subject: string,
    content: string,
    attachments?: MessageAttachment[]
  ): Promise<{ success: boolean; message?: PrivateMessage; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sender = profiles.find(p => p.id === senderId);
        if (!sender) {
          resolve({ success: false, error: 'Usuario remitente no encontrado' });
          return;
        }

        const newMessage: PrivateMessage = {
          id: `msg_${Date.now()}`,
          senderId,
          senderName: sender.name,
          senderAvatar: sender.avatar,
          recipientId,
          subject,
          content,
          isRead: false,
          sentAt: new Date().toISOString(),
          attachments: attachments || []
        };

        setMessages(prev => [...prev, newMessage]);
        resolve({ success: true, message: newMessage });
      }, 1500);
    });
  };

  // Marcar mensaje como leído
  const markMessageAsRead = async (messageId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, isRead: true, readAt: new Date().toISOString() }
              : msg
          )
        );
        resolve({ success: true });
      }, 500);
    });
  };

  // Seguir/Dejar de seguir usuario
  const toggleFollow = async (
    followerId: string,
    followingId: string
  ): Promise<{ success: boolean; isFollowing: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingFollow = follows.find(f => 
          f.followerId === followerId && f.followingId === followingId
        );

        if (existingFollow) {
          // Dejar de seguir
          setFollows(prev => prev.filter(f => f.id !== existingFollow.id));
          resolve({ success: true, isFollowing: false });
        } else {
          // Seguir
          const newFollow: UserFollow = {
            id: `follow_${Date.now()}`,
            followerId,
            followingId,
            followedAt: new Date().toISOString(),
            isMutual: false
          };
          setFollows(prev => [...prev, newFollow]);
          resolve({ success: true, isFollowing: true });
        }
      }, 1000);
    });
  };

  // Obtener relación entre usuarios
  const getUserRelationship = (userId: string, targetUserId: string): UserRelationship => {
    const userFollows = follows.filter(f => f.followerId === userId);
    const userFollowers = follows.filter(f => f.followingId === userId);
    const targetFollows = follows.filter(f => f.followerId === targetUserId);
    const targetFollowers = follows.filter(f => f.followingId === targetUserId);

    const isFollowing = userFollows.some(f => f.followingId === targetUserId);
    const isFollowedBy = targetFollows.some(f => f.followingId === userId);
    const mutual = userFollows.filter(f => 
      targetFollowers.some(tf => tf.followerId === f.followingId)
    ).length;

    return {
      userId: targetUserId,
      followers: targetFollowers.length,
      following: targetFollows.length,
      mutual,
      isFollowing,
      isFollowedBy,
      isMutual: isFollowing && isFollowedBy
    };
  };

  // Obtener mensajes de un usuario
  const getUserMessages = (userId: string): PrivateMessage[] => {
    return messages
      .filter(msg => msg.senderId === userId || msg.recipientId === userId)
      .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  };

  // Obtener conversación entre dos usuarios
  const getConversation = (userId1: string, userId2: string): PrivateMessage[] => {
    return messages
      .filter(msg => 
        (msg.senderId === userId1 && msg.recipientId === userId2) ||
        (msg.senderId === userId2 && msg.recipientId === userId1)
      )
      .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
  };

  // Obtener actividades de un usuario
  const getUserActivities = (userId: string, limit?: number): UserActivity[] => {
    const userActivities = activities
      .filter(activity => activity.userId === userId && activity.isPublic)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return limit ? userActivities.slice(0, limit) : userActivities;
  };

  // Obtener estadísticas de mensajes
  const getMessageStats = (userId: string) => {
    const userMessages = messages.filter(msg => 
      msg.senderId === userId || msg.recipientId === userId
    );
    
    const sentMessages = userMessages.filter(msg => msg.senderId === userId);
    const receivedMessages = userMessages.filter(msg => msg.recipientId === userId);
    const unreadMessages = receivedMessages.filter(msg => !msg.isRead);

    return {
      totalMessages: userMessages.length,
      sentMessages: sentMessages.length,
      receivedMessages: receivedMessages.length,
      unreadMessages: unreadMessages.length
    };
  };

  // Buscar usuarios
  const searchUsers = (query: string): UserProfile[] => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return profiles.filter(profile => 
      profile.username.toLowerCase().includes(lowercaseQuery) ||
      profile.name.toLowerCase().includes(lowercaseQuery) ||
      (profile.bio && profile.bio.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    profiles,
    messages,
    activities,
    follows,
    isLoading,
    getUserProfile,
    updateUserProfile,
    sendPrivateMessage,
    markMessageAsRead,
    toggleFollow,
    getUserRelationship,
    getUserMessages,
    getConversation,
    getUserActivities,
    getMessageStats,
    searchUsers
  };
};
