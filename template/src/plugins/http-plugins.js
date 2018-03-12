import { merge } from 'axios/lib/utils';
import { setupCache } from 'axios-cache-adapter';
import MemoryStore from 'axios-cache-adapter/src/memory';

const store = new MemoryStore();
const defaultCacheStrategy = { maxAge: 15 * 60 * 1000 };
function cachePlugin(jHttp) {
    jHttp.extend({
        useCache(config = {}, matchQuery = true) {
            const originConfig = this.defaults;
            const matchQueryConfig = matchQuery ? {
                exclude: {
                    query: false,
                },
                key: req => [req.url, '|', JSON.stringify(req.params)].join(''),
            } : {};
            const cacheConfig = matchQuery ? merge(defaultCacheStrategy, config, matchQueryConfig, {
                store,
            }) : config;
            return jHttp.create(merge(originConfig, {
                adapter: setupCache(cacheConfig).adapter,
            }));
        },
    });
}

export {
    cachePlugin,
};

export default {};
