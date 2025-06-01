const browserAPI = typeof browser === 'undefined' ? chrome : browser;
const subTree = typeof browser === 'undefined' ? '1' : 'toolbar_____';

browserAPI.storage.sync.get('options', () =>
    browserAPI.bookmarks.getSubTree(subTree, items =>
        document.querySelector(".main").innerHTML = `<div class="item-group">${generateBookmarkItems(items[0].children)}</div>`
    )
);


const generateBookmarkItems = (item) => {
    if (Array.isArray(item)) {
        return item.map(obj => generateBookmarkItems(obj)).join('');
    } else if (item.url === 'data:') {
        return '</div><div class="item-group">'
    } else if (item.url === 'about:blank') {
        return ''
    } else if (item.url !== undefined) {

        const faviconUrl = `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(item.url)}`;

        return (
            `<a class='item' href='${item.url}'>
                <div class='item__icon'>
                    <img src='${faviconUrl}'/>
                </div>
                <p class='item__title'>
                    ${item.title}
                </p>
                <div class='item__url'>
                    ${item.url}
                </div>
            </a>`
        );
    } else return ''
}
