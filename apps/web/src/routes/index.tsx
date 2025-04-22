import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Main content */}
			<div className="max-w-5xl mx-auto flex-1 grid md:grid-cols-2 gap-8 px-4 py-12">
				{/* Left side - Hero */}
				<div className="flex flex-col justify-center space-y-6">
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
						<Button size="lg" className="px-8">
							Get started
						</Button>
					</div>

					{/* Graph illustration (simplified) */}
					<div className="h-12 flex items-end gap-1 mt-8 opacity-30">
						{[
							1, 2, 3, 2, 4, 3, 5, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5,
							6, 4, 3,
						].map((height, i) => (
							<div
								key={i}
								className="bg-primary/70 w-2 rounded-t"
								style={{ height: `${height * 8}px` }}
							></div>
						))}
					</div>
				</div>

				{/* Right side - Card */}
				<div className="flex items-center justify-center">
					<div className="w-full max-w-md bg-card/50 p-6 rounded-xl shadow-sm border relative">
						<div className="bg-primary/10 p-6 rounded-xl mb-4">
							<h2 className="text-2xl font-semibold mb-2">
								Sales Analytics
							</h2>
							<div className="flex items-center text-sm text-muted-foreground mb-6">
								<span>Great results with</span>
								<span className="text-emerald-500 font-medium mx-1">
									+12%
								</span>
								<span>vs last month</span>
							</div>

							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-primary rounded-full"></div>
											<span className="text-muted-foreground text-sm">
												Amazon
											</span>
										</div>
										<p className="text-2xl font-semibold mt-1">
											$61,342
										</p>
										<p className="text-sm text-muted-foreground">
											1,237 sales
										</p>
									</div>
									<div className="relative h-20 w-20">
										<div className="h-20 w-20 rounded-full border-8 border-primary/10 absolute"></div>
										<div
											className="h-20 w-20 rounded-full border-8 border-transparent border-t-primary border-r-primary/70 absolute"
											style={{
												transform: 'rotate(45deg)',
											}}
										></div>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-primary/60 rounded-full"></div>
											<span className="text-muted-foreground text-sm">
												Ebay
											</span>
										</div>
										<p className="text-2xl font-semibold mt-1">
											$44,768
										</p>
										<p className="text-sm text-muted-foreground">
											921 sales
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
