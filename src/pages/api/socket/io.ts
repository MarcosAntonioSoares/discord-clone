import { Server as NetServer } from "http";

import { NextApiResponseServerIo } from "@/types";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function ioHandler(
  req: NextApiResponse,
  res: NextApiResponseServerIo
) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
  }

  res.end();
}
