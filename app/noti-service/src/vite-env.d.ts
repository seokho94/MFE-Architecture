/// <reference types="vite/client" />

declare module 'hostService/Store' {
  export const useIncrementStore: () => {
    count: number;
    increment: () => void;
  };
}
