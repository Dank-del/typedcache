/**
 * Represents an item stored in the cache.
 * @template T The type of the value stored in the cache item.
 */
type CacheItem<T> = {
    value: T;
    timeoutId?: NodeJS.Timeout;
};

interface CacheProps {
	timeoutMs?: number;
	debug?: boolean;
}

/**
 * Represents an in-memory cache that stores key-value pairs.
 * Supports adding, retrieving, deleting, and clearing items from the cache.
 * @template K The type of the cache keys.
 * @template V The type of the cache values.
 */
class TypedCache<K, V> {
    private cache: Map<K, CacheItem<V>> = new Map();
	private debug: boolean;
	private timeoutMs?: number;

	constructor(props: CacheProps) {
		this.debug = props.debug || false;
		this.timeoutMs = props.timeoutMs
	}

    /**
     * Sets a key-value pair in the cache.
     * 
     * @param key - The key to set in the cache.
     * @param value - The value to associate with the key.
     * @param timeoutMs - Optional. The time in milliseconds after which the item should be automatically removed from the cache.
     */
    set(key: K, value: V): void {
        const item: CacheItem<V> = { value };

        if (this.timeoutMs) {
            // Set a timeout to automatically remove the item after the specified time
            item.timeoutId = setTimeout(() => {
                if (this.debug) {
					console.debug(`Cache item with key ${key} timed out and was removed from the cache.`);
				}
                this.delete(key);
            }, this.timeoutMs);
        }

        this.cache.set(key, item);
    }


    /**
     * Retrieves the value associated with the specified key from the cache.
     * @param key - The key to retrieve the value for.
     * @returns The value associated with the key, or undefined if the key is not found in the cache.
     */
    get(key: K): V | undefined {
        const item = this.cache.get(key);
        return item?.value;
    }


    /**
     * Deletes an item from the cache based on the specified key.
     * If the item has a timeout, the timeout is cleared before deleting the item.
     * @param key - The key of the item to delete from the cache.
     */
    delete(key: K): void {
        const item = this.cache.get(key);

        if (item) {
            // Clear the timeout if it exists
            if (item.timeoutId) {
                clearTimeout(item.timeoutId);
            }

            this.cache.delete(key);
        }
    }

    /**
     * Clears the cache by removing all items and clearing any associated timeouts.
     */
    clear(): void {
        // Clear all timeouts
        this.cache.forEach((item) => {
            if (item.timeoutId) {
                clearTimeout(item.timeoutId);
            }
        });

        this.cache.clear();
    }

    /**
     * Checks if a key exists in the cache.
     * @param key - The key to check.
     * @returns True if the key exists in the cache, false otherwise.
     */
    has(key: K): boolean {
        return this.cache.has(key);
    }
}

/**
 * Converts hours, minutes, and seconds to milliseconds.
 * @param hrs - The number of hours.
 * @param min - The number of minutes.
 * @param sec - The number of seconds.
 * @returns The total number of milliseconds.
 */

const toMilliseconds = (hrs: number, min: number, sec: number): number => (hrs * 60 * 60 + min * 60 + sec) * 1000;

export { TypedCache, toMilliseconds, type CacheItem };