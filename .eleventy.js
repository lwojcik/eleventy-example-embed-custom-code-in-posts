const markdownIt = require('markdown-it');

const TAG_TO_REPLACE = '<!-- TOC -->';

const YOU_ARE_HERE = '<b> <-- you are here!</b>';

const generateMarkup = (selectedPart) => `
  <div style="background: #ededed; padding: 16px">
    <h2>Sample blog post series - this is embedded into the content of this post!</h2>
    <ul>
      <li>
        <a href="/series-episode-1/">
          Post series: Episode 1
        </a>
        ${selectedPart === 1 ? YOU_ARE_HERE : ''}
      </li>
      <li>
        <a href="/series-episode-2/">
        Post series: Episode 2
        </a>
        ${selectedPart === 2 ? YOU_ARE_HERE : ''}
      </li>
      <li>
        <a href="'/series-episode-3/">
        Post series: Episode 3
        </a>
        ${selectedPart === 3 ? YOU_ARE_HERE : ''}
      </li>
    </ul>
  </div>
`;

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.setLibrary('md', markdownIt({
    html: true,
  }));


  eleventyConfig.addFilter("addToc", function(content, episodeNumber) {
    return content.replace(TAG_TO_REPLACE, generateMarkup(episodeNumber));
  });

  return {
    dir: {
      input: 'content',
    },
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
