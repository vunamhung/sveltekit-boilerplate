import { router, renderer } from '../internal/singletons.js';
import { g as get_base_uri } from '../chunks/utils.js';

/**
 * @param {string} name
 */
function guard(name) {
	return () => {
		throw new Error(`Cannot call ${name}(...) on the server`);
	};
}

const goto = import.meta.env.SSR ? guard('goto') : goto_;
const prefetch = import.meta.env.SSR ? guard('prefetch') : prefetch_;
const prefetchRoutes = import.meta.env.SSR ? guard('prefetchRoutes') : prefetchRoutes_;

/**
 * @param {string} href
 * @param {{
 *   noscroll?: boolean;
 *   replaceState?: boolean;
 * }} [opts]
 */
async function goto_(href, opts) {
	return router.goto(href, opts, []);
}

/** @param {string} href */
function prefetch_(href) {
	return renderer.prefetch(new URL(href, get_base_uri(document)));
}

/** @param {string[]} [pathnames] */
async function prefetchRoutes_(pathnames) {
	const matching = pathnames
		? router.routes.filter((route) => pathnames.some((pathname) => route[0].test(pathname)))
		: router.routes;

	const promises = matching.map((r) => r.length !== 1 && Promise.all(r[1].map((load) => load())));

	await Promise.all(promises);
}

export { goto, prefetch, prefetchRoutes };
