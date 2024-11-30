export const CREATE_PROJECT_PATH = '/u/projects';

export const GET_CLIENTS_PATH = '/u/projects/clients';

export const GET_CLIENTS_PROJECTS_PATH = (clientId: string) => {
  return `/u/projects/clients/${clientId}`;
};

export const GET_PROJECTS_PATH = '/u/projects';

export const GET_PROJECT_DETAILS_PATH = (projectId: string) => {
  return `/u/projects/${projectId}`;
};

// *NOTES
export const ADD_NOTES_PATH = '/u/projects/notes';

export const UPDATE_AND_DELETE_NOTE_PATH = (noteId: string) => {
  return `/u/projects/notes/${noteId}`;
};

//*TASKS
export const ADD_TASK_PATH = '/u/projects/tasks';

export const UPDATE_AND_DELETE_TASK_PATH = (taskId: string) => {
  return `/u/projects/tasks/${taskId}`;
};

export const UPLOAD_DOCUMENT_PATH = '/u/projects/documents';

export const TASK_BY_DATE_PATH = '/u/projects/tasks/get-by-date';

export const MARK_TASK_COMPLETE_PATH = (taskId: string) => {
  return `/u/projects/tasks/${taskId}/mark-as-complete`;
};

export const GET_CLIENTS_TIMELINE_PATH =
  '/u/projects/clients/timeline' as const;

export const GET_PROJECTS_GRAPH_PATH = '/u/projects/graph' as const;
