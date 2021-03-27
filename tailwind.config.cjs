const plugin = require('tailwindcss/plugin');
const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');

module.exports = {
  purge: {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    options: {
      defaultExtractor: (content) => [
        // If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group)
      ],
      keyframes: true
    }
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '640px',
          lg: '960px',
          xl: '1220px',
        },
      },
      screens: {
        dlg: { max: '1023px' },
        dmd: { max: '767px' },
      },
      maxWidth: {
        'min-content': 'min-content',
        'max-content': 'max-content',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      maxHeight: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      minWidth: {
        'min-content': 'min-content',
        'max-content': 'max-content',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
      },
      minHeight: {
        'min-content': 'min-content',
        'max-content': 'max-content',
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        '4/5': '80vh',
      },
      inset: {
        '1/2': '50%',
        '-1/2': '-50%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ addVariant, e, addUtilities, theme, prefix, variants }) => {
      const escape = e || ((x) => x);

      ['after', 'backdrop ', 'before', 'cue', 'first-letter', 'first-line', 'grammar-error ', 'marker ', 'placeholder ', 'selection'].forEach(
        (pseudo) => {
          addVariant(pseudo, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${escape(`${pseudo}${separator}${className}`)}::${pseudo}`;
            });
          });
        },
      );

      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });

      addUtilities(
        {
          '.col-span-full': {
            'grid-column': '1 / -1',
          },
          '.flex-2': {
            flex: '2 1 0',
          },
          '.flex-3': {
            flex: '3 1 0',
          },
        },
        ['responsive'],
      );

      addUtilities(
        {
          '.hide': {
            display: 'none',
          },
          '.show': {
            display: 'block',
          },
        },
        ['responsive', 'important'],
      );

      addUtilities(
        {
          '.empty-content': {
            content: "''",
          },
        },
        ['before'],
      );
    }),
  ]
};
