const content = document.querySelector('.content-container');

function layoutWaterfall() {
    const container = document.querySelector('.card-container');
    const items = document.querySelectorAll('.card-container .post-card');
    //const windowWidth = container.offsetWidth;
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
    
    items.forEach((item, index) => {
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

window.addEventListener('load', layoutWaterfall);
window.addEventListener('resize', layoutWaterfall);

const resizeObserver = new ResizeObserver(entries => {
  layoutWaterfall();
});

resizeObserver.observe(content);