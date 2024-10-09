-- CreateTable
CREATE TABLE "Participant" (
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("name", "projectId"),
    CONSTRAINT "Participant_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" INTEGER NOT NULL,
    "fromName" TEXT NOT NULL,
    "toName" TEXT NOT NULL,
    "participantName" TEXT,
    "participantProjectId" INTEGER,
    CONSTRAINT "Assignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_fromName_projectId_fkey" FOREIGN KEY ("fromName", "projectId") REFERENCES "Participant" ("name", "projectId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_toName_projectId_fkey" FOREIGN KEY ("toName", "projectId") REFERENCES "Participant" ("name", "projectId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_participantName_participantProjectId_fkey" FOREIGN KEY ("participantName", "participantProjectId") REFERENCES "Participant" ("name", "projectId") ON DELETE SET NULL ON UPDATE CASCADE
);
