
function updateCubePosition() {
    var divider = document.querySelector('.divider');
    var dividerOffset = divider.offsetTop + divider.offsetHeight; // 加上divider的高度
    var block = document.getElementById('movingcube');
    block.style.top = dividerOffset + 'px'; // 设置#movingcube的top值为divider的底部
}


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        alert("Êtes-vous prêt à entrer dans un monde monstrueux ? Déconseillé aux moins de 12 ans.");
    }, 500); // 延迟500毫秒后显示alert


    document.querySelectorAll('.box img').forEach(function(img) {
        img.addEventListener('click', function() {
            let count = parseInt(img.getAttribute('data-click-count')) || 0; // Ensure count is a number
            const description = img.nextElementSibling; // Assumes description is directly after img

            if (count === 0) {
                img.src = img.getAttribute('data-alt-src');
            } else if (count === 1) {
                img.style.display = 'none';
                description.style.display = 'block';
            } else {
                img.src = img.getAttribute('data-original-src');
                img.style.display = 'block';
                description.style.display = 'none';
                count = -1; // Reset count for the loop
            }

            count += 1;
            img.setAttribute('data-click-count', count.toString());
        });
    });

     // 获取所有包含类名"cta"的元素，这将包括"Haut"文字和旁边的图标
     var ctaElements = document.querySelectorAll('.cta');

     // 为所有包含类名"cta"的元素添加点击事件监听器
     ctaElements.forEach(function(cta) {
         cta.addEventListener('click', function(event) {
             // 阻止默认行为，即不执行链接的跳转
             event.preventDefault();
     
             // 滚动页面到顶部
             window.scrollTo({
                 top: 0,
                 behavior: 'smooth' // 平滑滚动效果
             });
         });
     });

    // 方块移动和颜色变换逻辑
    var block = document.getElementById('movingcube');
    var divider = document.querySelector('.divider');
    var position = divider.getBoundingClientRect().top + window.scrollY + 2; // Adjust right below the divider
    block.style.top = position + 'px';

    var screenWidth = window.innerWidth;
    var blockPosition = 0;
    var movingRight = true;
    var colors = ['#000708', '#80294a', '#804729', '#876226', '#7e8c4d', '#158251', '#157b82'];
    var colorIndex = 0;
    var colorChangeInterval = 2000; // Time in milliseconds between color changes
    var lastColorChangeTime = Date.now(); // Record the start time

    function moveAndChangeColor() {
        var now = Date.now();
        var maxPosition = screenWidth - block.offsetWidth;

        if (now - lastColorChangeTime > colorChangeInterval) {
            block.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
            lastColorChangeTime = now; // Update last change time
        }

        if (movingRight) {
            blockPosition++;
            if (blockPosition >= maxPosition) movingRight = false;
        } else {
            blockPosition--;
            if (blockPosition <= 0) movingRight = true;
        }

        block.style.left = blockPosition + 'px';
        requestAnimationFrame(moveAndChangeColor);
    }

    moveAndChangeColor();

   





   // 显示弹窗
   document.querySelector('ul').addEventListener('click', function(e) {
    if (e.target && e.target.dataset.popupId) {
        e.preventDefault();
        var popupId = e.target.dataset.popupId;
        document.getElementById(popupId).style.display = 'block';
    }
});

// 关闭弹窗
document.querySelectorAll('.close-popup').forEach(function(btn) {
    btn.addEventListener('click', function() {
        this.parentElement.style.display = 'none'; // 关闭弹窗
    });
});

console.log(block); // 检查是否成功获取
console.log(divider); // 检查是否成功获取


    // 更新#movingcube的位置
updateCubePosition();// 调用此函数以在页面加载时设置方块的初始位置
window.addEventListener('resize', updateCubePosition);

});
