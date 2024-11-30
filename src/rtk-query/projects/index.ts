import {
  DELETE_METHOD,
  GET_METHOD,
  PATCH_METHOD,
  POST_METHOD,
} from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import {
  ADD_NOTES_PATH,
  ADD_TASK_PATH,
  CREATE_PROJECT_PATH,
  GET_CLIENTS_PATH,
  GET_CLIENTS_PROJECTS_PATH,
  GET_CLIENTS_TIMELINE_PATH,
  GET_PROJECT_DETAILS_PATH,
  GET_PROJECTS_GRAPH_PATH,
  GET_PROJECTS_PATH,
  MARK_TASK_COMPLETE_PATH,
  TASK_BY_DATE_PATH,
  UPDATE_AND_DELETE_NOTE_PATH,
  UPDATE_AND_DELETE_TASK_PATH,
  UPLOAD_DOCUMENT_PATH,
} from '@/rtk-query/projects/api.constants';
import {
  AddTaskParams,
  ClientOverview,
  GetClientProjectsResponse,
  GetClientResponse,
  GetProjectResponse,
  ProjectDetailResponse,
  ProjectGraphResponse,
  TaskByDateParams,
  TaskByDateResponse,
  UpdateNoteParams,
  UpdateTaskParams,
} from '@/rtk-query/projects/types';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createProject: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: CREATE_PROJECT_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    getProjects: build.query<GetProjectResponse, void>({
      query: () => ({
        url: GET_PROJECTS_PATH,
        method: GET_METHOD,
      }),
    }),
    getProjectDetails: build.query<ProjectDetailResponse, string>({
      query: (projectId) => ({
        url: GET_PROJECT_DETAILS_PATH(projectId),
        method: GET_METHOD,
      }),
    }),
    addNote: build.mutation({
      query: (data) => ({
        url: ADD_NOTES_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    updateNote: build.mutation<unknown, UpdateNoteParams>({
      query: ({ data, noteId }) => ({
        url: UPDATE_AND_DELETE_NOTE_PATH(noteId),
        method: PATCH_METHOD,
        data,
      }),
    }),
    deleteNote: build.mutation<unknown, string>({
      query: (noteId) => ({
        url: UPDATE_AND_DELETE_NOTE_PATH(noteId),
        method: DELETE_METHOD,
      }),
    }),
    addTask: build.mutation<{ id: number }, AddTaskParams>({
      query: (data) => ({
        url: ADD_TASK_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    updateTask: build.mutation<unknown, UpdateTaskParams>({
      query: ({ data, taskId }) => ({
        url: UPDATE_AND_DELETE_TASK_PATH(taskId),
        method: PATCH_METHOD,
        data,
      }),
    }),
    deleteTask: build.mutation<unknown, string>({
      query: (noteId) => ({
        url: UPDATE_AND_DELETE_TASK_PATH(noteId),
        method: DELETE_METHOD,
      }),
    }),
    getClients: build.query<GetClientResponse[], void>({
      query: () => ({
        url: GET_CLIENTS_PATH,
        method: GET_METHOD,
      }),
    }),
    getClientsProject: build.query<GetClientProjectsResponse, string>({
      query: (clientId) => ({
        url: GET_CLIENTS_PROJECTS_PATH(clientId),
        method: GET_METHOD,
      }),
    }),
    uploadDocument: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: UPLOAD_DOCUMENT_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    taskByDate: build.mutation<TaskByDateResponse[], TaskByDateParams>({
      query: (data) => ({
        url: TASK_BY_DATE_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    markTaskComplete: build.mutation<unknown, string>({
      query: (taskId) => ({
        url: MARK_TASK_COMPLETE_PATH(taskId),
        method: PATCH_METHOD,
      }),
    }),
    getClientTimeline: build.query<ClientOverview[], void>({
      query: () => ({
        url: GET_CLIENTS_TIMELINE_PATH,
        method: GET_METHOD,
      }),
    }),
    getProjectsGraph: build.query<ProjectGraphResponse, void>({
      query: () => ({
        url: GET_PROJECTS_GRAPH_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectDetailsQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateProjectMutation,
  useGetClientsQuery,
  useGetClientsProjectQuery,
  useUploadDocumentMutation,
  useAddNoteMutation,
  useTaskByDateMutation,
  useMarkTaskCompleteMutation,
  useGetClientTimelineQuery,
  useGetProjectsGraphQuery,
} = AuthApi;
