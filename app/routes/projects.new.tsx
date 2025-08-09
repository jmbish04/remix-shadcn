import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { title } from "@/config.shared";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: title("New Project") },
		{ name: "description", content: "Create a new project" },
	];
};

export async function action({ request, context }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name");
	const description = formData.get("description");

	if (typeof name !== "string" || name.length === 0) {
		return new Response("Project name is required", { status: 400 });
	}

	const db = context.cloudflare.env.DB;
	try {
		await db
			.prepare("INSERT INTO projects (name, description) VALUES (?, ?)")
			.bind(name, description)
			.run();
	} catch (error) {
		console.error(error);
		return new Response("An error occurred while creating the project", {
			status: 500,
		});
	}

	return redirect("/projects");
}

export default function NewProject() {
	return (
		<main className="container prose py-8">
			<h1>Create a New Project</h1>
			<Form method="post" className="space-y-4">
				<div>
					<Label htmlFor="name">Project Name</Label>
					<Input type="text" id="name" name="name" required />
				</div>
				<div>
					<Label htmlFor="description">Description</Label>
					<Input type="text" id="description" name="description" />
				</div>
				<Button type="submit">Create Project</Button>
			</Form>
		</main>
	);
}
