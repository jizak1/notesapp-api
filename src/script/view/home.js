import { gsap } from 'gsap';
import Swal from 'sweetalert2';
import Utils from '../utils.js';
import NotesApi from '../data/remote/notes-api.js';

const home = () => {
  const state = {
    activeTab: 'active',
  };

  // DOM Elements
  const elements = {
    notesListContainer: document.querySelector('#notesListContainer'),
    noteForm: document.querySelector('note-form'),
    loading: null,
    error: null,
    notesList: null,
  };

  // Element Validation
  if (!elements.notesListContainer || !elements.noteForm) {
    Swal.fire('Error', 'Aplikasi tidak dapat dimuat', 'error');
    return;
  }

  elements.loading = elements.notesListContainer.querySelector('.loading');
  elements.error = elements.notesListContainer.querySelector('note-error');
  elements.notesList = elements.notesListContainer.querySelector('note-list');

  // Event Handlers
  const handleNoteAdded = async (event) => {
    try {
      toggleLoading(true);
      await NotesApi.createNote(event.detail);
      await loadNotes();
      animateElement('.form-container', { y: -20, opacity: 0 });
    } catch (error) {
      showError(error.message);
    }
  };

  const handleDeleteNote = async (event) => {
    try {
      toggleLoading(true);
      await NotesApi.deleteNote(event.detail.id);
      await loadNotes();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleArchive = async (event) => {
    try {
      toggleLoading(true);
      await NotesApi.archiveNote(event.detail.id);
      await loadNotes();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleUnarchive = async (event) => {
    try {
      toggleLoading(true);
      await NotesApi.unarchiveNote(event.detail.id);
      await loadNotes();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleTabSwitch = (event) => {
    if (event.target.classList.contains('tab')) {
      state.activeTab = event.target.dataset.tab;
      updateTabs();
      loadNotes();
    }
  };

  // Core Logic
  const loadNotes = async () => {
    try {
      toggleLoading(true);
      const notes =
        state.activeTab === 'active'
          ? await NotesApi.getAllNotes()
          : await NotesApi.getArchivedNotes();
      renderNotes(notes);
    } catch (error) {
      showError(error.message);
    } finally {
      toggleLoading(false);
    }
  };

  const renderNotes = (notes) => {
    Utils.emptyElement(elements.notesList);

    if (notes.length === 0) {
      elements.notesList.innerHTML = `
        <div class="empty-state">
          <p>Tidak ada catatan ${state.activeTab === 'active' ? 'aktif' : 'terarsip'}</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    notes.forEach((note, index) => {
      const noteElement = document.createElement('note-item');
      noteElement.note = note;
      fragment.appendChild(noteElement);
      scheduleAnimation(noteElement, index);
    });
    elements.notesList.appendChild(fragment);
  };

  // UI Functions
  const toggleLoading = (isLoading) => {
    if (isLoading) {
      Utils.hideElement(elements.notesList);
      Utils.hideElement(elements.error);
      Utils.showElement(elements.loading);
    } else {
      Utils.hideElement(elements.loading);
      Utils.showElement(elements.notesList);
    }
  };

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: message || 'Terjadi kesalahan tak terduga',
      confirmButtonColor: '#ff4757',
      background: '#2f3542',
      color: '#ffffff',
      allowOutsideClick: false,
    });
  };

  // Animations
  const animateElement = (selector, options) => {
    gsap.from(selector, {
      duration: 0.6,
      ease: 'power3.out',
      ...options,
    });
  };

  const scheduleAnimation = (element, index) => {
    gsap.from(element, {
      delay: index * 0.1,
      duration: 0.8,
      opacity: 0,
      y: 40,
      rotationX: 15,
      ease: 'power4.out',
    });
  };

  // Tab System
  const updateTabs = () => {
    const tabs = elements.notesListContainer.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === state.activeTab;
      tab.classList.toggle('active', isActive);
      tab.style.transform = isActive ? 'scale(1.05)' : 'scale(1)';
      tab.style.backgroundColor = isActive ? '#2ed573' : '#57606f';
    });
  };

  // Initial Setup
  const setupTabs = () => {
    elements.notesListContainer.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="tab-container">
        <button class="tab active" data-tab="active">Aktif</button>
        <button class="tab" data-tab="archived">Arsip</button>
      </div>
    `
    );
  };

  // Initialize App
  const init = () => {
    setupTabs();
    elements.noteForm.addEventListener('note-added', handleNoteAdded);
    elements.notesListContainer.addEventListener(
      'delete-note',
      handleDeleteNote
    );
    elements.notesListContainer.addEventListener('archive-note', handleArchive);
    elements.notesListContainer.addEventListener(
      'unarchive-note',
      handleUnarchive
    );
    elements.notesListContainer.addEventListener('click', handleTabSwitch);
    loadNotes();
  };

  init();
};

export default home;
