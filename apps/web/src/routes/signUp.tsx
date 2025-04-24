import { createFileRoute } from '@tanstack/react-router';
import { SignUpForm } from '~/components/auth/SignUpForm';

const SignUpPage = () => {
	return (
		<div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-10 px-4">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Create your account
					</h1>
					<p className="text-muted-foreground text-sm">
						Enter your information to get started
					</p>
				</div>

				<SignUpForm />
			</div>
		</div>
	);
};

export const Route = createFileRoute('/signUp')({
	component: SignUpPage,
});
