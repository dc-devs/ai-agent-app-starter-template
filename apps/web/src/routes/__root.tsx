import { getHead } from '~/components/root/utils';
import { NotFound } from '~/components/root/NotFound';
import { createRootRoute } from '@tanstack/react-router';
import { RootDocument, RootComponent } from '~/components/root';
import { DefaultCatchBoundary } from '~/components/root/DefaultCatchBoundary';

export const Route = createRootRoute({
	head: getHead,
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});
