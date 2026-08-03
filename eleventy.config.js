import pluginRss from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("sitemap.html");
  eleventyConfig.addPassthroughCopy("not_found.html");

  // Collection for blog
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/**/*").map(item => {
      if (!item.data.permalink) {
        item.data.permalink = `/home/blogs/personal/${item.fileSlug}/`;
      }
      return item;
    });
  });

  eleventyConfig.addFilter("sortArtworksByDate", function(artworks) {
    if (!Array.isArray(artworks)) return [];
    return [...artworks].sort((a, b) => b.id.localeCompare(a.id));
  });

  // Markdown library
  const mdLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: ['"', '"', "'", "'"]
  });
  eleventyConfig.setLibrary("md", mdLib);

  // Ignore rules
  eleventyConfig.ignores.add("assets/main.scss");
  eleventyConfig.ignores.add("vendor");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}