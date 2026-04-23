function layoutWaterfall() {
    const container = document.querySelector('.card-container');
    const items = document.querySelectorAll('.card-container .post-card');
    const content = document.querySelector('.content-container');
    
    if (!container || !items.length || !content) return;

    const windowWidth = content.offsetWidth - 48;
    let column = 1;
    if (windowWidth >= 840) {
        column = 3;
    } else if (windowWidth >= 428) {
        column = 2;
    }

    const gap = 16;
    const width = (windowWidth - (column - 1) * gap) / column;

    let columnHeights = new Array(column).fill(0);
    let columnLefts = new Array(column);
    let columnRights = new Array(column);
    for (let i = 0; i < column; i++) {
        columnLefts[i] = i * (width + gap);
        columnRights[i] = columnLefts[i] + width;
    }
    
    items.forEach((item) => {
        const minHeight = Math.min(...columnHeights);
        const columnIndex = columnHeights.indexOf(minHeight);

        item.style.position = 'absolute';
        item.style.top = `${minHeight}px`;
        item.style.left = `${columnLefts[columnIndex]}px`;
        item.style.right = `${windowWidth - columnRights[columnIndex]}px`;
        item.style.width = `${width}px`;

        columnHeights[columnIndex] += item.offsetHeight + gap;
    });

    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight + gap}px`;
}

// 确保每次调用都执行（PJAX 切换到首页时通过 reInitializePlugins 调用）
// 首次页面加载
if (document.readyState === 'complete') {
  layoutWaterfall();
} else {
  window.addEventListener('load', layoutWaterfall);
}
window.addEventListener('resize', layoutWaterfall);

// 监听 content-container 变化（PJAX 替换时触发 ResizeObserver）
const resizeObserver = new ResizeObserver(function() {
  layoutWaterfall();
});

const contentContainer = document.querySelector('.content-container');
if (contentContainer) {
  resizeObserver.observe(contentContainer);
}
