import { useState, useEffect, useCallback, useRef } from "react";
import { validators } from "../validators";
export type ValueResolver<T> = T | ((prevPayload: T) => T);

/**
 * 로컬 스토리지와 동기화된 상태를 관리하는 훅
 * @param key - 로컬 스토리지 키
 * @param initialValue - 초기 값
 *
 * @returns [storedValue, setValue] - 저장된 값과 설정 함수
 *
 * @description
 * 브라우저의 로컬 스토리지 API를 간편하게 사용합니다.
 * 다른 타입의 값 저장 시 에러를 발생시켜 안전하게 차단합니다.
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const isClient = typeof window !== "undefined"; // 브라우저 확인
  const storageManager = useRef(createLocalStorageManager<T>(key, isClient));

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue; // 서버에서는 초기값 반환

    const item = storageManager.current.getItem();
    if (!item || !validators.isSameType(item, initialValue)) {
      storageManager.current.setItem(initialValue, initialValue);
      return initialValue;
    }

    return item;
  });

  const setValue = useCallback(
    (value: ValueResolver<T>) => {
      setStoredValue((prevValue) => {
        return storageManager.current.setItem(value, prevValue);
      });
    },
    [isClient] // 브라우저에서만 실행
  );

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    },
    [key]
  );

  useEffect(() => {
    if (!isClient) return; // 서버에서는 이벤트 리스너 추가하지 않음

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange, isClient]);

  return [storedValue, setValue] as const;
};

const createLocalStorageManager = <T>(key: string, isClient: boolean) => {
  const storage = isClient ? window.localStorage : null; // 클라이언트에서만 localStorage 사용

  const manager = {
    setItem(currentValue: ValueResolver<T>, prevValue: T): T {
      if (!storage) return prevValue;

      try {
        const newValue = validators.resolveValue(currentValue, prevValue);
        validators.validateTypeConsistency(newValue, prevValue);
        storage.setItem(key, JSON.stringify(newValue));

        return newValue;
      } catch (error) {
        console.warn("Failed to set item in localStorage", error);
        return prevValue;
      }
    },
    getItem(): T | null {
      if (!storage) return null;

      try {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.warn("Failed to get item from localStorage", error);
        return null;
      }
    },
  };

  return manager;
};

class LocalStorage {
  private storage: Storage;

  constructor() {
    if (!validators.isClient()) {
      throw new Error(
        "localStorage is not available in this environment. Please ensure you are running this code in a browser."
      );
    }

    this.storage = window.localStorage;
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}

export default useLocalStorage;
