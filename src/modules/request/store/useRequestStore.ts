import { create } from "zustand";
import { nanoid } from "nanoid";

interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  body?: string;
  headers?: string;
  parameters?: string;
}

type HeadersMap = Record<string, string>;
interface RequestRun {
  id: string;
  requestId?: string;
  status?: number;
  statusText?: string;
  headers?: HeadersMap;
  body?: string | object | null;
  durationMs?: number;
  createdAt?: Date;
}

interface Result {
  status?: number;
  statusText?: string;
  duration?: number;
  size?: number;
  data ?: any;
}

export interface ResponseData {
  success: boolean;
  requestRun: RequestRun;
  result: Result;
}

export type RequestTab = {
  id: string;
  title: string;
  method: string;
  url: string;
  body?: string;
  headers?: string;
  parameters?: string;
  unsavedChanges?: boolean;
  requestId?: string;
  collectionId?: string;
  workspaceId?: string;
  responseViewerData: ResponseData | null;
  setResponseViewerData: (data: ResponseData) => void;
};

type PlaygroundState = {
  tabs: RequestTab[];
  activeTabId: string | null;
  addTab: () => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
  markUnsaved: (id: string, value: boolean) => void;
  openRequestTab: (req: any) => void; // 👈 new
  updateTabFromSavedRequest: (
    tabId: string,
    savedRequest: SavedRequest
  ) => void;
    responseViewerData: ResponseData | null;
    setResponseViewerData: (data: ResponseData) => void;
};



export const useRequestPlaygroundStore = create<PlaygroundState>((set) => ({
  responseViewerData : null,
  setResponseViewerData: (data) => set({ responseViewerData: data }),
  
  tabs: [],
  activeTabId: null,

  addTab: () =>
    set((state) => {
      const newTab: RequestTab = {
        id: nanoid(),
        title: "Untitled",
        method: "GET",
        url: "",
        body: "",
        headers: "",
        parameters: "",
        unsavedChanges: true,
      };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),
  // close tab

  closeTab: (id) =>
    set((state) => {
      const newTabs = state.tabs.filter((t) => t.id !== id);
      const newActive =
        state.activeTabId === id && newTabs.length > 0
          ? newTabs[0].id
          : state.activeTabId;
      return { tabs: newTabs, activeTabId: newActive };
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  updateTab: (id, data) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, ...data, unsavedChanges: true } : t
      ),
    })),

  markUnsaved: (id, value) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, unsavedChanges: value } : t
      ),
    })),

  openRequestTab: (req) =>
    set((state) => {
      // 🔎 check if already open
      const existing = state.tabs.find((t) => t.requestId === req.id);
      if (existing) {
        return { activeTabId: existing.id };
      }

      const newTab: RequestTab = {
        id: nanoid(),
        title: req.name || "Untitled",
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
        parameters: req.parameters,
        requestId: req.id,
        collectionId: req.collectionId,
        workspaceId: req.workspaceId,
        unsavedChanges: false,
      };

      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

  updateTabFromSavedRequest: (tabId: string, savedRequest: SavedRequest) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === tabId
          ? {
              ...t,
              id: savedRequest.id, // to do :   Replace temporary id with saved one
              title: savedRequest.name,
              method: savedRequest.method,
              body: savedRequest?.body,
              headers: savedRequest?.headers,
              parameters: savedRequest?.parameters,
              url: savedRequest.url,
              unsavedChanges: false,
            }
          : t
      ),
      activeTabId: savedRequest.id,
    })),
}));
