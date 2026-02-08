import { Map } from 'immutable';

/**
 * Class-Based Registry Singleton Template
 * 
 * Rules:
 * 1. Singleton instance or static methods.
 * 2. Map-based storage.
 * 3. Support overrides (Last registration wins).
 */
export class Registry<T> {
  private static instance: Registry<any>;
  private items = new Map<string, T>();

  public static getInstance<T>(): Registry<T> {
    if (!Registry.instance) {
      Registry.instance = new Registry<T>();
    }
    return Registry.instance;
  }

  /**
   * Register an item. Overwrites if the ID already exists.
   */
  public register(id: string, item: T) {
    this.items = this.items.set(id, item);
  }

  public get(id: string): T | undefined {
    return this.items.get(id);
  }

  /**
   * For context-aware registries, implement LIFO selection
   */
  public select(predicate: (item: T) => boolean): T | undefined {
    // Reverse the entries to implement LIFO (Last-In-First-Out)
    const reversed = Array.from(this.items.values()).reverse();
    return reversed.find(predicate);
  }
}
