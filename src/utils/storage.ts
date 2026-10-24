/**
 * Gestión del historial local y privacidad
 * El almacenamiento es 100% local en el navegador del usuario (localStorage).
 * Ningún dato se envía a servidores externos.
 */

import { APP_CONFIG } from '../constants/config';
import { HistoryItem } from '../types';

export interface StoragePreferences {
  historyEnabled: boolean;
}

const DEFAULT_PREFS: StoragePreferences = {
  historyEnabled: false, // Por privacidad, desactivado de forma predeterminada
};

/**
 * Comprueba de manera segura si localStorage está disponible
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test_storage__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtiene las preferencias del usuario
 */
export function getStoragePreferences(): StoragePreferences {
  if (!isLocalStorageAvailable()) return DEFAULT_PREFS;
  try {
    const stored = window.localStorage.getItem(APP_CONFIG.storageKeyPreferences);
    if (!stored) return DEFAULT_PREFS;
    return JSON.parse(stored);
  } catch {
    return DEFAULT_PREFS;
  }
}

/**
 * Guarda las preferencias del usuario
 */
export function setStoragePreferences(prefs: StoragePreferences): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(APP_CONFIG.storageKeyPreferences, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error guardando preferencias:', e);
  }
}

/**
 * Obtiene los elementos del historial
 */
export function getHistory(): HistoryItem[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const stored = window.localStorage.getItem(APP_CONFIG.storageKeyHistory);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * Guarda un elemento en el historial si el usuario lo tiene habilitado
 */
export function saveToHistory(item: HistoryItem): boolean {
  if (!isLocalStorageAvailable()) return false;
  const prefs = getStoragePreferences();
  if (!prefs.historyEnabled) return false;

  try {
    const list = getHistory();
    // Limitar el historial a un máximo de 20 elementos para no sobrecargar el almacenamiento
    const updated = [item, ...list.filter(i => i.id !== item.id)].slice(0, 20);
    window.localStorage.setItem(APP_CONFIG.storageKeyHistory, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Error al guardar en el historial local:', e);
    return false;
  }
}

/**
 * Elimina un elemento individual del historial
 */
export function deleteHistoryItem(id: string): HistoryItem[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const list = getHistory();
    const updated = list.filter(i => i.id !== id);
    window.localStorage.setItem(APP_CONFIG.storageKeyHistory, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

/**
 * Borra todo el historial local
 */
export function clearAllHistory(): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(APP_CONFIG.storageKeyHistory);
  } catch (e) {
    console.error('Error al limpiar el historial:', e);
  }
}
