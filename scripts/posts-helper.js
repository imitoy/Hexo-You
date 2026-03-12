hexo.extend.helper.register('getArchivesByYear', function() {
    const posts = this.site.posts.sort('date', -1);
    return posts;
});

// Tag Helper
/*
hexo.extend.helper.register('getTags', function() {
    const tags = this.site.tags.sort('name', 1); // 按名称升序
    const data = [];

    tags.forEach(tag => {
        data.push({
            name: tag.name,
            count: tag.length
        });
    });
    return data; // 返回标签列表
});*/