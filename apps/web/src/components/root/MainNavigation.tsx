import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover';
import { Menu } from 'lucide-react';

export const MainNavigation = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<Link to="/" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
							A
						</div>
						<span className="font-semibold">AICompany</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
					{/* Navigation links removed */}
				</nav>

				{/* Mobile Navigation */}
				<Sheet>
					<SheetTrigger asChild className="md:hidden">
						<Button variant="ghost" size="icon" className="h-9 w-9">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-6">
						<Link to="/" className="flex items-center gap-2 mb-8">
							<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
								A
							</div>
							<span className="font-semibold">AICompany</span>
						</Link>
						<nav className="flex flex-col gap-4">
							{/* Navigation links removed */}
							<div className="flex flex-col gap-2">
								<Button
									variant="outline"
									className="justify-start"
								>
									Sign in
								</Button>
								<Button className="justify-start">
									Sign up
								</Button>
							</div>
						</nav>
					</SheetContent>
				</Sheet>

				<div className="flex items-center gap-2">
					<div className="hidden sm:flex">
						<Button variant="outline" size="sm" className="mr-2">
							Sign in
						</Button>
						<Button size="sm">Sign up</Button>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-9 w-9 sm:hidden rounded-full"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src="" alt="User" />
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-40 p-2" align="end">
							<div className="flex flex-col gap-1">
								<Button
									variant="ghost"
									size="sm"
									className="justify-start"
								>
									Sign in
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="justify-start"
								>
									Sign up
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	);
};
