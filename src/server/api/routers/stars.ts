import { createDataComposer } from "@/lib/dataComposer";
import { createTRPCRouter, protectedGithubApiProcedure } from "@/server/api/trpc";
import { parseISO } from "date-fns";
import { Octokit } from "octokit";

type StarredRepo = {
	id: number;
	name: string;
	fullName: string;
	private: boolean;
	htmlUrl: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	pushedAt?: Date;
	language?: string;
	stargazersCount: number;
	watchersCount: number;
	homepage?: string;
};

export const starsRouter = createTRPCRouter({
	list: protectedGithubApiProcedure.query(async ({ ctx }) => {
		const octokit = new Octokit({ auth: ctx.session.access_token });
		const response = await octokit.paginate(octokit.rest.activity.listReposStarredByAuthenticatedUser, {
			per_page: 100
		});
		return response.map<StarredRepo>(repo =>
			createDataComposer<StarredRepo>({
				id: repo.id,
				name: repo.name,
				fullName: repo.full_name,
				private: repo.private,
				htmlUrl: repo.html_url,
				stargazersCount: repo.stargazers_count,
				watchersCount: repo.watchers_count
			})
				.setString("description", repo.description)
				.setStringTransform("createdAt", repo.created_at, parseISO)
				.setStringTransform("updatedAt", repo.updated_at, parseISO)
				.setStringTransform("pushedAt", repo.pushed_at, parseISO)
				.setString("language", repo.language)
				.setString("homepage", repo.homepage)
				.get()
		);
	})
});
