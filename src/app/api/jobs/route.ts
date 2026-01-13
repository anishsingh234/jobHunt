
import prismaclient from "@/services/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest)
{
    const res=await prismaclient.openings.findMany()
       return NextResponse.json({
        success:true,
        data:res
    })
}