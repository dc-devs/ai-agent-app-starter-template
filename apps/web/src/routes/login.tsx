import { createFileRoute } from '@tanstack/react-router';
import { LogInForm } from '~/components/auth/LoginForm';

const LogInPage = () => {
	return (
		<div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-10 px-4">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Log in to your account
					</h1>
					<p className="text-muted-foreground text-sm">
						Enter your credentials to access your account
					</p>
				</div>

				<LogInForm />
			</div>
		</div>
	);
};

export const Route = createFileRoute('/login')({
	component: LogInPage,
});
