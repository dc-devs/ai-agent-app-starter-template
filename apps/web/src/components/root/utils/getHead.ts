import appCss from '~/styles/app.css?url';
import { seo } from '~/components/root/utils/seo';

export const getHead = () => ({
	meta: [
		{
			charSet: 'utf-8',
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1',
		},
		...seo({
			title: 'AI Agent Starter Template | Type-Safe, Client-First, Full-Stack React Framework',
			description: `AI Agent Starter Template is a type-safe, client-first, full-stack React framework. `,
		}),
	],
	links: [
		{ rel: 'stylesheet', href: appCss },
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
		{ rel: 'icon', href: '/favicon.ico' },
	],
});
