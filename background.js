const replacements = [
    {
      pattern: /https:\/\/etherscan\.io\/block\/(\d+)/,
      replacement: 'https://app.ondora.xyz/network/ethereum/blocks/$1',
    },
    {
      pattern: /https:\/\/etherscan\.io\/tx\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/ethereum/interactions/$1',
    },
    {
      pattern: /https:\/\/etherscan\.io\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/ethereum/accounts/$1',
    },
    {
      pattern: /https:\/\/polygonscan\.com\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/polygon/accounts/$1',
    },
    {
      pattern: /https:\/\/polygonscan\.com\/tx\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/polygon/interactions/$1',
    },
    {
      pattern: /https:\/\/polygonscan\.com\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/polygon/accounts/$1',
    },
    {
      pattern: /https:\/\/gnosisscan\.io\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/gnosis/accounts/$1',
    },
    {
      pattern: /https:\/\/gnosisscan\.io\/tx\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/gnosis/interactions/$1',
    },
    {
      pattern: /https:\/\/gnosisscan\.io\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/gnosis/accounts/$1',
    },
    {
      pattern: /https:\/\/goerli.basescan\.org\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/base-testnet/accounts/$1',
    },
    {
      pattern: /https:\/\/goerli.basescan\.org\/tx\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/base-testnet/interactions/$1',
    },
    {
      pattern: /https:\/\/goerli.basescan\.org\/address\/(.+)/,
      replacement: 'https://app.ondora.xyz/network/base-testnet/accounts/$1',
    },
  ];
  
  function replaceURL(tabId, url) {
    for (const { pattern, replacement } of replacements) {
      if (pattern.test(url)) {
        const newUrl = url.replace(pattern, replacement);
        chrome.tabs.update(tabId, { url: newUrl });
        return;
      }
    }
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