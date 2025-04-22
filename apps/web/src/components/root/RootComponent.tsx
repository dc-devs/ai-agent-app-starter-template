import { Outlet } from '@tanstack/react-router';
import { RootDocument } from '~/components/root/RootDocument';
import { MainNavigation } from '~/components/root/MainNavigation/MainNavigation';

export const RootComponent = () => {
	return (
		<RootDocument>
			<MainNavigation />
			<Outlet />
		</RootDocument>
	);
};
