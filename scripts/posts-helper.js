hexo.extend.helper.register('getArchivesByYear', function() {
    const posts = this.site.posts.sort('date', 1); // 按时间倒序
    const data = {};

    posts.forEach(post => {
        const year = post.date.year();
        if (!data[year]) data[year] = [];
        data[year].push(post);
    });

    return data; // 返回一个以年份为 Key 的对象
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