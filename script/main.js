const generateBookmarkItem = (item) => {
    switch (item.type) {
        case 'folder':
            return `</div><div class="item-group-title">${item.title}</div><div class="item-group">${generateBookmarkItems(item.children)}</div>`
        case 'separator':
            return '</div><div class="item-group">'
        case 'bookmark':                
            const faviconUrl = `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(item.url)}`
            return (
                `<a class='item' href='${item.url}'>
                    <div class='item__icon'>
                        <img src='${faviconUrl}'/>
                    </div>
                    <div class='item__title'>
                        ${item.title}
                    </div>
                    <div class='item__url'>
                        ${item.url}
                    </div>
                </a>`
            )
    }
}

const generateBookmarkItems = (items ) => items.map(generateBookmarkItem).join(' ')

browser.storage.sync.get('options', () =>
    browser.bookmarks.getSubTree('toolbar_____', items =>
        document.querySelector(".main").innerHTML = `<div class="item-group">${generateBookmarkItems(items[0].children)}</div>`
    )
)