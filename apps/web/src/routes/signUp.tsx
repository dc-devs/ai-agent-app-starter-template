import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';
import { Separator } from '~/components/ui/separator';

// Helper component to display field errors
function FieldError({ error }: { error?: string }) {
	if (!error) return null;
	return (
		<div className="text-sm font-medium text-destructive mt-1">{error}</div>
	);
}

const SignUpPage = () => {
	const [submissionError, setSubmissionError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			termsAccepted: false,
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
		<div className="container mx-auto flex flex-col items-center justify-center py-10 px-4">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Create your account
					</h1>
					<p className="text-muted-foreground text-sm">
						Enter your information to get started
					</p>
				</div>

				<div className="bg-card/30 p-8 border rounded-xl shadow-sm">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-5"
					>
						{/* Full Name Field */}
						<div className="space-y-2">
							<form.Field
								name="fullName"
								validators={{
									onChange: ({ value }) =>
										!value
											? 'Full name is required'
											: value.length < 2
												? 'Full name must be at least 2 characters'
												: undefined,
								}}
							>
								{(field) => (
									<>
										<label
											htmlFor={field.name}
											className="text-sm font-medium leading-none"
										>
											Full Name
										</label>
										<Input
											id={field.name}
											name={field.name}
											placeholder="John Doe"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
											className={
												field.state.meta.errors.length
													? 'border-destructive'
													: ''
											}
										/>
										<FieldError
											error={field.state.meta.errors[0]}
										/>
									</>
								)}
							</form.Field>
						</div>

						{/* Email Field */}
						<div className="space-y-2">
							<form.Field
								name="email"
								validators={{
									onChange: ({ value }) => {
										if (!value) return 'Email is required';
										const emailRegex =
											/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
										return !emailRegex.test(value)
											? 'Please enter a valid email address'
											: undefined;
									},
								}}
							>
								{(field) => (
									<>
										<label
											htmlFor={field.name}
											className="text-sm font-medium leading-none"
										>
											Email
										</label>
										<Input
											id={field.name}
											name={field.name}
											type="email"
											placeholder="john.doe@example.com"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
											className={
												field.state.meta.errors.length
													? 'border-destructive'
													: ''
											}
										/>
										<FieldError
											error={field.state.meta.errors[0]}
										/>
									</>
								)}
							</form.Field>
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<form.Field
								name="password"
								validators={{
									onChange: ({ value }) => {
										if (!value)
											return 'Password is required';
										return value.length < 8
											? 'Password must be at least 8 characters'
											: undefined;
									},
								}}
							>
								{(field) => (
									<>
										<label
											htmlFor={field.name}
											className="text-sm font-medium leading-none"
										>
											Password
										</label>
										<Input
											id={field.name}
											name={field.name}
											type="password"
											placeholder="••••••••"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
											className={
												field.state.meta.errors.length
													? 'border-destructive'
													: ''
											}
										/>
										<FieldError
											error={field.state.meta.errors[0]}
										/>
										<p className="text-xs text-muted-foreground mt-1">
											Must be at least 8 characters
										</p>
									</>
								)}
							</form.Field>
						</div>

						{/* Confirm Password Field */}
						<div className="space-y-2">
							<form.Field
								name="confirmPassword"
								validators={{
									onChangeListenTo: ['password'],
									onChange: ({ value, fieldApi }) => {
										if (
											value !==
											fieldApi.form.getFieldValue(
												'password',
											)
										) {
											return 'Passwords do not match';
										}
										return undefined;
									},
								}}
							>
								{(field) => (
									<>
										<label
											htmlFor={field.name}
											className="text-sm font-medium leading-none"
										>
											Confirm Password
										</label>
										<Input
											id={field.name}
											name={field.name}
											type="password"
											placeholder="••••••••"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
											className={
												field.state.meta.errors.length
													? 'border-destructive'
													: ''
											}
										/>
										<FieldError
											error={field.state.meta.errors[0]}
										/>
									</>
								)}
							</form.Field>
						</div>

						{/* Terms & Conditions Checkbox */}
						<form.Field
							name="termsAccepted"
							validators={{
								onChange: ({ value }) =>
									!value
										? 'You must accept the terms and conditions'
										: undefined,
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox
											id={field.name}
											name={field.name}
											checked={field.state.value}
											onChange={(e) => {
												field.handleChange(
													e.target.checked,
												);
											}}
										/>
										<label
											htmlFor={field.name}
											className={`text-sm ${field.state.meta.errors.length ? 'text-destructive' : ''}`}
										>
											I agree to the{' '}
											<Link
												to="/"
												className="underline text-primary"
											>
												Terms of Service
											</Link>{' '}
											and{' '}
											<Link
												to="/"
												className="underline text-primary"
											>
												Privacy Policy
											</Link>
										</label>
									</div>
									<FieldError
										error={field.state.meta.errors[0]}
									/>
								</div>
							)}
						</form.Field>

						{/* Display form-wide submission error */}
						{submissionError && (
							<div className="text-sm font-medium text-destructive">
								{submissionError}
							</div>
						)}

						{/* Submit Button */}
						<form.Subscribe
							selector={(state) => [
								state.canSubmit,
								state.isSubmitting,
							]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									className="w-full mt-6"
									disabled={!canSubmit || isSubmitting}
								>
									{isSubmitting
										? 'Creating Account...'
										: 'Create Account'}
								</Button>
							)}
						/>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-4 grid grid-cols-2 gap-3">
							<Button
								variant="outline"
								type="button"
								className="w-full"
							>
								<svg
									className="mr-2"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
								Facebook
							</Button>
							<Button
								variant="outline"
								type="button"
								className="w-full"
							>
								<svg
									className="mr-2"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
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
							</Button>
						</div>
					</div>

					<div className="mt-6 text-center text-sm">
						Already have an account?{' '}
						<Link
							to="/"
							className="font-medium text-primary hover:underline"
						>
							Log in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/signUp')({
	component: SignUpPage,
});
