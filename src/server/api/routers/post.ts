import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { Octokit } from "octokit";

export const postRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`
		};
	}),

	create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
		// simulate a slow db call
		await new Promise(resolve => setTimeout(resolve, 1000));

		return ctx.db.post.create({
			data: {
				name: input.name,
				createdBy: { connect: { id: ctx.session.user.id } }
			}
		});
	}),

	getLatest: protectedProcedure.query(async ({ ctx }) => {
		const account = await ctx.db.account.findFirst({
			where: { userId: ctx.session.user.id }
		});
		// eslint-disable-next-line no-console
		console.log("Account", account?.access_token, account?.refresh_token);
		if (account?.access_token) {
			const octokit = new Octokit({ auth: account?.access_token });
			const data = await octokit.rest.activity.listReposStarredByAuthenticatedUser();
			// eslint-disable-next-line no-console
			console.log("Data", data);
		}
		return ctx.db.post.findFirst({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } }
		});
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	})
});
