import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, g as Check, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CaptchaProvider-DNrMDyeB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* ─────────────────────────────────────────────────────────────
*  SITE CONFIG — the one-line-edit center.
*  Project name, X handle, pinned post, supply, marketplace…
*  retune it here, it applies everywhere.
* ─────────────────────────────────────────────────────────────
*/
var siteConfig = {
	projectName: "Dynohoods",
	handle: "@Dynohoods",
	handleRaw: "Dynohoods",
	tagline: "Survival of the loudest.",
	description: "Dynohoods are 5,000 jungle-punk dinos nesting on Robinhood Chain. Every trait is a rarity roll — and rarity decides who runs the swamp. Stake your spot before the herd stampedes.",
	pinnedPostUrl: "https://x.com/Dynohoods/status/0000000000000000000",
	pinnedPostStatusId: "0000000000000000000",
	supply: 5e3,
	supplyDisplay: "5,000",
	mintStatus: "WHITELIST OPEN",
	chainName: "Robinhood Chain",
	chainNote: "Robinhood Chain is an EVM-compatible L2 — any standard 0x wallet works (MetaMask, Rabby, Robinhood Wallet).",
	marketplace: {
		name: "OpenSea",
		url: ""
	},
	contractAddress: "",
	heroVideo: {
		mp4: "",
		webm: "",
		poster: ""
	},
	collectionSlides: [
		{
			id: "moss-hide",
			num: "01",
			title: "Moss Hide",
			trait: "Body pattern",
			src: "/first-look/01.jpg"
		},
		{
			id: "molten-horns",
			num: "02",
			title: "Molten Horns",
			trait: "Headgear",
			src: "/first-look/02.jpg"
		},
		{
			id: "swamp-ambush",
			num: "03",
			title: "Swamp Ambush",
			trait: "Background",
			src: "/first-look/03.jpg"
		},
		{
			id: "feather-frill",
			num: "04",
			title: "Feather Frill",
			trait: "Neck frill",
			src: "/first-look/04.jpg"
		},
		{
			id: "bone-keeper",
			num: "05",
			title: "Bone Keeper",
			trait: "Accessory",
			src: "/first-look/05.jpg"
		},
		{
			id: "alpha-marker",
			num: "06",
			title: "Alpha Marking",
			trait: "Rarity marker",
			src: "/first-look/06.jpg"
		}
	],
	docs: {
		whitepaper: {
			title: "Whitepaper",
			desc: "Mint mechanics, trait odds, treasury split, the whole fossil record.",
			url: ""
		},
		lore: {
			title: "Lore",
			desc: "How the swamp got flooded, and why the dinos never left.",
			url: ""
		},
		roadmap: {
			title: "Roadmap",
			desc: "Mint → utility → staked territory → whatever the herd demands next.",
			url: ""
		}
	},
	tokenDisclaimer: "Dynohoods tokens are utility / in-game items, not an investment product. There is no promise of financial return and their value can go to zero. Only ever spend what you can afford to lose.",
	disclaimer: "Whitelisting here does not guarantee a slot if entries outnumber supply, and is not financial advice."
};
/**
* ─────────────────────────────────────────────────────────────
*  SOCIAL INTENT LINKS
* ─────────────────────────────────────────────────────────────
*/
var socialLinks = {
	follow: `https://x.com/intent/follow?screen_name=${siteConfig.handleRaw}`,
	like: siteConfig.pinnedPostUrl,
	reply: siteConfig.pinnedPostUrl,
	quote: `https://x.com/intent/post?text=${encodeURIComponent(`tagging two bandits for the crew: ${siteConfig.pinnedPostUrl}`)}`
};
var SITE_METADATA = {
	title: `${siteConfig.projectName} — Whitelist Open`,
	description: `5,000 jungle-punk dinos on ${siteConfig.chainName}. Complete the checklist, verify your wallet, claim your spot before the stampede.`,
	metadataBase: new URL("https://dynohoods.example"),
	openGraph: {
		title: `${siteConfig.projectName} — Whitelist Open`,
		description: "Follow. Like. Reply. Quote. Then claim your nest."
	}
};
var CANVAS_W = 320;
var CANVAS_H = 160;
var PIECE = 40;
var HANDLE = 40;
var TOLERANCE = 10;
var PUZZLE_IMAGES = siteConfig.collectionSlides.map((s) => s.src);
function pickImage(prev) {
	const pool = PUZZLE_IMAGES.filter((src) => src !== prev);
	const list = pool.length ? pool : PUZZLE_IMAGES;
	return list[Math.floor(Math.random() * list.length)] ?? "/hero-poster.jpg";
}
function drawCover(ctx, img, w, h) {
	const ir = img.width / img.height || 1;
	const r = w / h;
	let dw;
	let dh;
	let dx;
	let dy;
	if (ir > r) {
		dh = h;
		dw = img.width * (h / img.height);
		dx = (w - dw) / 2;
		dy = 0;
	} else {
		dw = w;
		dh = img.height * (w / img.width);
		dx = 0;
		dy = (h - dh) / 2;
	}
	ctx.drawImage(img, dx, dy, dw, dh);
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function SlideCaptcha({ onSuccess }) {
	const mainRef = (0, import_react.useRef)(null);
	const blockRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	const targetX = (0, import_react.useRef)(0);
	const dragging = (0, import_react.useRef)(false);
	const startClientX = (0, import_react.useRef)(0);
	const startOffset = (0, import_react.useRef)(0);
	const imgSrc = (0, import_react.useRef)(pickImage());
	const offsetRef = (0, import_react.useRef)(0);
	const [offset, setOffset] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [ready, setReady] = (0, import_react.useState)(false);
	const applyOffset = (n) => {
		offsetRef.current = n;
		setOffset(n);
	};
	const paint = (0, import_react.useCallback)(() => {
		const main = mainRef.current;
		const block = blockRef.current;
		if (!main || !block) return;
		const ctx = main.getContext("2d");
		const bctx = block.getContext("2d");
		if (!ctx || !bctx) return;
		const img = new Image();
		img.decoding = "async";
		img.src = imgSrc.current;
		const finish = () => {
			ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
			if (img.naturalWidth > 0) drawCover(ctx, img, CANVAS_W, CANVAS_H);
			else {
				const g = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
				g.addColorStop(0, "#07150f");
				g.addColorStop(1, "#0a2418");
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
			}
			targetX.current = Math.floor(Math.random() * Math.max(1, 160)) + 70;
			const targetY = Math.floor(Math.random() * 100) + 10;
			const piece = ctx.getImageData(targetX.current, targetY, PIECE, PIECE);
			ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
			ctx.fillRect(targetX.current, targetY, PIECE, PIECE);
			ctx.strokeStyle = "rgba(64, 224, 192, 0.45)";
			ctx.lineWidth = 2;
			ctx.strokeRect(targetX.current + .5, targetY + .5, 39, 39);
			bctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
			bctx.putImageData(piece, 0, targetY);
			bctx.strokeStyle = "rgba(244, 237, 224, 0.95)";
			bctx.lineWidth = 2;
			bctx.strokeRect(.5, targetY + .5, 39, 39);
			applyOffset(0);
			setStatus("idle");
			setReady(true);
		};
		img.onload = finish;
		img.onerror = finish;
	}, []);
	(0, import_react.useEffect)(() => {
		paint();
	}, [paint]);
	const maxCss = () => {
		const track = trackRef.current;
		if (!track) return 280;
		return Math.max(0, track.clientWidth - HANDLE);
	};
	const onPointerDown = (e) => {
		if (status === "ok") return;
		e.preventDefault();
		e.currentTarget.setPointerCapture(e.pointerId);
		dragging.current = true;
		startClientX.current = e.clientX;
		startOffset.current = offsetRef.current;
		setStatus("idle");
	};
	const onPointerMove = (e) => {
		if (!dragging.current || status === "ok") return;
		const dx = e.clientX - startClientX.current;
		applyOffset(clamp(startOffset.current + dx, 0, maxCss()));
	};
	const onPointerUp = () => {
		if (!dragging.current) return;
		dragging.current = false;
		const width = trackRef.current?.clientWidth || CANVAS_W;
		const displayedTarget = targetX.current * (width / CANVAS_W);
		const current = offsetRef.current;
		if (Math.abs(current - displayedTarget) <= TOLERANCE) {
			applyOffset(displayedTarget);
			setStatus("ok");
			window.setTimeout(() => onSuccess(), 420);
		} else {
			setStatus("fail");
			imgSrc.current = pickImage(imgSrc.current);
			window.setTimeout(() => paint(), 280);
		}
	};
	const refresh = () => {
		if (status === "ok") return;
		imgSrc.current = pickImage(imgSrc.current);
		paint();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-[320px] max-w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "arcade-title text-sm text-foreground",
					children: "Slide to enter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Drag the piece into the slot to open the waitlist."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-4 overflow-hidden rounded-lg border border-white/10 bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: mainRef,
						width: CANVAS_W,
						height: CANVAS_H,
						className: "block h-auto w-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: blockRef,
						width: CANVAS_W,
						height: CANVAS_H,
						className: "pointer-events-none absolute top-0 left-0 h-full w-full",
						style: { transform: `translateX(${offset}px)` }
					}),
					!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-surface",
						"aria-hidden": true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: trackRef,
				className: "relative mt-4 h-10 rounded-full border border-white/10 bg-white/[0.04]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pointer-events-none absolute inset-0 text-center text-xs leading-10 text-subtle",
					children: status === "ok" ? "Verified" : "Swipe right →"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Slide puzzle handle",
					disabled: status === "ok",
					onPointerDown,
					onPointerMove,
					onPointerUp,
					onPointerCancel: onPointerUp,
					className: `absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold select-none touch-none ${status === "ok" ? "bg-teal text-background" : "bg-primary"}`,
					style: {
						transform: `translateX(${offset}px)`,
						color: status === "ok" ? void 0 : "#1a1203"
					},
					children: status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : "→"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: `min-h-4 text-xs ${status === "fail" ? "text-danger" : status === "ok" ? "text-teal" : "text-subtle"}`,
					children: status === "fail" ? "Not quite — new puzzle loaded." : status === "ok" ? "You're in. Opening waitlist…" : " "
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: refresh,
					disabled: status === "ok",
					className: "inline-flex items-center gap-1 text-xs text-muted hover:text-foreground disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3 w-3" }), "New puzzle"]
				})]
			})
		]
	});
}
function CaptchaModal({ onSuccess, onDismiss }) {
	const dialogRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		dialogRef.current?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") onDismiss();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [onDismiss]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80] flex items-center justify-center p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close verification",
			className: "absolute inset-0 bg-background/55 backdrop-blur-md",
			onClick: onDismiss
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: dialogRef,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "captcha-title",
			tabIndex: -1,
			className: "relative z-10 w-[min(100%,22rem)] rounded-2xl border border-white/12 bg-[rgba(7,21,15,0.96)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45)] outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDismiss,
					"aria-label": "Close",
					className: "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "captcha-title",
					className: "sr-only",
					children: "Waitlist verification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideCaptcha, { onSuccess })
			]
		})]
	});
}
var STORAGE_KEY = "dynohoods-waitlist-captcha";
function isCaptchaVerified() {
	if (typeof window === "undefined") return false;
	try {
		return sessionStorage.getItem(STORAGE_KEY) === "1";
	} catch {
		return false;
	}
}
function markCaptchaVerified() {
	if (typeof window === "undefined") return;
	try {
		sessionStorage.setItem(STORAGE_KEY, "1");
	} catch {}
}
var CaptchaContext = (0, import_react.createContext)(null);
function CaptchaProvider({ children }) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [ready, setReady] = (0, import_react.useState)(false);
	const [verified, setVerified] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setVerified(isCaptchaVerified());
		setReady(true);
	}, []);
	const requestWaitlist = (0, import_react.useCallback)(() => {
		if (isCaptchaVerified()) {
			setVerified(true);
			navigate({ to: "/waitlist" });
			return;
		}
		setOpen(true);
	}, [navigate]);
	const onSuccess = (0, import_react.useCallback)(() => {
		markCaptchaVerified();
		setVerified(true);
		setOpen(false);
		navigate({ to: "/waitlist" });
	}, [navigate]);
	const onDismiss = (0, import_react.useCallback)(() => {
		setOpen(false);
		if (pathname === "/waitlist" && !isCaptchaVerified()) navigate({ to: "/" });
	}, [navigate, pathname]);
	(0, import_react.useEffect)(() => {
		if (ready && pathname === "/waitlist" && !verified) setOpen(true);
	}, [
		pathname,
		ready,
		verified
	]);
	const value = (0, import_react.useMemo)(() => ({
		ready,
		verified,
		requestWaitlist
	}), [
		ready,
		verified,
		requestWaitlist
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CaptchaContext.Provider, {
		value,
		children: [children, open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptchaModal, {
			onSuccess,
			onDismiss
		})]
	});
}
function useCaptcha() {
	const ctx = (0, import_react.useContext)(CaptchaContext);
	if (!ctx) throw new Error("useCaptcha must be used within CaptchaProvider");
	return ctx;
}
function GetWhitelistedButton({ className }) {
	const { requestWaitlist } = useCaptcha();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: requestWaitlist,
		className,
		children: "Get whitelisted"
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CCy8Bwph.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* Single cached Audio instance for button clicks. Resets currentTime to 0
* on every play so rapid clicks retrigger cleanly instead of being cut off.
*/
var audio = null;
function playClickSound() {
	if (typeof window === "undefined") return;
	if (!audio) audio = new Audio("/audio/click.wav");
	if (audio.currentTime > 0) audio.currentTime = 0;
	audio.play().catch(() => {});
}
/**
* One global click listener at the app root. Any click on a <button>,
* an <a> styled as a button, or an element with role="button" triggers
* the shared click sound — no per-button onClick wiring needed.
*/
function ButtonClickSound() {
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			const target = e.target;
			if (!target || !(target instanceof Element)) return;
			if (target.closest("button, a.btn, a[role='button'], [role='button']")) playClickSound();
		};
		document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, []);
	return null;
}
var styles_default = "/assets/styles-d3f6_qp8.css";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE_METADATA.title },
			{
				name: "description",
				content: SITE_METADATA.description
			},
			{
				property: "og:title",
				content: SITE_METADATA.openGraph.title
			},
			{
				property: "og:description",
				content: SITE_METADATA.openGraph.description
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Press+Start+2P&display=swap"
			}
		]
	}),
	component: RootComponent,
	errorComponent: AppErrorComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootDocument, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonClickSound, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptchaProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	] }) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-C7Mj9Izq.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
/**
* Shared validation used on both client and server.
* Never trust client-only checks — the API route runs these again.
*/
var WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;
/** X username for the waitlist: MUST start with @, then 1–15 letters/numbers/_ */
var X_USERNAME_REGEX = /^@[A-Za-z0-9_]{1,15}$/;
var X_POST_HOSTS = /* @__PURE__ */ new Set([
	"x.com",
	"www.x.com",
	"twitter.com",
	"www.twitter.com"
]);
function isValidWallet(address) {
	return WALLET_REGEX.test(address.trim());
}
/**
* Waitlist username: only values that start with @ are accepted.
* Example: @Dynohoods
*/
function isValidXUsername(value) {
	return X_USERNAME_REGEX.test(value.trim());
}
/**
* Client-side X/Twitter *post URL format* checker.
*
* Uses the URL parser + an exact hostname allowlist. This does NOT prove
* the post exists, or that the user quoted anything — only that the string
* looks like `https://x.com/<user>/status/<id>`.
*/
function isValidXPostUrl(url) {
	if (typeof url !== "string") return false;
	const trimmed = url.trim();
	if (!trimmed) return false;
	let parsed;
	try {
		parsed = new URL(trimmed);
	} catch {
		return false;
	}
	if (parsed.protocol !== "https:") return false;
	const host = parsed.hostname.toLowerCase();
	if (!X_POST_HOSTS.has(host)) return false;
	const match = parsed.pathname.match(/^\/([^/]+)\/status\/(\d+)\/?$/);
	if (!match) return false;
	const username = match[1];
	const statusId = match[2];
	if (!username || username === "." || username === "..") return false;
	if (!/^\d+$/.test(statusId)) return false;
	return true;
}
/**
* Waitlist page config — the one-line-edit center for this route only.
* Does not change homepage / modal copy.
*/
var COLLECTION_NAME = siteConfig.projectName;
var COLLECTION_SUPPLY = 5e3;
var WAITLIST_API_URL = "/api/waitlist";
/**
* Official pinned post. Leave empty (or the theme placeholder) until the
* real post is live — the page will not invent tweet content.
*/
var PINNED_POST_URL = siteConfig.pinnedPostUrl;
function isPinnedPostConfigured(url = PINNED_POST_URL) {
	if (!url.trim()) return false;
	if (url.includes("0000000000000000000")) return false;
	if (/\/status\/0+$/.test(url)) return false;
	return /^https?:\/\//i.test(url);
}
function tweetIdFromUrl(url = PINNED_POST_URL) {
	return url.match(/\/status\/(\d+)/)?.[1] ?? null;
}
function xActionUrl(task) {
	if (!isPinnedPostConfigured()) return null;
	const id = tweetIdFromUrl();
	if (!id) return PINNED_POST_URL;
	switch (task) {
		case "like": return `https://x.com/intent/like?tweet_id=${id}`;
		case "reply": return `https://x.com/intent/tweet?in_reply_to=${id}`;
		case "repost": return `https://x.com/intent/retweet?tweet_id=${id}`;
		case "quote": return `https://x.com/intent/post?url=${encodeURIComponent(PINNED_POST_URL)}`;
	}
}
function shortAddress(addr) {
	const a = addr.trim();
	if (a.length < 10) return a;
	return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
function usernameError(value) {
	const trimmed = value.trim();
	if (!trimmed) return "Please enter your X username.";
	if (!trimmed.startsWith("@")) return "Username must start with @.";
	if (!isValidXUsername(trimmed)) return "Enter a valid X username starting with @ (letters, numbers, underscore).";
	return null;
}
function quoteLinkError(value) {
	if (!value.trim()) return "Please enter your X post link.";
	if (!isValidXPostUrl(value)) return "Invalid X post link. Please paste a valid X/Twitter post URL.";
	return null;
}
function walletErrorMessage(value, touched) {
	if (!touched || !value.trim()) return null;
	if (!isValidWallet(value)) return "That isn't a valid EVM address — 0x followed by 40 hex characters.";
	return null;
}
/**
* verifyLike()
*
* TODO: Call the real X / backend verification.
* Frontend clicks cannot prove a like. The server must check the
* authenticated X user against the pinned post.
*/
async function verifyLike() {
	return verifyXTask("like");
}
/**
* verifyReply()
*
* TODO: Call the real X / backend verification (reply on the pinned post).
*/
async function verifyReply() {
	return verifyXTask("reply");
}
/**
* verifyRepost()
*
* TODO: Call the real X / backend verification (repost of the pinned post).
*/
async function verifyRepost() {
	return verifyXTask("repost");
}
async function verifyXTask(action) {
	return {
		ok: true,
		demo: true
	};
}
/**
* submitWaitlist(data)
*
* TODO: Connect to the real backend / database.
* Payload shape is stable so the server can land later without UI churn.
*/
async function submitWaitlist(data) {
	if (!isValidWallet(data.walletAddress)) return {
		ok: false,
		error: "Enter a valid wallet address."
	};
	const { tasks } = data;
	if (!tasks.usernameSubmitted || !isValidXUsername(data.xUsername) || !tasks.liked || !tasks.replied || !tasks.reposted || !tasks.quoted || !isValidXPostUrl(data.quoteUrl)) return {
		ok: false,
		error: "Finish every mission before joining."
	};
	try {
		const res = await fetch(WAITLIST_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		const result = await res.json();
		if (!res.ok) return {
			ok: false,
			error: result.error ?? "Submission failed."
		};
		return result;
	} catch {
		return {
			ok: false,
			error: "Network error — try again in a moment."
		};
	}
}
var $$splitComponentImporter = () => import("./waitlist-W7eA8UTE.mjs");
var Route$2 = createFileRoute("/waitlist")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: `Join the Waitlist — ${COLLECTION_NAME}` }, {
		name: "description",
		content: `Complete the missions to join the ${COLLECTION_NAME} waitlist. Supply ${COLLECTION_SUPPLY.toLocaleString()}.`
	}] })
});
var seenWallets = /* @__PURE__ */ new Set();
var Route$1 = createFileRoute("/api/waitlist")({ server: { handlers: { POST: async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({
			ok: false,
			error: "Malformed request."
		}, { status: 400 });
	}
	const wallet = typeof body.walletAddress === "string" ? body.walletAddress.trim() : "";
	if (!isValidWallet(wallet)) return Response.json({
		ok: false,
		error: "Enter a valid wallet address."
	}, { status: 400 });
	const quoteUrl = typeof body.quoteUrl === "string" ? body.quoteUrl.trim() : "";
	const xUsername = typeof body.xUsername === "string" ? body.xUsername.trim() : "";
	const tasks = body.tasks;
	if (!tasks || !tasks.usernameSubmitted || !isValidXUsername(xUsername) || !tasks.liked || !tasks.replied || !tasks.reposted || !tasks.quoted || !isValidXPostUrl(quoteUrl)) return Response.json({
		ok: false,
		error: "All five missions must be complete."
	}, { status: 400 });
	const key = wallet.toLowerCase();
	if (seenWallets.has(key)) return Response.json({
		ok: false,
		error: "This wallet is already on the list."
	}, { status: 409 });
	seenWallets.add(key);
	return Response.json({
		ok: true,
		demo: true
	});
} } } });
var ACTIONS = [
	"like",
	"reply",
	"repost"
];
var Route = createFileRoute("/api/waitlist/verify")({ server: { handlers: { POST: async ({ request }) => {
	let action;
	try {
		action = (await request.json()).action;
	} catch {
		return Response.json({
			ok: false,
			error: "Malformed request."
		}, { status: 400 });
	}
	if (typeof action !== "string" || !ACTIONS.includes(action)) return Response.json({
		ok: false,
		error: "Unknown action."
	}, { status: 400 });
	return Response.json({
		ok: true,
		demo: true
	});
} } } });
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var WaitlistRoute = Route$2.update({
	id: "/waitlist",
	path: "/waitlist",
	getParentRoute: () => Route$4
});
var ApiWaitlistRoute = Route$1.update({
	id: "/api/waitlist",
	path: "/api/waitlist",
	getParentRoute: () => Route$4
});
var ApiWaitlistRouteChildren = { ApiWaitlistVerifyRoute: Route.update({
	id: "/verify",
	path: "/verify",
	getParentRoute: () => ApiWaitlistRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	WaitlistRoute,
	ApiWaitlistRoute: ApiWaitlistRoute._addFileChildren(ApiWaitlistRouteChildren)
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { isValidXUsername as _, isPinnedPostConfigured as a, socialLinks as b, submitWaitlist as c, verifyReply as d, verifyRepost as f, isValidXPostUrl as g, isValidWallet as h, PINNED_POST_URL as i, usernameError as l, xActionUrl as m, COLLECTION_NAME as n, quoteLinkError as o, walletErrorMessage as p, COLLECTION_SUPPLY as r, shortAddress as s, router_exports as t, verifyLike as u, GetWhitelistedButton as v, useCaptcha as x, siteConfig as y };
