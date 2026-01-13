import prisma from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Get all applicants for a specific job
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params;
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    // Get the job and verify the user owns the company
    const job = await prisma.openings.findUnique({
      where: { id: jobId },
      include: {
        company: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    console.log("Job company ownerId:", job.company.ownerId);
    console.log("Decoded userId:", decoded.id);

    if (job.company.ownerId !== decoded.id) {
      return NextResponse.json(
        { error: "You can only view applicants for your own jobs" },
        { status: 403 }
      );
    }

    // Get all applications for this job
    const applications = await prisma.application.findMany({
      where: { job_id: jobId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    // Add status and appliedAt fields for frontend
    const applicationsWithStatus = applications.map((app) => ({
      ...app,
      status: "pending",
      appliedAt: new Date().toISOString(), // Default since no createdAt in schema
    }));

    return NextResponse.json(applicationsWithStatus);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      { error: "Failed to fetch applicants" },
      { status: 500 }
    );
  }
}

// Delete/reject an application
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: applicationId } = await params;
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    // Get the application
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (application.job.company.ownerId !== decoded.id) {
      return NextResponse.json(
        { error: "You can only manage applications for your own jobs" },
        { status: 403 }
      );
    }

    await prisma.application.delete({
      where: { id: applicationId },
    });

    return NextResponse.json({ message: "Application removed" });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}