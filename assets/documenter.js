// Generated by Documenter.jl
requirejs.config({
  paths: {
    'highlight-julia':
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/julia.min',
    headroom: 'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/headroom.min',
    jqueryui: 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min',
    'katex-auto-render':
      'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.4/contrib/auto-render.min',
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min',
    'headroom-jquery': 'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/jQuery.headroom.min',
    katex: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.4/katex.min',
    highlight: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min',
    'highlight-julia-repl':
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/julia-repl.min',
    lunr: 'https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min',
    minisearch: 'https://cdn.jsdelivr.net/npm/minisearch@6.1.0/dist/umd/index.min',
  },
  shim: {
    'highlight-julia': {
      deps: ['highlight'],
    },
    'katex-auto-render': {
      deps: ['katex'],
    },
    'headroom-jquery': {
      deps: ['jquery', 'headroom'],
    },
    'highlight-julia-repl': {
      deps: ['highlight'],
    },
  },
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'katex', 'katex-auto-render'], function ($, katex, renderMathInElement) {
  $(document).ready(function () {
    renderMathInElement(document.body, {
      delimiters: [
        {
          left: '$',
          right: '$',
          display: false,
        },
        {
          left: '$$',
          right: '$$',
          display: true,
        },
        {
          left: '\\[',
          right: '\\]',
          display: true,
        },
      ],
    })
  })
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'highlight', 'highlight-julia', 'highlight-julia-repl'], function ($) {
  $(document).ready(function () {
    hljs.highlightAll()
  })
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function ($) {
  var isExpanded = true

  $(document).on('click', '.docstring header', function () {
    let articleToggleTitle = 'Expand article'

    if ($(this).siblings('section').is(':visible')) {
      $(this)
        .find('.docstring-article-toggle-button')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-right')
    } else {
      $(this)
        .find('.docstring-article-toggle-button')
        .removeClass('fa-chevron-right')
        .addClass('fa-chevron-down')

      articleToggleTitle = 'Collapse article'
    }

    $(this).find('.docstring-article-toggle-button').prop('title', articleToggleTitle)
    $(this).siblings('section').slideToggle()
  })

  $(document).on('click', '.docs-article-toggle-button', function () {
    let articleToggleTitle = 'Expand article'
    let navArticleToggleTitle = 'Expand all Articles'

    if (isExpanded) {
      $(this).removeClass('fa-chevron-up').addClass('fa-chevron-down')
      $('.docstring-article-toggle-button')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-right')

      isExpanded = false

      $('.docstring section').slideUp()
    } else {
      $(this).removeClass('fa-chevron-down').addClass('fa-chevron-up')
      $('.docstring-article-toggle-button')
        .removeClass('fa-chevron-right')
        .addClass('fa-chevron-down')

      isExpanded = true
      articleToggleTitle = 'Collapse article'
      navArticleToggleTitle = 'Collapse all Articles'

      $('.docstring section').slideDown()
    }

    $(this).prop('title', navArticleToggleTitle)
    $('.docstring-article-toggle-button').prop('title', articleToggleTitle)
  })
})
////////////////////////////////////////////////////////////////////////////////
require([], function () {
  function addCopyButtonCallbacks() {
    for (const el of document.getElementsByTagName('pre')) {
      const button = document.createElement('button')
      button.classList.add('copy-button', 'fa-solid', 'fa-copy')
      button.setAttribute('aria-label', 'Copy this code block')
      button.setAttribute('title', 'Copy')

      el.appendChild(button)

      const success = function () {
        button.classList.add('success', 'fa-check')
        button.classList.remove('fa-copy')
      }

      const failure = function () {
        button.classList.add('error', 'fa-xmark')
        button.classList.remove('fa-copy')
      }

      button.addEventListener('click', function () {
        copyToClipboard(el.innerText).then(success, failure)

        setTimeout(function () {
          button.classList.add('fa-copy')
          button.classList.remove('success', 'fa-check', 'fa-xmark')
        }, 5000)
      })
    }
  }

  function copyToClipboard(text) {
    // clipboard API is only available in secure contexts
    if (window.navigator && window.navigator.clipboard) {
      return window.navigator.clipboard.writeText(text)
    } else {
      return new Promise(function (resolve, reject) {
        try {
          const el = document.createElement('textarea')
          el.textContent = text
          el.style.position = 'fixed'
          el.style.opacity = 0
          document.body.appendChild(el)
          el.select()
          document.execCommand('copy')

          resolve()
        } catch (err) {
          reject(err)
        } finally {
          document.body.removeChild(el)
        }
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtonCallbacks)
  } else {
    addCopyButtonCallbacks()
  }
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'headroom', 'headroom-jquery'], function ($, Headroom) {
  // Manages the top navigation bar (hides it when the user starts scrolling down on the
  // mobile).
  window.Headroom = Headroom // work around buggy module loading?
  $(document).ready(function () {
    $('#documenter .docs-navbar').headroom({
      tolerance: { up: 10, down: 10 },
    })
  })
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function ($) {
  // Modal settings dialog
  $(document).ready(function () {
    var settings = $('#documenter-settings')
    $('#documenter-settings-button').click(function () {
      settings.toggleClass('is-active')
    })
    // Close the dialog if X is clicked
    $('#documenter-settings button.delete').click(function () {
      settings.removeClass('is-active')
    })
    // Close dialog if ESC is pressed
    $(document).keyup(function (e) {
      if (e.keyCode == 27) settings.removeClass('is-active')
    })
  })
})
////////////////////////////////////////////////////////////////////////////////

require([], function () {
  // let searchbox = document.querySelector('#documenter-search-query')
  // let sidebar = document.querySelector('.docs-sidebar')
  // document.addEventListener('keydown', (event) => {
  //   if ((event.ctrlKey || event.metaKey) && event.key === '/') {
  //     if (!sidebar.classList.contains('visible')) {
  //       sidebar.classList.add('visible')
  //     }
  //     searchbox.focus()
  //     return false
  //   } else if (event.key === 'Escape') {
  //     if (sidebar.classList.contains('visible')) {
  //       sidebar.classList.remove('visible')
  //     }
  //     searchbox.blur()
  //     return false
  //   }
  // })
})

////////////////////////////////////////////////////////////////////////////////

require(['jquery'], function ($) {
  let search_modal_header = `
    <header class="modal-card-head">
      <div class="field search-input-div">
        <p class="control has-icons-right">
          <input class="input documenter-search-input" type="text" placeholder="Search" />
          <span class="icon is-small is-right has-text-primary-dark">
            <i class="fas fa-magnifying-glass"></i>
          </span>
        </p>
      </div>
    </header>
  `

  let initial_search_body = `
    <div class="has-text-centered my-5 py-5">No recent searches!</div>
  `

  let search_modal_footer = `
    <footer class="modal-card-foot">
      <span>
        <kbd class="search-modal-key-hints">Ctrl</kbd> +
        <kbd class="search-modal-key-hints">/</kbd> to search
      </span>
      <span class="ml-3"> <kbd class="search-modal-key-hints">esc</kbd> to close </span>
    </footer>
  `

  $(document.body).append(
    `
      <div class="modal" id="search-modal">
        <div class="modal-background"></div>
        <div class="modal-card search-min-width-50">
          ${search_modal_header}
          <section class="modal-card-body search-modal-card-body">
            ${initial_search_body}
          </section>
          ${search_modal_footer}
        </div>
      </div>
    `
  )

  document.querySelector('.docs-search-query').addEventListener('click', () => {
    openModal()
  })

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      openModal()
    } else if (event.key === 'Escape') {
      closeModal()
    }

    return false
  })

  // Functions to open and close a modal
  function openModal() {
    let searchModal = document.querySelector('#search-modal')

    searchModal.classList.add('is-active')
    document.querySelector('.documenter-search-input').focus()
  }

  function closeModal() {
    let searchModal = document.querySelector('#search-modal')
    let initial_search_body = `
      <div class="has-text-centered my-5 py-5">No recent searches!</div>
    `

    searchModal.classList.remove('is-active')
    document.querySelector('.documenter-search-input').blur()

    $('.documenter-search-input').val('')
    $('.search-modal-card-body').html(initial_search_body)
  }

  document.querySelector('#search-modal .modal-background').addEventListener('click', () => {
    closeModal()
  })
})

// Create singleton Lunr instance
class SearchIndex {
  static instance

  static createInstance(lunr) {
    if (this.instance) {
      return this.instance
    }

    try {
      lunr.stopWordFilter = lunr.generateStopWordFilter([
        'a',
        'able',
        'about',
        'across',
        'after',
        'almost',
        'also',
        'am',
        'among',
        'an',
        'and',
        'are',
        'as',
        'at',
        'be',
        'because',
        'been',
        'but',
        'by',
        'can',
        'cannot',
        'could',
        'dear',
        'did',
        'does',
        'either',
        'ever',
        'every',
        'from',
        'got',
        'had',
        'has',
        'have',
        'he',
        'her',
        'hers',
        'him',
        'his',
        'how',
        'however',
        'i',
        'if',
        'into',
        'it',
        'its',
        'just',
        'least',
        'like',
        'likely',
        'may',
        'me',
        'might',
        'most',
        'must',
        'my',
        'neither',
        'no',
        'nor',
        'not',
        'of',
        'off',
        'often',
        'on',
        'or',
        'other',
        'our',
        'own',
        'rather',
        'said',
        'say',
        'says',
        'she',
        'should',
        'since',
        'so',
        'some',
        'than',
        'that',
        'the',
        'their',
        'them',
        'then',
        'there',
        'these',
        'they',
        'this',
        'tis',
        'to',
        'too',
        'twas',
        'us',
        'wants',
        'was',
        'we',
        'were',
        'what',
        'when',
        'who',
        'whom',
        'why',
        'will',
        'would',
        'yet',
        'you',
        'your',
      ])

      lunr.tokenizer.separator = /[\s\-\.]+/

      lunr.trimmer = function (token) {
        return token.update(function (s) {
          return s.replace(/^[^a-zA-Z0-9@!]+/, '').replace(/[^a-zA-Z0-9@!]+$/, '')
        })
      }

      lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'juliaStopWordFilter')
      lunr.Pipeline.registerFunction(lunr.trimmer, 'juliaTrimmer')

      this.instance = lunr(function () {
        this.ref('location')
        this.field('title', { boost: 100 })
        this.field('text')
        documenterSearchIndex['docs'].forEach(function (e) {
          this.add(e)
        }, this)
      })

      console.log('Lunr instance created successfully.')
    } catch (error) {
      console.error('Unable to create Lunr instance:', error)
    }

    return this.instance
  }

  static async getDocumenterSearchIndexDocs() {
    try {
      const response = await fetch('/assets/data.json')
      const json = await response.json()
      return json
    } catch (error) {
      console.error(error)
    }
  }
}

// Create singleton Lunr instance
class PreSearchIndex {
  static instance

  static async createInstance(lunr) {
    if (this.instance) {
      return this.instance
    }

    try {
      const response = await fetch('/assets/search_index.json')
      const json = await response.json()
      this.instance = lunr.Index.load(json)

      console.log('Lunr instance created successfully from Pre-built index.')
    } catch (error) {
      console.error('Unable to create Lunr instance:', error)
    }

    return this.instance
  }

  static async getDocumenterSearchIndexDocs() {
    try {
      const response = await fetch('/assets/data.json')
      const json = await response.json()
      return json
    } catch (error) {
      console.error(error)
    }
  }
}

// Create singleton Minisearch instance
class PreSearchIndexMS {
  static instance

  static async createInstance(ms) {
    if (this.instance) {
      return this.instance
    }

    try {
      const response = await fetch('/assets/search_index_ms.json')
      const json = await response.text()
      const stopWords = new Set([
        'a',
        'able',
        'about',
        'across',
        'after',
        'almost',
        'also',
        'am',
        'among',
        'an',
        'and',
        'are',
        'as',
        'at',
        'be',
        'because',
        'been',
        'but',
        'by',
        'can',
        'cannot',
        'could',
        'dear',
        'did',
        'does',
        'either',
        'ever',
        'every',
        'from',
        'got',
        'had',
        'has',
        'have',
        'he',
        'her',
        'hers',
        'him',
        'his',
        'how',
        'however',
        'i',
        'if',
        'into',
        'it',
        'its',
        'just',
        'least',
        'like',
        'likely',
        'may',
        'me',
        'might',
        'most',
        'must',
        'my',
        'neither',
        'no',
        'nor',
        'not',
        'of',
        'off',
        'often',
        'on',
        'or',
        'other',
        'our',
        'own',
        'rather',
        'said',
        'say',
        'says',
        'she',
        'should',
        'since',
        'so',
        'some',
        'than',
        'that',
        'the',
        'their',
        'them',
        'then',
        'there',
        'these',
        'they',
        'this',
        'tis',
        'to',
        'too',
        'twas',
        'us',
        'wants',
        'was',
        'we',
        'were',
        'what',
        'when',
        'who',
        'whom',
        'why',
        'will',
        'would',
        'yet',
        'you',
        'your',
      ])

      this.instance = ms.loadJSON(json, {
        fields: ['title', 'text'], // fields to index for full-text search
        storeFields: ['location', 'title', 'text', 'category'], // fields to return with search results
        tokenize: (string, _fieldName) => string.split(/[\s\-\.]+/),
        processTerm: (term, _fieldName) => {
          let word = stopWords.has(term) ? null : term.toLowerCase()
          if (word) {
            word = word.replace(/^[^a-zA-Z0-9@!]+/, '').replace(/[^a-zA-Z0-9@!]+$/, '')
          }

          return word ?? null
        },
        searchOptions: {
          boost: { title: 100 },
          fuzzy: 0.2,
          tokenize: (string, _fieldName) => string.split(/[\s\-\.]+/),
        },
      })

      console.log('MS instance created successfully from Pre-built index.')
    } catch (error) {
      console.error('Unable to create MS instance:', error)
    }

    return this.instance
  }
}

////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'lunr', 'minisearch'], function ($, lunr, minisearch) {
  $(async function () {
    let timer = undefined
    let results = undefined

    // console.time('without_prebuilt_index')
    // var index = SearchIndex.createInstance(lunr)
    // console.timeEnd('without_prebuilt_index')

    // var documenterSearchIndexDocs = await SearchIndex.getDocumenterSearchIndexDocs()

    // console.log('')
    // console.log('')

    // console.time('with_prebuilt_index')
    // var index = await PreSearchIndex.createInstance(lunr)
    // console.timeEnd('with_prebuilt_index')

    // console.time('with_prebuilt_index_ms')
    var index_ms = await PreSearchIndexMS.createInstance(minisearch)
    // console.timeEnd('with_prebuilt_index_ms')

    // var documenterSearchIndexDocs = await PreSearchIndex.getDocumenterSearchIndexDocs()

    $(document).on('keyup', '.documenter-search-input', function (event) {
      debounce(300)
    })

    function debounce(timeout = 300) {
      clearTimeout(timer)
      // timer = setTimeout(() => update_search($('.documenter-search-input').val()), timeout)
      timer = setTimeout(() => update_search_ms($('.documenter-search-input').val()), timeout)
    }

    function update_search(querystring) {
      if (querystring.trim()) {
        tokens = lunr.tokenizer(querystring)
        results = index.query(function (q) {
          tokens.forEach(function (t) {
            q.term(t.toString(), {
              fields: ['title'],
              boost: 100,
              usePipeline: true,
              editDistance: 0,
              wildcard: lunr.Query.wildcard.NONE,
            })
            q.term(t.toString(), {
              fields: ['title'],
              boost: 10,
              usePipeline: true,
              editDistance: 2,
              wildcard: lunr.Query.wildcard.NONE,
            })
            q.term(t.toString(), {
              fields: ['text'],
              boost: 1,
              usePipeline: true,
              editDistance: 0,
              wildcard: lunr.Query.wildcard.NONE,
            })
          })
        })

        if (results.length) {
          results = results.filter((x) => x.score > 5)

          let data = undefined
          let searchData = results.map(function (result) {
            data = documenterSearchIndexDocs.find((ele) => ele.location === result.ref)

            let textindex = new RegExp(`\\b${querystring}\\b`, 'i').exec(data.text)
            let text =
              textindex !== null
                ? data.text.slice(
                    Math.max(textindex.index - 100, 0),
                    Math.min(textindex.index + querystring.length + 100, data.text.length)
                  )
                : ''

            return {
              location: result.ref,
              title: data.title,
              text: text.length
                ? '...' +
                  text.replace(
                    // new RegExp(`\\b${querystring}\\b`, 'gi'), // For all occurences
                    new RegExp(`\\b${querystring}\\b`, 'i'), // For first occurence
                    '<span class="search-result-highlight">$&</span>'
                  ) +
                  '...'
                : '',
              category: data.category,
            }
          })

          let newSearchData = {}

          // Start from group by category
          searchData.forEach((element) => {
            if (newSearchData.hasOwnProperty(element.category)) {
              newSearchData[element.category].push(element)
            } else {
              newSearchData[element.category] = [element]
            }
          })

          let searchString = ''

          Object.keys(newSearchData).forEach((type) => {
            searchString += `<div>`
            searchString += `<p class="is-size-5">${
              type.charAt(0).toUpperCase() + type.slice(1)
            }</p>`
            let colorArr = ['info', 'primary', 'link', 'success', 'warning', 'danger']
            let color = colorArr[Math.floor(Math.random() * colorArr.length)]
            newSearchData[type].forEach((obj) => {
              searchString += `
                <a href="${obj.location}" class="is-link">
                  <div class="pl-4">
                    <h6 class="search-modal-badge has-background-${color}">${obj.title}</h6>
                      <p class="m-2 pl-2 search-result-text-para">
                        ${obj.text}
                      </p>
                    </div>
                </a>
              `
            })
            searchString += `</div>`
          })

          $('.search-result-container').html(searchString)
        } else {
          $('.search-result-container').html(
            `<div class="has-text-centered m-5 p-5">No recent searches</div>`
          )
        }
      } else {
        $('.search-result-container').html(
          `<div class="has-text-centered m-5 p-5">No recent searches</div>`
        )
      }
    }

    function update_search_ms(querystring) {
      let initial_search_body = `
        <div class="has-text-centered my-5 py-5">No recent searches!</div>
      `

      if (querystring.trim()) {
        results = index_ms.search(querystring)
        if (results.length) {
          results = results.filter((x) => x.score > 5)

          let search_exact_matches_container = `
            <div class="search-exact-matches-container">
              <span class="is-size-6">Exact Matches:</span>
          `
          let exact_matches = results.slice(0, 5)

          let exact_match_string = ''
          exact_matches.forEach((match) => {
            exact_match_string += `
              <a href="${match.location ?? '#'}" class="search-exact-matches-result">
                <span>${match.title ?? ''}</span>
              </a>
            `
          })

          results = results.slice(5)

          search_exact_matches_container += exact_match_string + `</div>`

          let searchData = results.map(function (result) {
            let textindex = new RegExp(`\\b${querystring}\\b`, 'i').exec(result.text)
            let text =
              textindex !== null
                ? result.text.slice(
                    Math.max(textindex.index - 100, 0),
                    Math.min(textindex.index + querystring.length + 100, result.text.length)
                  )
                : ''

            return {
              score: result.score,
              location: result.location,
              title: result.title,
              text: text.length
                ? '...' +
                  text.replace(
                    // new RegExp(`\\b${querystring}\\b`, 'gi'), // For all occurences
                    new RegExp(`\\b${querystring}\\b`, 'i'), // For first occurence
                    '<span class="search-result-highlight">$&</span>'
                  ) +
                  '...'
                : '',
              category: result.category,
            }
          })

          let newSearchData = {}

          // Start from group by category
          searchData.forEach((element) => {
            if (newSearchData.hasOwnProperty(element.category)) {
              newSearchData[element.category].push(element)
            } else {
              newSearchData[element.category] = [element]
            }
          })

          if (newSearchData.hasOwnProperty('page') && newSearchData.hasOwnProperty('section')) {
            newSearchData['page'].push(...newSearchData['section'])
            newSearchData['page'].sort((a, b) => b.score - a.score)
            delete newSearchData['section']
          }

          let search_result_container = `
            ${search_exact_matches_container}
            <div class="search-divider"></div>
            <div class="search-result-container">
            <div class="is-size-6">Total results: ${searchData.length}</div>
          `

          let type_string = ''

          Object.keys(newSearchData).forEach((type) => {
            type_string += `
              <div class="type-container">
                <div class="property-search-result-container">
                  <i class="fas fa-chevron-down is-size-7 property-indicator"></i>
                  <p class="is-size-5">${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                </div>

                <div class="property-results-container mt-1 ml-5 pl-3">
            `

            newSearchData[type].forEach((result) => {
              type_string += `
                <a href="${result.location ?? ''}" class="is-link search-result-link">
                  <div class="property-search-result">
                    <div class="property-search-result-badge">${result.title ?? ''}</div>
                    ${result.text ? `<p>${result.text}</p>` : ''}
                  </div>
                </a>
              `
            })

            type_string += `</div></div>`
          })

          search_result_container += type_string + `</div>`

          $('.search-modal-card-body').html(search_result_container)
        } else {
          $('.search-modal-card-body').html(initial_search_body)
        }
      } else {
        $('.search-modal-card-body').html(initial_search_body)
      }
    }
  })
})

require(['jquery'], function ($) {
  $(document).on('click', '.property-search-result-container', function () {
    if ($(this).siblings('.property-results-container').is(':visible')) {
      $(this)
        .find('.property-indicator')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-right')
    } else {
      $(this)
        .find('.property-indicator')
        .removeClass('fa-chevron-right')
        .addClass('fa-chevron-down')
    }

    $(this).siblings('.property-results-container').slideToggle()
  })
})

////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function ($) {
  // Manages the showing and hiding of the sidebar.
  $(document).ready(function () {
    var sidebar = $('#documenter > .docs-sidebar')
    var sidebar_button = $('#documenter-sidebar-button')
    sidebar_button.click(function (ev) {
      ev.preventDefault()
      sidebar.toggleClass('visible')
      if (sidebar.hasClass('visible')) {
        // Makes sure that the current menu item is visible in the sidebar.
        $('#documenter .docs-menu a.is-active').focus()
      }
    })
    $('#documenter > .docs-main').bind('click', function (ev) {
      if ($(ev.target).is(sidebar_button)) {
        return
      }
      if (sidebar.hasClass('visible')) {
        sidebar.removeClass('visible')
      }
    })
  })

  // Resizes the package name / sitename in the sidebar if it is too wide.
  // Inspired by: https://github.com/davatron5000/FitText.js
  $(document).ready(function () {
    e = $('#documenter .docs-autofit')
    function resize() {
      var L = parseInt(e.css('max-width'), 10)
      var L0 = e.width()
      if (L0 > L) {
        var h0 = parseInt(e.css('font-size'), 10)
        e.css('font-size', (L * h0) / L0)
        // TODO: make sure it survives resizes?
      }
    }
    // call once and then register events
    resize()
    $(window).resize(resize)
    $(window).on('orientationchange', resize)
  })

  // Scroll the navigation bar to the currently selected menu item
  $(document).ready(function () {
    var sidebar = $('#documenter .docs-menu').get(0)
    var active = $('#documenter .docs-menu .is-active').get(0)
    if (typeof active !== 'undefined') {
      sidebar.scrollTop = active.offsetTop - sidebar.offsetTop - 15
    }
  })
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function ($) {
  function set_theme(theme) {
    var active = null
    var disabled = []
    for (var i = 0; i < document.styleSheets.length; i++) {
      var ss = document.styleSheets[i]
      var themename = ss.ownerNode.getAttribute('data-theme-name')
      if (themename === null) continue // ignore non-theme stylesheets
      // Find the active theme
      if (themename === theme) active = ss
      else disabled.push(ss)
    }
    if (active !== null) {
      active.disabled = false
      if (active.ownerNode.getAttribute('data-theme-primary') === null) {
        document.getElementsByTagName('html')[0].className = 'theme--' + theme
      } else {
        document.getElementsByTagName('html')[0].className = ''
      }
      disabled.forEach(function (ss) {
        ss.disabled = true
      })
    }

    // Store the theme in localStorage
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('documenter-theme', theme)
    } else {
      console.error('Browser does not support window.localStorage')
    }
  }

  // Theme picker setup
  $(document).ready(function () {
    // onchange callback
    $('#documenter-themepicker').change(function themepick_callback(ev) {
      var themename = $('#documenter-themepicker option:selected').attr('value')
      set_theme(themename)
    })

    // Make sure that the themepicker displays the correct theme when the theme is retrieved
    // from localStorage
    if (typeof window.localStorage !== 'undefined') {
      var theme = window.localStorage.getItem('documenter-theme')
      if (theme !== null) {
        $('#documenter-themepicker option').each(function (i, e) {
          e.selected = e.value === theme
        })
      } else {
        $('#documenter-themepicker option').each(function (i, e) {
          e.selected = $('html').hasClass(`theme--${e.value}`)
        })
      }
    }
  })
})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function ($) {
  // update the version selector with info from the siteinfo.js and ../versions.js files
  $(document).ready(function () {
    // If the version selector is disabled with DOCUMENTER_VERSION_SELECTOR_DISABLED in the
    // siteinfo.js file, we just return immediately and not display the version selector.
    if (
      typeof DOCUMENTER_VERSION_SELECTOR_DISABLED === 'boolean' &&
      DOCUMENTER_VERSION_SELECTOR_DISABLED
    ) {
      return
    }

    var version_selector = $('#documenter .docs-version-selector')
    var version_selector_select = $('#documenter .docs-version-selector select')

    version_selector_select.change(function (x) {
      target_href = version_selector_select.children('option:selected').get(0).value
      window.location.href = target_href
    })

    // add the current version to the selector based on siteinfo.js, but only if the selector is empty
    if (
      typeof DOCUMENTER_CURRENT_VERSION !== 'undefined' &&
      $('#version-selector > option').length == 0
    ) {
      var option = $(
        "<option value='#' selected='selected'>" + DOCUMENTER_CURRENT_VERSION + '</option>'
      )
      version_selector_select.append(option)
    }

    if (typeof DOC_VERSIONS !== 'undefined') {
      var existing_versions = version_selector_select.children('option')
      var existing_versions_texts = existing_versions.map(function (i, x) {
        return x.text
      })
      DOC_VERSIONS.forEach(function (each) {
        var version_url = documenterBaseURL + '/../' + each + '/'
        var existing_id = $.inArray(each, existing_versions_texts)
        // if not already in the version selector, add it as a new option,
        // otherwise update the old option with the URL and enable it
        if (existing_id == -1) {
          var option = $("<option value='" + version_url + "'>" + each + '</option>')
          version_selector_select.append(option)
        } else {
          var option = existing_versions[existing_id]
          option.value = version_url
          option.disabled = false
        }
      })
    }

    // only show the version selector if the selector has been populated
    if (version_selector_select.children('option').length > 0) {
      version_selector.toggleClass('visible')
    }
  })
})
