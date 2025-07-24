-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
