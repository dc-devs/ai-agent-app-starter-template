import { Button } from '~/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Main content */}
			<div className="max-w-6xl mx-auto flex-1 grid md:grid-cols-2 gap-8 py-12 px-4">
				{/* Left side - Hero */}
				<div className="flex flex-col justify-start md:justify-center md:pt-0 pt-8 space-y-6">
					<div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm w-fit">
						AI Agent Starter Template
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
						Starter template for your AI Agents
					</h1>
					<p className="text-lg text-muted-foreground">
						Streamline your full stack AI Agent development with
						this starter template.
					</p>
					<div className="pt-4">
						<Button size="lg" className="px-8 cursor-pointer">
							Get started
						</Button>
					</div>
				</div>

				{/* Right side - Card */}
				<div className="flex items-center justify-center">
					<div className="w-full max-w-md bg-card/50 p-6 rounded-xl shadow-sm border relative">
						<div className="bg-primary/10 p-6 rounded-xl mb-4">
							<h2 className="text-2xl font-semibold mb-2">
								AI Agent Chat
							</h2>
							<div className="flex items-center text-sm text-muted-foreground mb-6">
								<span>
									Build intelligent assistants with your data
								</span>
							</div>

							<div className="space-y-4">
								{/* Chat messages */}
								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
										U
									</div>
									<div className="bg-muted/50 rounded-lg p-3 text-sm max-w-[70%]">
										Can you analyze our Q2 sales data?
									</div>
								</div>

								<div className="flex items-start gap-3 flex-row-reverse">
									<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
										AI
									</div>
									<div className="bg-primary/10 rounded-lg p-3 text-sm max-w-[70%]">
										I've analyzed the Q2 sales data. Revenue
										is up 18% from Q1, with the strongest
										growth in enterprise subscriptions.
									</div>
								</div>

								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
										U
									</div>
									<div className="bg-muted/50 rounded-lg p-3 text-sm max-w-[70%]">
										What actions should we take?
									</div>
								</div>

								{/* Input field */}
								<div className="relative mt-6">
									<input
										type="text"
										className="w-full rounded-full pl-4 pr-12 py-2 bg-background border text-sm"
										placeholder="Type your message..."
									/>
									<Button
										size="icon"
										className="absolute right-1 top-1 h-7 w-7 rounded-full cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											className="w-4 h-4"
										>
											<path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
										</svg>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/')({
	component: Home,
});
