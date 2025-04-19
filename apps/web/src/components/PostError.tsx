import { ErrorComponent, ErrorComponentProps } from '@tanstack/react-router';

export const PostErrorComponent = ({ error }: ErrorComponentProps) => {
	return <ErrorComponent error={error} />;
};
