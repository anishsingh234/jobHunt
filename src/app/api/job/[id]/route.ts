import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const job = await prismaclient.openings.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      },
    });
    if (job) {
      return NextResponse.json({
        success: true,
        data: job,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "no job found",
      });
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: jobId } = await params;

  try {
    const body = await req.json();

    const updatedJob = await prismaclient.openings.update({
      where: { id: jobId },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        category: body.category,
        apply_through: body.apply_through,
        salary: body.salary,
        employment_type: body.employment_type,
      },
    });

    return NextResponse.json({ success: true, data: updatedJob });
  } catch (err: any) {
    console.error("POST Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const job = await prismaclient.openings.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete job." },
      { status: 500 }
    );
  }
}
