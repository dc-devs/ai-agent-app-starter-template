import { useState } from 'react';
import { Separator } from '~/components/ui/separator';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import {
	useAuthForm,
	emailValidator,
	passwordValidator,
	EmailField,
	PasswordField,
} from './AuthFormContext';

export const SignUpForm = () => {
	const [submissionError, setSubmissionError] = useState<string | null>(null);

	const form = useAuthForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			// Clear any previous errors
			setSubmissionError(null);

			try {
				// Here you would typically make an API call to register the user
				console.log('Form submitted successfully:', value);
				// Simulate API call success
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Optional: redirect the user after successful signup
				// navigate('/welcome');
			} catch (error) {
				console.error('Error submitting form:', error);
				setSubmissionError(
					'There was an error creating your account. Please try again.',
				);
			}
		},
	});

	return (
		<div className="bg-card/30 p-8 border rounded-xl shadow-sm">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-5"
			>
				{/* Email Field */}
				<div className="space-y-2">
					<form.Field
						name="email"
						validators={{
							onChange: emailValidator,
						}}
					>
						{(field) => <EmailField field={field} />}
					</form.Field>
				</div>

				{/* Password Field */}
				<div className="space-y-2">
					<form.Field
						name="password"
						validators={{
							onChange: passwordValidator,
						}}
					>
						{(field) => <PasswordField field={field} />}
					</form.Field>
				</div>

				{/* Display form-wide submission error */}
				{submissionError && (
					<div className="text-sm font-medium text-destructive">
						{submissionError}
					</div>
				)}

				{/* Submit Button */}
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							className="w-full mt-6 cursor-pointer"
							disabled={!canSubmit || isSubmitting}
						>
							{isSubmitting
								? 'Creating Account...'
								: 'Create Account'}
						</Button>
					)}
				</form.Subscribe>
			</form>

			<div className="mt-8">
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<Separator className="w-full" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							or continue with
						</span>
					</div>
				</div>

				<div className="mt-6 mb-4 grid grid-cols-1 gap-3">
					<button
						type="button"
						className="flex w-full items-center justify-center gap-2 rounded-md border py-3 px-3 text-sm shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
					>
						<svg
							className="h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Google
					</button>
				</div>
			</div>

			<div className="mt-6 text-center text-sm">
				Already have an account?{' '}
				<Link
					to="/login"
					className="font-medium text-primary hover:underline"
				>
					Log in
				</Link>
			</div>
		</div>
	);
};
