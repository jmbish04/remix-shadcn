import { title } from "@/config.shared";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

interface Project {
	id: number;
	name: string;
	description: string;
	created_at: string;
}

export const meta: MetaFunction = () => {
	return [{ title: title("Projects") }];
};

export async function loader({ context }: LoaderFunctionArgs) {
	const db = context.cloudflare.env.DB;
	const { results } = await db.prepare("SELECT * FROM projects").all<Project>();
	return json({ projects: results });
}

export default function Projects() {
	const { projects } = useLoaderData<typeof loader>();

	return (
		<main className="container prose py-8">
			<h1>Projects</h1>
			<ul>
				{projects.map((project: Project) => (
					<li key={project.id}>
						<Link to={`/projects/${project.id}`}>{project.name}</Link>
						<p>{project.description}</p>
					</li>
				))}
			</ul>
		</main>
	);
}
