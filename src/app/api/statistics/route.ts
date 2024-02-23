import clientPromise from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("agua_capital_registros");
 
        const infos = await db
            .collection("agua_capital_registros")
            .find({})
            .toArray();
            return NextResponse.json({ data: infos });
    } catch (e) {
        console.error(e);
    }
  }