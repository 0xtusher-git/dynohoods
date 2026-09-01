import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Lock, d as ExternalLink, g as Check, i as ShieldCheck, l as LoaderCircle, n as Wallet, p as CircleCheck, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as isValidXUsername, a as isPinnedPostConfigured, c as submitWaitlist, d as verifyReply, f as verifyRepost, g as isValidXPostUrl, h as isValidWallet, i as PINNED_POST_URL, l as usernameError, m as xActionUrl, n as COLLECTION_NAME, o as quoteLinkError, p as walletErrorMessage, r as COLLECTION_SUPPLY, s as shortAddress, u as verifyLike, x as useCaptcha, y as siteConfig } from "./router-CCy8Bwph.mjs";
import { n as TopBar, r as VideoShadowLayer, t as Footer } from "./Footer-CRUrR9Wp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/waitlist-W7eA8UTE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProgressBar({ completed, total }) {
	const pct = Math.min(100, Math.round(completed / total * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mt-8 w-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted",
			children: [
				completed,
				" / ",
				total,
				" tasks completed"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-white/[0.08]",
			role: "progressbar",
			"aria-valuemin": 0,
			"aria-valuemax": total,
			"aria-valuenow": completed,
			"aria-label": `${completed} of ${total} tasks completed`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-teal shadow-glow transition-[width] duration-200 ease-out",
				style: { width: `${pct}%` }
			})
		})]
	});
}
function WaitlistHero({ completed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative isolate pt-10 sm:pt-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex flex-wrap items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "chip border-white/15 text-primary",
						children: [
							COLLECTION_SUPPLY.toLocaleString(),
							" · ",
							COLLECTION_NAME
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "chip border-primary/30 bg-primary/10 text-primary",
						children: "Demo mode"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "arcade-title text-2xl leading-[1.35] text-foreground [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] sm:text-4xl",
					children: "Join the waitlist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] sm:text-base",
					children: "Complete the missions below to secure your spot."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
					completed,
					total: 5
				})
			]
		})
	});
}
function XLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		className,
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" })
	});
}
var PLATE = "rounded-xl border p-4 sm:p-5 transition-colors bg-[rgba(7,21,15,0.94)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";
function XTaskCard({ num, title, instruction, actionLabel, taskId, state, disabledAction, onAction, onVerify }) {
	const done = state.verified;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `${PLATE} ${done ? "border-teal/40 bg-teal/[0.12]" : "border-white/10 hover:border-teal/30"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${done ? "border-teal/40 bg-teal/10 text-teal" : "border-white/10 bg-white/[0.03] text-muted"}`,
				children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XLogo, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-1.5 font-mono text-xs text-subtle",
								children: num
							}), title]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							done,
							verifying: state.verifying
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted sm:text-sm",
						children: instruction
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onAction,
							disabled: disabledAction || done,
							className: "btn btn-ghost min-h-11 px-4 py-2 text-xs sm:text-sm",
							children: [actionLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
						}), !done && state.opened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onVerify,
							disabled: state.verifying,
							className: "btn btn-primary min-h-11 px-4 py-2 text-xs sm:text-sm",
							children: state.verifying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "Checking"] }) : "Verify (demo)"
						})]
					}),
					state.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mt-2 text-xs text-danger",
						children: state.error
					}),
					!done && !state.opened && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[0.7rem] leading-relaxed text-subtle",
						children: [
							"Opening ",
							taskId === "like" ? "the post" : "X",
							" does not mark this done. Come back and verify after you finish the action."
						]
					})
				]
			})]
		})
	});
}
function UsernameTaskCard({ username, done, error, onChange, onSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `${PLATE} ${done ? "border-teal/40 bg-teal/[0.12]" : "border-white/10 hover:border-teal/30"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${done ? "border-teal/40 bg-teal/10 text-teal" : "border-white/10 bg-white/[0.03] text-muted"}`,
				children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XLogo, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-1.5 font-mono text-xs text-subtle",
								children: "01"
							}), "Username"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { done })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted sm:text-sm",
						children: "Submit your X username. It must start with @."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "waitlist-username",
						className: "mt-4 block text-xs font-medium text-foreground",
						children: "X username"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "waitlist-username",
						type: "text",
						autoComplete: "off",
						autoCorrect: "off",
						spellCheck: false,
						placeholder: "@username",
						value: username,
						onChange: (e) => onChange(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								onSubmit();
							}
						},
						"aria-invalid": Boolean(error),
						"aria-describedby": error ? "waitlist-username-error" : done ? "waitlist-username-ok" : "waitlist-username-hint",
						className: "field-input mt-1.5 font-mono text-xs"
					}),
					!done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onSubmit,
							className: "btn btn-primary min-h-11 min-w-28 px-6 py-2 text-xs tracking-wide sm:text-sm",
							children: "SUBMIT"
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "waitlist-username-error",
						role: "alert",
						className: "mt-3 text-center text-xs text-danger",
						children: error
					}) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "waitlist-username-ok",
						className: "mt-3 text-center text-xs font-medium text-teal",
						children: "✓ Valid X username"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "waitlist-username-hint",
						className: "sr-only",
						children: "Enter your X username starting with @, then press SUBMIT."
					})
				]
			})]
		})
	});
}
function QuoteTaskCard({ quoteUrl, done, error, disabledAction, onQuote, onChange, onVerify }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `${PLATE} ${done ? "border-teal/40 bg-teal/[0.12]" : "border-white/10 hover:border-teal/30"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${done ? "border-teal/40 bg-teal/10 text-teal" : "border-white/10 bg-white/[0.03] text-muted"}`,
				children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XLogo, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-1.5 font-mono text-xs text-subtle",
								children: "05"
							}), "Quote"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { done })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted sm:text-sm",
						children: "Quote the pinned post, then paste your post link below."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onQuote,
							disabled: disabledAction,
							className: "btn btn-ghost min-h-11 px-4 py-2 text-xs sm:text-sm",
							children: ["Quote post", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "waitlist-quote",
						className: "mt-4 block text-xs font-medium text-foreground",
						children: "Post link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "waitlist-quote",
						type: "url",
						inputMode: "url",
						autoComplete: "off",
						spellCheck: false,
						placeholder: "https://x.com/.../status/...",
						value: quoteUrl,
						onChange: (e) => onChange(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								onVerify();
							}
						},
						"aria-invalid": Boolean(error),
						"aria-describedby": error ? "waitlist-quote-error" : done ? "waitlist-quote-ok" : "waitlist-quote-hint",
						className: "field-input mt-1.5 font-mono text-xs"
					}),
					!done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onVerify,
							className: "btn btn-primary min-h-11 min-w-28 px-6 py-2 text-xs tracking-wide sm:text-sm",
							children: "VERIFY"
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "waitlist-quote-error",
						role: "alert",
						className: "mt-3 text-center text-xs text-danger",
						children: error
					}) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "waitlist-quote-ok",
						className: "mt-3 text-center text-xs font-medium text-teal",
						children: "✓ Valid X post link"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "waitlist-quote-hint",
						className: "sr-only",
						children: "Paste an x.com or twitter.com status link, then press VERIFY. This only checks the link format."
					})
				]
			})]
		})
	});
}
function StatusChip({ done, verifying }) {
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-wider text-teal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), "Completed"]
	});
	if (verifying) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[0.6rem] font-medium uppercase tracking-wider text-primary",
		children: "Checking"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[0.6rem] font-medium uppercase tracking-wider text-subtle",
		children: "Not completed"
	});
}
function PinnedPost() {
	const configured = isPinnedPostConfigured();
	const openPost = () => {
		if (!configured) return;
		window.open(PINNED_POST_URL, "_blank", "noopener,noreferrer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "pinned-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle",
				children: "Reference"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "pinned-heading",
				className: "arcade-title mt-1 text-sm text-foreground sm:text-base",
				children: "Official pinned post"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: openPost,
				disabled: !configured,
				className: "btn btn-ghost min-h-11 px-4 py-2 text-xs sm:text-sm",
				children: ["Open post on X", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card overflow-hidden rounded-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-white/10 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-medium text-muted",
					children: [COLLECTION_NAME, " · X"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-[160px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[200px]",
				children: configured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground",
					children: "The official post is live. Open it on X to complete missions."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm break-all font-mono text-[0.65rem] text-subtle",
					children: PINNED_POST_URL
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground",
					children: "Post embed placeholder"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-sm text-xs leading-relaxed text-subtle",
					children: [
						"Set ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-muted",
							children: "PINNED_POST_URL"
						}),
						" ",
						"to the real post. This page will not invent a tweet."
					]
				})] })
			})]
		})]
	});
}
function getEthereum() {
	return window.ethereum ?? null;
}
function WalletInput({ unlocked, value, touched, onChange, onBlur, onConnected }) {
	const [walletReady, setWalletReady] = (0, import_react.useState)(false);
	const error = walletErrorMessage(value, touched);
	(0, import_react.useEffect)(() => {
		setWalletReady(Boolean(getEthereum()));
	}, []);
	const connect = async () => {
		try {
			const eth = getEthereum();
			if (!eth) return;
			const accounts = await eth.request({ method: "eth_requestAccounts" });
			if (Array.isArray(accounts) && typeof accounts[0] === "string") onConnected(accounts[0]);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "wallet-heading",
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: !unlocked ? "pointer-events-none select-none opacity-40" : "",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle",
					children: "Entry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "wallet-heading",
					className: "arcade-title mt-1 text-sm text-foreground sm:text-base",
					children: "Your wallet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Enter the wallet address that will be used for the NFT."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 glass-card rounded-xl p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1.5 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "waitlist-wallet",
								className: "flex items-center gap-1.5 text-sm font-medium text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5 text-muted" }), "Wallet address"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "waitlist-wallet",
								type: "text",
								inputMode: "text",
								autoComplete: "off",
								autoCorrect: "off",
								spellCheck: false,
								placeholder: "0x...",
								value,
								onChange: (e) => onChange(e.target.value),
								onBlur,
								disabled: !unlocked,
								"aria-invalid": error ? true : void 0,
								"aria-describedby": error ? "waitlist-wallet-error" : "waitlist-wallet-hint",
								className: "field-input min-w-0 flex-1 break-all font-mono text-xs sm:text-sm"
							}), walletReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: connect,
								disabled: !unlocked,
								className: "btn btn-ghost min-h-11 shrink-0 px-4 py-2 text-xs sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5" }), "Connect wallet"]
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "waitlist-wallet-error",
							role: "alert",
							className: "mt-2 text-xs text-danger",
							children: error
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							id: "waitlist-wallet-hint",
							className: "mt-2 text-xs leading-relaxed text-subtle",
							children: ["Public address only. Never share a seed phrase or private key — we will never ask for one. ", siteConfig.chainNote]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 inline-flex items-center gap-1.5 text-[0.7rem] text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-teal" }), "No seed phrases. No private keys. Address validation only."]
						})
					]
				})
			]
		}), !unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center rounded-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card mx-4 flex max-w-sm items-start gap-3 rounded-xl px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-muted sm:text-sm",
					children: "Complete all five missions to unlock your wallet."
				})]
			})
		})]
	});
}
function WaitlistSubmit({ enabled, submitting, error, onSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onSubmit,
		disabled: !enabled || submitting,
		className: "btn btn-primary min-h-12 w-full px-6 py-3.5 text-sm sm:text-base",
		children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Joining…"] }) : enabled ? "Join waitlist" : "Finish missions + wallet"
	}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-center text-xs font-medium text-danger",
		children: error
	})] });
}
function SuccessState({ wallet, xUsername, quoteUrl }) {
	const collectionHref = siteConfig.marketplace.url || "/";
	const external = Boolean(siteConfig.marketplace.url);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-lg py-10 text-center sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal/40 bg-teal/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-teal" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "arcade-title mt-6 text-2xl text-foreground sm:text-3xl",
				children: "You're on the list"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted",
				children: "Your waitlist submission has been received."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-hidden rounded-xl border border-white/10 bg-surface text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Wallet",
							value: shortAddress(wallet),
							mono: true
						}),
						xUsername && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "X",
							value: xUsername,
							mono: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Missions",
							value: "5 / 5 completed"
						}),
						quoteUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Quote",
							value: quoteUrl,
							mono: true
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: collectionHref,
				...external ? {
					target: "_blank",
					rel: "noopener noreferrer"
				} : {},
				className: "btn btn-primary mt-8 inline-flex min-h-12 px-6 py-3 text-sm",
				children: ["View collection", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		]
	});
}
function Row({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-xs uppercase tracking-wider text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `min-w-0 truncate font-semibold text-foreground ${mono ? "font-mono text-xs" : ""}`,
			children: value
		})]
	});
}
var EMPTY_TASK = {
	opened: false,
	verified: false,
	verifying: false,
	error: null
};
function useWaitlistFlow() {
	const [like, setLike] = (0, import_react.useState)(EMPTY_TASK);
	const [reply, setReply] = (0, import_react.useState)(EMPTY_TASK);
	const [repost, setRepost] = (0, import_react.useState)(EMPTY_TASK);
	const [username, setUsernameState] = (0, import_react.useState)("");
	const [usernameVerified, setUsernameVerified] = (0, import_react.useState)(false);
	const [usernameErr, setUsernameErr] = (0, import_react.useState)(null);
	const [quoteUrl, setQuoteUrlState] = (0, import_react.useState)("");
	const [quoteVerified, setQuoteVerified] = (0, import_react.useState)(false);
	const [quoteError, setQuoteError] = (0, import_react.useState)(null);
	const [wallet, setWallet] = (0, import_react.useState)("");
	const [walletTouched, setWalletTouched] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const submittedLock = (0, import_react.useRef)(false);
	const setTask = (0, import_react.useCallback)((id, patch) => {
		const apply = (prev) => ({
			...prev,
			...patch
		});
		if (id === "like") setLike(apply);
		if (id === "reply") setReply(apply);
		if (id === "repost") setRepost(apply);
	}, []);
	const openXTask = (0, import_react.useCallback)((id) => {
		const url = xActionUrl(id);
		if (url) window.open(url, "_blank", "noopener,noreferrer");
		if (id !== "quote") setTask(id, {
			opened: true,
			error: null
		});
	}, [setTask]);
	const verifyXTask = (0, import_react.useCallback)(async (id) => {
		setTask(id, {
			verifying: true,
			error: null
		});
		const result = await (id === "like" ? verifyLike : id === "reply" ? verifyReply : verifyRepost)();
		if (result.ok) setTask(id, {
			verifying: false,
			verified: true,
			error: null
		});
		else setTask(id, {
			verifying: false,
			verified: false,
			error: result.error ?? "Could not verify this action. A click is not proof."
		});
	}, [setTask]);
	const setUsername = (0, import_react.useCallback)((value) => {
		setUsernameState(value);
		setUsernameVerified(false);
		setUsernameErr(null);
	}, []);
	const submitUsername = (0, import_react.useCallback)(() => {
		const error = usernameError(username);
		if (error) {
			setUsernameVerified(false);
			setUsernameErr(error);
			return;
		}
		setUsernameErr(null);
		setUsernameVerified(true);
	}, [username]);
	const setQuoteUrl = (0, import_react.useCallback)((value) => {
		setQuoteUrlState(value);
		setQuoteVerified(false);
		setQuoteError(null);
	}, []);
	const verifyQuote = (0, import_react.useCallback)(() => {
		const error = quoteLinkError(quoteUrl);
		if (error) {
			setQuoteVerified(false);
			setQuoteError(error);
			return;
		}
		setQuoteError(null);
		setQuoteVerified(true);
	}, [quoteUrl]);
	const completedCount = (0, import_react.useMemo)(() => {
		return [
			usernameVerified,
			like.verified,
			reply.verified,
			repost.verified,
			quoteVerified
		].filter(Boolean).length;
	}, [
		usernameVerified,
		like.verified,
		reply.verified,
		repost.verified,
		quoteVerified
	]);
	const allTasksDone = completedCount === 5;
	const walletValid = isValidWallet(wallet);
	const canSubmit = allTasksDone && walletValid && !submitting && !submittedLock.current;
	const submit = (0, import_react.useCallback)(async () => {
		if (submittedLock.current || submitting) return;
		const handleOk = usernameVerified && isValidXUsername(username);
		const quoted = quoteVerified && isValidXPostUrl(quoteUrl);
		const payload = {
			walletAddress: wallet.trim(),
			xUsername: username.trim(),
			tasks: {
				usernameSubmitted: handleOk,
				liked: like.verified,
				replied: reply.verified,
				reposted: repost.verified,
				quoted
			},
			quoteUrl: quoteUrl.trim(),
			submittedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (!payload.tasks.usernameSubmitted || !payload.tasks.liked || !payload.tasks.replied || !payload.tasks.reposted || !payload.tasks.quoted || !isValidWallet(payload.walletAddress)) {
			setSubmitError("Finish every mission and enter a valid wallet.");
			setWalletTouched(true);
			if (!handleOk) setUsernameErr(usernameError(username) ?? "Please enter your X username.");
			if (!quoted) setQuoteError(quoteLinkError(quoteUrl) ?? "Please enter your X post link.");
			return;
		}
		submittedLock.current = true;
		setSubmitting(true);
		setSubmitError(null);
		const result = await submitWaitlist(payload);
		if (result.ok) setSuccess(payload);
		else {
			submittedLock.current = false;
			setSubmitError(result.error ?? "Submission failed.");
		}
		setSubmitting(false);
	}, [
		like.verified,
		quoteUrl,
		quoteVerified,
		reply.verified,
		repost.verified,
		submitting,
		username,
		usernameVerified,
		wallet
	]);
	return {
		like,
		reply,
		repost,
		username,
		usernameError: usernameErr,
		usernameDone: usernameVerified,
		quoteUrl,
		quoteError,
		quoteDone: quoteVerified,
		wallet,
		walletTouched,
		submitting,
		submitError,
		success,
		completedCount,
		allTasksDone,
		canSubmit,
		postConfigured: isPinnedPostConfigured(),
		openXTask,
		verifyXTask,
		submitUsername,
		setUsername,
		verifyQuote,
		setQuoteUrl,
		setWallet,
		setWalletTouched,
		submit
	};
}
function WaitlistPage() {
	const flow = useWaitlistFlow();
	if (flow.success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessState, {
		wallet: flow.success.walletAddress,
		xUsername: flow.success.xUsername,
		quoteUrl: flow.success.quoteUrl
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistHero, { completed: flow.completedCount }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-subtle",
				children: "Demo mode is on. Verify is for testing the page — it does not confirm a real like, reply, or repost on X."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-10 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "fossil-crack w-full max-w-md opacity-50"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "missions-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.65rem] uppercase tracking-[0.18em] text-subtle",
						children: "Missions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "missions-heading",
						className: "arcade-title mt-1 text-sm text-foreground sm:text-base",
						children: "Task checklist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsernameTaskCard, {
								username: flow.username,
								done: flow.usernameDone,
								error: flow.usernameError,
								onChange: flow.setUsername,
								onSubmit: flow.submitUsername
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XTaskCard, {
								num: "02",
								title: "Like",
								instruction: "Like the pinned post",
								actionLabel: "Like post",
								taskId: "like",
								state: flow.like,
								disabledAction: !flow.postConfigured && false,
								onAction: () => flow.openXTask("like"),
								onVerify: () => flow.verifyXTask("like")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XTaskCard, {
								num: "03",
								title: "Reply",
								instruction: "Reply to the pinned post",
								actionLabel: "Reply",
								taskId: "reply",
								state: flow.reply,
								disabledAction: !flow.postConfigured && false,
								onAction: () => flow.openXTask("reply"),
								onVerify: () => flow.verifyXTask("reply")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XTaskCard, {
								num: "04",
								title: "Repost",
								instruction: "Repost the pinned post",
								actionLabel: "Repost",
								taskId: "repost",
								state: flow.repost,
								disabledAction: !flow.postConfigured && false,
								onAction: () => flow.openXTask("repost"),
								onVerify: () => flow.verifyXTask("repost")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteTaskCard, {
								quoteUrl: flow.quoteUrl,
								done: flow.quoteDone,
								error: flow.quoteError,
								disabledAction: !flow.postConfigured && false,
								onQuote: () => flow.openXTask("quote"),
								onChange: flow.setQuoteUrl,
								onVerify: flow.verifyQuote
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinnedPost, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletInput, {
					unlocked: flow.allTasksDone,
					value: flow.wallet,
					touched: flow.walletTouched,
					onChange: flow.setWallet,
					onBlur: () => flow.setWalletTouched(true),
					onConnected: (addr) => {
						flow.setWallet(addr);
						flow.setWalletTouched(true);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistSubmit, {
				enabled: flow.canSubmit,
				submitting: flow.submitting,
				error: flow.submitError,
				onSubmit: flow.submit
			})
		]
	});
}
function WaitlistShell() {
	const { ready, verified } = useCaptcha();
	const showWaitlist = ready && verified;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/hero-poster.jpg",
				alt: "",
				className: "h-full w-full object-cover"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoShadowLayer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "top",
			className: "relative z-10 min-h-screen bg-gradient-to-b from-transparent via-background/80 to-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: showWaitlist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistPage, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-[70vh]",
					"aria-hidden": true
				}) }),
				showWaitlist && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})
	] });
}
function WaitlistRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistShell, {});
}
//#endregion
export { WaitlistRoute as component };
