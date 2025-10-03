import { useState, useEffect } from 'react';

export interface Reply {
  id: string;
  discussionId: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  isAuthor: boolean;
  parentReplyId?: string; // Para threading de respuestas
  replies?: Reply[]; // Respuestas anidadas
  userVote?: 'like' | 'dislike' | null; // Voto del usuario actual
  isHidden?: boolean; // Para moderación
  isReported?: boolean; // Para reportes
  reportCount?: number; // Contador de reportes
}

export interface DiscussionWithReplies {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  createdAt: string;
  views: number;
  replies: Reply[];
  lastActivity: string;
}

const STORAGE_KEY = 'athena_replies';
const USER_VOTES_KEY = 'athena_user_votes';

export const useReplies = (discussionId: string) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar respuestas existentes
  useEffect(() => {
    loadReplies();
  }, [discussionId]);

  const loadReplies = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allReplies: Reply[] = JSON.parse(stored);
        const discussionReplies = allReplies.filter(reply => reply.discussionId === discussionId);
        
        // Marcar votos del usuario actual
        const repliesWithUserVotes = discussionReplies.map(reply => ({
          ...reply,
          userVote: getUserVote(reply.id)
        }));
        
        setReplies(repliesWithUserVotes);
      }
    } catch (error) {
      console.error('Error loading replies:', error);
    }
  };

  // Obtener voto del usuario para una respuesta específica
  const getUserVote = (replyId: string): 'like' | 'dislike' | null => {
    try {
      const stored = localStorage.getItem(USER_VOTES_KEY);
      if (stored) {
        const userVotes = JSON.parse(stored);
        return userVotes[replyId] || null;
      }
    } catch (error) {
      console.error('Error getting user vote:', error);
    }
    return null;
  };

  // Guardar voto del usuario
  const saveUserVote = (replyId: string, voteType: 'like' | 'dislike' | null) => {
    try {
      const stored = localStorage.getItem(USER_VOTES_KEY);
      const userVotes = stored ? JSON.parse(stored) : {};
      
      if (voteType === null) {
        delete userVotes[replyId];
      } else {
        userVotes[replyId] = voteType;
      }
      
      localStorage.setItem(USER_VOTES_KEY, JSON.stringify(userVotes));
    } catch (error) {
      console.error('Error saving user vote:', error);
    }
  };

  const addReply = async (content: string, parentReplyId?: string): Promise<Reply | null> => {
    setIsLoading(true);
    
    try {
      const newReply: Reply = {
        id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        discussionId,
        content: content.trim(),
        author: 'Usuario_Actual', // En producción sería el usuario autenticado
        authorId: 'user-current',
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        isAuthor: true,
        parentReplyId,
        replies: [],
        userVote: null,
        isHidden: false,
        isReported: false,
        reportCount: 0
      };

      // Cargar respuestas existentes
      const stored = localStorage.getItem(STORAGE_KEY);
      const allReplies: Reply[] = stored ? JSON.parse(stored) : [];
      
      // Agregar nueva respuesta
      allReplies.push(newReply);
      
      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allReplies));
      
      // Actualizar estado local
      setReplies(prev => [...prev, newReply]);
      
      // Actualizar contador de respuestas en la discusión
      updateDiscussionReplyCount();
      
      console.log('✅ Nueva respuesta creada:', newReply);
      return newReply;
      
    } catch (error) {
      console.error('Error creating reply:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDiscussionReplyCount = () => {
    try {
      const storedDiscussions = localStorage.getItem('athena_discussions');
      if (storedDiscussions) {
        const discussions = JSON.parse(storedDiscussions);
        const updatedDiscussions = discussions.map((disc: any) => {
          if (disc.id === discussionId) {
            const discussionReplies = replies.filter(reply => reply.discussionId === discussionId);
            return { ...disc, replies: discussionReplies.length };
          }
          return disc;
        });
        localStorage.setItem('athena_discussions', JSON.stringify(updatedDiscussions));
      }
    } catch (error) {
      console.error('Error updating discussion reply count:', error);
    }
  };

  const voteReply = (replyId: string, voteType: 'like' | 'dislike'): boolean => {
    try {
      const currentVote = getUserVote(replyId);
      let newVote: 'like' | 'dislike' | null = voteType;
      
      // Si ya votó igual, quitar el voto
      if (currentVote === voteType) {
        newVote = null;
      }
      
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.map(reply => {
        if (reply.id === replyId) {
          let updatedReply = { ...reply };
          
          // Quitar voto anterior si existe
          if (currentVote === 'like') {
            updatedReply.likes = Math.max(0, updatedReply.likes - 1);
          } else if (currentVote === 'dislike') {
            updatedReply.dislikes = Math.max(0, updatedReply.dislikes - 1);
          }
          
          // Aplicar nuevo voto
          if (newVote === 'like') {
            updatedReply.likes += 1;
          } else if (newVote === 'dislike') {
            updatedReply.dislikes += 1;
          }
          
          return updatedReply;
        }
        return reply;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Guardar voto del usuario
      saveUserVote(replyId, newVote);
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      return true;
    } catch (error) {
      console.error('Error voting reply:', error);
      return false;
    }
  };

  const deleteReply = (replyId: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.filter(reply => reply.id !== replyId);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Eliminar voto del usuario
      saveUserVote(replyId, null);
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      // Actualizar contador de respuestas
      updateDiscussionReplyCount();
      
      return true;
    } catch (error) {
      console.error('Error deleting reply:', error);
      return false;
    }
  };

  const editReply = (replyId: string, newContent: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.map(reply => {
        if (reply.id === replyId) {
          return { ...reply, content: newContent.trim() };
        }
        return reply;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      return true;
    } catch (error) {
      console.error('Error editing reply:', error);
      return false;
    }
  };

  // SISTEMA DE MODERACIÓN
  const hideReply = (replyId: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.map(reply => {
        if (reply.id === replyId) {
          return { ...reply, isHidden: true };
        }
        return reply;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      return true;
    } catch (error) {
      console.error('Error hiding reply:', error);
      return false;
    }
  };

  const showReply = (replyId: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.map(reply => {
        if (reply.id === replyId) {
          return { ...reply, isHidden: false };
        }
        return reply;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      return true;
    } catch (error) {
      console.error('Error showing reply:', error);
      return false;
    }
  };

  const reportReply = (replyId: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.map(reply => {
        if (reply.id === replyId) {
          return { 
            ...reply, 
            isReported: true, 
            reportCount: (reply.reportCount || 0) + 1 
          };
        }
        return reply;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      return true;
    } catch (error) {
      console.error('Error reporting reply:', error);
      return false;
    }
  };

  const unreportReply = (replyId: string): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const allReplies: Reply[] = JSON.parse(stored);
      const updatedReplies = allReplies.map(reply => {
        if (reply.id === replyId) {
          return { 
            ...reply, 
            isReported: false, 
            reportCount: Math.max(0, (reply.reportCount || 0) - 1) 
          };
        }
        return reply;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReplies));
      
      // Actualizar estado local
      const discussionReplies = updatedReplies.filter(reply => reply.discussionId === discussionId);
      const repliesWithUserVotes = discussionReplies.map(reply => ({
        ...reply,
        userVote: getUserVote(reply.id)
      }));
      setReplies(repliesWithUserVotes);
      
      return true;
    } catch (error) {
      console.error('Error unreporting reply:', error);
      return false;
    }
  };

  // Obtener respuestas organizadas por threading
  const getOrganizedReplies = (): Reply[] => {
    // Filtrar respuestas ocultas (solo mostrar si no están ocultas)
    const visibleReplies = replies.filter(reply => !reply.isHidden);
    const topLevelReplies = visibleReplies.filter(reply => !reply.parentReplyId);
    
    const addNestedReplies = (parentReply: Reply): Reply => {
      const nestedReplies = visibleReplies.filter(reply => reply.parentReplyId === parentReply.id);
      return {
        ...parentReply,
        replies: nestedReplies.map(addNestedReplies)
      };
    };

    return topLevelReplies.map(addNestedReplies);
  };

  // Obtener estadísticas de moderación
  const getModerationStats = () => {
    const hiddenCount = replies.filter(reply => reply.isHidden).length;
    const reportedCount = replies.filter(reply => reply.isReported).length;
    const totalReports = replies.reduce((sum, reply) => sum + (reply.reportCount || 0), 0);
    
    return {
      hiddenCount,
      reportedCount,
      totalReports,
      totalReplies: replies.length
    };
  };

  // SISTEMA DE NOTIFICACIONES Y ACTIVIDAD
  const getActivityStats = () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const todayReplies = replies.filter(reply => 
      new Date(reply.createdAt) > oneDayAgo && !reply.isHidden
    ).length;
    
    const weekReplies = replies.filter(reply => 
      new Date(reply.createdAt) > oneWeekAgo && !reply.isHidden
    ).length;
    
    const hasNewActivity = todayReplies > 0;
    const isVeryActive = weekReplies >= 10;
    
    return {
      todayReplies,
      weekReplies,
      hasNewActivity,
      isVeryActive,
      lastActivity: replies.length > 0 ? 
        Math.max(...replies.map(r => new Date(r.createdAt).getTime())) : 0
    };
  };

  const getUnreadCount = (lastVisitTime?: number): number => {
    if (!lastVisitTime) return 0;
    
    return replies.filter(reply => 
      new Date(reply.createdAt).getTime() > lastVisitTime && !reply.isHidden
    ).length;
  };

  const markAsRead = (lastVisitTime: number): void => {
    try {
      localStorage.setItem(`athena_last_visit_${discussionId}`, lastVisitTime.toString());
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const getLastVisitTime = (): number => {
    try {
      const stored = localStorage.getItem(`athena_last_visit_${discussionId}`);
      return stored ? parseInt(stored) : 0;
    } catch (error) {
      console.error('Error getting last visit time:', error);
      return 0;
    }
  };

  // SISTEMA DE PAGINACIÓN Y BÚSQUEDA
  const getPaginatedReplies = (
    page: number = 1, 
    pageSize: number = 10, 
    searchTerm: string = '',
    sortBy: 'date' | 'votes' | 'relevance' = 'date'
  ) => {
    let filteredReplies = replies.filter(reply => !reply.isHidden);
    
    // Aplicar búsqueda si hay término
    if (searchTerm.trim()) {
      filteredReplies = filteredReplies.filter(reply => 
        reply.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reply.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar ordenamiento
    const sortedReplies = [...filteredReplies].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'votes') {
        const aScore = (a.likes || 0) - (a.dislikes || 0);
        const bScore = (b.likes || 0) - (b.dislikes || 0);
        return bScore - aScore;
      }
      // relevance (para búsqueda)
      if (searchTerm.trim()) {
        const aRelevance = getRelevanceScore(a, searchTerm);
        const bRelevance = getRelevanceScore(b, searchTerm);
        return bRelevance - aRelevance;
      }
      return 0;
    });
    
    // Calcular paginación
    const totalPages = Math.ceil(sortedReplies.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedReplies = sortedReplies.slice(startIndex, endIndex);
    
    return {
      replies: paginatedReplies,
      pagination: {
        currentPage: page,
        totalPages,
        totalReplies: sortedReplies.length,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  };

  const getRelevanceScore = (reply: Reply, searchTerm: string): number => {
    let score = 0;
    const term = searchTerm.toLowerCase();
    
    // Puntuación por coincidencia en contenido
    if (reply.content.toLowerCase().includes(term)) {
      score += 10;
      // Bonus por coincidencia exacta
      if (reply.content.toLowerCase() === term) {
        score += 50;
      }
    }
    
    // Puntuación por coincidencia en autor
    if (reply.author.toLowerCase().includes(term)) {
      score += 5;
    }
    
    // Bonus por respuestas recientes
    const daysOld = (Date.now() - new Date(reply.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld < 1) score += 3;
    else if (daysOld < 7) score += 2;
    else if (daysOld < 30) score += 1;
    
    // Bonus por respuestas populares
    const voteScore = (reply.likes || 0) - (reply.dislikes || 0);
    if (voteScore > 5) score += 2;
    else if (voteScore > 0) score += 1;
    
    return score;
  };

  // Obtener estadísticas de búsqueda
  const getSearchStats = (searchTerm: string) => {
    if (!searchTerm.trim()) return null;
    
    const matchingReplies = replies.filter(reply => 
      !reply.isHidden && (
        reply.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reply.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    const authorMatches = new Set(matchingReplies.map(r => r.author)).size;
    const totalMatches = matchingReplies.length;
    
    return {
      searchTerm,
      totalMatches,
      authorMatches,
      hasResults: totalMatches > 0
    };
  };

  return {
    replies,
    organizedReplies: getOrganizedReplies(),
    isLoading,
    addReply,
    voteReply,
    deleteReply,
    editReply,
    loadReplies,
    // Funciones de moderación
    hideReply,
    showReply,
    reportReply,
    unreportReply,
    getModerationStats,
    // Funciones de notificaciones
    getActivityStats,
    getUnreadCount,
    markAsRead,
    getLastVisitTime,
    // Funciones de paginación y búsqueda
    getPaginatedReplies,
    getSearchStats
  };
};

