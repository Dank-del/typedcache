# typedcache

Typesafe in-memory caching for Node.js

## Installation

```sh
npm install @sayanbiswas/typedcache
```

## Usage

```ts
import { TypedCache } from 'typedcache';

const cache = new TypedCache<string, number>({
    debug: true,
    timeoutMs: 3000,
})

cache.set('foo', 1);
cache.set('bar', 2);

console.log(cache.get('foo')); // 1
console.log(cache.get('bar')); // 2
console.log(cache.get('baz')); // undefined
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the terms of the [MIT license](LICENSE).
