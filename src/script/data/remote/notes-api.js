const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getAllNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();

    if (!response.ok || responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Failed to fetch notes');
    }

    return responseJson.data;
  }

  static async createNote({ title, body }) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    const responseJson = await response.json();

    if (!response.ok || responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Failed to create note');
    }

    return responseJson.data;
  }

  static async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();

    if (!response.ok || responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Failed to delete note');
    }
  }

  static async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    if (!response.ok || responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Failed to archive note');
    }
  }

  static async unarchiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    const responseJson = await response.json();

    if (!response.ok || responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Failed to unarchive note');
    }
  }

  static async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (!response.ok || responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Failed to fetch archived notes');
    }

    return responseJson.data;
  }
}

export default NotesApi;
