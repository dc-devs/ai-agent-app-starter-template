import { Scripts } from '@tanstack/react-start';
import { HeadContent } from '@tanstack/react-router';
// import { MainNavigation } from '~/components/root/MainNavigation';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const RootDocument = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
};
