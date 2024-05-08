"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CreatePost(): JSX.Element {
	const router = useRouter();
	const [name, setName] = useState("");

	const createPost = api.post.create.useMutation({
		onSuccess: () => {
			router.refresh();
			setName("");
		}
	});

	return (
		<form
			onSubmit={event_ => {
				event_.preventDefault();
				createPost.mutate({ name });
			}}
			className="flex flex-col gap-2"
		>
			<Input type="text" placeholder="Title" value={name} onChange={event_ => setName(event_.target.value)} />
			<Button variant="secondary" type="submit" disabled={createPost.isPending}>
				{createPost.isPending ? "Submitting..." : "Submit"}
			</Button>
		</form>
	);
}
