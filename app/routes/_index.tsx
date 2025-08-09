import { Button } from "@/components/ui/button";
import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: title("Mission Control") },
		{ name: "description", content: "Vibe Coder Mission Control" },
	];
};

export default function Index() {
	return (
		<main className="container prose py-8">
			<h1>Vibe Coder Mission Control</h1>
			<p>
				Welcome to the Vibe Coder Mission Control. From here, you can manage all
				of your agentic software development projects.
			</p>
			<Button asChild>
				<Link to="/projects/new">Create New Project</Link>
			</Button>
		</main>
	);
}
