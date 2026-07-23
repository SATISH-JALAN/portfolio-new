import React from 'react';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { BLOG_CONFIG } from '../../constants';
import { ArrowRight } from 'lucide-react';

export const BlogPreview: React.FC = () => {
    const { posts, loading, error } = useBlogPosts(BLOG_CONFIG.hashnodeHost, BLOG_CONFIG.mediumUsername);

    // Manually add the static blog posts at the top
    const staticPosts = [
        {
            id: "token-2022-static",
            title: "Token-2022",
            brief: "An in-depth look at the new Token-2022 standard, its extensions, and how it expands capabilities for developers and users.",
            url: "https://medium.com/@satishjalan9163/token-2022-fc8153b3b0c1?sharedUserId=satishjalan9163",
            date: "2026-06-22T17:02:10Z",
            readTimeInMinutes: 4,
            source: 'Medium'
        },
        {
            id: "elite-tech-websites",
            title: "I opened 20 elite tech websites back-to-back. One question kept haunting me.",
            brief: "An analysis of modern web design trends after reviewing 20 elite tech websites, exploring what makes them stand out and the common patterns they share.",
            url: "https://thegrain.hashnode.dev/i-opened-20-elite-tech-websites-back-to-back-one-question-kept-haunting-me",
            date: "2024-05-10T12:00:00Z", // arbitrary past date to sort below new post
            readTimeInMinutes: 5,
            source: 'Hashnode'
        }
    ];

    // Filter out the static posts from fetched posts if they exist to prevent duplicates
    const fetchedPosts = posts.filter(p => 
        !p.url.includes("token-2022-fc8153b3b0c1") && 
        !p.url.includes("i-opened-20-elite-tech-websites")
    );

    // Get top 4 posts, ensuring the new ones are at the top
    const displayPosts = [...staticPosts, ...fetchedPosts].slice(0, 4);

    return (
        <section id="blog" className="py-24 relative bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                
                {/* Header */}
                <div className="flex items-end justify-between mb-12 border-b border-border pb-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-pixel font-medium text-foreground tracking-tighter">Writing.</h2>
                    </div>
                    <span className="font-mono text-xs text-muted/60 uppercase tracking-widest hidden md:block">05 / Writing</span>
                </div>

                {/* List Container */}
                <div className="flex flex-col border-t border-border/40">
                    
                    {/* Skeleton Loader */}
                    {loading && (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-border/40 gap-4 animate-pulse">
                                <div className="h-6 bg-muted/20 w-3/4 sm:w-1/3 rounded"></div>
                                <div className="h-4 bg-muted/10 w-full md:flex-1 rounded hidden sm:block"></div>
                                <div className="h-4 bg-muted/20 w-32 rounded"></div>
                            </div>
                        ))
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="py-8 text-muted font-mono text-sm">Failed to load posts from external sources.</div>
                    )}

                    {/* Posts Rows */}
                    {!loading && !error && displayPosts.length === 0 && (
                        <div className="py-8 text-muted font-mono text-sm">No posts published yet.</div>
                    )}

                    {!loading && !error && displayPosts.map((post) => {
                        const publishDate = new Date(post.date);
                        const formattedDate = publishDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

                        return (
                            <a 
                                key={post.id} 
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block py-6 border-b border-border/40 hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-300 relative px-4 -mx-4 rounded-lg"
                            >
                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-display font-medium text-foreground group-hover:text-foreground/80 transition-colors leading-snug mb-2 pr-10">
                                    {post.title}
                                </h3>

                                {/* Brief */}
                                <p className="text-muted/50 text-sm leading-relaxed line-clamp-2 mb-3 max-w-3xl">
                                    {post.brief}
                                </p>

                                {/* Metadata Row */}
                                <div className="flex items-center gap-3 font-mono text-xs text-muted/60">
                                    <span>{formattedDate}</span>
                                    <span className="w-1 h-1 rounded-full bg-border"></span>
                                    <span>{post.readTimeInMinutes} min read</span>
                                    <span className="w-1 h-1 rounded-full bg-border"></span>
                                    <span className="px-2 py-0.5 rounded border border-border/40 bg-foreground/5 text-muted/80">
                                        {post.source}
                                    </span>
                                </div>

                                {/* Hover Arrow */}
                                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 w-5 h-5 hidden md:block" />
                            </a>
                        );
                    })}

                </div>

                {/* Footer Link */}
                {!loading && !error && displayPosts.length > 0 && (
                    <div className="mt-8 flex justify-end">
                        <a 
                            href="/blog" 
                            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors flex items-center gap-2 group"
                        >
                            Read all writing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};
