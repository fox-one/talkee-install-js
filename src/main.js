
const version = "3.0.3";

export default function (opts) {
  const styleUrl = `https://cdn.jsdelivr.net/npm/@foxone/talkee@${version}/dist/style.css`;
  const scriptUrls = [
    { name: "vue", url: `https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js` },
    { name: "mvm", url: `https://cdn.jsdelivr.net/npm/@foxone/mvm@0.1.30/dist/mvm.min.js` },
    { name: "talkee", url: `https://cdn.jsdelivr.net/npm/@foxone/talkee@${version}/dist/index.umd.js` },
  ];

  // insert styles and scripts to body
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = styleUrl;
  document.head.appendChild(link);

  const workaroundStyle = document.createElement('style');
  workaroundStyle.innerHTML = ".v-btn:hover { --v-theme-overlay-multiplier: 1; }";
  document.head.appendChild(workaroundStyle);

  for (let ix = 0; ix < scriptUrls.length; ix++) {
    const item = scriptUrls[ix];
    const script = document.createElement('script');
    script.src = item.url;
    script.type = 'text/javascript';
    script.setAttribute("data-name", item.name);
    document.body.appendChild(script);
  }

  const talkeeOpts = {
    slug: opts.slug || window.location.pathname,
    // show the link to the arweave transaction page if possible
    showLink: opts.showLink || true,
    // the site id, required
    siteId: opts.siteId,
    // the container selector to render the talkee
    container: opts.container || "#comments",
    // default locale is en
    locale: opts.locale || "en",
    passport: {
      chainId: opts.chainId || 1,
    },
    // add supported auth methods
    auth: {
      authMethods: opts.authMethods || ["metamask", "walletconnect", "mixin", "fennec"],
    }
  };

  function installTalkee() {
    const _checkTalkee = () => {
      return window.Talkee && window.Talkee.install && window.Vue;
    }
    setTimeout(() => {
      if (_checkTalkee()) {
        const container = document.querySelector(talkeeOpts.container);
        if (container) {
          container.style.display = "block";
          window.Talkee.show(talkeeOpts);
        }
      } else {
        // try again
        installTalkee();
      }
    }, 100);
  }

  installTalkee();
}
