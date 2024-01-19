import { describe, expect, it } from "vitest";
import { TypedCache } from "./index";

describe("InMemoryCache", () => {
	it("sets and retrieves a value from the cache", () => {
		const cache = new TypedCache<string, number>({ debug: true });
		cache.set("key", 42);
		const value = cache.get("key");
		expect(value).toBe(42);
	});

	it("deletes an item from the cache", () => {
		const cache = new TypedCache<string, number>({ debug: true });
		cache.set("key", 42);
		cache.delete("key");
		const value = cache.get("key");
		expect(value).toBeUndefined();
	});

	it("clears the cache", () => {
		const cache = new TypedCache<string, number>({ debug: true });
		cache.set("key1", 42);
		cache.set("key2", 24);
		cache.clear();
		const value1 = cache.get("key1");
		const value2 = cache.get("key2");
		expect(value1).toBeUndefined();
		expect(value2).toBeUndefined();
	});

	it("checks if a key exists in the cache", () => {
		const cache = new TypedCache<string, number>({ debug: true });
		cache.set("key", 42);
		const hasKey = cache.has("key");
		const hasInvalidKey = cache.has("invalidKey");
		expect(hasKey).toBe(true);
		expect(hasInvalidKey).toBe(false);
	});

	it("Check timeout of the cache", () => {
		const cache = new TypedCache<string, number>({ debug: true, timeoutMs: 1000 });
		cache.set("key", 42);
		setTimeout(() => {
			const value = cache.get("key");
			expect(value).toBeUndefined();
		}, 1001);
	})
});