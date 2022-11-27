chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const activeTab = await chrome.tabs.get(tabId)

  async function collapseGroups() {
    try {
      const windowGroups = await chrome.tabGroups.query({
        windowId: activeTab.windowId
      })

      const groupsToCollapse = windowGroups.filter(
        group => group.id !== activeTab.groupId
      )

      const collapsePromises = groupsToCollapse.map(group =>
        chrome.tabGroups.update(group.id, {
          collapsed: true
        })
      )

      await Promise.all(collapsePromises)
    } catch (error) {
      if (
        error ==
        'Error: Tabs cannot be edited right now (user may be dragging a tab).'
      ) {
        setTimeout(collapseGroups, 50)
      } else {
        console.error(error)
      }
    }
  }

  collapseGroups()
})

// Reload the runtime on update to avoid sticking to outdated behavior in existing tabs
chrome.runtime.onUpdateAvailable.addListener(() => {
  chrome.runtime.reload()
})
