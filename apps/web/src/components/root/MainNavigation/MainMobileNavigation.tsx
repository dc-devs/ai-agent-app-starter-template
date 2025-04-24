import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

export const MainMobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild className="md:hidden">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 cursor-pointer"
				>
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
				className="w-full sm:w-full p-0"
				closeButton={false}
			>
				<div className="flex items-center justify-between border-b py-3 px-4 relative">
					<Link to="/" className="flex items-center gap-2">
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
						<span className="text-lg font-semibold">
							Agent Starter
						</span>
					</Link>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 cursor-pointer opacity-70 hover:opacity-100"
						onClick={() => setIsOpen(false)}
					>
						<XIcon className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</Button>
				</div>
				<nav className="flex flex-col px-4 pb-3">
					<Link
						to="/"
						className="text-muted-foreground text-base font-light py-2 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Features
					</Link>
					<Link
						to="/"
						className="text-muted-foreground text-base font-light py-2 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Docs
					</Link>
					<Link
						to="/"
						className="text-muted-foreground text-base font-light py-2 hover:text-foreground"
						onClick={() => setIsOpen(false)}
					>
						Demo
					</Link>
					<div className="flex flex-col gap-3 mt-4">
						<Link to="/login">
							<Button
								variant="outline"
								className="w-full justify-center text-base font-medium h-9 px-6 text-primary border-primary cursor-pointer"
								onClick={() => setIsOpen(false)}
							>
								Log In
							</Button>
						</Link>
						<Link to="/signUp">
							<Button
								className="w-full justify-center text-base font-medium h-9 px-6 cursor-pointer"
								onClick={() => setIsOpen(false)}
							>
								Sign Up
							</Button>
						</Link>
					</div>
				</nav>
			</SheetContent>
		</Sheet>
	);
};
