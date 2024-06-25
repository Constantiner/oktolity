import { createDataComposer } from "@/lib/dataComposer";
import { createTRPCRouter, protectedGithubApiProcedure, protectedProcedure } from "@/server/api/trpc";
import { parseISO } from "date-fns";
import { Octokit } from "octokit";
import "server-only";

export type GutHubRepoId = number;

export type GitHubRepo = {
	id: GutHubRepoId;
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
	listAll: protectedGithubApiProcedure.query(async ({ ctx }) => {
		const octokit = new Octokit({ auth: ctx.session.access_token });
		const response = await octokit.paginate(octokit.rest.activity.listReposStarredByAuthenticatedUser, {
			per_page: 100
		});
		return response.map<GitHubRepo>(repo =>
			createDataComposer<GitHubRepo>({
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
	}),
	listFavorites: protectedProcedure.query(async ({ ctx }) => {
		const favoriteStarredRepositories = await ctx.db.gitHubRepository.findMany({
			where: {
				usersAddedToFavorites: {
					some: {
						id: ctx.session.user.id
					}
				}
			},
			select: {
				repoId: true
			}
		});
		return favoriteStarredRepositories.map(repo => repo.repoId);
	}),
	listTags: protectedProcedure.query(async ({ ctx }) => {
		const tags = await ctx.db.tag.findMany({
			where: {
				createdById: ctx.session.user.id
			},
			omit: {
				createdById: true
			}
		});
		return tags;
	})
});
