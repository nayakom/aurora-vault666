import { getBloggerPosts } from "@/utils/blogger";
import Link from "next/link";
import styles from "../../components/intro/AuroraIntro.module.css";

export default async function BlogPage() {
  const posts = await getBloggerPosts();

  return (
    <div className="min-h-screen bg-[#030303] text-[#D2B48C] font-sans selection:bg-[#8B5A2B]/40">
      
      {/* Aurora Ambient Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#8B5A2B] blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D2B48C] blur-[150px] mix-blend-screen" style={{ animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[8px] mb-6 drop-shadow-[0_0_15px_rgba(210,180,140,0.4)]">
            Aurora Journal
          </h1>
          <p className="text-lg md:text-xl text-[#8B5A2B] tracking-[4px] uppercase max-w-2xl mx-auto">
            Discover our latest updates, insights, and stories.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-[#8B5A2B]/20 bg-[#0a0a0a]/50 backdrop-blur-md">
            <p className="text-xl text-[#D2B48C]/60 tracking-[2px]">No entries found yet.</p>
            <p className="mt-4 text-[#8B5A2B] text-sm">Add a new post in your Blogger dashboard to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="group relative flex flex-col justify-between p-8 border border-[#8B5A2B]/30 bg-[#050505]/80 backdrop-blur-sm transition-all duration-500 hover:border-[#D2B48C]/60 hover:bg-[#0a0a0a]"
              >
                {/* Decorative corners */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D2B48C]/0 transition-all duration-300 group-hover:border-[#D2B48C]/50" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D2B48C]/0 transition-all duration-300 group-hover:border-[#D2B48C]/50" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <time className="text-xs text-[#8B5A2B] font-mono tracking-wider">
                      {new Date(post.published).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.labels && post.labels.length > 0 && (
                      <span className="text-[10px] uppercase tracking-widest text-[#D2B48C] px-2 py-1 border border-[#8B5A2B]/40">
                        {post.labels[0]}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 text-[#D2B48C] group-hover:text-white transition-colors duration-300">
                    <Link href={`/blog/${post.id}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div 
                    className="text-[#D2B48C]/70 text-sm leading-relaxed line-clamp-3 mb-8 prose prose-invert prose-p:my-0"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                <div className="flex items-center text-sm text-[#8B5A2B] group-hover:text-[#D2B48C] transition-colors duration-300 uppercase tracking-widest font-semibold mt-6">
                  <span>Read Entry</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
