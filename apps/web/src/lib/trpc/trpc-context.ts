import { createTRPCContext } from "@repo/api";
import type { NextRequest } from "next/server";
import { getSessionFromRequest } from "../req-session";
export const createTrpcApiContext = async (req: NextRequest) => {
	const session = await getSessionFromRequest(req);
	return createTRPCContext({
		headers: req.headers,
		auth: session,
		req,
	});
};
