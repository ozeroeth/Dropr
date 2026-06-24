import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { void: '#050713', cyan: '#28f2ff', alpha: '#75ff8a', risk: '#ff486a' }, fontFamily: { sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'] } } }, plugins: [] };
export default config;
