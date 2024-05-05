import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChatHeader } from "@/components/chat/chat-header";

interface ChannelsIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function ChannelsIdPage({ params }: ChannelsIdPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        name={channel.name}
        serverId={channel?.serverId}
        type='channel'
      />
    </div>
  );
}
