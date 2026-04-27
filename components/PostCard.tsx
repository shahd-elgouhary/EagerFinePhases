"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface Post {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  image: string;
  tag: string;
  tagColor: string;
  title: string;
  body: string;
  location: string;
  likes: number;
  comments: number;
  campaign: string;
  saved?: boolean;
}

interface Props {
  post: Post;
  compact?: boolean;
}

export function PostCard({ post, compact = false }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(post.saved ?? false);

  return (
    <article
      className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
      data-testid={`card-post-${post.id}`}
    >
      {/* Hero image */}
      <div className="relative">
        <div
          className={cn("w-full bg-cover bg-center", compact ? "h-44" : "h-52")}
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <Badge
          className={`absolute top-3 left-3 rounded-full text-[10px] font-normal px-2.5 py-1 border-0 ${post.tagColor}`}
        >
          {post.tag}
        </Badge>
      </div>

      <div className="p-5 sm:p-6">
        {/* Author row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-public-sans text-sm font-medium text-[#1a281e]">{post.author}</p>
              <p className="font-public-sans text-xs text-stone-400">{post.handle} · {post.time}</p>
            </div>
          </div>
          {!compact && (
            <div className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="h-3 w-3" />
              <span className="font-public-sans text-xs">{post.location}</span>
            </div>
          )}
        </div>

        <h3 className="font-cairo text-xl text-[#1a281e] mb-2">{post.title}</h3>
        <p className={cn("font-public-sans text-sm text-stone-500 leading-6", compact && "line-clamp-2")}>
          {post.body}
        </p>

        <div className="mt-3">
          <Link href="/campaigns">
            <Badge className="rounded-full bg-[#4c7a5a1a] text-[#4c7a5a] font-public-sans text-xs font-normal px-2.5 py-1 border-0 cursor-pointer hover:bg-[#4c7a5a26]">
              {post.campaign}
            </Badge>
          </Link>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked((v) => !v)}
              className={`flex items-center gap-1.5 font-public-sans text-sm transition-colors ${liked ? "text-red-500" : "text-stone-400 hover:text-red-400"}`}
              data-testid={`button-like-${post.id}`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button className="flex items-center gap-1.5 font-public-sans text-sm text-stone-400 hover:text-stone-600">
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 font-public-sans text-sm text-stone-400 hover:text-stone-600">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
          <button
            onClick={() => setSaved((v) => !v)}
            className={`transition-colors ${saved ? "text-[#4c7a5a]" : "text-stone-400 hover:text-stone-600"}`}
            data-testid={`button-save-${post.id}`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-[#4c7a5a]" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}

function cn(...args: (string | boolean | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}
