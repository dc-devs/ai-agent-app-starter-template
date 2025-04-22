import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

export const MainNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center">
					<Link to="/" className="flex items-center gap-2 mr-8">
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

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center">
						<div className="flex items-center gap-7 text-xs font-medium text-muted-foreground">
							<Link to="/" className="hover:text-foreground">
								Features
							</Link>
							<Link to="/" className="hover:text-foreground">
								Pricing
							</Link>
							<Link to="/" className="hover:text-foreground">
								Resources
							</Link>
							<Link to="/" className="hover:text-foreground">
								Help
							</Link>
							<Link to="/" className="hover:text-foreground">
								Contact
							</Link>
						</div>
					</nav>
				</div>

				{/* Auth Buttons - Desktop */}
				<div className="hidden md:flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						className="h-8 px-3 rounded-md text-xs"
					>
						Log In
					</Button>
					<Button size="sm" className="h-8 px-3 rounded-md text-xs">
						Sign Up
					</Button>
				</div>

				{/* Mobile Navigation */}
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
						className="w-[80%] sm:w-[385px] pt-12"
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
								className="text-foreground text-sm font-medium px-1 py-2 hover:text-primary"
								onClick={() => setIsOpen(false)}
							>
								Features
							</Link>
							<Link
								to="/"
								className="text-foreground text-sm font-medium px-1 py-2 hover:text-primary"
								onClick={() => setIsOpen(false)}
							>
								Pricing
							</Link>
							<Link
								to="/"
								className="text-foreground text-sm font-medium px-1 py-2 hover:text-primary"
								onClick={() => setIsOpen(false)}
							>
								Resources
							</Link>
							<Link
								to="/"
								className="text-foreground text-sm font-medium px-1 py-2 hover:text-primary"
								onClick={() => setIsOpen(false)}
							>
								Help
							</Link>
							<Link
								to="/"
								className="text-foreground text-sm font-medium px-1 py-2 hover:text-primary"
								onClick={() => setIsOpen(false)}
							>
								Contact
							</Link>
							<div className="flex flex-col gap-3 mt-4">
								<Button
									variant="outline"
									className="w-full justify-start text-xs font-medium h-9"
									onClick={() => setIsOpen(false)}
								>
									Log In
								</Button>
								<Button
									className="w-full justify-start text-xs font-medium h-9"
									onClick={() => setIsOpen(false)}
								>
									Sign Up
								</Button>
							</div>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};
