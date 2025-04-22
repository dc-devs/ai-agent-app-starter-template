import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

export const MainMobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild className="md:hidden">
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="4" x2="20" y1="12" y2="12" />
						<line x1="4" x2="20" y1="6" y2="6" />
						<line x1="4" x2="20" y1="18" y2="18" />
					</svg>
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="w-[80%] sm:w-[385px] pt-12 px-6"
			>
				<Link to="/" className="flex items-center gap-2 mb-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-5 w-5 text-primary"
					>
						<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
					</svg>
					<span className="text-base font-semibold">
						Agent Starter
					</span>
				</Link>
				<nav className="flex flex-col gap-5">
					<Link
						to="/"
						className="text-muted-foreground text-xs font-medium px-4 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Features
					</Link>
					<Link
						to="/"
						className="text-muted-foreground text-xs font-medium px-4 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Pricing
					</Link>
					<Link
						to="/"
						className="text-muted-foreground text-xs font-medium px-4 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Resources
					</Link>
					<Link
						to="/"
						className="text-muted-foreground text-xs font-medium px-4 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Help
					</Link>
					<Link
						to="/"
						className="text-muted-foreground text-xs font-medium px-4 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Contact
					</Link>
					<div className="flex flex-col gap-3 mt-4">
						<Button
							variant="outline"
							className="w-full justify-start text-xs font-medium h-9 px-6"
							onClick={() => setIsOpen(false)}
						>
							Log In
						</Button>
						<Button
							className="w-full justify-start text-xs font-medium h-9 px-6"
							onClick={() => setIsOpen(false)}
						>
							Sign Up
						</Button>
					</div>
				</nav>
			</SheetContent>
		</Sheet>
	);
};
