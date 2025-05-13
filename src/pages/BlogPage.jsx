import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import "./BlogPage.scss";

// Helper: extract YouTube ID
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper: get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Blog data
const blogPosts = [
  {
    id: 1,
    title: "Modern Software Architecture: From Monolith to Microservices",
    author: "Tech With Tim",
    date: "19 Jan 2024",
    img: "/images/blog/code-review.jpg",
    excerpt: "Explore the evolution of software architecture and learn when to use different architectural patterns. Perfect for new engineers wanting to understand modern system design.",
    tags: ["Architecture", "System Design"],
    url: "https://www.youtube.com/watch?v=qYhRvH9tJKw"
  },
  {
    id: 2,
    title: "VS Code Setup for 10x Developer Productivity",
    author: "Fireship",
    date: "18 Jan 2024",
    img: "/images/blog/dev-setup.jpg",
    excerpt: "Transform your VS Code into a powerful development environment with essential extensions, shortcuts, and customizations that will dramatically improve your coding workflow.",
    tags: ["Productivity", "Tools"],
    url: "https://www.youtube.com/watch?v=B-s71n0dHUk"
  },
  {
    id: 3,
    title: "Git Workflow Mastery for New Engineers",
    author: "Maya Patel",
    date: "18 Jan 2024",
    img: "/images/blog/git-workflow.jpg",
    excerpt: "Master the fundamentals of Git, from basic commands to advanced branching strategies and conflict resolution techniques.",
    tags: ["Version Control", "Git"],
    url: "https://www.youtube.com/watch?v=RGOj5yH7evk"
  },
  {
    id: 4,
    title: "Understanding Our Tech Stack: A Deep Dive",
    author: "James Wilson",
    date: "17 Jan 2024",
    img: "/images/blog/tech-stack.jpg",
    excerpt: "An in-depth exploration of our technology stack, including our frontend framework, backend services, and database architecture.",
    tags: ["Architecture", "Tech Stack"],
    url: "https://www.youtube.com/watch?v=Sxxw3qtb3_g"
  },
  {
    id: 5,
    title: "Writing Clean Code: Best Practices and Standards",
    author: "Emma Thompson",
    date: "17 Jan 2024",
    img: "/images/blog/clean-code.jpg",
    excerpt: "Learn our coding standards and best practices for writing maintainable, efficient, and clean code that your teammates will love.",
    tags: ["Coding", "Standards"],
    url: "https://www.youtube.com/watch?v=BSaAMQVq01E"
  },
  {
    id: 6,
    title: "Testing Fundamentals for New Engineers",
    author: "David Kim",
    date: "16 Jan 2024",
    img: "/images/blog/testing.jpg",
    excerpt: "A comprehensive guide to our testing practices, including unit testing, integration testing, and end-to-end testing approaches.",
    tags: ["Testing", "Quality"],
    url: "https://www.youtube.com/watch?v=r9HdJ8P6GQI"
  }
];

const BlogPage = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [savedResources, setSavedResources] = useState(() => {
    const saved = localStorage.getItem("savedResources");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState("all");

  const searchResources = async (query) => {
    setLoading(true);
    try {
      const blogResults = blogPosts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            post.author.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase())
            )
        )
        .map((post) => ({
          id: `blog-${post.id}`,
          title: post.title,
          description: post.excerpt,
          url: post.url,
          source: post.author,
          date: post.date,
          tags: post.tags,
          img: getYouTubeThumbnail(post.url)
        }));

      setResources(blogResults);
    } catch (error) {
      console.error("Error searching resources:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load all blog posts initially
    setResources(
      blogPosts.map((post) => ({
        id: `blog-${post.id}`,
        title: post.title,
        description: post.excerpt,
        url: post.url,
        source: post.author,
        date: post.date,
        tags: post.tags,
        img: getYouTubeThumbnail(post.url)
      }))
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchResources(searchQuery);
    }
  };

  const toggleSaveResource = (resource) => {
    setSavedResources((prev) => {
      const isAlreadySaved = prev.some((item) => item.id === resource.id);
      const newSaved = isAlreadySaved
        ? prev.filter((item) => item.id !== resource.id)
        : [...prev, resource];

      localStorage.setItem("savedResources", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const isResourceSaved = (resourceId) => {
    return savedResources.some((item) => item.id === resourceId);
  };

  const displayedResources = activeTab === "saved" ? savedResources : resources;

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>{t("blog_heading")}</h1>
        <p>{t("blog_subheading")}</p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder={t("blog_search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button">
            <span>{t("search")}</span>
          </button>
        </form>
      </div>

      <div className="recent-posts-section">
        <h2>{searchQuery ? t("blog_search_results") : t("blog_section_title")}</h2>

        <div className="resources-list">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>{t("blog_loading")}</p>
            </div>
          ) : resources.length > 0 ? (
            resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  <div className="resource-image">
                    <img
                      src={resource.img}
                      alt={resource.title}
                      onError={(e) => {
                        e.target.src = e.target.src.replace(
                          "maxresdefault",
                          "hqdefault"
                        );
                      }}
                    />
                    <div className="play-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="resource-content">
                    <div className="post-meta">
                      <span className="author">{resource.source}</span>
                      <span className="date">{resource.date}</span>
                    </div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="tags">
                      {resource.tags.map((tag) => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>{t("blog_empty")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
