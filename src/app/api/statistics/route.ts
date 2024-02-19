import clientPromise from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("agua_capital_registros");
 
        const movies = await db
            .collection("agua_capital_registros")
            .find({ })
            .toArray();
            return NextResponse.json({ data: movies });
    } catch (e) {
        console.error(e);
    }
  }