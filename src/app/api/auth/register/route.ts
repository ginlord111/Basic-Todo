import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
try {
    const {email, pass} = await req.json()

    await prisma.user.create({
        data:{
            email,
            password:pass,
        }
    })

    return NextResponse.json({success:"SUCCESS"}, {status:200})
} catch (error) {
    console.log(error, "ERROR")
}
}