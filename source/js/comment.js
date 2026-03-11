const url = window.location.pathname; // 当前页面的路径，用于区分不同文章

function showNetworkErrorSnackbar() {
  document.querySelector('.snackbar-network-error').show = true;
}
    
function showCommentFailureSnackbar() {
  document.querySelector('.snackbar-comment-failure').show = true;
}

async function getCommentsCount() {
    
    try {
        const response = await fetch(`/api/comment?type=count&url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.errno === 0) {
            return result.data[0];
        } else {
            showCommentFailureSnackbar();
            console.error('Get comments count failed:', result.errmsg);
            return 0;
        }
    } catch (err) {
        showNetworkErrorSnackbar();
        console.error('Network error:', err);
        return 0;
    }
}

async function loadComments() {
    try {
        const response = await fetch(`/api/comment?path=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.errno === 0) {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = ''; // 清空现有评论
            console.log('加载评论成功:', result);
            console.log('加载评论成功:', result.data.data);

            result.data.data.forEach(comment => {
                const commentElement = document.createElement('mdui-list-item');
                commentElement.classList.add('comment');
                commentElement.alignment = 'start';
                commentElement.nonclickable = true;
                commentElement.innerHTML = `
                    <div slot="custom" class="comment-block">
                        <!-- src="${comment.avatar || '/icon/person.svg'}" -->
                        <mdui-avatar src="/icon/person.svg" class="comment-avatar"></mdui-avatar>
                        <div class="comment-right-area">
                            <p class="comment-nick-name">${comment.nick}</p>
                            <div class="comment-content">
                                ${comment.comment}
                            </div>
                        </div>
                    </div>
                `;
                commentsContainer.appendChild(commentElement);
            });
            /*result.data.data.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                <p><strong>${comment.nick}</strong> (${comment.mail})</p>
                <p>${comment.comment}</p>
                <p><small>${new Date(comment.create_time * 1000).toLocaleString()}</small></p>
                `;
                commentsContainer.appendChild(commentElement);
            });*/
        } else {
            console.error('加载评论失败:', result.errmsg);
        }
    } catch (err) {
        console.error('网络错误:', err);
    }
}

async function submitComment(commentData) {
    /*const commentData = {
        nick: '访客名称',
        mail: 'test@example.com',
        link: 'https://example.com',
        comment: '<p>这是评论内容.</p>', // 支持 HTML 或 Markdown
        ua: navigator.userAgent,
        url: window.location.pathname, // 当前页面的路径，用于区分不同文章
        // 如果是回复某人，需要传以下 ID
        // pid: parentCommentId, 
        // rid: rootCommentId,
        // at: '@回复的人'
    };*/

    try {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 如果用户已登录，需要携带 Token
                // 'Authorization': `Bearer ${your_token}` 
            },
            body: JSON.stringify(commentData)
        });

        const result = await response.json();
    
        if (result.errno === 0) {
            document.querySelector('.snackbar-comment-success').show = true;
            console.log('评论成功:', result.data);
        } else {
            document.querySelector('.snackbar-comment-failure').show = true;

            console.error('评论失败:', result.errmsg);
        }
    } catch (err) {
        document.querySelector('.snackbar-network-error').show = true;
        console.error('网络错误:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getCommentsCount().then(count => {
        const commentSectionTitle = document.querySelector('.comment-section-title');
        if (commentSectionTitle) {
            commentSectionTitle.textContent = `${count} Comment` + (count !== 1 ? 's' : '');
        }
    });
    loadComments();
    //submitComment();
  // 模拟提交评论
  //document.getElementById('submit-comment-btn').addEventListener('click', submitComment);
});

document.getElementById('comment-submit-button').addEventListener('click', () => {
    const nick = document.getElementById('comment-nick').value.trim();
    const email = document.getElementById('comment-email').value.trim();
    const website = document.getElementById('comment-website').value.trim();
    const content = document.getElementById('comment-content').value.trim();

    if (!nick || !email || !content) {
        document.querySelector('.snackbar-comment-failure').show = true;
        return;
    }

    const commentData = {
        nick,
        mail: email,
        comment: content,
        link: website,
        ua: navigator.userAgent,
        url: window.location.pathname,
    };

    submitComment(commentData).then(() => {
        // 提交成功后，重新加载评论列表
        loadComments();
    });
});