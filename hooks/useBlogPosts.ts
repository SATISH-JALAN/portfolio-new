import { useState, useEffect } from 'react';

export interface BlogPost {
    id: string;
    title: string;
    brief: string;
    slug?: string;
    url: string;
    date: string;
    readTimeInMinutes: number;
    source: 'Hashnode' | 'Medium';
}

interface CacheData {
    timestamp: number;
    posts: BlogPost[];
}

const CACHE_KEY = 'satish_blog_posts';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const useBlogPosts = (hashnodeHost: string, mediumUsername?: string) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Check cache first
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const parsed: CacheData = JSON.parse(cached);
                    if (Date.now() - parsed.timestamp < CACHE_DURATION && parsed.posts.length > 0) {
                        setPosts(parsed.posts);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch Hashnode
                const fetchHashnode = async () => {
                    if (!hashnodeHost) return [];
                    const query = `
                        query {
                            publication(host: "${hashnodeHost}") {
                                posts(first: 10) {
                                    edges {
                                        node {
                                            id
                                            title
                                            brief
                                            slug
                                            publishedAt
                                            readTimeInMinutes
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    `;
                    try {
                        const res = await fetch('https://gql.hashnode.com', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query })
                        });
                        const json = await res.json();
                        const edges = json.data?.publication?.posts?.edges || [];
                        return edges.map(({ node }: any) => ({
                            id: node.id,
                            title: node.title,
                            brief: node.brief.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
                            slug: node.slug,
                            url: node.url || `https://${hashnodeHost}/${node.slug}`,
                            date: node.publishedAt,
                            readTimeInMinutes: node.readTimeInMinutes || Math.floor(Math.random() * 5) + 3, // fallback
                            source: 'Hashnode'
                        }));
                    } catch (e) {
                        console.warn('Hashnode fetch failed', e);
                        return [];
                    }
                };

                // Fetch Medium
                const fetchMedium = async () => {
                    if (!mediumUsername) return [];
                    try {
                        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`);
                        const json = await res.json();
                        if (json.status !== 'ok') return [];
                        return (json.items || []).slice(0, 10).map((item: any) => {
                            // Estimate read time (word count / 200)
                            const contentText = item.content.replace(/<[^>]*>?/gm, '');
                            const wordCount = contentText.split(/\s+/).length;
                            const readTime = Math.max(1, Math.ceil(wordCount / 200));
                            
                            // Extract brief from description (which is often HTML)
                            const briefRaw = item.description.replace(/<[^>]*>?/gm, '');
                            let briefClean = briefRaw.replace(/\n/g, ' ').trim().substring(0, 100);
                            if (briefRaw.length > 100) briefClean += '...';

                            return {
                                id: item.guid,
                                title: item.title,
                                brief: briefClean,
                                url: item.link,
                                date: item.pubDate,
                                readTimeInMinutes: readTime,
                                source: 'Medium'
                            };
                        });
                    } catch (e) {
                        console.warn('Medium fetch failed', e);
                        return [];
                    }
                };

                const [hashnodePosts, mediumPosts] = await Promise.all([
                    fetchHashnode(),
                    fetchMedium()
                ]);

                const allPosts = [...hashnodePosts, ...mediumPosts].sort((a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                setPosts(allPosts);
                
                // Save to cache
                if (allPosts.length > 0) {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        timestamp: Date.now(),
                        posts: allPosts
                    }));
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [hashnodeHost, mediumUsername]);

    return { posts, loading, error };
};
