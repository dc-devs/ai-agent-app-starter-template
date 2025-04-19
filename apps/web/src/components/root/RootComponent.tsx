import { Outlet } from '@tanstack/react-router';
import { RootDocument } from '~/components/root/RootDocument';

export const RootComponent = () => {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
};
