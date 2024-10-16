import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {email, pass} = await  req.json()
 const data =   await prisma.user.findFirst({
        where:{
            email,
            password:pass
        }
    })

    if(data){
        return NextResponse.json({success:"success",userId:data.id}, {status:200})
    }
    else{
        return NextResponse.json({message:"error"}, {status:500})
    }
}