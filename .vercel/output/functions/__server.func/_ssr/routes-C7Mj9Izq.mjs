import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BookOpen, d as ExternalLink, h as ChevronLeft, m as ChevronRight, o as PawPrint, s as Map, u as FileText } from "../_libs/lucide-react.mjs";
import { v as GetWhitelistedButton, y as siteConfig } from "./router-CCy8Bwph.mjs";
import { n as TopBar, r as VideoShadowLayer, t as Footer } from "./Footer-CRUrR9Wp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C7Mj9Izq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIDEO_SRC = "/Video/hero.mp4";
var POSTER = "/hero-poster.jpg";
/**
* Full-viewport fixed video background.
* No JS — the tag is in the first HTML paint so the poster shows immediately.
*/
function HeroVideoLayer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "h-full w-full object-cover motion-reduce:hidden",
			autoPlay: true,
			muted: true,
			loop: true,
			playsInline: true,
			preload: "metadata",
			poster: POSTER,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
				src: VIDEO_SRC,
				type: "video/mp4"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: POSTER,
			alt: "",
			className: "hidden h-full w-full object-cover motion-reduce:block"
		})]
	});
}
function StatStrip() {
	const marketName = siteConfig.marketplace.name || siteConfig.marketplace.url || "TBA";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mx-auto lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-4 py-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] font-semibold uppercase tracking-wider text-subtle",
					children: "Total supply"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-semibold text-foreground",
					children: siteConfig.supplyDisplay
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-4 py-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] font-semibold uppercase tracking-wider text-subtle",
					children: "Mint status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 inline-flex items-center gap-1.5 font-semibold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-2 w-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-primary" })]
					}), siteConfig.mintStatus]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-4 py-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] font-semibold uppercase tracking-wider text-subtle",
					children: "Chain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-semibold text-foreground",
					children: siteConfig.chainName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-4 py-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.65rem] font-semibold uppercase tracking-wider text-subtle",
					children: "Marketplace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-semibold text-foreground",
					children: marketName
				})]
			})
		]
	});
}
function HeroVideo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "top",
		className: "relative isolate",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "chip border-white/15 text-primary",
						children: [siteConfig.supplyDisplay, " bandits. One swamp."]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "arcade-title max-w-4xl text-3xl leading-[1.3] text-foreground [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] sm:text-5xl md:text-6xl",
					children: siteConfig.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-7 max-w-2xl text-base leading-relaxed text-muted [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] sm:text-lg",
					children: siteConfig.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col items-center gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GetWhitelistedButton, { className: "btn btn-primary px-7 py-3 text-base" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#first-look",
						className: "btn btn-ghost px-7 py-3 text-base",
						children: "Take the first look"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted [text-shadow:0_1px_10px_rgba(0,0,0,0.75)]",
					children: siteConfig.chainNote
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatStrip, {})
			]
		})
	});
}
var slides = siteConfig.collectionSlides;
function CollectionCarousel() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const count = slides.length;
	const go = (0, import_react.useCallback)((dir) => {
		setIndex((i) => (i + dir + count) % count);
	}, [count]);
	const slide = slides[index];
	const hasImage = slide.src.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "first-look",
		className: "relative w-full scroll-mt-20 bg-gradient-to-b from-transparent via-background/90 to-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-5 py-24 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chip",
							children: "Collection showcase"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "arcade-title mt-4 text-2xl text-foreground sm:text-3xl",
							children: "First Look"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted sm:text-base",
							children: "Every dino is a roll of four traits — hide, headgear, markings and background. Traits set rarity, rarity sets rank, and rank decides who rules the swamp. Sneak previews below."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "fossil-crack w-56"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto mt-10 max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-square w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-[#0a1a12] shadow-card",
						tabIndex: 0,
						"aria-label": `Slide ${index + 1} of ${count}: ${slide.title}`,
						onKeyDown: (e) => {
							if (e.key === "ArrowLeft") go(-1);
							if (e.key === "ArrowRight") go(1);
						},
						children: hasImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: slide.src,
							alt: `Dynohoods preview #${slide.num}`,
							width: 800,
							height: 800,
							decoding: "async",
							className: "h-full w-full object-contain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-full w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(160deg,#07150F_0%,#04110B_55%,#030A07_100%)] p-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, { className: "h-14 w-14 text-primary/60" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "arcade-title text-[0.65rem] tracking-wider text-muted",
									children: "Artwork revealing soon"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-medium text-foreground",
									children: slide.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-subtle",
									children: slide.trait
								})
							] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-center gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => go(-1),
								"aria-label": "Previous slide",
								className: "btn btn-ghost h-11 w-11 rounded-full p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex max-w-xs items-center justify-center gap-1.5",
								children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIndex(i),
									"aria-label": `Go to slide ${i + 1}`,
									"aria-current": i === index,
									className: `h-1.5 rounded-full transition-[width,background-color] duration-150 ${i === index ? "w-6 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"}`
								}, s.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => go(1),
								"aria-label": "Next slide",
								className: "btn btn-ghost h-11 w-11 rounded-full p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					})]
				})
			]
		})
	});
}
var icons = {
	whitepaper: FileText,
	lore: BookOpen,
	roadmap: Map
};
function DetailsTeaser() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "details",
		className: "relative w-full scroll-mt-20 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-5 py-24 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chip",
							children: "More reading"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "arcade-title mt-4 text-2xl text-foreground sm:text-3xl",
							children: "The Details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted sm:text-base",
							children: "The full writeup — mint mechanics, trait odds, territory plans and the story of how the swamp flooded — lives in the docs. Anything still digging has a placeholder, perfectly normal for a hatchling."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "fossil-crack w-56"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3",
					children: Object.entries(siteConfig.docs).map(([key, doc]) => {
						const Icon = icons[key];
						const ready = doc.url.length > 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: ready ? doc.url : void 0,
							className: `glass-card glass-card-hover group flex flex-col rounded-xl p-6 ${ready ? "" : "cursor-default"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })
									}), ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4 text-subtle transition-colors group-hover:text-teal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "chip !py-0.5 text-[0.55rem] text-muted",
										children: "Coming soon"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-base font-semibold text-foreground",
									children: doc.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 flex-1 text-sm leading-relaxed text-muted",
									children: doc.desc
								})
							]
						}, key);
					})
				})
			]
		})
	});
}
function WhitelistShell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVideoLayer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoShadowLayer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 min-h-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVideo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionCarousel, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailsTeaser, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})
	] });
}
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhitelistShell, {});
}
//#endregion
export { HomePage as component };
