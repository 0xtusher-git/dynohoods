import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Copy, g as Check, v as ArrowUp } from "../_libs/lucide-react.mjs";
import { b as socialLinks, v as GetWhitelistedButton, y as siteConfig } from "./router-CCy8Bwph.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-CRUrR9Wp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_LINKS = [{
	label: "First Look",
	href: "/#first-look"
}, {
	label: "Details",
	href: "/#details"
}];
function shortAddress(addr) {
	return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
function TopBar() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const hasContract = siteConfig.contractAddress.length > 0;
	const marketplaceLive = siteConfig.marketplace.url.length > 0;
	const copyContract = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(siteConfig.contractAddress);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 border-b border-white/10 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.jpg",
						alt: `${siteConfig.projectName} logo`,
						width: 28,
						height: 28,
						decoding: "async",
						className: "h-7 w-7 rounded-lg object-cover ring-1 ring-white/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "arcade-title text-xs tracking-wide",
						children: siteConfig.projectName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Primary",
					className: "hidden items-center gap-6 md:flex",
					children: NAV_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "claw-link text-sm font-medium text-muted transition-colors hover:text-foreground",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [hasContract && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: copyContract,
						"aria-label": "Copy contract address",
						title: siteConfig.contractAddress,
						className: "hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-teal/40 hover:text-foreground hover:shadow-glow sm:inline-flex",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-teal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), shortAddress(siteConfig.contractAddress)]
					}), marketplaceLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: siteConfig.marketplace.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "btn btn-ghost px-4 py-2 text-sm",
						children: ["View on ", siteConfig.marketplace.name]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GetWhitelistedButton, { className: "btn btn-primary px-4 py-2 text-sm" })]
				})
			]
		})
	});
}
/**
* One full-page fixed shadow/scrim layer sitting on top of the entire video
* but underneath every content element (text, buttons, cards, footer).
*
* Stacking:
*   - HeroVideoLayer:  -z-10 (bottom)
*   - VideoShadowLayer: z-0  (this — dims the whole video uniformly)
*   - Page content:     z-10  (above the shadow)
*
* It must stay a direct sibling of the video/content inside the shell with no
* transform ancestor, so position: fixed stays relative to the viewport.
*/
function VideoShadowLayer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-[rgba(4,8,6,0.55)]"
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative border-t border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute inset-0 bg-[rgba(10,15,10,0.9)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-5 py-12 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-between gap-6 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "arcade-title text-xs text-foreground",
								children: siteConfig.projectName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: siteConfig.chainName
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Footer",
						className: "flex items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "claw-link inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" }), "Back to top"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: socialLinks.follow,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "claw-link text-sm text-muted transition-colors hover:text-foreground",
							children: "Follow on X"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-7 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "fossil-crack w-full max-w-md opacity-50"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl space-y-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-subtle",
							children: siteConfig.tokenDisclaimer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-subtle",
							children: siteConfig.disclaimer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-subtle/70",
							children: "Not affiliated with or endorsed by X/Twitter."
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { TopBar as n, VideoShadowLayer as r, Footer as t };
