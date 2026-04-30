import { AuthAxios } from '../apiClient';
import { PAGE_ENDPOINTS } from '../apiEndpoints';

export const PageAPI = {
  // Fetch existing pages/files
  listPages: () => AuthAxios.get(PAGE_ENDPOINTS.list).then(res => ({
    ...res,
    data: res.data.map(p => ({ ...p, createdAt: p.created_at }))
  })),

  // Upload a new PDF
  uploadPage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return AuthAxios.post(PAGE_ENDPOINTS.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deletePage: (pageId) => AuthAxios.delete(PAGE_ENDPOINTS.delete(pageId)),
};
