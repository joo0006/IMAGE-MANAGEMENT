import axios from 'axios';

const API_URL = 'http://localhost:3001/images';

export const uploadImage = async (imageData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload image error:', error);
    throw error;
  }
};

export const getAllImages = async (page, pageSize) => {
  try {
    const response = await axios.get(`${API_URL}/all?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Get all images error:', error);
    throw error;
  }
};

export const labelImage = async (imageId, labelIds) => {
  try {
    const response = await axios.post(`${API_URL}/label`, {
      imageId,
      labelIds,
    });
    return response.data;
  } catch (error) {
    console.error('Label image error:', error);
    throw error;
  }
};

export const deleteImage = async (imageId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Delete image error:', error);
    throw error;
  }
};

