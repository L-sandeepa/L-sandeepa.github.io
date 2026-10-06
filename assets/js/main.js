/**
 * SyntaxNest — Main Client-Side JavaScript
 * Pure Vanilla JS, Zero External Frameworks, Strictly Secure DOM Rendering
 */

(function () {
  'use strict';

  // Determine relative root prefix based on current page location
  function getPathPrefix() {
    var path = window.location.pathname;
    if (path.indexOf('/categories/') !== -1 || path.indexOf('/articles/') !== -1) {
      return '../';
    }
    return '';
  }

  var ROOT_PREFIX = getPathPrefix();

  // Master Articles Data Store for Client-Side Search & Filtering
  var ARTICLES_DATA = [
    {
      id: 'what-is-rag',
      title: 'What Is RAG? A Beginner-Friendly Guide to Retrieval-Augmented Generation',
      description: 'Learn Retrieval-Augmented Generation in simple terms: how RAG works, why developers use it, vector search, benefits, limitations, and architecture patterns.',
      category: 'Artificial Intelligence',
      categorySlug: 'ai',
      categoryUrl: 'categories/ai.html',
      badgeClass: 'badge-ai',
      url: 'articles/what-is-rag.html',
      readTime: '8 min read',
      date: 'October 2026',
      tags: ['rag', 'llm', 'ai', 'vector database', 'embeddings', 'retrieval', 'generative ai', 'architecture']
    },
    {
      id: 'what-is-an-llm',
      title: 'What Is an LLM? A Beginner-Friendly Guide to Large Language Models',
      description: 'A comprehensive beginner guide to Large Language Models: tokens, training, parameters, prompt engineering, context windows, hallucinations, and inference.',
      category: 'Artificial Intelligence',
      categorySlug: 'ai',
      categoryUrl: 'categories/ai.html',
      badgeClass: 'badge-ai',
      url: 'articles/what-is-an-llm.html',
      readTime: '7 min read',
      date: 'October 2026',
      tags: ['llm', 'artificial intelligence', 'tokens', 'prompts', 'context window', 'deep learning', 'nlp']
    },
    {
      id: 'what-is-an-api',
      title: 'What Is an API? A Beginner-Friendly Guide for Developers',
      description: 'Master API fundamentals: clients, servers, requests, responses, endpoints, HTTP verbs (GET, POST, PUT, DELETE), JSON structures, and status codes.',
      category: 'Software Engineering',
      categorySlug: 'software-engineering',
      categoryUrl: 'categories/software-engineering.html',
      badgeClass: 'badge-software-engineering',
      url: 'articles/what-is-an-api.html',
      readTime: '6 min read',
      date: 'October 2026',
      tags: ['api', 'rest', 'http', 'backend', 'json', 'endpoints', 'software engineering', 'web development']
    },
    {
      id: 'python-for-ai-developers',
      title: 'Python for AI Developers: What You Need to Know First',
      description: 'Why Python dominates the AI ecosystem. Learn core variables, data structures, functions, modules, virtual environments, and essential libraries for modern AI engineering.',
      category: 'Python',
      categorySlug: 'python',
      categoryUrl: 'categories/python.html',
      badgeClass: 'badge-python',
      url: 'articles/python-for-ai-developers.html',
      readTime: '9 min read',
      date: 'October 2026',
      tags: ['python', 'ai', 'machine learning', 'data science', 'virtualenv', 'programming', 'developer']
    },
    {
      id: 'git-vs-github',
      title: "Git vs GitHub: What's the Difference?",
      description: 'Clarify the distinction between Git version control and GitHub cloud platform. Understand commits, branches, pull requests, merges, and essential terminal workflows.',
      category: 'Developer Tools',
      categorySlug: 'developer-tools',
      categoryUrl: 'categories/developer-tools.html',
      badgeClass: 'badge-developer-tools',
      url: 'articles/git-vs-github.html',
      readTime: '6 min read',
      date: 'October 2026',
      tags: ['git', 'github', 'version control', 'devops', 'developer tools', 'open source', 'collaboration']
    },
    {
      id: 'what-are-ai-agents',
      title: 'What Are AI Agents? A Beginner-Friendly Introduction',
      description: 'Explore autonomous AI agents: perception, reasoning loops, memory systems, tool execution, planning, limitations, and how they differ from simple chatbots.',
      category: 'Artificial Intelligence',
      categorySlug: 'ai',
      categoryUrl: 'categories/ai.html',
      badgeClass: 'badge-ai',
      url: 'articles/what-are-ai-agents.html',
      readTime: '8 min read',
      date: 'October 2026',
      tags: ['ai agents', 'autonomous agents', 'llm', 'tools', 'reasoning', 'planning', 'workflows', 'ai']
    }
  ];

  // Document Ready Initialization
  document.addEventListener('DOMContentLoaded', function () {
    initCurrentYear();
    initMobileNav();
    initSearchSystem();
    highlightActiveNavLink();
  });

  // 1. Dynamic Footer Year
  function initCurrentYear() {
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }
  }

  // 2. Responsive Mobile Navigation Toggle & Accessibility
  function initMobileNav() {
    var toggleBtn = document.getElementById('mobile-menu-btn');
    var navEl = document.getElementById('site-navigation');

    if (!toggleBtn || !navEl) return;

    toggleBtn.addEventListener('click', function () {
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      navEl.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (navEl.classList.contains('open') && !navEl.contains(e.target) && !toggleBtn.contains(e.target)) {
        navEl.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navEl.classList.contains('open')) {
        navEl.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }

  // 3. Active Nav Link Detection
  function highlightActiveNavLink() {
    var currentPath = window.location.pathname.replace(/\/$/, '');
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var cleanHref = href.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/\/$/, '');

      if (currentPath.endsWith(cleanHref) && cleanHref !== '') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else if (cleanHref === 'index.html' && (currentPath === '' || currentPath.endsWith('/'))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // 4. Client-Side Search System (Safe DOM manipulation, strictly NO innerHTML)
  function initSearchSystem() {
    var searchInput = document.getElementById('search-input');
    var resultsContainer = document.getElementById('search-results-container');
    var resultsCount = document.getElementById('search-results-count');
    var tagButtons = document.querySelectorAll('.tag-btn');

    // If not on search page, return early
    if (!searchInput || !resultsContainer) return;

    // Read URL query parameter "?q="
    var urlParams = new URLSearchParams(window.location.search);
    var queryParam = urlParams.get('q');
    if (queryParam) {
      searchInput.value = queryParam;
      executeSearch(queryParam.trim());
    } else {
      executeSearch('');
    }

    // Input event for real-time dynamic filtering
    searchInput.addEventListener('input', function (e) {
      executeSearch(e.target.value.trim());
    });

    // Tag pills click event
    if (tagButtons.length > 0) {
      tagButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var tag = btn.getAttribute('data-tag') || btn.textContent.trim();
          searchInput.value = tag;
          executeSearch(tag);
        });
      });
    }

    function executeSearch(query) {
      var lowerQuery = query.toLowerCase();

      // If query is empty, show all available articles
      var matchedArticles = ARTICLES_DATA.filter(function (item) {
        if (!lowerQuery) return true;

        var titleMatch = item.title.toLowerCase().indexOf(lowerQuery) !== -1;
        var descMatch = item.description.toLowerCase().indexOf(lowerQuery) !== -1;
        var catMatch = item.category.toLowerCase().indexOf(lowerQuery) !== -1;
        var tagMatch = item.tags.some(function (t) {
          return t.toLowerCase().indexOf(lowerQuery) !== -1;
        });

        return titleMatch || descMatch || catMatch || tagMatch;
      });

      renderSearchResults(matchedArticles, query);
    }

    // Safely render articles without innerHTML
    function renderSearchResults(items, query) {
      // Clear container safely
      resultsContainer.replaceChildren();

      // Update results count
      if (resultsCount) {
        if (query) {
          resultsCount.textContent = 'Found ' + items.length + ' result' + (items.length === 1 ? '' : 's') + ' for "' + query + '"';
        } else {
          resultsCount.textContent = 'Showing all ' + items.length + ' articles';
        }
      }

      if (items.length === 0) {
        var emptyBox = document.createElement('div');
        emptyBox.className = 'no-results-box';

        var icon = document.createElement('div');
        icon.className = 'no-results-icon';
        icon.textContent = '🔍';
        emptyBox.appendChild(icon);

        var heading = document.createElement('h3');
        heading.className = 'value-title';
        heading.textContent = 'No matching articles found';
        emptyBox.appendChild(heading);

        var message = document.createElement('p');
        message.className = 'value-desc';
        message.textContent = 'Try adjusting your search terms, searching for "RAG", "LLM", "API", or browsing our categories.';
        emptyBox.appendChild(message);

        resultsContainer.appendChild(emptyBox);
        return;
      }

      // Build cards using safe DOM methods
      items.forEach(function (article) {
        var card = document.createElement('article');
        card.className = 'article-card';

        // Header: Category Badge + Read Time
        var cardHeader = document.createElement('div');
        cardHeader.className = 'article-card-header';

        var badge = document.createElement('span');
        badge.className = 'badge ' + article.badgeClass;
        badge.textContent = article.category;
        cardHeader.appendChild(badge);

        var readTime = document.createElement('span');
        readTime.className = 'reading-time';
        readTime.textContent = article.readTime;
        cardHeader.appendChild(readTime);

        card.appendChild(cardHeader);

        // Title
        var title = document.createElement('h2');
        title.className = 'article-card-title';

        var titleLink = document.createElement('a');
        titleLink.setAttribute('href', ROOT_PREFIX + article.url);
        titleLink.textContent = article.title;
        title.appendChild(titleLink);

        card.appendChild(title);

        // Description
        var desc = document.createElement('p');
        desc.className = 'article-card-desc';
        desc.textContent = article.description;
        card.appendChild(desc);

        // Footer: Date + Read Article Link
        var cardFooter = document.createElement('div');
        cardFooter.className = 'article-card-footer';

        var meta = document.createElement('div');
        meta.className = 'article-card-meta';
        meta.textContent = article.date;
        cardFooter.appendChild(meta);

        var readMore = document.createElement('a');
        readMore.setAttribute('href', ROOT_PREFIX + article.url);
        readMore.className = 'read-link';
        readMore.textContent = 'Read Article →';
        cardFooter.appendChild(readMore);

        card.appendChild(cardFooter);
        resultsContainer.appendChild(card);
      });
    }
  }

})();
