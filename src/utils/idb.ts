import { DBSchema, IDBPDatabase, openDB } from "idb";

let db: Promise<IDBPDatabase<LexiDB>> | null = null;

export type Level = 0 | 1 | 2 | 3 | 4 | 5; // unfamiliar - familiar
type AllowedIndexes = "created_at" | "updated_at" | "level";

interface LexiDB extends DBSchema {
  settings: {
    key: string;
    value: string;
  };
  words: {
    key: string;
    value: {
      value: string;
      level: Level; // unfamiliar - familiar
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
    value: string | string[];
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

export const setBase = async (key: string, value: string | string[]) => {
  if (!db) return;
  return (await db).put("base", value, key);
};

export const getBase = async (key: string) => {
  if (!db) return;
  return (await db).get("base", key);
};

export const getAllWords = async () => {
  try {
    if (!db) return [];

    const words = (await db).getAllKeys("words");
    return words;
  } catch (error) {
    console.error("Error retrieving words:", error);
    return [];
  }
};

export const addNewWords = async (words: string[]) => {
  if (!db) return;
  const ws = await getAllWords();
  words = words.filter((word) => !ws.includes(word));

  const dbWords = (await db).transaction("words", "readwrite");
  const store = dbWords.objectStore("words");
  const now = Date.now();
  for (const word of words) {
    await store.add(
      {
        value: word,
        level: 0,
        created_at: now,
        updated_at: now,
      },
      word
    );
  }
};

export const getAllWordsDetails = async (
  index: AllowedIndexes = "updated_at"
) => {
  try {
    if (!db) return;
    const transaction = (await db).transaction("words", "readonly");
    const store = transaction.objectStore("words");
    const indexObject = store.index(`by-${index}`);
    const words = await indexObject.getAll();
    return words;
  } catch (error) {
    console.error("Error retrieving words:", error);
    return [];
  }
};

export const getWord = async (word: string) => {
  if (!db) return;
  return (await db).get("words", word);
};

export const updateWord = async (word: string, level: Level) => {
  if (!db) return;
  const originalWord = await getWord(word);

  if (!originalWord) return;

  const now = Date.now();
  (await db).put(
    "words",
    {
      ...originalWord,
      level,
      updated_at: now,
    },
    word
  );
};
