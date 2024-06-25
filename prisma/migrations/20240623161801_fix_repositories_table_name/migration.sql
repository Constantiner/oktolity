ALTER TABLE IF EXISTS "GitgubRepository" RENAME TO "GitHubRepository";

ALTER TABLE IF EXISTS "GitHubRepository" RENAME CONSTRAINT "GitgubRepository_pkey" TO "GitHubRepository_pkey";

-- RenameForeignKey
ALTER TABLE IF EXISTS "_GitgubRepositoryToTag" RENAME CONSTRAINT "_GitgubRepositoryToTag_A_fkey" TO "_GitHubRepositoryToTag_A_fkey";

-- RenameForeignKey
ALTER TABLE IF EXISTS "_GitgubRepositoryToUser" RENAME CONSTRAINT "_GitgubRepositoryToUser_A_fkey" TO "_GitHubRepositoryToUser_A_fkey";

ALTER TABLE IF EXISTS "_GitgubRepositoryToTag" RENAME TO "_GitHubRepositoryToTag";

-- RenameForeignKey
ALTER TABLE IF EXISTS "_GitHubRepositoryToTag" RENAME CONSTRAINT "_GitgubRepositoryToTag_B_fkey" TO "_GitHubRepositoryToTag_B_fkey";

ALTER TABLE IF EXISTS "_GitgubRepositoryToUser" RENAME TO "_GitHubRepositoryToUser";

-- RenameForeignKey
ALTER TABLE IF EXISTS "_GitHubRepositoryToUser" RENAME CONSTRAINT "_GitgubRepositoryToUser_B_fkey" TO "_GitHubRepositoryToUser_B_fkey";

ALTER INDEX IF EXISTS "GitgubRepository_repoId_key" RENAME TO "GitHubRepository_repoId_key";
ALTER INDEX IF EXISTS "_GitgubRepositoryToTag_AB_unique" RENAME TO "_GitHubRepositoryToTag_AB_unique";
ALTER INDEX IF EXISTS "_GitgubRepositoryToTag_B_index" RENAME TO "_GitHubRepositoryToTag_B_index";
ALTER INDEX IF EXISTS "_GitgubRepositoryToUser_AB_unique" RENAME TO "_GitHubRepositoryToUser_AB_unique";
ALTER INDEX IF EXISTS "_GitgubRepositoryToUser_B_index" RENAME TO "_GitHubRepositoryToUser_B_index";
