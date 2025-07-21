import {
  empty,
  set,
  iterateFromFirst,
  size,
} from "@collectable/red-black-tree";
import type { RedBlackTreeStructure } from "@collectable/red-black-tree";

import type { TreeKey, TreeValue } from "../../interface/diaryEntry";

export type DateTree = RedBlackTreeStructure<TreeKey, TreeValue>;

const compareDateKeys = (a: TreeKey, b: TreeKey): number => {
  return b.getTime() - a.getTime();
};

export const createEmptyTree = (): DateTree =>
  empty<TreeKey, TreeValue>(compareDateKeys, true);

let globalTree: DateTree;

export const getTree = () => globalTree;

export const treeLen = (): number => {
  return size(globalTree);
};

export const insertOrUpdate = (date: TreeKey, data: TreeValue): DateTree => {
  date.setHours(0, 0, 0, 0); // ensure the data can never be duplicate
  globalTree = set(date, data, globalTree);
  saveTree();
  return globalTree;
};

export const forEachInOrder = (
  tree: DateTree,
  callback: (key: TreeKey, value: TreeValue) => void,
): void => {
  const iter = iterateFromFirst(tree);
  let entry = iter.next();
  while (!entry.done) {
    const { key, value } = entry.value;
    callback(key, value);
    entry = iter.next();
  }
};

export const getInOrderList = (tree: DateTree): [TreeKey, TreeValue][] => {
  const result: [TreeKey, TreeValue][] = [];
  forEachInOrder(tree, (key, value) => {
    result.push([key, value]);
  });
  return result;
};

const encodeTree = (): string => {
  const entries = getInOrderList(globalTree);
  const json = JSON.stringify(entries);
  const utf8Bytes = new TextEncoder().encode(json);
  let binary = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary);
};

const decodeTree = (encoded: string): DateTree => {
  try {
    const binaryStr = atob(encoded);
    const bytes = Uint8Array.from(binaryStr, (char) => char.charCodeAt(0));
    const raw = JSON.parse(new TextDecoder().decode(bytes)) as [
      string,
      TreeValue,
    ][];
    let tree = createEmptyTree();
    for (const [keyStr, value] of raw) {
      const key = new Date(keyStr);
      tree = set(key, value, tree);
    }
    return tree;
  } catch {
    return createEmptyTree();
  }
};

const STORAGE_KEY = "collectable-red-black-tree";

const saveTree = (): void => {
  const encoded = encodeTree();
  localStorage.setItem(STORAGE_KEY, encoded);
};

const loadTree = (): DateTree => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return createEmptyTree();
  return decodeTree(data);
};

globalTree = loadTree();
