/*
  Warnings:

  - You are about to drop the column `participantName` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `participantProjectId` on the `Assignment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" INTEGER NOT NULL,
    "fromName" TEXT NOT NULL,
    "toName" TEXT NOT NULL,
    CONSTRAINT "Assignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_fromName_projectId_fkey" FOREIGN KEY ("fromName", "projectId") REFERENCES "Participant" ("name", "projectId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_toName_projectId_fkey" FOREIGN KEY ("toName", "projectId") REFERENCES "Participant" ("name", "projectId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("fromName", "id", "projectId", "toName") SELECT "fromName", "id", "projectId", "toName" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
