/**
 * EcoQui — app NubeSDK para a vitrine nova da NuvemShop (tema Patagonia).
 *
 * Widgets portados do ecoqui.js clássico:
 *  1. Brinde — barra de recompensa progressiva (slot before_main_content)
 *  2. Página do Produto — visualizando agora, estoque baixo, prova social
 *     (slots before/after_product_detail_add_to_cart)
 *
 * A config vem do mesmo backend/coleções do script clássico:
 *   GET https://autoqui.vps.pequi.digital/storefront/config/:storeId
 */

import { box, column, progress, text } from "@tiendanube/nube-sdk-ui";
import type {
	NubeApp,
	NubeComponent,
	NubeSDK,
	NubeSDKState,
} from "@tiendanube/nube-sdk-types";

const BACKEND = "https://autoqui.vps.pequi.digital";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function brl(n: number): string {
	return `R$ ${(Number(n) || 0).toFixed(2).replace(".", ",")}`;
}

/** Soma dos itens (price em unidades de moeda, ex: "21.00") — imune à dúvida centavos/reais. */
function cartSubtotal(state: Readonly<NubeSDKState>): number {
	const items = state.cart?.items ?? [];
	return items.reduce(
		(sum, it: { price?: unknown; quantity?: number }) =>
			sum + (Number.parseFloat(String(it.price ?? 0)) || 0) * (it.quantity ?? 1),
		0,
	);
}

function tpl(template: string, vars: Record<string, string>): string {
	let out = template || "";
	for (const [key, value] of Object.entries(vars)) {
		out = out.split(`{{${key}}}`).join(value);
	}
	return out;
}

// ─────────────────────────────────────────────────────────────
// 1. Brinde — barra de recompensa
// ─────────────────────────────────────────────────────────────

type RewardCfg = {
	enabled?: boolean;
	threshold?: number;
	rewardLabel?: string;
	couponCode?: string;
	msgBefore?: string;
	msgReached?: string;
	color?: string;
};

function rewardBar(cfg: RewardCfg, subtotal: number): NubeComponent | null {
	const threshold = Number(cfg.threshold) || 0;
	if (subtotal <= 0 || threshold <= 0) return null;

	const color = cfg.color || "#10b981";
	const reached = subtotal >= threshold;

	const message = reached
		? tpl(cfg.msgReached || "🎉 Você desbloqueou {{recompensa}}!", {
				recompensa: cfg.rewardLabel || "",
			})
		: tpl(cfg.msgBefore || "Faltam {{falta}} para ganhar {{recompensa}}! 🎁", {
				falta: brl(threshold - subtotal),
				recompensa: cfg.rewardLabel || "",
			});

	const children: NubeComponent[] = [
		text({
			children: message,
			color: "#ffffff",
			style: { fontWeight: "700", fontSize: "14px", textAlign: "center" },
		}),
	];

	// Cupom com botão de copiar nativo do SDK
	if (reached && cfg.couponCode) {
		children.push(
			text({
				children: cfg.couponCode,
				color: "#ffffff",
				showCopyButton: true,
				style: { fontWeight: "800", letterSpacing: "2px", textAlign: "center" },
			}),
		);
	}

	children.push(
		box({
			width: "60%",
			children: [
				progress({
					value: Math.min(subtotal, threshold),
					max: threshold,
					style: { width: "100%", height: "6px" },
				}),
			],
			justifyContent: "center",
		}),
	);

	return box({
		width: "100%",
		padding: "10px",
		gap: "6px",
		direction: "col",
		alignItems: "center",
		background: color,
		children,
	});
}

function initReward(nube: NubeSDK, cfg: RewardCfg) {
	const render = (state: Readonly<NubeSDKState>) => {
		const bar = rewardBar(cfg, cartSubtotal(state));
		if (bar) nube.render("before_main_content", bar);
		else nube.clearSlot("before_main_content");
	};
	render(nube.getState());
	nube.on("cart:update", render);
	nube.on("location:updated", () => render(nube.getState()));
}

// ─────────────────────────────────────────────────────────────
// 2. Página do Produto — visualizando / estoque / prova social
// ─────────────────────────────────────────────────────────────

type ProductCfg = {
	enabled?: boolean;
	buttonPosition?: "before" | "after";
	viewers?: { enabled?: boolean; min?: number; max?: number; text?: string };
	stock?: { enabled?: boolean; threshold?: number; text?: string };
	social?: { enabled?: boolean; text?: string; counter?: number };
};

function minVariantStock(state: Readonly<NubeSDKState>): number | null {
	const page = state.location?.page;
	if (!page || page.type !== "product") return null;
	const variants = page.data?.product?.variants ?? [];
	let min: number | null = null;
	for (const v of variants) {
		if (!v?.stock_management || v.stock == null) continue;
		if (v.stock > 0 && (min == null || v.stock < min)) min = v.stock;
	}
	return min;
}

function initProduct(nube: NubeSDK, cfg: ProductCfg) {
	const slot =
		cfg.buttonPosition === "after"
			? "after_product_detail_add_to_cart"
			: "before_product_detail_add_to_cart";

	const vMin = Math.max(1, Number(cfg.viewers?.min) || 10);
	const vMax = Math.max(vMin, Number(cfg.viewers?.max) || 40);
	let viewers = Math.floor(vMin + Math.random() * (vMax - vMin + 1));
	// Estoque da variante selecionada (payload do evento), senão o menor da página
	let selectedStock: number | null = null;

	const build = (state: Readonly<NubeSDKState>): NubeComponent | null => {
		if (state.location?.page?.type !== "product") return null;
		const rows: NubeComponent[] = [];

		if (cfg.viewers?.enabled) {
			rows.push(
				text({
					children: tpl(
						cfg.viewers.text || "🔥 {{n}} pessoas estão vendo este produto agora",
						{ n: String(viewers) },
					),
					color: "#e25822",
					style: { fontSize: "14px", fontWeight: "600" },
				}),
			);
		}

		if (cfg.stock?.enabled) {
			const stock = selectedStock ?? minVariantStock(state);
			const limit = Number(cfg.stock.threshold) || 10;
			if (stock != null && stock > 0 && stock <= limit) {
				rows.push(
					text({
						children: tpl(cfg.stock.text || "⚡ Restam apenas {{estoque}} unidades!", {
							estoque: String(stock),
						}),
						color: "#c0392b",
						style: { fontSize: "14px", fontWeight: "700" },
					}),
				);
			}
		}

		if (cfg.social?.enabled) {
			const counter = (Number(cfg.social.counter) || 0).toLocaleString("pt-BR");
			rows.push(
				text({
					children: tpl(
						cfg.social.text || "❤️ Ana e mais {{contador}} pessoas curtem este produto",
						{ contador: counter },
					),
					style: { fontSize: "14px" },
				}),
			);
		}

		if (!rows.length) return null;
		return column({ gap: "4px", margin: "8px", children: rows });
	};

	const render = (state: Readonly<NubeSDKState>) => {
		const widget = build(state);
		if (widget) nube.render(slot, widget);
		else nube.clearSlot(slot);
	};

	render(nube.getState());
	nube.on("location:updated", () => {
		selectedStock = null;
		render(nube.getState());
	});

	// Atualiza o estoque quando o cliente troca a variante (tamanho/cor)
	nube.on("product:variant_selected", (state) => {
		const payload = (state as { payload?: { variant?: { stock?: number | null } } })
			.payload;
		if (payload?.variant && payload.variant.stock != null) {
			selectedStock = Number(payload.variant.stock);
		}
		render(state);
	});

	// Número de "visualizando" varia sozinho
	if (cfg.viewers?.enabled) {
		setInterval(() => {
			viewers = Math.floor(vMin + Math.random() * (vMax - vMin + 1));
			render(nube.getState());
		}, 5000);
	}
}

// ─────────────────────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────────────────────

export const App: NubeApp = async (nube) => {
	try {
		const state = nube.getState();
		const storeId = String(state.store?.id ?? "");
		if (!storeId) return;

		const res = await fetch(`${BACKEND}/storefront/config/${storeId}`);
		if (!res.ok) return;
		const cfg = await res.json();

		if (cfg?.reward?.enabled && Number(cfg.reward.threshold) > 0) {
			initReward(nube, cfg.reward as RewardCfg);
		}
		if (cfg?.product?.enabled) {
			initProduct(nube, cfg.product as ProductCfg);
		}
	} catch {
		// nunca propaga erro para a loja
	}
};
