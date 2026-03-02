hexo.extend.filter.register('after_post_render', function(data) {
    const text = "\<td class=\"gutter\"\>.*?\<\/td\>";
    console.error("NOnono!");
    
    data.content = data.content.replace(text, "");
    return data;
});