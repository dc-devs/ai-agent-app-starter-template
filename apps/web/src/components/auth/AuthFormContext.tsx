import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Input } from '~/components/ui/input';

// Helper component to display field errors
export const FieldError = ({ error }: { error?: string }) => {
	if (!error) return null;
	return (
		<div className="text-sm font-medium text-destructive mt-1">{error}</div>
	);
};

// Field interface for type safety
interface FieldProps {
	name: string;
	handleChange: (value: string) => void;
	handleBlur: () => void;
	state: {
		value: string;
		meta: {
			errors: (string | undefined)[]; // More specific than any[]
		};
	};
}

// Field components take field as a prop
export const EmailField = ({
	field,
	label = 'Email',
}: {
	field: FieldProps;
	label?: string;
}) => (
	<>
		<label
			htmlFor={field.name}
			className="text-sm font-medium leading-none"
		>
			{label}
		</label>
		<Input
			id={field.name}
			name={field.name}
			type="email"
			placeholder="john.doe@example.com"
			value={field.state.value}
			onChange={(e) => field.handleChange(e.target.value)}
			onBlur={field.handleBlur}
			className={
				field.state.meta.errors.length ? 'border-destructive' : ''
			}
		/>
		<FieldError error={field.state.meta.errors[0]} />
	</>
);

export const PasswordField = ({
	field,
	label = 'Password',
}: {
	field: FieldProps;
	label?: string;
}) => (
	<>
		<label
			htmlFor={field.name}
			className="text-sm font-medium leading-none"
		>
			{label}
		</label>
		<Input
			id={field.name}
			name={field.name}
			type="password"
			placeholder="••••••••"
			value={field.state.value}
			onChange={(e) => field.handleChange(e.target.value)}
			onBlur={field.handleBlur}
			className={
				field.state.meta.errors.length ? 'border-destructive' : ''
			}
		/>
		<FieldError error={field.state.meta.errors[0]} />
	</>
);

// Create form contexts
const { fieldContext, formContext } = createFormHookContexts();

// Create custom form hook with pre-bound components
export const { useAppForm: useAuthForm, withForm: withAuthForm } =
	createFormHook({
		fieldComponents: {},
		formComponents: {},
		fieldContext,
		formContext,
	});

// Common email validator
export const emailValidator = ({ value }: { value: string }) => {
	if (!value) return 'Email is required';
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return !emailRegex.test(value)
		? 'Please enter a valid email address'
		: undefined;
};

// Common password validator
export const passwordValidator = ({ value }: { value: string }) => {
	if (!value) return 'Password is required';
	return value.length < 8
		? 'Password must be at least 8 characters'
		: undefined;
};
