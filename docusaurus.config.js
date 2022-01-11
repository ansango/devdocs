// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/oceanicNext");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ansango docs",
  tagline: "Dev Docs molan",
  url: "https://ansango-devdocs.vercel.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "ansango",
  projectName: "dev docs",
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: "es",
        docsRouteBasePath: "/",
        docsDir: "docs",
        highlightSearchTermsOnTargetPage: true,
        translations: {
          search_placeholder: "Buscar",
          see_all_results: "Ver todos los resultados",
          no_results: "No existen resultados",
          search_results_for: 'Buscar resultados con "{{ keyword }}"',
          search_the_documentation: "Buscar documentación",
          count_documents_found: "{{ count }} documento encontrado",
          count_documents_found_plural: "{{ count }} documentos encontrados",
          no_documents_were_found: "No se encontraron documentos",
        },
      },
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/ansango/devdocs/edit/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "ansango dev docs",
        logo: {
          alt: "Dev Docs Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        copyright: `Copyright © ${new Date().getFullYear()} Aníbal Santos Gómez. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
