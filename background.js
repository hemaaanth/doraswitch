const replacements = [

    // Ethereum

    {
        pattern: /^https:\/\/etherscan\.io\/$/,
        replacement: 'https://app.ondora.xyz'
    },
    {
        pattern: /https:\/\/etherscan\.io\/block\/(\d+)/,
        replacement: 'https://app.ondora.xyz/network/ethereum/blocks/$1'
    },
    {
        pattern: /https:\/\/etherscan\.io\/tx\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/ethereum/interactions/$1'
    },
    {
        pattern: /https:\/\/etherscan\.io\/address\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/ethereum/accounts/$1'
    },

    // Base-Testnet
    {
        pattern: /^https:\/\/goerli\.basescan\.org\/$/,
        replacement: 'https://app.ondora.xyz/network/base-testnet/'
    }, {
        pattern: /https:\/\/goerli\.basescan\.org\/block\/(\d+)/,
        replacement: 'https://app.ondora.xyz/network/base-testnet/blocks/$1'
    }, {
        pattern: /https:\/\/goerli\.basescan\.org\/tx\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/base-testnet/interactions/$1'
    }, {
        pattern: /https:\/\/goerli\.basescan\.org\/address\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/base-testnet/accounts/$1'
    },

    // Gnosis
    {
        pattern: /^https:\/\/gnosisscan\.io\/$/,
        replacement: 'https://app.ondora.xyz/network/gnosis'
    }, {
        pattern: /https:\/\/gnosisscan\.io\/block\/(\d+)/,
        replacement: 'https://app.ondora.xyz/network/gnosis/blocks/$1'
    }, {
        pattern: /https:\/\/gnosisscan\.io\/tx\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/gnosis/interactions/$1'
    }, {
        pattern: /https:\/\/gnosisscan\.io\/address\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/gnosis/accounts/$1'
    },

    // Scroll
    {
        pattern: /^https:\/\/scrollscan\.co\/$/,
        replacement: 'https://app.ondora.xyz/network/scroll-zkp'
    }, {
        pattern: /https:\/\/scrollscan\.co\/blocks\/(\d+)/,
        replacement: 'https://app.ondora.xyz/network/scroll-zkp/blocks/$1'
    }, {
        pattern: /https:\/\/scrollscan\.co\/tx\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/scroll-zkp/interactions/$1'
    }, {
        pattern: /https:\/\/scrollscan\.co\/address\/(.+)/,
        replacement: 'https://app.ondora.xyz/network/scroll-zkp/accounts/$1'
    }
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isEnabled: true });
  chrome.action.setBadgeText({ text: 'Y' });
  chrome.action.setBadgeBackgroundColor({ color: '#0F0' });
});

function replaceURL(tabId, url) {
  chrome.storage.sync.get(['isEnabled'], function(result) {
    if (result.isEnabled) {
      for (const { pattern, replacement } of replacements) {
        if (pattern.test(url)) {
          const newUrl = url.replace(pattern, replacement);
          chrome.tabs.update(tabId, { url: newUrl });
          return;
        }
      }
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.url) {
    replaceURL(sender.tab.id, message.url);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    replaceURL(tabId, changeInfo.url);
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get(['isEnabled'], function(result) {
    const newIsEnabled = !result.isEnabled;
    chrome.storage.sync.set({ isEnabled: newIsEnabled });

    // Set the badge text
    chrome.action.setBadgeText({
      text: newIsEnabled ? 'Y' : 'N'
    });

    // Set the badge background color
    chrome.action.setBadgeBackgroundColor({
      color: newIsEnabled ? '#0F0' : '#F00'
    });
  });
});