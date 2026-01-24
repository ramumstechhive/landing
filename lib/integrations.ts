export interface AppNotification {
    _id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const notificationService = {
    getNotifications: async (): Promise<AppNotification[]> => {
        // Mock implementation
        return [];
    },
    markAsRead: async (id: string): Promise<void> => {
        console.log('Mark read', id);
    },
    markAllAsRead: async (): Promise<void> => {
        console.log('Mark all read');
    }
};
