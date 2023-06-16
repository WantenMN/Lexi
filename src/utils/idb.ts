import { DBSchema, openDB } from "idb";

let db: any = null;

interface LexiDB extends DBSchema {
  settings: {
    key: string;
    value: string;
  };
  words: {
    key: string;
    value: {
      level: 0 | 1 | 2 | 3 | 4 | 5; // unfamiliar - familiar
      created_at: number;
      updated_at: number;
    };
    indexes: {
      "by-created_at": number;
      "by-updated_at": number;
      "by-level": number;
    };
  };
  base: {
    key: string;
    value: any;
  };
}

if (typeof window !== "undefined" && typeof window.indexedDB !== "undefined") {
  db = openDB<LexiDB>("LexiDB", 1, {
    upgrade(db) {
      db.createObjectStore("settings");
      db.createObjectStore("base");
      const wordStore = db.createObjectStore("words");
      wordStore.createIndex("by-created_at", "created_at");
      wordStore.createIndex("by-updated_at", "updated_at");
      wordStore.createIndex("by-level", "level");
    },
  });
}

export const setSettings = async (key: string, value: string) => {
  if (!db) return;
  return (await db).put("settings", value, key);
};

export const getSettings = async (key: string) => {
  if (!db) return;
  return (await db).get("settings", key);
};

export const setBase = async (key: string, value: any) => {
  if (!db) return;
  return (await db).put("base", value, key);
};

export const getBase = async (key: string) => {
  if (!db) return;
  return (await db).get("base", key);
};
